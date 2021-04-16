// Implementing R's S3 generic system

import { getAttribute, s3Classes } from './attrib';
import { findVar, findVarInFrame } from './envir';
import { error, errorcall } from './error';
import { applyClosure, Reval, Rreturn } from './eval';
import { EvalContext } from './EvalContext';
import * as R from './types';
import { checkArity, cons, head, lcons, length, tail } from './util';
import { install, mkChar, mkChars, mkInts, mkLogical, mkPairlist, RNull, R_GlobalEnv, R_MissingArg, R_UnboundValue } from './values';

// The incorrect inherits used in do_for
export function inherits(val: R.RValue, klass: string) : boolean {
    const classes = getAttribute(val, "class", true);
    switch (classes.tag) {
    case 'character':
        return classes.data.includes(klass);
    default:
        return false;
    }
}

// Different from R: our inherits correctly reflects S3 dispatch order
// following R: NA is interpreted as true
export const do_inherits : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const x = head(args); args = tail(args);
    const what = head(args); args = tail(args);
    const which = head(args);
    const classes = s3Classes(x);
    if (what.tag !== 'character') {
        error("'what' must be a character vector");
    }
    if (which.tag !== 'logical' || which.data.length !== 1) {
        error("'which' must be a length 1 logical vector");
    }
    const isvec = which.data[0] !== false; // so that null returns true as per R
    const res = [];
    for (const c of what.data) {
        const i = classes.data.indexOf(c);
        if (isvec) {
            res.push(i+1);
        } else if (i >= 0) {
            return mkLogical(true);
        }
    }
    if (isvec) {
        return mkInts(res);
    } else {
        return mkLogical(false);
    }
}

// must be a special as per R, but in fact we don't do anything special
export const do_usemethod : R.PrimOp = (call, op, args, env) => {
    if (length(args) === 0) {
        errorcall(call, "there must be a 'generic' argument");
    }
    const generic = Reval(head(args), env);
    if (generic.tag !== 'character' || generic.data.length !== 1) {
        errorcall(call, "'generic' argument must be a character string");
    }
    if (generic.data[0] === null) {
        errorcall(call, "no applicable method for 'NA'"); // cut short here since UseMethod(NA) is definitely not useful
    }
    return usemethod(generic.data[0], env, call);
}

export function usemethod(generic: string, env: R.Env, useMethodCall: R.Language): R.RValue {
    let genericCall: R.Language|R.Nil = RNull;
    let callenv = R_GlobalEnv;
    let i = EvalContext.CallStack.length - 1;
    for (; i >= 0; i--) {
        const call = EvalContext.CallStack[i];
        if (call.op.tag === 'closure') {
            genericCall = call.call;
            callenv = call.sysparent;
            break;
        }
    }
    // for (const call of EvalContext.CallStack.reverse()) {
    //     if (call.op.tag === 'closure') {
    //         genericCall = call.call;
    //         callenv = call.sysparent;
    //         break;
    //     }
    // }
    if (genericCall.tag === 'NULL') {
        errorcall(useMethodCall, 'UseMethod used in wrong context');
    }
    const args = tail(genericCall);
    if (args.tag === 'NULL' || args.value === R_MissingArg) {
        errorcall(useMethodCall, "there must be a 'generic' argument");
    }
    const object = Reval(args.value, callenv);
    EvalContext.CallStack[i].generic = object;
    const classes = s3Classes(object);
    if (classes.tag !== 'character') {
        error('class attribute is not a character vector');
    }
    i = 0;
    for (const cl of classes.data) {
        if (cl === null) {
            i++;
            continue;
        }
        const method = findVar(install(`${generic}.${cl}`), callenv);
        if (method.tag === 'closure') {
            const remainingClasses = mkChars(classes.data.slice(i));
            const methodVar = mkChar(`${generic}.${cl}`);
            const genericVar = mkChar(generic);
            const s3Vars = mkPairlist([remainingClasses, '.Class'], [methodVar, '.Method'], [genericVar, '.Generic']);
            // Found a method to dispatch to!
            return dispatchMethod(method, args, s3Vars);
        }
        i++;
    }
    const methodDefault = findVar(install(`${generic}.default`), callenv);
    if (methodDefault.tag === 'closure') {
        const methodVar = mkChar(`${generic}.default`);
        const genericVar = mkChar(generic);
        const s3Vars = mkPairlist([methodVar, '.Method'], [genericVar, '.Generic'], [RNull, '.Class']);
        return dispatchMethod(methodDefault, args, s3Vars);
    }
    errorcall(useMethodCall, 
        `no applicable method for '${generic}' applied to an object of class "c(${s3Classes(object).data.join(", ")})"`);
}

function dispatchMethod(method: R.Closure, args: R.PairList, s3Vars: R.Nil|R.PairList): R.RValue {
    const result = applyClosure(lcons(method, args), method, args, s3Vars);
    return Rreturn(result);
}

// Note: difference from R: we make it a primitive instead to remove the additional closure in the call stack
// Simplified mechanism:
//   1. Always gets dispatch object from searching EvalContext (same as usemethod)
//   2. Always get class list from .Class in current environment
//   3. If args are specified, use those (prepend dispatch object in front), else if 0 args provided use EvalContext args
export const do_nextmethod : R.PrimOp = (call, op, args, env) => {
    let genericCall: R.Language|R.Nil = RNull;
    let object: R.RValue|undefined;
    let callenv = R_GlobalEnv;
    let i = EvalContext.CallStack.length - 1;
    for (; i >= 0; i--) {
        const call = EvalContext.CallStack[i];
        if (call.op.tag === 'closure') {
            genericCall = call.call;
            object = call.generic;
            callenv = call.sysparent;
            break;
        }
    }
    if (genericCall.tag === 'NULL') {
        errorcall(call, "'NextMethod' used in wrong context");
    }
    if (object === undefined) {
        error('generic object missing. Was a method called directly?');
    }
    const classes = findVarInFrame(install('.Class'), env);
    const genericVar = findVarInFrame(install('.Generic'), env);
    if (classes === R_UnboundValue) {
        error('.Class not found');
    }
    if (genericVar.tag !== 'character' || genericVar.data.length < 1) {
        error('Invalid .Generic');
    }
    const generic = genericVar.data[0];
    const newArgs = length(args) === 0 ?
        cons(object, tail(tail(genericCall))) :
        cons(object, args);
    if (classes.tag === 'character') {
        for (i = 1; i < classes.data.length; i++) {
            const cl = classes.data[i];
            if (cl === null) {
                i++;
                continue;
            }
            const method = findVar(install(`${generic}.${cl}`), callenv);
            if (method.tag === 'closure') {
                const remainingClasses = mkChars(classes.data.slice(i));
                const methodVar = mkChar(`${generic}.${cl}`);
                const s3Vars = mkPairlist([remainingClasses, '.Class'], [methodVar, '.Method'], [genericVar, '.Generic']);
                // Found a method to dispatch to!
                return applyClosure(lcons(method, newArgs), method, newArgs, s3Vars);
            }
            i++;
        }
    }
    const methodDefault = findVar(install(`${generic}.default`), callenv);
    if (methodDefault.tag === 'closure') {
        const methodVar = mkChar(`${generic}.default`);
        const s3Vars = mkPairlist([methodVar, '.Method'], [genericVar, '.Generic'], [RNull, '.Class']);
        return applyClosure(lcons(methodDefault, newArgs), methodDefault, newArgs, s3Vars);
    }
    errorcall(call, 'no method to invoke');
}