/* eslint-disable valid-jsdoc */
import {coerceTo} from './coerce';
import {copy} from './copy';
import {error} from './error';
import * as R from './types';
import {getAtLinkedListIndex, getNames, head, length, tail} from './util';
import {mkChar, mkChars, mkInt, mkInts,
    mkLogical, mkLogicals, mkPairlist,
    mkReal, mkReals, RNull} from './values';

/**
 * Implementation for '[' subsetting
 */
export const do_subset: R.PrimOp = (call, op, args, env) => {
    const object = copy(head(args));
    let params = head(tail(args));

    if (params.tag === 'logical') {
        // Logical indexing has special rules
        return extractMultipleByLogicals(object, params.data);
    } else {
        params = coerceTo(params, 'integer');
        if (params.tag !== 'integer') {
            error('NA / NaN argument');
        }
        return extractMultipleAtIndexes(object, params.data);
    }
};

/**
 * Implementation for '[[' subsetting
 */

export const do_subset2: R.PrimOp = (call, op, args, env) => {
    // Extract a single value at a specific index (note that R indexing begins from 1),
    // or a single value with a specific name
    const object = copy(head(args));
    let params = head(tail(args));
    const exact = tail(tail(args)).tag === RNull.tag ? RNull : head(tail(tail(args)));

    if (length(params) !== 1) {
        error('attempt to select more than one element in vectorIndex');
    }

    if (params.tag === 'character') {
        const exactValue = exact.tag !== 'logical' ? false : exact.data[0] ? true : false;
        return extractSingleByName(object, params.data[0], exactValue);
    } else {
        params = coerceTo(params, 'integer');
        if (params.tag !== 'integer') {
            error('NA / NaN argument');
        }

        return extractSingleAtIndex(object, params.data[0]);
    }
};

/**
 * Implementation for '$' subsetting
 */
export const do_subset3: R.PrimOp = (call, op, args, env) => {
    // Extract a single value with a specific name (partial matching always)
    const object = copy(head(args));
    let params = head(tail(args));

    if (!isSubsettableList(object)) {
        error('$ operator is invalid for atomic vectors');
    }

    if (length(params) !== 1) {
        error('attempt to select more than one element in vectorIndex');
    }

    if (params.tag !== 'character') {
        error(`unexpected ${params.tag} in arguments`);
    } else {
        return extractSingleByName(object, params.data[0], false);
    }
};

// Implementation for assignment via '['
export const do_subassign: R.PrimOp = (call, op, args, env) => {
    return RNull;
};

// Implementation for assignment via '[['
export const do_subassign2: R.PrimOp = (call, op, args, env) => {
    return RNull;
};

// Implementation for assignment via '$'
export const do_subassign3: R.PrimOp = (call, op, args, env) => {
    return RNull;
};

function extractSingleAtIndex(vec: R.RValue, index: number | null): R.RValue {
    if (index === null || (index - 1) >= length(vec)) error('subscript out of bounds');
    const actual_index = index - 1;

    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }
    if (isIndexOutOfBounds(vec, actual_index)) {
        error('subscript out of bounds');
    }

    let ans;

    switch (vec.tag) {
    case 'logical':
        ans = mkLogical(vec.data[actual_index]);
        break;
    case 'integer':
        ans = mkInt(vec.data[actual_index]);
        break;
    case 'numeric':
        ans = mkReal(vec.data[actual_index]);
        break;
    case 'character':
        ans = mkChar(vec.data[actual_index]);
        break;
    case 'expression':
        ans = copy(vec.data[actual_index]);
        break;
    case 'list':
        ans = copy(vec.data[actual_index]);
        break;
    case 'pairlist':
        const temp = getAtLinkedListIndex(vec, actual_index);
        if (temp === RNull) ans = RNull;
        else {
            ans = (temp as R.PairList).value;
        }
        break;
    default:
        ans = RNull;
        break;
    }

    return ans;
}

