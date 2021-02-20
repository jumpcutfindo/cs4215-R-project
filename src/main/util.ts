import { error } from "./error";
import { Nil, PairList, RValue } from "./types";
import { RNull } from "./values";

/********************************************************
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

export function head(pl : PairList|Nil) : RValue {
    if (pl === RNull) {
        error('Empty list');
    } 
    return (<PairList>pl).value;
}

export function tail(pl : PairList|Nil) : PairList|Nil {
    if (pl === RNull) {
        error('Empty list');
    } 
    return (<PairList>pl).next;
}

/********************************************************
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
    'true'
];

const falsenames = [
    'F',
    'False',
    'FALSE',
    'false'
];