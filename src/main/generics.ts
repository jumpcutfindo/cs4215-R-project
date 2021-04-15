// Implementing R's S3 generic system

import { getAttribute, s3Classes } from './attrib';
import { findVar } from './envir';
import { error, errorcall } from './error';
import { applyClosure, Reval, Rreturn } from './eval';
import { EvalContext } from './EvalContext';
import * as R from './types';
import { checkArity, head, lcons, length, tail } from './util';
import { install, mkInts, mkLogical, RNull, R_GlobalEnv, R_MissingArg } from './values';

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
    for (const call of EvalContext.CallStack.reverse()) {
        if (call.op.tag === 'closure') {
            genericCall = call.call;
            callenv = call.sysparent;
            break;
        }
    }
    if (genericCall.tag === 'NULL') {
        errorcall(useMethodCall, 'UseMethod used in wrong context');
    }
    const args = tail(genericCall);
    if (args.tag === 'NULL' || args.value === R_MissingArg) {
        errorcall(useMethodCall, "there must be a 'generic' argument");
    }
    const object = Reval(args.value, callenv);
    const classes = s3Classes(object);
    if (classes.tag !== 'character') {
        error('class attribute is not a character vector');
    }
    for (const cl of classes.data) {
        if (cl === null) {
            continue;
        }
        const method = findVar(install(`${generic}.${cl}`), callenv);
        if (method.tag === 'closure') {
            // Found a method to dispatch to!
            return dispatchMethod(method, args, callenv);
        }
    }
    const methodDefault = findVar(install(`${generic}.default`), callenv);
    if (methodDefault.tag === 'closure') {
        return dispatchMethod(methodDefault, args, callenv);
    }
    errorcall(useMethodCall, 
        `no applicable method for '${generic}' applied to an object of class "c(${s3Classes(object).data.join(", ")})"`);
}

function dispatchMethod(method: R.Closure, args: R.PairList, env: R.Env): R.RValue {
    const result = Reval(lcons(method, args), env);

    // const result = applyClosure(lcons(method, args), method, args, )
    return Rreturn(result);
}