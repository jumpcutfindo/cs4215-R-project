/*
*   This module handles the type checking and coercion of JORDAN.
*/
import {checkArity, getNames, head, stringFalse, stringTrue} from './util';
import * as R from './types';
import {inherits} from './generics';
import {error, warn} from './error';
import {getAttribute} from './attrib';
import {mkChar, mkChars, mkInt, mkInts, mkListPlus, mkLogical, mkLogicals,
    mkPairlist, mkReal, mkReals, RNull} from './values';
import {copy} from './copy';

// Type checking functions implemented
export const IS_OPTYPES = {
    NULL: 0,
    LOGICAL: 1,
    INTEGER: 2,
    NUMERIC: 3,
    CHARACTER: 4,
    SYMBOL: 5,
    NAME: 6,
    ENVIRONMENT: 7,
    LIST: 8,
    PAIRLIST: 9,
    EXPRESSION: 10,
};

// Coercion functions implemented
export const AS_OPTYPES = {
    LOGICAL: 0,
    INTEGER: 1,
    NUMERIC: 2,
    CHARACTER: 3,
    LIST: 4,
    PAIRLIST: 5,
};

/*
*   do_is handles the type checking functionalities of JORDAN.
*   Depending on the op.variant provided, it checks the object to the type requested.
*   Result is a logical vector that is either TRUE or FALSE. For unsupported objects,
*   it returns FALSE.
*/
export const do_is: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (op.variant) {
    case IS_OPTYPES.NULL:
        return mkLogical(isObjectOfType(object, RNull.tag));
    case IS_OPTYPES.LOGICAL:
        return mkLogical(isObjectOfType(object, 'logical'));
    case IS_OPTYPES.INTEGER:
        return mkLogical(isObjectOfType(object, 'integer'));
    case IS_OPTYPES.NUMERIC:
        return mkLogical(isObjectOfType(object, 'numeric'));
    case IS_OPTYPES.CHARACTER:
        return mkLogical(isObjectOfType(object, 'character'));
    case IS_OPTYPES.SYMBOL:
        return mkLogical(isObjectOfType(object, 'symbol'));
    case IS_OPTYPES.NAME:
        return mkLogical(isObjectOfType(object, 'name'));
    case IS_OPTYPES.ENVIRONMENT:
        return mkLogical(isObjectOfType(object, 'environment'));
    case IS_OPTYPES.LIST:
        return mkLogical(isObjectOfType(object, 'list'));
    case IS_OPTYPES.PAIRLIST:
        return mkLogical(isObjectOfType(object, 'pairlist'));
    case IS_OPTYPES.EXPRESSION:
        return mkLogical(isObjectOfType(object, 'expression'));
    default:
        return mkLogical(false);
    }
};

/*
*   do_isnumeric checks whether an object is a numerical type ('integer' or 'numeric').
*/
export const do_isnumeric: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    return mkLogical(isObjectOfType(object, 'integer') || isObjectOfType(object, 'numeric'));
};

/*
*   do_isna checks whether each of the values in the given vector / list / pairlist is an NA value.
*   Returns a logical vector of the same length, which indicates if a value is NA (TRUE) or not (FALSE).
*   For unsupported objects, it returns FALSE.
*/
export const do_isna: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (object.tag) {
    case 'NULL':
        return mkLogicals([]);
    case 'logical':
        return mkLogicals(object.data.map((x) => {
            return x === null ? true : false;
        }));
    case 'integer':
        return mkLogicals(object.data.map((x) => {
            return x === null ? true : false;
        }));
    case 'numeric':
        return mkLogicals(object.data.map((x) => {
            return x === null ? true : false;
        }));
    case 'character':
        return mkLogicals(object.data.map((x) => {
            return x === null ? true : false;
        }));
    case 'list':
        return mkLogicals(object.data.map((x) => {
            return x === null ? true : false;
        }));
    case 'pairlist':
        const result = [];
        let curr: R.PairList | R.Nil = object;
        while (curr.tag !== RNull.tag) {
            result.push(curr.value === null);
            curr = curr.next;
        }

        return mkLogicals(result);
    default:
        warn(`is.na() applied to non-(list or vector) of type ${object.tag}`);
        return mkLogical(false);
    }
};

/*
*   do_isnan checks each of the values of a vector for whether it is not a number.
*   For unsupported objects, it gives an error.
*/
export const do_isnan: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (object.tag) {
    case 'NULL':
        return mkLogicals([]);
    case 'logical':
        return mkLogicals(object.data.map((x) => {
            return isNaN(Number(x));
        }));
    case 'integer':
        return mkLogicals(object.data.map((x) => {
            return isNaN(Number(x));
        }));
    case 'numeric':
        return mkLogicals(object.data.map((x) => {
            return isNaN(Number(x));
        }));
    case 'character':
        return mkLogicals(object.data.map((x) => {
            return isNaN(Number(x));
        }));
    default:
        error(`default method not implemeneted for type ${object.tag}`);
    }
};

