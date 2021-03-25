/* eslint-disable valid-jsdoc */
import {getAttribute, setAttribute} from './attrib';
import {coerceTo} from './coerce';
import {copy} from './copy';
import {error, warn} from './error';
import * as R from './types';
import {getAtLinkedListIndex, getNames, head, length, tail} from './util';
import {mkChar, mkChars, mkInt, mkInts,
    mkLogical, mkLogicals, mkPairlist,
    mkReal, mkReals, RNull} from './values';

// TODO: Check correctness of pairlists

// Implementation for '[' subsetting
export const do_subset: R.PrimOp = (call, op, args, env) => {
    const object = copy(head(args));
    let params = head(tail(args));

    if (params.tag === 'logical') {
        // Logical indexing has special rules
        return extractMultipleByLogicals(object, params.data);
    } else if (params.tag === 'character') {
        return extractMultipleByNames(object, params.data);
    } else {
        params = coerceTo(params, 'integer');
        if (params.tag !== 'integer') {
            error('NA / NaN argument');
        }
        return extractMultipleAtIndexes(object, params.data);
    }
};

// Implementation for '[[' subsetting
export const do_subset2: R.PrimOp = (call, op, args, env) => {
    // Extract a single value at a specific index (note that R indexing begins from 1),
    // or a single value with a specific name
    const object = copy(head(args));
    let params = head(tail(args));
    const exact = tail(tail(args)).tag === RNull.tag ? RNull : head(tail(tail(args)));

    if (length(params) !== 1) {
        error('attempt to select more than one element');
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

// Implementation for '$' subsetting
export const do_subset3: R.PrimOp = (call, op, args, env) => {
    // Extract a single value with a specific name (partial matching always)
    const object = copy(head(args));
    const params = head(tail(args));

    if (!isSubsettableList(object)) {
        error('$ operator is invalid for atomic vectors');
    }

    if (length(params) !== 1) {
        error('attempt to select more than one element');
    }

    if (params.tag !== 'character') {
        error(`unexpected ${params.tag} in arguments`);
    } else {
        return extractSingleByName(object, params.data[0], false);
    }
};

// Implementation for assignment via '['
export const do_subassign: R.PrimOp = (call, op, args, env) => {
    const object = copy(head(args));
    let params = head(tail(args));
    const replacements = head(tail(tail(args)));

    if (hasNAs(object)) error('NAs are not allowed in subscripted assignments');

    if (params.tag === 'logical') {
        return assignMultipleByLogicals(object, params.data as boolean[], replacements);
    } else if (params.tag === 'character') {
        return assignMultipleByNames(object, params.data as string[], replacements);
    } else {
        params = coerceTo(params, 'integer');
        if (params.tag !== 'integer') {
            error('NA / NaN argument');
        }

        return assignMultipleAtIndexes(object, params.data as number[], replacements);
    }
};

// Implementation for assignment via '[['
export const do_subassign2: R.PrimOp = (call, op, args, env) => {
    const object = copy(head(args));
    let params = head(tail(args));
    const replacement = head(tail(tail(args)));

    if (length(params) !== 1) {
        error('attempt to select more than one element');
    }

    if (hasNAs(object)) error('NAs are not allowed in subscripted assignments');

    if (params.tag === 'character') {
        return assignSingleByName(object, (params.data as string[])[0], replacement);
    } else {
        params = coerceTo(params, 'integer');
        if (params.tag !== 'integer') {
            error('NA / NaN argument');
        }

        return assignSingleAtIndex(object, (params.data as number[])[0], replacement);
    }
};

// Implementation for assignment via '$'
export const do_subassign3: R.PrimOp = (call, op, args, env) => {
    const object = copy(head(args));
    const params = head(tail(args));
    const replacement = head(tail(tail(args)));

    if (hasNAs(object)) error('NAs are not allowed in subscripted assignments');

    if (!isSubsettableList(object)) {
        warn('coercing LHS to a list');
    }

    if (params.tag !== 'character') {
        error(`unexpected ${params.tag} in arguments`);
    } else {
        return assignSingleByName(object, (params.data as string[])[0], replacement);
    }
};

/** ********************************************************
 *
 *               EXTRACTION FUNCTIONS
 *
 **********************************************************/
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

    ans = copyAttributesAfterExtraction(vec, ans, [index]);

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

    ans = copyAttributesAfterExtraction(vec, ans, actual_indexes);
    return ans;
}

function extractMultipleByNames(vec: R.RValue, names: (string | null)[]) {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    let ans;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
        const indexes = getIndexesOfNames(vec, names);
        ans = extractMultipleAtIndexes(vec, indexes);
        break;
    default:
        ans = RNull;
        break;
    }

    return ans;
}

