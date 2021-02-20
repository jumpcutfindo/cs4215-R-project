import { Reval } from './eval';
import * as R from './types';
import { RNull, R_BaseEnv, R_EmptyEnv, R_UnboundValue } from './values';

export function findVarInFrame(symbol: R.Name, env: R.Env): R.RValue {
    if (env === R_BaseEnv) {
        return symbol.value;
    }
    return env.frame.get(symbol) ?? R_UnboundValue;
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
    symbol: R.Name, env: R.Env, inherits: boolean, typepred: (tname: string) => boolean
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

export function findFun(symbol: R.Name, env: R.Env): R.Closure|R.Builtin|R.Special { 
    return findVarType(
        symbol,
        env,
        true, 
        s => functionTypes.indexOf(s) !== -1
    ) as R.Closure|R.Builtin|R.Special;
}