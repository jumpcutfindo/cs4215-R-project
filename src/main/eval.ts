import { logicalFromString } from "./coerce";
import { errorcall, warn, warncall } from "./error";
import { EvalContext } from "./globals";
import { Language, PairList, PrimOp, RValue } from "./types";
import { head, tail } from "./util";
import { RNull } from "./values";

export function Reval(e: RValue, env: RValue) : RValue {
    EvalContext.R_Visible = true;
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
        return e;
    case 'name':
        // lookup
    case 'promise':
        // force
    case 'language':
    case 'dotdotdot':
    }
    return RNull;
}

// 
export function RevalList() {
    
}

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
            EvalContext.R_Visible = false;
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