function extractMultipleByLogicals(vec: R.RValue, logicals: (boolean | null)[]) {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    const len = length(vec);
    const recycledLogicals = recycleLogicals(logicals, len);

    const indexes: (number | null)[] = [];

    for (let index = 0; index < recycledLogicals.length; index ++) {
        if (recycledLogicals[index] === true) indexes.push(index + 1);
        if (recycledLogicals[index] === null) indexes.push(null);
    }

    const ans = extractMultipleAtIndexes(vec, indexes);

    return ans;
}

/** ********************************************************
 *
 *                  ASSIGNMENT FUNCTIONS
 *
 **********************************************************/
function assignSingleAtIndex(vec: R.RValue, index: number, value: R.RValue): R.RValue {
    if (index === null || index <= 0) {
        error('attempt to select less than one element');
    }

    if (length(value) > length(vec)) {
        error('more elements supplied than there are to replace');
    }

    const actual_index = index - 1;

    let expected_type;
    if (vec.tag !== value.tag) {
        expected_type = getExpectedType(vec, value);
    } else {
        expected_type = vec.tag;
    }

    let new_vec = coerceTo(vec, expected_type);
    const new_value = coerceTo(value, expected_type);

    switch (new_vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
        // Consider two cases: when index is within vector / list,
        // and when index is outside of vector / list
        if (actual_index < length(new_vec)) {
            new_vec.data[actual_index] = (new_value as R.Logical).data[0];
        } else {
            for (let i = length(new_vec); i < actual_index; i ++) new_vec.data.push(null);
            (new_vec.data as (boolean | null)[]).push((new_value as R.Logical).data[0]);

            // Handle names
            const names = getNames(vec);
            if (names.tag !== RNull.tag) for (let i = length(new_vec); i < actual_index; i ++) names.data.push('');
            new_vec = setAttribute(new_vec, 'names', names);
        }

        break;
    case 'expression':
    case 'list':
        if (actual_index < length(new_vec)) {
            new_vec.data[actual_index] = (new_value as R.List).data[0];
        } else {
            for (let i = length(new_vec); i < actual_index; i ++) new_vec.data.push(RNull);
            (new_vec.data as (R.RValue | null)[]).push((new_value as R.List).data[0]);

            // Handle names
            const names = getNames(vec);
            if (names.tag !== RNull.tag) for (let i = length(new_vec); i < actual_index; i ++) names.data.push('');
            new_vec = setAttribute(new_vec, 'names', names);
        }
        break;
    case 'pairlist':
        // new_value has been coerced to a pairlist
        if (actual_index < length(new_vec)) {
            let curr: R.PairList | R.Nil = new_vec;
            let pl_index = 0;
            while (curr.tag !== RNull.tag) {
                if (pl_index === actual_index) {
                    curr.value = (new_value as R.PairList).value;
                    break;
                }
                curr = curr.next;
                pl_index ++;
            }
        } else {
            let curr: R.PairList | R.Nil = new_vec;
            let pl_index = 0;
            while (curr.next.tag !== RNull.tag) {
                curr = curr.next;
                pl_index ++;
            }

            while (pl_index < actual_index) {
                (curr as R.PairList).next = mkPairlist([RNull, '']);
                curr = (curr as R.PairList).next;
            }

            (curr as R.PairList).next = (new_value as R.PairList);
        }
        break;
    }

    new_vec = copyAttributesAfterAssignment(vec, new_vec);

    return new_vec;
}

