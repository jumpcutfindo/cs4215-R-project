import {copy} from './copy';
import {error, errorcall} from './error';
import {
    Builtin,
    Character,
    Language,
    LinkedList,
    Nil,
    PairList,
    RValue,
    Special,
} from './types';
import {RNull} from './values';

/** ******************************************************
 * Length of any RValue
 ********************************************************/

// implementation copied from Rinlinedfuns.h
export function length(s: RValue): number {
    switch (s.tag) {
    case 'NULL':
        return 0;
    case 'logical':
    case 'integer':
    case 'numeric':
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

export function head(pl: LinkedList | Nil): RValue {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<PairList>pl).value;
}

export function headkey(pl: LinkedList | Nil): string {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<PairList>pl).key;
}

export function tail(pl: LinkedList | Nil): PairList | Nil {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<PairList>pl).next;
}

export function getAtLinkedListIndex(
    pl: LinkedList | Nil,
    index: number,
): LinkedList | Nil {
    let curr = pl;

    for (let i = 0; i < index; i++) {
        if (curr === RNull) {
            error('Index out of bounds');
            return RNull;
        }

        curr = (curr as LinkedList).next;
    }

    return curr;
}

export function cons(val: RValue, pl: PairList | Nil): PairList {
    return {
        tag: 'pairlist',
        refcount: 0,
        attributes: RNull,
        key: '',
        value: val,
        next: pl,
    };
}

export function lcons(val: RValue, pl: PairList | Nil): Language {
    return {
        tag: 'language',
        refcount: 0,
        attributes: RNull,
        key: '',
        value: val,
        next: pl,
    };
}

export class LinkedListIter implements Iterable<PairList> {
    private static dummy: PairList = {
        tag: 'pairlist',
        refcount: 0,
        attributes: RNull,
        key: '',
        value: RNull,
        next: RNull,
    };
    private _node: LinkedList | Nil;

    constructor(pl: LinkedList | Nil) {
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
                value: <PairList> this._node,
            };
            this._node = (<PairList> this._node).next;
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

export function isVector(x: RValue): boolean {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
        return x.attributes === RNull;
    default:
        return false;
    }
}

export function getNames(x: RValue): Character | Nil {
    let ans: Character | Nil = RNull;
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
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
                ans = curr.value as Character;
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

/** ******************************************************
 * Arity checking for Builtin/Specials
 ********************************************************/

export function checkArity(
    call: Language,
    op: Builtin | Special,
    args: PairList | Nil,
) {
    const arglen = length(args);
    if (op.arity >= 0 && op.arity !== arglen) {
        errorcall(
            call,
            `${arglen} argument(s) passed to call which requires ${op.arity}`
        );
    }
}
