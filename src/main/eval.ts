/* eslint-disable new-cap */
import {asCharacterFactor, logicalFromString} from './coerce';
import {ddFind, defineVar, findFun, findVar, closureEnv, setVar, findVarInFrame} from './envir';
import {error, errorcall, ErrorOptions, warncall} from './error';
import { inherits } from './generics';
import { EvalContext } from "./EvalContext";
import {matchArgs} from './match';
import {forcePromise, promiseArgs} from './promise';
import * as R from './types';
import {checkArity, cons, head, lcons, length, LinkedListIter, tail} from './util';
import {install, mkChar, mkInt, mkLogical, mkReal, mkLang, mkPairlist, RNull, R_BaseEnv, R_DotsSymbol, R_MissingArg, R_UnboundValue, mkClosure} from './values';

/** ********************************************************
 *
 *               CORE EVALUATION FUNCTIONS
 *
 **********************************************************/

export function Reval(e: R.RValue, env: R.Env) : R.RValue {
    EvalContext.R_Visible = R.Vis.On;
    let result: R.RValue = RNull;
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
    case 'double':
    case 'pairlist':
    case 'special':
        result = e;
        break;
    case 'name':
        if (e === R_DotsSymbol) {
            error('... used in an incorrect context');
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
        const lang = head(e);
        const op = lang.tag === 'name' ? findFun(lang, env, e) : Reval(lang, env);
        let args: R.PairList|R.Nil = tail(e);
        if (EvalContext.CallStack.length > ErrorOptions.MAX_STACK_SIZE) {
            error('stack size exceeded!');
        }
        EvalContext.CallStack.push({call: e, sysparent: env, op: op});
        switch (op.tag) {
        case 'builtin':
            args = RevalList(args, env, e, 0);
            // fallthrough
        case 'special':
            EvalContext.R_Visible = op.visibility;
            result = (op.jsFunc)(e, op, args, env);
            if (op.visibility !== R.Vis.OnMut) {
                EvalContext.R_Visible = op.visibility;
            }
            break;
        case 'closure':
            const pargs = promiseArgs(args, env);
            result = applyClosure(e, op, pargs, RNull);
            break;
        default:
            EvalContext.CallStack.pop();
            error('attempt to apply non-function');
        }
        EvalContext.CallStack.pop();
        break;
    case 'dotdotdot':
        error('\'...\' used in an incorrect context');
    default:
        error('unimplemented type for eval');
    }
    return result;
}

// Used to evaluate all arguments of builtin function before calling the builtin in Reval
export function RevalList(el: R.PairList|R.Nil, env: R.Env, call: R.Language, n: number): R.PairList|R.Nil {
    let headPtr: R.PairList|R.Nil = RNull;
    let tailPtr: R.PairList|R.Nil = RNull;

    for (const elem of new LinkedListIter(el)) {
        n++;
        if (elem.value === R_DotsSymbol) {
            const dots = findVar(elem.value, env);
            if (dots.tag === 'NULL' || dots.tag === 'dotdotdot') {
                for (const dotelem of new LinkedListIter(dots)) {
                    const val = Reval(dotelem.value, env);
                    const ev = cons(val, RNull);
                    if (headPtr === RNull) {
                        headPtr = ev;
                    } else {
                        (<R.PairList>tailPtr).next = ev;
                    }
                    ev.key = dotelem.key;
                    tailPtr = ev;
                }
            } else if (dots !== R_MissingArg) {
                error('\'...\' used in an incorrect context');
            }
        } else if (elem.value === R_MissingArg) {
            errorcall(call, `argument ${n} is empty`);
        } else {
            const val = Reval(elem.value, env);
            const ev = cons(val, RNull);
            if (headPtr === RNull) {
                headPtr = ev;
            } else {
                (<R.PairList>tailPtr).next = ev;
            }
            ev.key = elem.key;
            tailPtr = ev;
        }
    }
    return headPtr;
}

