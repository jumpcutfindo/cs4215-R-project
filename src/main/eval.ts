import { logicalFromString } from "./coerce";
import { ddFind, defineVar, findFun, findVar, closureEnv } from "./envir";
import { error, errorcall, warncall } from "./error";
import { EvalContext } from "./globals";
import { matchArgs } from "./match";
import { forcePromise, promiseArgs } from "./promise";
import { Closure, Env, Language, Name, Nil, PairList, PrimOp, RValue, Vis } from "./types";
import { checkArity, cons, head, length, LinkedListIter, tail } from "./util";
import { install, mkChar, mkInt, mkLogical, mkReal, RNull, R_DotsSymbol, R_MissingArg, R_UnboundValue } from "./values";

/**********************************************************
 *
 *               CORE EVALUATION FUNCTIONS
 * 
 **********************************************************/

export function Reval(e: RValue, env: Env) : RValue {
    EvalContext.R_Visible = Vis.On;
    let result: RValue = RNull;
    switch (e.tag) {
    case 'NULL':
    case 'builtin':
    case 'character':
    case 'closure':
    case 'environment':
    case 'expression':
    case 'integer':
    case 'list':
    case 'logical':
    case 'numeric':
    case 'pairlist':
    case 'special':
        result = e;
        break;
    case 'name':
        if (e === R_DotsSymbol) {
            error("... used in an incorrect context");
        } else if (e.ddval !== undefined) {
            result = ddFind(e.ddval, env);
        } else {
            result = findVar(e, env);
        }
        if (result === R_UnboundValue) {
            error(`object '${e.pname}' not found`);
        } else if (result === R_MissingArg) {
            error(`argument "${e.pname}" is missing, with no default`);
        } else if (result.tag === 'promise') {
            result = result.cached === R_UnboundValue ? 
                forcePromise(result) :
                result.cached;
        }
        break;
    case 'promise':
        result = forcePromise(e);
        break;
    case 'language':
        let lang = head(e);
        let op = lang.tag === 'name' ? findFun(lang, env, e) : Reval(lang, env);
        let args: PairList|Nil = tail(e);
        switch (op.tag) {
        case 'builtin':
            args = RevalList(args, env, e, 0);
            // fallthrough
        case 'special':
            EvalContext.R_Visible = op.visibility;
            result = (op.jsFunc)(e, op, args, env);
            if (op.visibility !== Vis.OnMut) {
                EvalContext.R_Visible = op.visibility;
            }
            break;
        case 'closure':
            let pargs = promiseArgs(args, env);
            result = applyClosure(e, op, pargs, env, RNull);
            break;
        default:
            error('attempt to apply non-function');
        }
        break;
    case 'dotdotdot':
        error("'...' used in an incorrect context");
    default:
        error('unimplemented type for eval');
    }
    return result;
}

export function RevalList(el: PairList|Nil, env: Env, call: Language, n: number): PairList|Nil {
    let headPtr: PairList|Nil = RNull;
    let tailPtr: PairList|Nil = RNull;

    for (let elem of new LinkedListIter(el)) {
        n++;
        if (elem.value === R_DotsSymbol) {
            let dots = findVar(elem.value, env);
            if (dots.tag === 'NULL' || dots.tag === 'dotdotdot') {
                for (let dotelem of new LinkedListIter(dots)) {
                    let val = Reval(dotelem.value, env);
                    let ev = cons(val, RNull);
                    if (headPtr === RNull) {
                        headPtr = ev;
                    } else {
                        (<PairList>tailPtr).next = ev;
                    }
                    ev.key = dotelem.key;
                    tailPtr = ev;
                }
            } else if (dots !== R_MissingArg) {
                error("'...' used in an incorrect context");
            }
        } else if (elem.value === R_MissingArg) {
            errorcall(call, `argument ${n} is empty`);
        } else {
            let val = Reval(elem.value, env);
            let ev = cons(val, RNull);
            if (headPtr === RNull) {
                headPtr = ev;
            } else {
                (<PairList>tailPtr).next = ev;
            }
            ev.key = elem.key;
            tailPtr = ev;

        }
    }
    return headPtr;
}

export function applyClosure(
    call: Language, 
    op: Closure, 
    pargs: PairList|Nil, 
    env: Env, 
    suppliedVars: PairList|Nil
) : RValue {
    let actuals = matchArgs(op.formals, pargs, call);
    let newenv = closureEnv(op.formals, actuals, env);

    // suppliedvars from usemethod
    for (let v of new LinkedListIter(suppliedVars)) {
        newenv.frame.set(install(v.key), v.value);
    }

    let result = Reval(op.body, newenv);
    if (isReturn(result)) {
        result = (<Name>result).internal;
    }
    return result;
}