function extractSingleByName(vec: R.RValue, name: string | null, exact: boolean = true): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    if (name === null) error('subscript out of bounds');

    let ans;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
        let names: R.PairList | R.Nil = vec.attributes;
        while (names.tag !== RNull.tag) {
            if (names.key === 'names') break;
            names = names.next;
        }

        if (names.tag === RNull.tag) {
            error('subscript out of bounds');
        }

        const nameValues = names.value as R.Character;

        if (!exact) {
            const matches = nameValues.data.filter((n) => n?.includes(name));
            if (matches.length !== 1) {
                error('subscript out of bounds');
            } else {
                ans = extractSingleAtIndex(vec, nameValues.data.indexOf(matches[0]) + 1);
            }
        } else {
            if (nameValues.data.indexOf(name) !== -1) {
                ans = extractSingleAtIndex(vec, nameValues.data.indexOf(name) + 1);
            } else {
                error('subscript out of bounds');
            }
        }
        break;
    case 'pairlist':
        let curr: R.PairList | R.Nil = vec;

        if (!exact) {
            const matches = [];
            while (curr.tag !== RNull.tag) {
                if (curr.key.includes(name)) {
                    matches.push(curr);
                }
                curr = curr.next;
            }

            if (matches.length === 0) return RNull;

            if (matches.length !== 1) {
                error('subscript out of bounds');
            } else {
                ans = copy(matches[0].value);
            }
        } else {
            while (curr.tag !== RNull.tag) {
                if (curr.key === name) {
                    break;
                }
                curr = curr.next;
            }

            if (curr === RNull) return RNull;
            else {
                ans = copy((curr as R.PairList).value);
            }
        }

        break;
    default:
        ans = RNull;
        break;
    }

    return ans;
}

function extractMultipleAtIndexes(vec: R.RValue, indexes: (number | null)[]): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    // Check for negative subscripts
    let hasNegative = false;
    let allNegative = true;
    for (const i of indexes) {
        if (i === null) continue;
        if (i < 0) hasNegative = true;
        if (i >= 1) allNegative = false;
    }

    if (hasNegative && !allNegative) error('only 0\'s may be mixed with negative subscripts');


    let actual_indexes;
    if (allNegative) {
        const unincluded_values = indexes.map((x)=> x === null ? null : -x);
        const possible_indexes = [];
        for (let i = 1; i <= length(vec); i ++) possible_indexes.push(i);
        actual_indexes = possible_indexes.filter((x) => !unincluded_values.includes(x))
            .map((x) => x === null ? null : x - 1);
    } else {
        actual_indexes = indexes.map((x) => x === null ? null : x - 1)
            .filter((x) => x === null || (x !== null && !(x < 0)));
    }

    let ans;

    switch (vec.tag) {
    case 'logical':
        ans = mkLogicals(actual_indexes.map((index) => {
            return index !== null && index < length(vec) ? vec.data[index] : null;
        }));
        break;
    case 'integer':
        ans = mkInts(actual_indexes.map((index) => {
            return index !== null && index < length(vec) ? vec.data[index] : null;
        }));
        break;
    case 'numeric':
        ans = mkReals(actual_indexes.map((index) => {
            return index !== null && index < length(vec) ? vec.data[index] : null;
        }));
        break;
    case 'character':
        ans = mkChars(actual_indexes.map((index) => {
            return index !== null && index < length(vec) ? vec.data[index] : null;
        }));
        break;
    case 'expression':
        ans = {
            attributes: RNull,
            refcount: 0,
            tag: 'expression',
            data: actual_indexes.map((index) => {
                return index !== null && index < length(vec) ? copy(vec.data[index]) : RNull;
            }),
        } as R.Expression;
        break;
    case 'list':
        const temp = actual_indexes.map((index) => {
            return index !== null && index < length(vec) ? copy(vec.data[index]) : RNull;
        });

        ans = {
            attributes: RNull,
            refcount: 0,
            tag: 'list',
            data: temp,
        } as R.List;
        break;
    case 'pairlist':
        let curr: R.PairList | R.Nil = vec;

        const names = [];
        const values: R.RValue[] = [];

        for (const index of actual_indexes) {
            curr = vec;
            let currIndex = 0;
            while (curr.tag !== RNull.tag) {
                if (index === currIndex) {
                    names.push(curr.key);
                    values.push(curr.value);
                    break;
                }
                curr = curr.next;
                currIndex ++;
            }

            if (curr === RNull) {
                names.push(null);
                values.push(RNull);
            }
        }

        ans = {
            attributes: mkPairlist([mkChars(names), 'names']),
            refcount: 0,
            tag: 'list',
            data: values,
        } as R.List;
        break;
    default:
        ans = RNull;
        break;
    }

    if (ans && ans.tag !== RNull.tag && vec.tag !== 'pairlist' && isNamedVector(vec)) {
        const names: R.Character | R.Nil = getNames(vec);

        if (names.tag !== RNull.tag) {
            const newNames: (string | null)[] = actual_indexes.map(
                (index) => index !== null && index < length(names) ? names.data[index] : null,
            );
            ans.attributes = mkPairlist([mkChars(newNames), 'names']);
        }
    }

    return ans;
}