export function applyClosure(
    call: R.Language,
    op: R.Closure,
    pargs: R.PairList|R.Nil,
    suppliedVars: R.PairList|R.Nil,
) : R.RValue {
    const actuals = matchArgs(op.formals, pargs, call);
    const newenv = closureEnv(op.formals, actuals, op.environment);

    // suppliedvars from usemethod
    for (const v of new LinkedListIter(suppliedVars)) {
        newenv.frame.set(install(v.key), v.value);
    }

    let result = Reval(op.body, newenv);
    if (isReturn(result)) {
        result = (<R.Name>result).internal;
    }
    return result;
}


/** ********************************************************
 *
 *               CONTROL FLOW PRIMITIVES
 *
 **********************************************************/

/** ********************************************************
 *
 *                         IF
 *
 **********************************************************/

export const do_if : R.PrimOp = (call, op, args, env) => {
    // we use unsafe head/tail functions as we are guaranteed that if is
    // called with at least 2 arguments (in ASTVisitor, if will be given NULL arguments if)
    // not enough arguments are supplied. See grammar/Parsing.md
    let statement : R.RValue = RNull;
    const cond = Reval(head(args), env);
    if (asLogicalNoNA(cond, call)) {
        statement = head(tail(args));
    } else {
        const alt = tail(tail(args));
        if (alt === RNull) {
            EvalContext.R_Visible = R.Vis.Off;
            return RNull;
        }
        statement = head(alt);
    }
    return Reval(statement, env);
};

function asLogicalNoNA(s: R.RValue, call: R.Language) : boolean {
    let result : boolean|null = null;
    switch (s.tag) {
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
        if (s.data.length > 1) {
            warncall(call, 'the condition has length > 1 and only the first element will be used');
        }
        if (s.data.length > 0) {
            result = s.tag === 'character' ?
                logicalFromString(s.data[0]) : // strings are checked against truenames/falsenames in util.ts
                (s.data[0] === null || Number.isNaN(s.data[0]) ? null : !!s.data[0]);
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

/** ********************************************************
 *
 *               RETURN, BREAK, NEXT, LOOPS
 *
 **********************************************************/

export function Rreturn(val: R.RValue): R.Name {
    const result: R.Name = install('return');
    result.internal = val;
    return result;
}

export function isReturn(rval: R.RValue): boolean {
    return rval.tag === 'name' &&
           rval.pname === 'return' &&
           rval.internal !== R_UnboundValue;
}

export const do_return : R.PrimOp = (call, op, args, env) => {
    let result: R.RValue = RNull;
    if (args.tag !== 'NULL') {
        if (args.next.tag === 'NULL') {
            result = Reval(args.value, env);
        } else {
            errorcall(call, 'multi-argument returns are not permitted');
        }
    }
    return Rreturn(result);
};

export function Rbreak(): R.Name {
    const result: R.Name = install('break');
    result.internal = RNull; // just some non R_UnboundValue value to indicate break return
    return result;
}

export function isBreak(bval: R.RValue): boolean {
    return bval.tag === 'name' &&
           bval.pname === 'break' &&
           bval.internal !== R_UnboundValue;
}

export const do_break : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    return op.variant === 1 ? Rnext() : Rbreak();
};

export function Rnext(): R.Name {
    const result: R.Name = install('next');
    result.internal = RNull; // just some non R_UnboundValue value to indicate break return
    return result;
}

export function isNext(nval: R.RValue): boolean {
    return nval.tag === 'name' &&
           nval.pname === 'next' &&
           nval.internal !== R_UnboundValue;
}

export const do_for : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const sym = head(args);
    let val = head(tail(args));
    const body = head(tail(tail(args)));

    if (sym.tag !== 'name') {
        errorcall(call, 'non-symbol loop variable');
    } 
    val = Reval(val, env);
    if (inherits(val, "factor")) {
        val = asCharacterFactor(val);
    }
    defineVar(sym, RNull, env);
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
        case 'double':
            defineVar(sym, mkReal(val.data[i]), env);
            break;
        case 'character':
            defineVar(sym, mkChar(val.data[i]), env);
            break;
        default:
            errorcall(call, 'invalid for() loop sequence');
        }
        const result = Reval(body, env);
        if (isBreak(result)) {
            break;
        }
        if (isReturn(result)) {
            return result;
        }
    }

    return RNull;
};