/*
*   do_isfinite checks each of the values of a vector for whether it is finite.
*   For unsupported objects, it gives an error.
*/
export const do_isfinite: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (object.tag) {
    case 'NULL':
        return mkLogicals([]);
    case 'logical':
        return mkLogicals(object.data.map((x) => {
            return isFinite(Number(x));
        }));
    case 'integer':
        return mkLogicals(object.data.map((x) => {
            return isFinite(Number(x));
        }));
    case 'numeric':
        return mkLogicals(object.data.map((x) => {
            return isFinite(Number(x));
        }));
    case 'character':
        return mkLogicals(object.data.map((x) => {
            return false;
        }));
    default:
        error(`default method not implemeneted for type ${object.tag}`);
    }
};

/*
*   do_isinfinite checks each of the values of a vector for whether it is infinite.
*   For unsupported objects, it gives an error.
*/
export const do_isinfinite: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (object.tag) {
    case 'NULL':
        return mkLogicals([]);
    case 'logical':
        return mkLogicals(object.data.map((x) => {
            return !isFinite(Number(x));
        }));
    case 'integer':
        return mkLogicals(object.data.map((x) => {
            return !isFinite(Number(x));
        }));
    case 'numeric':
        return mkLogicals(object.data.map((x) => {
            return !isFinite(Number(x));
        }));
    case 'character':
        return mkLogicals(object.data.map((x) => {
            return false;
        }));
    default:
        error(`default method not implemeneted for type ${object.tag}`);
    }
};

/*
*   do_asatomic handles the coercion in JORDAN.
*   Depending on the op.variant provided, the function dispatches the coercion to the
*   corresponding type requested.
*   If the requested type does not exist, an error is thrown.
*/
export const do_asatomic: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (op.variant) {
    case AS_OPTYPES.LOGICAL:
        return asLogicalVector(object);
    case AS_OPTYPES.INTEGER:
        return asIntVector(object);
    case AS_OPTYPES.NUMERIC:
        return asRealVector(object);
    case AS_OPTYPES.CHARACTER:
        return asCharVector(object);
    case AS_OPTYPES.LIST:
        return asListObject(object);
    case AS_OPTYPES.PAIRLIST:
        return asPairlistObject(object);
    default:
        error(`default method not implemeneted for type ${object.tag}`);
    }
};

/*
*   Checks whether a given object is a vector (logical, integer, numeric or character).
*   Note: this differs from R, as it only handles the basic types we have implemented.
*/
export const do_isvector: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    switch (object.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
        if (object.attributes.tag !== RNull.tag && object.attributes.key !== 'names') {
            return mkLogical(false);
        } else {
            return mkLogical(true);
        }
    default:
        return mkLogical(false);
    }
};

/*
*   Determines if a string is true or false, based on the value.
*   TRUE = c('T', 'True', 'TRUE', 'true'),
*   FALSE = c('F', 'False', 'FALSE', 'false')
*/
export function logicalFromString(x: string|null) : boolean|null {
    if (x !== null) {
        if (stringTrue(x)) return true;
        if (stringFalse(x)) return false;
    }
    return null;
}

/*
*   Coerces a given object into a character factor.
*/
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

/*
*   Coerces a given object into the type provided.
*   As a default case, if the object coercion is not supported, we give a warning and
*   return the original vector.
*/
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
    case 'list':
        return asListObject(vec);
    case 'pairlist':
        return asPairlistObject(vec);
    default:
        // Default case just don't do anything
        warn(`Unable to coerce vector to type '${type}'`);
        return vec;
    }
}

/*
*   Coercion of values to a logical vector. Note that objects other than vectors cannot be
*   coerced to a logical vector.
*/
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
        const temp_data = vec.data.map((x) => {
            if (x === null) return null;
            else return logicalFromString(x);
        });
        ans = mkLogicals(temp_data);
        break;
    }

    return ans;
}

/*
*   Coercion of values to an integer vector. Note that objects other than vectors cannot be
*   coerced to a logical vector.
*
*   We floor the number values in order to preserve the integer property.
*/
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
        ans = mkInts(vec.data.map((x)=> x === null ? null : Number(x) === NaN ? null : Math.floor(Number(x))));
    }

    return ans;
}

