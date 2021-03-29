/**
 * Module for various core language builtin functions handling lists and functions
 */

import * as R from './types';
import { LinkedListIter } from './util';
import { mkChars, mkPairlist, RNull } from './values';

export const do_makelist : R.PrimOp = (call, op, args, env) => {
    let names : string[] = [];
    let vals : R.RValue[] = [];
    let hasNames = false;
    for (const item of new LinkedListIter(args)) {
        names.push(item.key);
        vals.push(item.value);
        if (item.key !== '') {
            hasNames = true;
        }
    }
    return {
        tag: 'list',
        attributes: hasNames ? mkPairlist([mkChars(names), 'names']) : RNull,
        refcount: 0,
        data: vals
    };
}


