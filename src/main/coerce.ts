import {stringFalse, stringTrue} from './util';
import * as R from './types';
import { inherits } from './generics';
import { error, warn } from './error';
import { getAttribute } from './attrib';
import { mkChars } from './values';

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
    const chardata = x.data.map(num => num === null ? null : levels.data[num]);
    return mkChars(chardata);
}

export function asReal(x: R.RValue) : number|null {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
        let val = x.data[0];
        return val === null ? null : Number(val);
    case 'character':
        let valchar = x.data[0];
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