function assignSingleByName(vec: R.RValue, name: string, value: R.RValue): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    let expected_type;
    if (vec.tag !== value.tag) {
        expected_type = getExpectedType(vec, value);
    } else {
        expected_type = vec.tag;
    }

    const new_vec = coerceTo(vec, expected_type);
    const new_value = coerceTo(value, expected_type);
    const name_index = getIndexesOfNames((vec as R.Logical), [name])[0];

    if (name_index === null) {
        // Append to the end of the object
        return assignSingleAtIndex(new_vec, length(new_vec) + 1, new_value);
    } else {
        return assignSingleAtIndex(new_vec, name_index, new_value);
    }
}

function assignMultipleAtIndexes(vec: R.RValue, indexes: number[], values: R.RValue): R.RValue {
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

    // Determine the actual indices
    let actual_indexes: number[];
    if (allNegative) {
        const unincluded_values = indexes.map((x)=> x === null ? null : -x);
        const possible_indexes = [];
        for (let i = 1; i <= length(vec); i ++) possible_indexes.push(i);
        actual_indexes = possible_indexes.filter((x) => !unincluded_values.includes(x))
            .map((x) => x);
    } else {
        actual_indexes = indexes.map((x) => x)
            .filter((x) => (x !== null && !(x < 0)));
    }

    // Coercion of values
    let expected_type;
    if (vec.tag !== values.tag) {
        expected_type = getExpectedType(vec, values);
    } else {
        expected_type = vec.tag;
    }

    let new_vec = coerceTo(vec, expected_type);
    const new_value = coerceTo(values, expected_type);

    if (actual_indexes.length !== length(new_value)) {
        warn('number of items to replace is not a multiple of replacement length');
    }

    switch (new_vec.tag) {
    case 'logical':
        for (let i = 0; i < actual_indexes.length; i ++ ) {
            const index = actual_indexes[i];
            new_vec = assignSingleAtIndex(new_vec, index, mkLogical((new_value as R.Logical).data[i]));
        }
        break;
    case 'integer':
        for (let i = 0; i < actual_indexes.length; i ++ ) {
            const index = actual_indexes[i];
            new_vec = assignSingleAtIndex(new_vec, index, mkInt((new_value as R.Int).data[i]));
        }
        break;
    case 'numeric':
        for (let i = 0; i < actual_indexes.length; i ++ ) {
            const index = actual_indexes[i];
            new_vec = assignSingleAtIndex(new_vec, index, mkReal((new_value as R.Real).data[i]));
        }
        break;
    case 'character':
        for (let i = 0; i < actual_indexes.length; i ++ ) {
            const index = actual_indexes[i];
            new_vec = assignSingleAtIndex(new_vec, index, mkChar((new_value as R.Character).data[i]));
        }
        break;
    case 'expression':
    case 'list':
        for (let i = 0; i < actual_indexes.length; i ++ ) {
            const index = actual_indexes[i];
            new_vec = assignSingleAtIndex(new_vec, index, (new_value as R.List).data[i]);
        }
        break;
    case 'pairlist':
        let curr: R.PairList | R.Nil = new_value as R.PairList;
        let pl_index = 1;
        while (curr.tag !== RNull.tag) {
            const temp: R.PairList = copy(curr) as R.PairList;
            temp.next = RNull;
            new_vec = assignSingleAtIndex(new_vec, pl_index, curr);
            curr = curr.next;
            pl_index ++;
        }
    }

    new_vec = copyAttributesAfterAssignment(vec, new_vec);

    return new_vec;
}

