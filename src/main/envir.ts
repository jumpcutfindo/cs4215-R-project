import { lengthDots } from './dotdotdot';
import { error, errorcall } from './error';
import { Reval } from './eval';
import * as R from './types';
import { head, tail } from './util';
import { install, mkPromise, RNull, R_BaseEnv, R_DotsSymbol, R_EmptyEnv, R_MissingArg, R_UnboundValue } from './values';

export function closureEnv(pl: R.PairList|R.Nil, vals: R.PairList|R.Nil, parent: R.Env): R.Env {
    let result : R.Env = {
        tag: 'environment',
        attributes: RNull,
        frame: new Map(),
        parent: parent
    };
    while (pl.tag !== 'NULL' && vals.tag !== 'NULL') {
        let val = vals.value === R_MissingArg && pl.value !== R_MissingArg ?
            mkPromise(pl.value, result) : vals.value;
        result.frame.set(install(pl.key), val);
        pl = tail(pl);
        vals = tail(vals);
    }
    return result;
}


export function findVarInFrame(symbol: R.Name, env: R.Env): R.RValue {
    if (env === R_BaseEnv) {
        return symbol.value;
    }
    return env.frame.get(symbol) ?? R_UnboundValue;
}

export function ddFind(i: number, env: R.Env): R.RValue {
    if (i <= 0) {
        error(`indexing '...' with non-positive index ${i}`);
    }
    let dots = findVar(R_DotsSymbol, env);
    if (dots === R_UnboundValue) {
        error(`..${i} used in an incorrect context, no ... to look in`);
    }
    if (lengthDots(dots) < i) {
        error(`the ... list contains fewer than ${i} element(s)`);
    }
    for (let x = 1; x < i; x++) {
        dots = tail(dots as R.PairList);
    }
    return head(dots as R.PairList);
}

export function findVar(symbol: R.Name, env: R.Env): R.RValue {
    let result: R.RValue = R_UnboundValue;
    while (env !== R_EmptyEnv && result === R_UnboundValue) {
        result = findVarInFrame(symbol, env);
        env = env.parent as R.Env; // Safe cast since only R_EmptyEnv can have Nil parent
    }
    // either env === R_EmptyEnv or result !== R_UnboundValue
    return result;
}

// Finds variables with types satisfying provided predicate
export function findVarType(
    symbol: R.Name, env: R.Env, inherits: boolean, typepred: (tname: string) => boolean,
): R.RValue {
    let result: R.RValue = R_UnboundValue;
    while (env !== R_EmptyEnv) {
        result = findVarInFrame(symbol, env);
        if (result !== R_UnboundValue) {
            if (result.tag === 'promise') {
                result = Reval(result, env);
            }
            if (typepred(result.tag)) {
                return result;
            }
        }
        if (inherits) {
            env = env.parent as R.Env;
        } else {
            return R_UnboundValue;
        }
    }
    return R_UnboundValue;
}

const functionTypes = ['special', 'builtin', 'closure'];

export function findFun(symbol: R.Name, env: R.Env, call: R.Language): R.Closure|R.Builtin|R.Special { 
    let found = findVarType(
        symbol,
        env,
        true, 
        s => functionTypes.indexOf(s) !== -1
    );
    if (found === R_UnboundValue) {
        errorcall(call, `could not find function ${symbol.pname}`);
    }
    return found as R.Closure|R.Builtin|R.Special;
}

export function defineVar(sym: R.Name, val: R.RValue, env: R.Env) {
    if (val == R_UnboundValue) {
        error('attempt to bind a variable to R_UnboundValue');
    }
    if (env == R_EmptyEnv) {
        error('cannot assign values in the empty environment');
    }
    // not implementing environment/binding locking
    if (env == R_BaseEnv) {
        sym.value = val;
    }
    env.frame.set(sym, val);
}
