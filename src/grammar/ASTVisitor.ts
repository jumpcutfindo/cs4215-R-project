import { RVisitor } from './RVisitor';
import { FunCallContext, LitContext, NameContext } from "./RParser";
import { SymbolContext } from "./RParser";
import { CallContext } from "./RParser";
import { FunctionContext } from "./RParser";
import { NamespaceContext } from "./RParser";
import { ComponentExtractionContext } from "./RParser";
import { SubsetContext } from "./RParser";
import { IndexingContext } from "./RParser";
import { AssignContext } from "./RParser";
import { ForContext } from "./RParser";
import { ProgContext } from "./RParser";
import { FormalContext } from "./RParser";
import { ArglistContext } from "./RParser";
import { ArgContext } from "./RParser";
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import {RValue} from '../main/types';
import {mkLang, RNull, R_MissingArg} from '../main/values';
import {install, mkInt, mkLogical, mkReal, mkChar, mkPairlist} from '../main/values'; 
import { warn } from '../main/error';

function formatId(id: string) : string {
    return id.startsWith('`') ? id.slice(1,-1) : id;
}

// TODO: Upgrade formatString to be able to format single apostrophe ' strings properly.
// Currently, relying on JSON.parse means only "" are allowed
function formatString(str: string) : string {
    return JSON.parse(str);
}


export class ASTVisitor extends AbstractParseTreeVisitor<RValue> 
                        implements RVisitor<RValue> {

    // Unused
    defaultResult() : RValue {
        return RNull;
    }

    // Unused
    aggregateResult(agg: RValue, next: RValue) : RValue {
        return RNull;
    }

    visitProg(context: ProgContext) : RValue {
        return {
            tag: 'expression',
            attributes: RNull,
            refcount: 0,
            data: context.expr().map(ectx => ectx.accept(this))
        };        
    }

    visitLit(context: LitContext) : RValue {
        const lit = context.literal();
        const str = lit.text;
        if (lit.BOOL()) {
            return mkLogical(str.startsWith('T') ? true : false);
        } else if (lit.FLOAT() || lit.NAN()) {
            return mkReal(parseFloat(str));
        } else if (lit.INF()) {
            return mkReal(Infinity);
        } else if (lit.HEX()) {
            return mkReal(parseInt(str)); // Hex literals are numeric 
        } else if (lit.INT()) {
            let val = parseFloat(str);
            if (!Number.isInteger(val)) {
                warn(
                    `Warning: integer literal ${str} contains decimal; 
                    using numeric value`
                );
                return mkReal(val);
            } else {
                return mkInt(val);
            }
        } else if (lit.STRING()) {
            return mkChar(formatString(str)); 
        } else if (lit.NA()) {
            return mkLogical(null);
        } else { 
            return RNull;
        }
    }

    visitSymbol(context: SymbolContext) : RValue {
        return install(formatId(context.ID().text));
    }

    visitNamespace(context: NamespaceContext) : RValue {
        const op = install('::');
        const args = context
            .name()
            .map<[RValue, string?]>(namectx => [this.visitName(namectx)]);
        return mkLang([op], ...args);
    }

    /**
     * We have a helper function to visit arg nodes
     */
    doArg(context: ArgContext) : [RValue, string?] {
        const val = context.expr()?.accept(this);
        // const dots = context.DOTS() && install(context.DOTS()!.text);
        let name = "";
        if (context.ID()) {
            name = formatId(context.ID()!.text);
        } else if (context.STRING()) {
            name = formatString(context.STRING()!.text);
        }
        // return [val ?? dots ?? R_MissingArg, name];
        return [val ?? R_MissingArg, name];
    }

    doArglist(context: ArglistContext) : [RValue, string?][] {
        return context.arg().map(arg => this.doArg(arg));
    }

    doFormal(context: FormalContext) : [RValue, string] {
        let id = context.ID();
        // if (id) {
        let sym = formatId(id.text);
        if (context.expr()) {
            return [context.expr()!.accept(this), sym];
        } else {
            return [R_MissingArg, sym];
        }
        // } else {
            // Is dot-dot-dot parameter
        //     return [R_MissingArg, '...'];
        // }
    }

    visitFunction(context: FunctionContext) : RValue {
        const call = install('function');
        const formals = context
            .formallist()
            .formal()
            .map(fctx => this.doFormal(fctx));
        const body = context.expr().accept(this);
        return mkLang([call], [mkPairlist(...formals)], [body]);        
    }

    visitFunCall(context: FunCallContext) : RValue {
        const call = context.expr().accept(this);
        return mkLang([call], ...this.doArglist(context.arglist()));
    }

    visitSubset(context: SubsetContext) : RValue {
        const obj = context.expr().accept(this);
        const call = install('[');
        return mkLang([call], [obj], ...this.doArglist(context.arglist()));
    }

    visitIndexing(context: IndexingContext) : RValue {
        const obj = context.expr().accept(this);
        const call = install('[[');
        return mkLang([call], [obj], ...this.doArglist(context.arglist()));
    }

    visitComponentExtraction(context: ComponentExtractionContext) : RValue {
        const obj = context.expr().accept(this);
        const call = install('$');
        const name = this.visitName(context.name());
        return mkLang([call], [obj], [name]);
    }

    visitFor(context: ForContext) : RValue {
        const call = install('for');
        const id = install(formatId(context.ID()!.text));
        const seq = context._seq.accept(this);
        const body = context._body.accept(this);
        return mkLang([call], [id], [seq], [body]);
    }

    visitAssign(context: AssignContext) : RValue {
        let arr = context._arrow.text!;
        let call = arr === '->' || arr === '<-' ? 
            install('<-') : install('<<-');
        let lhs = context._assignee.accept(this);
        return mkLang([call], [lhs], [context._val.accept(this)]);
    }

    visitCall(context: CallContext) : RValue {
        let call = install(formatId(context._op.text!));
        let exprs = context.expr().map<[RValue, string?]>(ectx => {
            return [ectx.accept(this)];
        });
        return mkLang([call], ...exprs);
    }

    visitName(context: NameContext) : RValue {
        const str = context.text;
        if (context.ID()) {
            return install(formatId(str));
        } else {
            return mkChar(formatString(str));
        }
    }
}