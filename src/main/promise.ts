import { findVar } from "./envir";
import { error } from "./error";
import { Reval } from "./eval";
import { EvalContext } from "./globals";
import { Env, LinkedList, Nil, PairList, Prom, RValue } from "./types";
import { head, headkey, tail } from "./util";
import { mkPairlist, mkPromise, RNull, R_DotsSymbol, R_MissingArg, R_UnboundValue } from "./values";

export function forcePromise(e: Prom) : RValue {
    if (e.cached === R_UnboundValue) {
        if (e.seen) {
            error('promise already under evaluation: recursive default argument reference or earlier problems?');
        }
        e.seen = true;
        EvalContext.R_PendingPromises.push(e);
        e.cached = Reval(e.expression, e.environment);
        EvalContext.R_PendingPromises.pop();
        e.seen = false;
    }
    return e.cached;
}


export function promiseArgs(el: PairList | Nil, env: Env): PairList | Nil {
    // Start of with a pairlist with a dummy first value for the iterative algorithm
    let ans: PairList = mkPairlist([RNull]) as PairList;
    while (el.tag !== 'NULL') {
        if (head(el) === R_DotsSymbol) {
            let h = findVar(R_DotsSymbol, env);
            if (h.tag === 'dotdotdot' || h.tag === 'NULL') {
                let ptr: LinkedList | Nil = h;
                while (ptr !== RNull) {
                    if (head(ptr) === R_MissingArg) {
                        ans.next = mkPairlist([head(ptr), headkey(ptr)]);
                    } else {
                        ans.next = mkPairlist([mkPromise(head(ptr), env), headkey(ptr)]);
                    }
                    ans = ans.next as PairList;
                }
            } else if (h !== R_MissingArg) {
                error("'...' used in an incorrect context");
            }
        } else if (head(el) === R_MissingArg) {
            ans.next = mkPairlist([R_MissingArg, headkey(el)]);
            ans = ans.next as PairList;
        } else {
            ans.next = mkPairlist([mkPromise(head(el), env), headkey(el)]);
            ans = ans.next as PairList;
        }
        el = tail(el);
    }
    // remove initial dummy RNull value.
    return ans.next;
}