export const do_while : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const cond = head(args);
    const body = head(tail(args));
    while (true) {
        const condres = Reval(cond, env);
        if (!asLogicalNoNA(condres, call)) {
            break;
        }
        const result = Reval(body, env);
        if (isBreak(result)) {
            break;
        }
        if (isReturn(result)) {
            return result;
        }
    }
    return RNull;
}

export const do_repeat : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const body = head(args);
    while (true) {
        const result = Reval(body, env);
        if (isBreak(result)) {
            break;
        }
        if (isReturn(result)) {
            return result;
        }
    }
    return RNull;
}

/** ********************************************************
 *
 *      OTHER LANGUAGE CONSTRUCTS (BRACE, PARENTHESIS)
 *
 **********************************************************/


export const do_paren : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    return head(args);
} 

export const do_begin : R.PrimOp = (call, op, args, env) => {
    let result: R.RValue = RNull;
    for (let arg of new LinkedListIter(args)) {
        result = Reval(arg.value, env);
        if (isReturn(result) || isBreak(result) || isNext(result)) {
            break;
        }
    }
    return result;
}

/** ********************************************************
 *
 *                 FUNCTION OBJECT CREATION
 *
 **********************************************************/

export const do_function : R.PrimOp = (call, op, args, env) => {
    if (length(args) < 2) {
        error(`incorrect number of arguments to "function"`);
    }
    let formals = head(args);
    checkFormals(formals);
    return mkClosure(formals, head(tail(args)), env);
}

function checkFormals(formals: R.RValue): asserts formals is R.PairList|R.Nil {
    if (formals.tag === 'NULL') {
        return;
    }
    if (formals.tag === 'pairlist') {
        for (let formal of new LinkedListIter(formals)) {
            if (formal.key === '') {
                error('invalid formal argument list for "function"');
            }
        }
    } else {
        error('invalid formal argument list for "function"');
    }
}


/** ********************************************************
 *
 *            SETTING BINDINGS IN ENVIRONMENT
 *
 **********************************************************/

const assignmentSymbols = ["<-", "<<-"];

export const do_set : R.PrimOp = (call, op, args, env) => {
    // Don't ask why this does not use checkArity... simply following R implementation
    if (length(args) !== 2) {
        error(`incorrect number of arguments to "${assignmentSymbols[op.variant]}"`);
    }
    let lhs = head(args);
    let rhs = Reval(head(tail(args)), env);
    switch (lhs.tag) {
    case 'character':
        lhs = install(lhs.data[0]!); // May not be sound implementation. TODO: test
        // fallthrough
    case 'name':
        if (op.variant === 0) {
            defineVar(lhs, rhs, env);
        } else {
            setVar(lhs, rhs, env.parent as R.Env);
        }
        return rhs;
    case 'language':
        return applydefine(call, op, lhs, rhs, env);
    default:
        errorcall(call, 'invalid (do_set) left-hand side to assignment');
    }
}

