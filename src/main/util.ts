import {error, errorcall} from './error';
import * as R from './types';
import {RNull} from './values';

/** ******************************************************
 * Length of any RValue
 ********************************************************/

// implementation copied from Rinlinedfuns.h
export function length(s: R.RValue): number {
    switch (s.tag) {
    case 'NULL':
        return 0;
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
    case 'list':
    case 'expression':
        return s.data.length;
    case 'pairlist':
    case 'language':
    case 'dotdotdot':
        let i = 0;
        while (s.tag !== 'NULL') {
            i++;
            s = tail(s);
        }
        return i;
    case 'environment':
        return s.frame.size;
    default:
        return 1;
    }
}

/** *******************************************************
 * Recycling utilities
 *********************************************************/

export function modIterate<A,B,C>(arr1 : A[], arr2 : B[], fun : (arg1: A, arg2: B) => C) : C[] {
    const n1 = arr1.length;
    const n2 = arr2.length;
    if (n1 === 0 || n2 === 0) {
        return [];
    }
    const n = Math.max(n1, n2);
    const result : C[] = Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = fun(arr1[i % n1], arr2[i % n2]);
    }
    return result;
}


/** ******************************************************
 * RValue manipulation facilities
 *
 * These functions are not total, used to deal with
 * dynamic linked lists more ergonomically
 *
 * Sample usage:
 *
 * function test(x: R.PairList) {
 *     let ptr: R.PairList | R.Nil = x;
 *     while (ptr.tag === 'pairlist') {
 *         console.log(`${ptr.key} no type errors!`);
 *         ptr = tail(ptr);
 *     }
 *
 *     for (ptr = x; ptr.tag !== 'NULL'; ptr = tail(ptr)) {
 *         console.log(`${ptr.key} no type errors!`);
 *     }
 * }
 ********************************************************/

export function head(pl: R.LinkedList | R.Nil): R.RValue {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<R.PairList>pl).value;
}

export function headkey(pl: R.LinkedList | R.Nil): string {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<R.PairList>pl).key;
}

export function tail(pl: R.LinkedList | R.Nil): R.PairList | R.Nil {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<R.PairList>pl).next;
}

export function getAtLinkedListIndex(
    pl: R.LinkedList | R.Nil,
    index: number,
): R.LinkedList | R.Nil {
    let curr = pl;

    for (let i = 0; i < index; i++) {
        if (curr === RNull) {
            error('Index out of bounds');
            return RNull;
        }

        curr = (curr as R.LinkedList).next;
    }

    return curr;
}

export function cons(val: R.RValue, pl: R.PairList | R.Nil): R.PairList {
    return {
        tag: 'pairlist',
        refcount: 0,
        attributes: RNull,
        key: '',
        value: val,
        next: pl,
    };
}

export function lcons(val: R.RValue, pl: R.PairList | R.Nil): R.Language {
    return {
        tag: 'language',
        refcount: 0,
        attributes: RNull,
        key: '',
        value: val,
        next: pl,
    };
}

export class LinkedListIter implements Iterable<R.PairList> {
    private static dummy: R.PairList = {
        tag: 'pairlist',
        refcount: 0,
        attributes: RNull,
        key: '',
        value: RNull,
        next: RNull,
    };
    private _node: R.LinkedList | R.Nil;

    constructor(pl: R.LinkedList | R.Nil) {
        this._node = pl;
    }

    [Symbol.iterator]() {
        return this;
    }

    public next() {
        if (this._node === RNull) {
            return {
                done: true,
                value: LinkedListIter.dummy,
            };
        } else {
            const result = {
                done: false,
                value: <R.PairList> this._node,
            };
            this._node = (<R.PairList> this._node).next;
            return result;
        }
    }
}

/** ******************************************************
 * String Truthiness utils
 ********************************************************/

export function generalLogicalConversion(x: number | null): boolean | null {
    return x === null ? null : !!x;
}

export function stringTrue(s: string): boolean {
    return truenames.indexOf(s) !== -1;
}

export function stringFalse(s: string): boolean {
    return falsenames.indexOf(s) !== -1;
}

const truenames = ['T', 'True', 'TRUE', 'true'];

const falsenames = ['F', 'False', 'FALSE', 'false'];

/** ******************************************************
 * Other utils
 ********************************************************/

export function getNames(x: R.RValue): R.Character | R.Nil {
    let ans: R.Character | R.Nil = RNull;
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
    case 'environment':
    case 'closure':
    case 'dotdotdot':
    case 'language':
        let curr = x.attributes;
        while (curr.tag !== RNull.tag) {
            if (curr.key === 'names') {
                ans = curr.value as R.Character;
                break;
            }
            curr = curr.next;
        }
        break;
    default:
        ans = RNull;
    }

    return ans;
}

export function getAttributeOfName(x: R.RValue, name: string): R.PairList | R.Nil {
    let ans: R.PairList | R.Nil = RNull;
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
    case 'environment':
    case 'closure':
    case 'dotdotdot':
    case 'language':
        let curr = x.attributes;
        while (curr.tag !== RNull.tag) {
            if (curr.key === name) {
                ans = curr;
                break;
            }
            curr = curr.next;
        }
        break;
    default:
        ans = RNull;
    }

    return ans;
}

export function getAttributeFromAttributes(vec: R.PairList | R.Nil, name: string): R.PairList | R.Nil {
    let ans: R.PairList | R.Nil = RNull;
    if (vec.tag === RNull.tag) return RNull;

    let curr: R.PairList | R.Nil = vec;
    while (curr.tag !== RNull.tag) {
        if (curr.key === name) {
            ans = curr;
            break;
        }
        curr = curr.next;
    }

    return ans;
}

/** ******************************************************
 * Arity checking for Builtin/Specials
 ********************************************************/

export function checkArity(
    call: R.Language,
    op: R.Builtin | R.Special,
    args: R.PairList | R.Nil,
) {
    const arglen = length(args);
    if (op.arity >= 0 && op.arity !== arglen) {
        errorcall(
            call,
            `${arglen} argument(s) passed to call which requires ${op.arity}`
        );
    }
}