function assignMultipleByNames(vec: R.RValue, names: string[], values: R.RValue): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    let ans: R.RValue = RNull;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
        let end = length(vec) + 1;
        const indexes = getIndexesOfNames(vec, names);

        for (let i = 0; i < indexes.length; i ++) {
            if (indexes[i] === null) {
                indexes[i] = end;
                end ++;
            }
        }

        ans = assignMultipleAtIndexes(vec, indexes as number[], values);
        break;
    }

    return ans;
}

function assignMultipleByLogicals(vec: R.RValue, logicals: boolean[], values: R.RValue): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    const len = length(vec);
    const recycledLogicals = recycleLogicals(logicals, len);

    const indexes: number[] = [];

    for (let index = 0; index < recycledLogicals.length; index ++) {
        if (recycledLogicals[index] === true) indexes.push(index + 1);
    }

    return assignMultipleAtIndexes(vec, indexes, values);
}

/** ********************************************************
 *
 *                   HELPER FUNCTIONS
 *
 **********************************************************/
function getExpectedType(first_operand: R.RValue, second_operand: R.RValue) {
    const type_hierarchy = ['NULL', 'logical', 'integer', 'numeric', 'character', 'pairlist', 'list', 'expression'];
    const type_index = Math.max(type_hierarchy.indexOf(first_operand.tag), type_hierarchy.indexOf(second_operand.tag));

    return type_index !== -1 ? type_hierarchy[type_index] : 'NULL';
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
    vec: R.Logical | R.Int | R.Real | R.Character | R.Expression | R.List | R.PairList,
    names: (string | null)[],
) {
    const vectorNames = getNames(vec);
    let ans: (number | null)[] = [];

    if (vectorNames.tag === RNull.tag) {
        return names.map((x) => null);
    }

    ans = names.map((name) => {
        if (name === null) return null;

        const index = vectorNames.data.indexOf(name) + 1; // Note: return as 1-indexed
        if (index === 0) return null;
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

// Handle attributes being copied for extraction
function copyAttributesAfterExtraction(old_vec: R.RValue, new_vec: R.RValue, indexes: (number | null)[]): R.RValue {
    // Handle attributes being copied
    // TODO: Handle dim and dimnames being copied as well
    if (new_vec.tag === 'pairlist' || !isNamedVector(old_vec)) {
        return new_vec;
    } else {
        const names: R.Character | R.Nil = getNames(old_vec);

        if (names.tag === RNull.tag) return new_vec;

        const newNames: (string | null)[] = indexes.map(
            (index) => index !== null && index < length(names) ? names.data[index] : null,
        );

        new_vec = setAttribute(new_vec, 'names', mkChars(newNames));

        return new_vec;
    }
}

// Handle attributes being copied for assignment
function copyAttributesAfterAssignment(old_vec: R.RValue, new_vec: R.RValue): R.RValue {
    // TODO: Handle dim and dimnames being copied as well

    // Ignore pairlists since the keys would have already been set
    if (new_vec.tag === 'pairlist') return new_vec;

    // Consider other objects where the names value has not been set
    if (length(new_vec) === length(old_vec)) {
        // Nothing new was added, just wholesale copy names
        const names = getNames(old_vec);
        return setAttribute(new_vec, 'names', names);
    } else {
        // Something new was added, append new name at the end
        const names: R.Character | R.Nil = getNames(old_vec);

        if (names.tag !== RNull.tag) {
            names.data.push('');
            return setAttribute(new_vec, 'names', names);
        } else {
            return new_vec;
        }
    }
}

function hasNAs(vec: R.RValue): boolean {
    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'list':
    case 'expression':
        for (const d of vec.data) {
            if (d === null) return true;
        }
        break;
    case 'pairlist':
        let curr: R.PairList | R.Nil = vec;
        while (curr.tag !== RNull.tag) {
            if (curr.value === null) return true;
            curr = curr.next;
        }
        break;
    }

    return false;
}