/*
*   Coercion of values to a character vector.
*
*   For lists and pairlists, what R usually does is it takes the unevaluated expression and uses it
*   as the string value. Here, we simply convert the information held under the 'data' field of the
*   objects into strings.
*/
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
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    case 'pairlist':
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
}
/*
*   Coercion of values to a numeric vector. Note that objects other than vectors cannot be
*   coerced to a numeric vector.
*/
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
            } else return temp;
        }));
        break;
    }

    return ans;
}
/*
*   Coercion of objects to a list object.
*
*   Vectors are broken up into individual vectors and each is a value in the list.
*   If names exist on the object, we copy the names over as well.
*   All other attributes will be dropped.
*/
export function asListObject(vec: R.RValue): R.List | R.Nil {
    let ans: R.List | R.Nil = RNull;
    switch (vec.tag) {
    case 'logical':
        const log_names = getNames(vec);
        const log_data = [];

        for (const logical of vec.data) log_data.push(mkLogical(logical));

        if (log_names.tag === RNull.tag) ans = mkListPlus(RNull, log_data);
        else ans = mkListPlus(mkPairlist([log_names, 'names']), log_data);

        break;
    case 'integer':
        const int_names = getNames(vec);
        const int_data = [];

        for (const integer of vec.data) int_data.push(mkInt(integer));

        if (int_names.tag === RNull.tag) ans = mkListPlus(RNull, int_data);
        else ans = mkListPlus(mkPairlist([int_names, 'names']), int_data);

        break;
    case 'numeric':
        const num_names = getNames(vec);
        const num_data = [];

        for (const num of vec.data) num_data.push(mkReal(num));

        if (num_names.tag === RNull.tag) ans = mkListPlus(RNull, num_data);
        else ans = mkListPlus(mkPairlist([num_names, 'names']), num_data);
        break;
    case 'character':
        const char_names = getNames(vec);
        const char_data = [];

        for (const char of vec.data) char_data.push(mkChar(char));

        if (char_names.tag === RNull.tag) ans = mkListPlus(RNull, char_data);
        else ans = mkListPlus(mkPairlist([char_names, 'names']), char_data);
        break;
    case 'list':
        ans = copy(vec) as R.List;
        const list_names = getNames(vec);
        ans.attributes = mkPairlist([list_names, 'names']);
        break;
    case 'pairlist':
        const pl_names = getNames(vec);
        const pl_data = [];

        let curr: R.PairList | R.Nil = vec;
        while (curr.tag !== RNull.tag) {
            pl_data.push(curr.value);
            curr = curr.next;
        }

        if (pl_names.tag === RNull.tag) ans = mkListPlus(RNull, pl_data);
        else ans = mkListPlus(mkPairlist([pl_names, 'names']), pl_data);
    }

    return ans;
}

/*
*   Coercion of objects to a pairlist object.
*
*   Vectors are broken up into individual vectors and each is a key-value pair in the pairlist.
*   If names exist on the object, we copy the names over as well.
*   All other attributes will be dropped.
*/
export function asPairlistObject(vec: R.RValue): R.PairList | R.Nil {
    let ans: R.PairList | R.Nil = RNull;

    switch (vec.tag) {
    case 'logical':
        const log_names = getNames(vec);
        const log_data = vec.data.map((x) => mkLogical(x));

        if (log_names.tag === RNull.tag) {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (const logical of log_data) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = '';
                curr.value = logical;
            }

            ans = start.next;
        } else {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (let i = 0; i < log_data.length; i ++) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = log_names.data[i] ?? '';
                curr.value = log_data[i];
            }

            ans = start.next;
        }

        break;
    case 'integer':
        const int_names = getNames(vec);
        const int_data = vec.data.map((x) => mkInt(x));

        if (int_names.tag === RNull.tag) {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (const int of int_data) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = '';
                curr.value = int;
            }

            ans = start.next;
        } else {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (let i = 0; i < int_data.length; i ++) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = int_names.data[i] ?? '';
                curr.value = int_data[i];
            }

            ans = start.next;
        }

        break;
    case 'numeric':
        const num_names = getNames(vec);
        const num_data = vec.data.map((x) => mkReal(x));

        if (num_names.tag === RNull.tag) {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (const num of num_data) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = '';
                curr.value = num;
            }

            ans = start.next;
        } else {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (let i = 0; i < num_data.length; i ++) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = num_names.data[i] ?? '';
                curr.value = num_data[i];
            }

            ans = start.next;
        }

        break;
    case 'character':
        const char_names = getNames(vec);
        const char_data = vec.data.map((x) => mkChar(x));

        if (char_names.tag === RNull.tag) {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (const char of char_data) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = '';
                curr.value = char;
            }

            ans = start.next;
        } else {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (let i = 0; i < char_data.length; i ++) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = char_names.data[i] ?? '';
                curr.value = char_data[i];
            }

            ans = start.next;
        }

        break;
    case 'list':
        const list_names = getNames(vec);
        const list_data = vec.data;

        if (list_names.tag === RNull.tag) {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (const item of list_data) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.value = item;
            }

            ans = start.next;
        } else {
            let curr = mkPairlist([RNull]) as R.PairList;
            const start = curr;
            for (let i = 0; i < list_data.length; i ++) {
                curr.next = mkPairlist([RNull]) as R.PairList;
                curr = curr.next;
                curr.key = list_names.data[i] ?? '';
                curr.value = list_data[i];
            }

            ans = start.next;
        }

        break;
    case 'pairlist':
        ans = copy(vec) as R.PairList;
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

export function isVector(vec: R.RValue): boolean {
    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
        return true;
    default:
        return false;
    }
}

function isObjectOfType(object: R.RValue, type: string): boolean {
    return object.tag === type;
}