/**********************************************************
 *
 *               CONTROL FLOW PRIMITIVES
 * 
 **********************************************************/

/**********************************************************
 *
 *                         IF
 * 
 **********************************************************/

export const do_if : PrimOp = (call, op, args, env) => {
    // we use unsafe head/tail functions as we are guaranteed that if is 
    // called with at least 2 arguments (in ASTVisitor, if will be given NULL arguments if)
    // not enough arguments are supplied. See grammar/Parsing.md
    let statement : RValue = RNull;
    const cond = Reval(head(args), env);
    if (asLogicalNoNA(cond, call)) {
        statement = head(tail(args));
    } else {
        const alt = tail(tail(args));
        if (alt === RNull) {
            EvalContext.R_Visible = Vis.Off;
            return RNull;
        } 
        statement = head(alt);
    }
    return Reval(statement, env);
}

function asLogicalNoNA(s: RValue, call: Language) : boolean {
    let result : boolean|null = null;
    switch (s.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
        if (s.data.length > 1) {
            warncall(call, 'the condition has length > 1 and only the first element will be used');
        }
        if (s.data.length > 0) {
            result = s.tag === 'character' ? 
                logicalFromString(s.data[0]) : // strings are checked against truenames/falsenames in util.ts
                (s.data[0] === null? null : !!s.data[0]);
        } else {
            errorcall(call, 'argument is of length 0');
        }
        if (result === null) {
            errorcall(call, 'missing value where TRUE/FALSE needed');
        }
    }
    if (result === null) {
        errorcall(call, 'argument is not interpretable as logical');
    } 
    return result as boolean; // safe cast as errorcall throws if null
}

/**********************************************************
 *
 *               RETURN, BREAK, NEXT
 * 
 **********************************************************/

export function Rreturn(val: RValue): Name {
    let result: Name = install('return');
    result.internal = val;
    return result;
}

export function isReturn(rval: RValue): boolean {
    return rval.tag === 'name' && 
           rval.pname === 'return' && 
           rval.internal !== R_UnboundValue;
}

export const do_return : PrimOp = (call, op, args, env) => {
    let result: RValue = RNull;
    if (args.tag !== 'NULL') {
        if (args.next.tag !== 'NULL') {
            result = Reval(args.value, env);
        } else {
            errorcall(call, 'multi-argument returns are not permitted');
        }
    }
    return Rreturn(result);
}

export function Rbreak(): Name {
    let result: Name = install('break');
    result.internal = RNull; // just some non R_UnboundValue value to indicate break return
    return result;
}

export function isBreak(bval: RValue): boolean {
    return bval.tag === 'name' && 
           bval.pname === 'break' && 
           bval.internal !== R_UnboundValue;
}

export const do_break : PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    return op.variant === 1 ? Rnext() : Rbreak();
}

export function Rnext(): Name {
    let result: Name = install('next');
    result.internal = RNull; // just some non R_UnboundValue value to indicate break return
    return result;
}

export function isNext(nval: RValue): boolean {
    return nval.tag === 'name' && 
           nval.pname === 'next' && 
           nval.internal !== R_UnboundValue;
}

export const do_for : PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    let sym = head(args);
    let val = head(tail(args));
    let body = head(tail(tail(args)));

    if (sym.tag !== 'name') {
        errorcall(call, "non-symbol loop variable");
    } else {
        for (let i = 0; i < length(val); i++) {
            switch (val.tag) {
            case 'expression':
            case 'list':
                defineVar(sym, val.data[i], env);
                break;
            case 'pairlist':
                defineVar(sym, head(val), env);
                val = tail(val);
                break;
            case 'logical':
                defineVar(sym, mkLogical(val.data[i]), env);
                break;
            case 'integer':
                defineVar(sym, mkInt(val.data[i]), env);
                break;
            case 'numeric':
                defineVar(sym, mkReal(val.data[i]), env);
                break;
            case 'character':
                defineVar(sym, mkChar(val.data[i]), env);
                break;
            default:
                errorcall(call, 'invalid for() loop sequence');
            }
            let result = Reval(body, env);
            if (isBreak(result)) {
                break;
            }
            if (isReturn(result)) {
                return result;
            }
        }
    }
    return RNull;
}