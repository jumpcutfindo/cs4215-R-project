import { hasAttributes } from './attrib';
import {error} from './error';
import {LinkedList, Nil, PairList, RValue} from './types';
import {RNull} from './values';

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

export function head(pl : LinkedList|Nil) : RValue {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<PairList>pl).value;
}

export function tail(pl : LinkedList|Nil) : PairList|Nil {
    if (pl === RNull) {
        error('Empty list');
    }
    return (<PairList>pl).next;
}

export function length(pl: LinkedList | Nil) {
    let len = 0;
    let curr: LinkedList | Nil = pl;

    while (curr !== RNull) {
        len ++;
        curr = (curr as LinkedList).next;
    }

    return len;
}

export function getAtLinkedListIndex(pl: LinkedList | Nil, index: number): LinkedList | Nil {
    let curr = pl;

    for (let i = 0; i < index; i ++) {
        if (curr === RNull) {
            error('Index out of bounds');
            return RNull;
        }

        curr = (curr as LinkedList).next;
    }

    return curr;
}

/** ******************************************************
 * String Truthiness utils
 ********************************************************/

export function generalLogicalConversion(x : number|null) : boolean|null {
    return x === null ? null : !!x;
}


export function stringTrue(s: string) : boolean {
    return truenames.indexOf(s) !== -1;
}

export function stringFalse(s: string) : boolean {
    return falsenames.indexOf(s) !== -1;
}

const truenames = [
    'T',
    'True',
    'TRUE',
    'true',
];

const falsenames = [
    'F',
    'False',
    'FALSE',
    'false',
];

/** ******************************************************
 * Other utils
 ********************************************************/

export function isVector(x: RValue): boolean {
    switch (x.tag) {
    case ('logical'):
    case ('integer'):
    case ('numeric'):
    case ('character'):
    case ('expression'):
        return x.attributes === RNull;
    default:
        return false;
    }
}
