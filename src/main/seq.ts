import { asReal } from './coerce';
import { errorcall, warncall } from './error';
import { inherits } from './generics';
import * as R from './types';
import { checkArity, head, length, tail } from './util';
import { mkInts, RNull } from './values';

function seq_colon(call: R.Language, start: number, end: number): R.RValue {
    // Since JS numbers are very different from R numbers, we implement our own sensible version
    // of seq_colon deciding to return an integer vector if the numbers are safe integers
    const resType = (Number.isSafeInteger(start) && Number.isSafeInteger(Math.round(end))) ? 'integer' : 'numeric';
    const resLen = Math.floor(Math.abs(end - start)) + 1;
    return {
        tag: resType,
        attributes: RNull,
        refcount: 0,
        data: start <= end
            ? Array(resLen).fill(start).map((x, ix) => x + ix)
            : Array(resLen).fill(start).map((x, ix) => x - ix)
    }
}

function crossColon(call: R.Language, factor1: R.Int, factor2: R.Int): R.Int {
    return mkInts([]);
}

export const do_colon : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const start = head(args);
    const end = head(tail(args));
    // This requires that class=factor is strictly guarded to prevent malformed factors of other types
    if (inherits(start, 'factor') && inherits(end, 'factor')) {
        return crossColon(call, start as R.Int, end as R.Int);
    }
    const startlen = length(start);
    const endlen = length(end);
    if (startlen === 0 || endlen === 0) {
        errorcall(call, 'argument of length 0');
    }
    if (startlen > 1) {
        warncall(call, `numerical expression has ${startlen} elements: only the first used`);
    }
    if (endlen > 1) {
        warncall(call, `numerical expression has ${endlen} elements: only the first used`);
    }
    const startNum = asReal(start);
    const endNum = asReal(end);
    if (Number.isNaN(startNum) || Number.isNaN(endNum) || startNum === null || endNum === null) {
        errorcall(call, 'NA/NaN argument');
    }
    return seq_colon(call, startNum, endNum);
}