function extractMultipleByNames(x: R.RValue, names: string[]) {
    if (!isSubsettable(x)) {
        error('not a subsettable type');
        return;
    }

    let ans;

    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
        const indexes = getIndexesOfNames(x, names);
        ans = extractMultipleAtIndexes(x, indexes);
        break;
    default:
        ans = RNull;
        break;
    }

    return ans;
}

function extractMultipleByLogicals(x: R.RValue, logicals: (boolean | null)[]) {
    if (!isSubsettable(x)) {
        error('not a subsettable type');
    }

    const len = length(x);
    const recycledLogicals = recycleLogicals(logicals, len);

    const indexes: (number | null)[] = [];

    for (let index = 0; index < recycledLogicals.length; index ++) {
        if (recycledLogicals[index] === true) indexes.push(index + 1);
        if (recycledLogicals[index] === null) indexes.push(null);
    }

    const ans = extractMultipleAtIndexes(x, indexes);

    return ans;
}

function isSubsettable(x: R.RValue) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
    case 'NULL':
        return true;
    default:
        return false;
    }
}

function isIndexOutOfBounds(x: R.RValue, index: number) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
        return index >= length(x);
    case 'pairlist':
        return index >= length(x as R.PairList);
    case 'NULL':
        return false;
    default:
        return;
    }
}

function isSubsettableList(x: R.RValue) {
    switch (x.tag) {
    case 'list':
    case 'pairlist':
    case 'NULL':
        return true;
    default:
        return false;
    }
}

function isNamedVector(x: R.RValue) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
        let curr = x.attributes;
        while (curr.tag !== RNull.tag) {
            if (curr.key === 'names') {
                return true;
            }
            curr = curr.next;
        }
        return false;
    default:
        return false;
    }
}

function getIndexesOfNames(
    x: R.Logical | R.Int | R.Real | R.Character | R.Expression | R.List | R.PairList,
    names: string[],
) {
    let namesOfVector: (string | null)[] = [];
    let ans: (number | null)[] = [];

    if (x.tag === 'pairlist') {
        let curr: R.PairList | R.Nil = x;
        const keys: string[] = [];
        while (curr.tag !== RNull.tag) {
            keys.push(curr.key);
            curr = curr.next;
        }

        namesOfVector = keys;
    } else {
        let curr: R.PairList | R.Nil = x.attributes;
        while (curr.tag !== RNull.tag) {
            if (curr.key === 'names') {
                namesOfVector = (curr.value as R.Character).data;
                break;
            }
            curr = curr.next;
        }
    }

    ans = names.map((name) => {
        const index = namesOfVector.indexOf(name) + 1; // Note: return as 1-indexed
        if (index === -1) return null;
        else return index;
    });

    return ans;
}

function recycleLogicals(bools: (boolean | null)[], expectedLength: number) {
    const ans: (boolean | null)[] = [];

    const factor = bools.length;

    for (let i = 0; i < expectedLength; i ++) {
        ans.push(bools[Math.floor(i % factor)]);
    }

    return ans;
}