function applydefine(
    call: R.Language, 
    op: R.Builtin|R.Special, 
    lhs: R.Language, 
    rhs: R.RValue, 
    env: R.Env
) : R.RValue {
    if (env === R_BaseEnv) {
        errorcall(call, 'cannot do complex assignments in base environment');
    }
    // TODO: Check how head(tail(lhs)) (CADR in GNU C) can work here - it appears to return Nil in GNU C if language object
    // has no arguments (e.g. names() <- 4) which explains the NULL check in evalseq. But in our implementation it should fail
    // already in head() -- empty list
    let { assignSymbol, partialEvals } = evalseq(head(tail(lhs)), op.variant === 0, env);
    for (let partialEval of new LinkedListIter(partialEvals)) {
        const fun = head(lhs);
        let repFun: R.RValue;
        switch (fun.tag) {
        case 'name':
            repFun = getAssignFcnSymbol(fun);
            break;
        case 'language':
            // check for and handle assignments of the form foo::bar(x) <- y
            if (length(fun) === 3 && 
                head(fun) === install('::') &&
                (repFun = head(tail(tail(fun)))).tag === 'name') {
                repFun = mkLang([head(fun)], [head(tail(fun))], [getAssignFcnSymbol(repFun)]);
                break;
            }
            // fallthrough
        default:
            error('invalid function in complex assignment');
        }
        const restArgs = tail(tail(lhs));
        rhs = replaceCall(repFun, partialEval.value, restArgs, rhs);
        rhs = Reval(rhs, env);
        lhs = head(tail(lhs)) as R.Language; // Should by theory be guaranteed not to fail, since length(partialEvals) == number of nested calls
    }
    if (op.variant === 0) {
        defineVar(assignSymbol, rhs, env);
    } else {
        setVar(assignSymbol, rhs, env.parent as R.Env);
    }
    return rhs;
    
}

// Given a complex LHS expression for assignment, evalseq evaluates
// all the necessary subsections of the LHS expression. For example,
// Given an assignment names(x$a[2]) <- "hello"
// evalseq will produce a list (eval(x$a[2]), eval(x$a), eval(x), x)
// Note that the last item x should be a symbol which is eventually assigned to
//
// evalseq is written this way (not computed alongside applydefine) so that each partial evaluation
// is only computed once, instead of multiple times (deepest expression computed n times, outermost
// computed once)
function evalseq(
    expr: R.RValue, 
    forceLocal: boolean, 
    env: R.Env
) : { assignSymbol: R.Name, partialEvals: R.PairList } {
    if (expr.tag === 'NULL') {
        error('invalid (NULL) left side of assignment');
    }
    if (expr.tag === 'name') {
        let nval = forceLocal 
            ? ensureLocal(expr, env) 
            : Reval(expr, env.parent as R.Env);
        return { 
            assignSymbol: expr, 
            partialEvals: mkPairlist([nval]) as R.PairList 
        };
    } else if (expr.tag === 'language') {
        let { assignSymbol, partialEvals } = evalseq(head(tail(expr)), forceLocal, env);
        let nexpr = lcons(head(expr), cons(head(partialEvals), tail(tail(expr))));
        let nval = Reval(nexpr, env);
        return {
            assignSymbol: assignSymbol,
            partialEvals: cons(nval, partialEvals)
        };
    } else {
        error('target of assignment expands to non-language object');
    }
}

function ensureLocal(sym: R.Name, env: R.Env) : R.RValue {
    let val = findVarInFrame(sym, env);
    if (val !== R_UnboundValue) {
        val = Reval(sym, env); // for promises
        return val;
    } else {
        val = Reval(sym, env.parent as R.Env);
        if (val === R_UnboundValue) {
            error(`object '${sym.pname}' not found`);
        }
        defineVar(sym, val, env);
        return val;
    }
}

function getAssignFcnSymbol(fn: R.Name) : R.Name {
    return install(fn.pname + '<-');
}

// Creates replacement function call with replacement function fun, 1st arg val, remaining args args, assignment rhs rhs
function replaceCall(fun: R.RValue, val: R.RValue, args: R.PairList|R.Nil, rhs: R.RValue) : R.Language {
    let result = mkLang([fun], [val]);
    let ptr = tail(result) as R.PairList;
    for (let arg of new LinkedListIter(args)) {
        ptr.next = {...arg};
        ptr = ptr.next;
    }
    ptr.next = mkPairlist([rhs, 'value']);
    return result;
}