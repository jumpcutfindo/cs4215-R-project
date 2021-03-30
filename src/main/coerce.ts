import {stringFalse, stringTrue} from './util';
import * as R from './types';
import {inherits} from './generics';
import {error, warn} from './error';
import {getAttribute} from './attrib';
import {mkChars, mkInts, mkLogicals, mkReals, RNull} from './values';
import {copy} from './copy';

export function logicalFromString(x: string|null) : boolean|null {
    if (x !== null) {
        if (stringTrue(x)) return true;
        if (stringFalse(x)) return false;
    }
    return null;
}

export function asCharacterFactor(x: R.RValue) : R.Character {
    if (!inherits(x, 'factor') || x.tag !== 'integer') {
        error('attempting to coerce non-factor');
    }
    const levels = getAttribute(x, 'levels', true);
    if (levels.tag !== 'character') {
        error('malformed factor');
    }
    const chardata = x.data.map((num) => num === null ? null : levels.data[num]);
    return mkChars(chardata);
}

export function coerceTo(vec: R.RValue, type: string) {
    if (vec.tag === RNull.tag) return RNull;
    switch (type) {
    case 'logical':
        return asLogicalVector(vec);
    case 'integer':
        return asIntVector(vec);
    case 'numeric':
        return asRealVector(vec);
    case 'character':
        return asCharVector(vec);
    default:
        // Default case just don't do anything
        return vec;
    }
}

export function asLogicalVector(vec: R.RValue): R.Logical | R.Nil {
    let ans: R.Logical | R.Nil = RNull;
    switch (vec.tag) {
    case 'logical':
        ans = copy(vec) as R.Logical;
        break;
    case 'integer':
    case 'numeric':
        ans = mkLogicals(vec.data.map((x) => {
            if (x === null) return null;
            if (x === 0) return false;
            else return true;
        }));
        break;
    case 'character':
        const temp_data = vec.data.map((x)=> x === null ? null : Number(x) === NaN ? null : Number(x));
        ans = mkLogicals(temp_data.map((x) => {
            if (x === null) return null;
            if (x === 0) return false;
            else return true;
        }));
    }

    return ans;
    // TODO: Add all the other coercion cases
}

export function asIntVector(vec: R.RValue): R.Int | R.Nil {
    let ans: R.Int | R.Nil = RNull;

    switch (vec.tag) {
    case 'logical':
        ans = mkInts(vec.data.map((x) => {
            if (x === null) return null;
            else return x ? 1 : 0;
        }));
        break;
    case 'integer':
        ans = mkInts(vec.data);
        break;
    case 'numeric':
        ans = mkInts(vec.data.map((x)=> x === null ? null : Math.floor(x)));
        break;
    case 'character':
        ans = mkInts(vec.data.map((x)=> x === null ? null : Number(x) === NaN ? null : Number(x)));
    }

    return ans;
    // TODO: Add all the other coercion cases
}

export function asCharVector(vec: R.RValue): R.Character | R.Nil {
    let ans: R.Character | R.Nil = RNull;

    switch (vec.tag) {
    case 'logical':
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? (x ? 'TRUE' : 'FALSE') : null;
        }));
        break;
    case 'integer':
    case 'numeric':
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    case 'character':
        ans = copy(vec) as R.Character;
        break;
    case 'list':
        // TODO: List to string
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    case 'pairlist':
        // TODO: pairlist to string
        const temp = [];
        let curr: R.PairList | R.Nil = vec;
        while (curr.tag !== RNull.tag) {
            temp.push(curr.value);
            curr = curr.next;
        }
        ans = mkChars(temp.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    }

    return ans;
    // TODO: Add all the other coercion cases
}

export function asRealVector(vec: R.RValue): R.Real | R.Nil {
    let ans: R.Real | R.Nil = RNull;

    switch (vec.tag) {
    case 'logical':
        ans = mkReals(vec.data.map((x) => x === null ? null : x ? 1 : 0));
        break;
    case 'integer':
        ans = mkReals(vec.data);
        break;
    case 'numeric':
        ans = copy(vec) as R.Real;
        break;
    case 'character':
        ans = mkReals(vec.data.map((x: (string | null)) => {
            if (x === null) return null;
            const temp = Number(x);
            if (isNaN(temp)) {
                warn('NAs introduced by coercion');
                return null;
            }
            else return temp;
        }));
        break;
    }

    return ans;
}

export function asReal(x: R.RValue) : number|null {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
        let val = x.data[0];
        return val === null ? null : Number(val);
    case 'character':
        const valchar = x.data[0];
        if (valchar !== 'NA' && valchar !== '') {
            val = Number(valchar);
            if (!Number.isNaN(val) || valchar === 'NaN') {
                return val;
            }
            warn('NAs introduced by coercion');
        }
        return null;
    default:
        return null;
    }
}

export function asLogical(s: R.RValue) : boolean|null {
    let result : boolean|null = null;
    switch (s.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
        if (s.data.length > 0) {
            result = s.tag === 'character' ?
                logicalFromString(s.data[0]) : // strings are checked against truenames/falsenames in util.ts
                (s.data[0] === null? null : !!s.data[0]);
        } 
    }
    return result;
}