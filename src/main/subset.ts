/* eslint-disable new-cap */
/* eslint-disable valid-jsdoc */

/*
*   This module handles the subsetting and subset assignment of JORDAN.
*/
import {setAttribute} from './attrib';
import {coerceTo} from './coerce';
import {copy} from './copy';
import {error, warn} from './error';
import {Reval} from './eval';
import * as R from './types';
import {checkArity, getAtLinkedListIndex, getNames, head, length, tail} from './util';
import {mkChar, mkChars, mkInt, mkInts,
    mkLogical, mkLogicals, mkPairlist,
    mkReal, mkReals, RNull} from './values';

/*
*   do_subset handles the implementation for '[' subsetting.
*   '[' subsetting is able to select multiple values, based on the arguments provided.
*   Depending on the type of the arguments, the function dispatches the handling of the
*   subsetting to the different functions.
*   - Specific cases include logical subsetting, and subsetting using names provided.
*   - The default case will be coercion to an integer vector, and subsetting using
*     the resultant indexes.
*/
export const do_subset: R.PrimOp = (call, op, args, env) => {
    const object = Reval(head(args), env);
    let params = head(tail(args));

    // Checking for empty parameters
    try {
        params = Reval(params, env);
    } catch (e) {
        params = RNull;
    }

    if (params.tag === RNull.tag || (params as R.PairList).value && (params as R.PairList).value.tag === RNull.tag) {
        return object;
    } else if (params.tag === 'logical') {
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

/*
*   do_subset2 handles the implementation for '[' subsetting.
*   '[' subsetting is able to only select one value, based on the arguments provided.
*   Depending on the type of the arguments, the function dispatches the handling of the
*   subsetting to the different functions.
*   - Specific cases include subsetting using a name provided.
*   - The default case will involve coercion to an integer vector, and subsetting using
*     the resultant index.
*/
export const do_subset2: R.PrimOp = (call, op, args, env) => {
    // Extract a single value at a specific index (note that R indexing begins from 1),
    // or a single value with a specific name
    const object = Reval(head(args), env);
    let params = head(tail(args));

    // Checking for empty parameters
    try {
        params = Reval(params, env);
    } catch (e) {
        error('subscript out of bounds');
    }

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

/*
*   do_subset3 handles the implementation for '$' subsetting.
*   '$' subsetting is able to only select one value, based on the name provided.
*   This form of subsetting also only works on list / pairlist objects.
*/
export const do_subset3: R.PrimOp = (call, op, args, env) => {
    // Extract a single value with a specific name (partial matching always)
    checkArity(call, op, args);
    const object = Reval(head(args), env);
    let params = head(tail(args));
    let name = null;

    if (params.tag !== 'name') {
        params = Reval(params, env);
    }

    if (!isSubsettableList(object)) {
        error('$ operator is invalid for atomic vectors');
    }

    if (params.tag !== 'name') {
        error(`unexpected ${params.tag} in arguments`);
    } else {
        name = params.pname;
        return extractSingleByName(object, name, false);
    }
};

/*
*   do_subassign handles the implementation for '[' subset assignment.
*   '[' subset assignment is able to assign to multiple values, based on the arguments provided.
*   Depending on the type of the arguments, the function dispatches the handling of the
*   subset assignment to the different functions.
*   - Specific cases include logical subsetting, and subsetting using names provided.
*   - The default case will be coercion to an integer vector, and subsetting using
*     the resultant indexes.
*/
export const do_subassign: R.PrimOp = (call, op, args, env) => {
    const object = copy(Reval(head(args), env));
    let params = head(tail(args));
    const replacements = Reval(head(tail(tail(args))), env);

    if (hasNAs(object) && length(replacements) > 1) error('NAs are not allowed in subscripted assignments');

    // Checking for empty parameters
    try {
        params = Reval(params, env);
    } catch (e) {
        params = RNull;
    }

    if (params.tag === RNull.tag || (params as R.PairList).value && (params as R.PairList).value.tag === RNull.tag) {
        const temp = [];
        for (let i = 1; i <= length(object); i ++) temp.push(i);
        return assignMultipleAtIndexes(object, temp, replacements);
    } else if (params.tag === 'logical') {
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

/*
*   do_subassign2 handles the implementation for '[[' subset assignment.
*   '[[' subset assignment is able to assign to a specific value, based on the arguments provided.
*   Depending on the type of the argument, the function dispatches the handling of the
*   subset assignment to the different functions.
*   - Specific cases include subsetting using the name provided.
*   - The default case will be coercion to an integer vector, and subsetting using
*     the resultant index.
*/
export const do_subassign2: R.PrimOp = (call, op, args, env) => {
    const object = copy(Reval(head(args), env));
    let params = head(tail(args));
    const replacements = Reval(head(tail(tail(args))), env);

    // Checking for empty parameters
    try {
        params = Reval(params, env);
    } catch (e) {
        error('subscript out of bounds');
    }

    if (length(params) !== 1) {
        error('attempt to select more than one element');
    }

    if (hasNAs(object) && length(replacements) > 1) error('NAs are not allowed in subscripted assignments');

    if (params.tag === 'character') {
        return assignSingleByName(object, (params.data as string[])[0], replacements);
    } else {
        params = coerceTo(params, 'integer');
        if (params.tag !== 'integer') {
            error('NA / NaN argument');
        }

        return assignSingleAtIndex(object, (params.data as number[])[0], replacements);
    }
};

/*
*   do_subassign3 handles the implementation for '$' subset assignment.
*   '$' subsetting is able to only select one value, based on the name provided.
*   This form of subset assignment also only works on list / pairlist objects.
*/
export const do_subassign3: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(Reval(head(args), env));
    let params = head(tail(args));
    const replacements = Reval(head(tail(tail(args))), env);
    let name = '';

    if (params.tag !== 'name') {
        params = Reval(params, env);
    }

    if (hasNAs(object) && length(replacements) > 1) error('NAs are not allowed in subscripted assignments');

    if (!isSubsettableList(object)) {
        warn('coercing LHS to a list');
    }

    if (params.tag !== 'name') {
        error(`unexpected ${params.tag} in arguments`);
    } else {
        name = params.pname;
        return assignSingleByName(object, name, replacements);
    }
};

/** ********************************************************
 *
 *               EXTRACTION FUNCTIONS
 *
 **********************************************************/

/*
*   Extracts a single value at a given index.
*   Does copying of the attributes after extraction.
*   Note: the 'index' argument is 1-indexed.
*/
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
        ans = copyAttributesAfterExtraction(vec, ans, [index - 1]);
        break;
    case 'integer':
        ans = mkInt(vec.data[actual_index]);
        ans = copyAttributesAfterExtraction(vec, ans, [index - 1]);
        break;
    case 'double':
        ans = mkReal(vec.data[actual_index]);
        ans = copyAttributesAfterExtraction(vec, ans, [index - 1]);
        break;
    case 'character':
        ans = mkChar(vec.data[actual_index]);
        ans = copyAttributesAfterExtraction(vec, ans, [index - 1]);
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

    // Remember to deduct 1 from the index!

    return ans;
}

/*
*   Extracts a single value with a given name in the object.
*   Determines the index of the value to be extracted, then sends it to extractSingleAtIndex
*   for extraction.
*   If the 'exact' argument is not provided, partial matching of names will not be done (must be the
*  exact name)
*/
function extractSingleByName(vec: R.RValue, name: string | null, exact: boolean = true): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    if (name === null) error('subscript out of bounds');

    let ans;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'double':
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
            if (nameValues.data.indexOf(name) !== -1) {
                ans = extractSingleAtIndex(vec, nameValues.data.indexOf(name) + 1);
            } else {
                const matches = nameValues.data.filter((n) => n?.includes(name));
                if (matches.length !== 1) {
                    ans = RNull;
                } else {
                    ans = extractSingleAtIndex(vec, nameValues.data.indexOf(matches[0]) + 1);
                }
            }
        } else {
            if (nameValues.data.indexOf(name) !== -1) {
                ans = extractSingleAtIndex(vec, nameValues.data.indexOf(name) + 1);
            } else {
                ans = RNull;
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

/*
*   Extracts multiple values with the given indexes in the object.
*   Does copying of the attributes after extraction.
*
*   If only negative values are provided, the values of the object at the absolute value of those negative
*   values will be ignored.
*/
function extractMultipleAtIndexes(vec: R.RValue, indexes: (number | null)[]): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    // Check for negative subscripts
    let hasNegative = false;
    let allNegative = true;
    for (const i of indexes) {
        if (i === null) {
            allNegative = false;
            continue;
        }
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
    case 'double':
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

/*
*   Extracts multiple values with the given names in the object.
*   Determines the indexes of the values to be extracted, then sends it to extractMultipleAtIndexes
*   for extraction.
*/
function extractMultipleByNames(vec: R.RValue, names: (string | null)[]) {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    let ans;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'double':
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

/*
*   Extracts multiple values according to the logical vector provided.
*   The indexes of the values to be extracted are determined and sent to extractMultipleAtIndexes to be handled.
*
*   Indexes corresponding to TRUE in the logical vector provided will be extracted, and those with
*   FALSE will be ignored.
*   Recycling will be done if the logical vector provided is not the same length as the object to be
*   subsetted.
*/
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

/*
*   Assigns a single value at a given index.
*   Does copying of the attributes after assignment.
*/
function assignSingleAtIndex(vec: R.RValue, index: number, value: R.RValue): R.RValue {
    if (index === null || index <= 0) {
        error('attempt to select less than one element');
    }

    if ((vec.tag !== 'list' && vec.tag !== 'pairlist' && vec.tag !== 'expression') && length(value) > length(vec)) {
        error('more elements supplied than there are to replace');
    }

    const actual_index = index - 1;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
        let expected_type;
        if (vec.tag !== value.tag) {
            expected_type = getExpectedType(vec, value);
        } else {
            expected_type = vec.tag;
        }

        let new_vec = coerceTo(vec, expected_type) as R.Logical;
        const new_value = coerceTo(value, expected_type);
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
            new_vec = setAttribute(new_vec, 'names', names) as R.Logical;
        }
        new_vec = copyAttributesAfterAssignment(vec, new_vec) as R.Logical;

        return new_vec;
    case 'expression':
    case 'list':
        if (actual_index < length(vec)) {
            vec.data[actual_index] = value;
        } else {
            for (let i = length(vec); i < actual_index; i ++) vec.data.push(RNull);
            (vec.data as (R.RValue | null)[]).push(value);

            // Handle names
            const names = getNames(vec);
            if (names.tag !== RNull.tag) for (let i = length(vec); i < actual_index; i ++) names.data.push('');
            vec = setAttribute(vec, 'names', names);
        }

        return vec;
    case 'pairlist':
        // new_value has been coerced to a pairlist
        if (actual_index < length(vec)) {
            let curr: R.PairList | R.Nil = vec;
            let pl_index = 0;
            while (curr.tag !== RNull.tag) {
                if (pl_index === actual_index) {
                    curr.value = value;
                    break;
                }
                curr = curr.next;
                pl_index ++;
            }
        } else {
            let curr: R.PairList | R.Nil = vec;
            let pl_index = 0;
            while (curr.next.tag !== RNull.tag) {
                curr = curr.next;
                pl_index ++;
            }

            while (pl_index < actual_index) {
                (curr as R.PairList).next = mkPairlist([RNull, '']);
                curr = (curr as R.PairList).next;
            }

            (curr as R.PairList).next = mkPairlist([value, '']);
        }
        return vec;
    }

    return vec;
}

/*
*   Assigns a single value at a given name.
*   Determines the index of the name to be assigned to, then sends it to assignSingleByIndex
*   to be assigned.
*/
function assignSingleByName(vec: R.RValue, name: string, value: R.RValue): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    if (name.length <= 0) error('attempt to use zero-length variable name');

    let expected_type;
    if (vec.tag !== value.tag) {
        expected_type = getExpectedType(vec, value);
    } else {
        expected_type = vec.tag;
    }

    let new_vec = vec;
    let new_value = value;

    // We don't do anything if it's a list or pairlist
    if (vec.tag !== 'list' && vec.tag !== 'pairlist') {
        new_vec = coerceTo(vec, expected_type);
        new_value = coerceTo(value, expected_type);
    }

    const name_index = getIndexesOfNames((vec as R.Logical), [name])[0];

    if (name_index === null) {
        // Append to the end of the object
        let names: R.Character | R.Nil = getNames(vec);
        if (names.tag !== RNull.tag) names.data.push(name);
        else names = mkChar(name);

        vec = setAttribute(vec, 'names', names);

        return assignSingleAtIndex(new_vec, length(new_vec) + 1, new_value);
    } else {
        return assignSingleAtIndex(new_vec, name_index, new_value);
    }
}

/*
*   Assigns multiple values with the given indexes in the object.
*   Determines the indexes to be assigned to and passes it to assignSingleAtIndex to be assigned.
*
*   If only negative values are provided, the values of the object at the absolute value of those negative
*   values will be ignored.
*/
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
    let new_value = coerceTo(values, expected_type);

    // Recycling of values
    if (actual_indexes.length !== length(new_value)) {
        warn('number of items to replace is not a multiple of replacement length');
        new_value = recycleToLength(new_value, actual_indexes.length);
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
    case 'double':
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
            let value;
            switch (new_value.tag) {
            case 'logical':
                value = mkLogical(new_value.data[i]);
                break;
            case 'integer':
                value = mkInt(new_value.data[i]);
                break;
            case 'double':
                value = mkReal(new_value.data[i]);
                break;
            case 'character':
                value = mkChar(new_value.data[i]);
                break;
            default:
                value = (new_value as R.List).data[i];
                break;
            }
            new_vec = assignSingleAtIndex(new_vec, index, value);
        }
        break;
    case 'pairlist':
        // Assuming that new_value has been coerced to a pairlist
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

    return new_vec;
}

/*
*   Assigns multiple values with the given names in the object.
*   Determines the indexes of the values to be extracted, then sends it to assignMultipleAtIndexes
*   for extraction.
*/
function assignMultipleByNames(vec: R.RValue, names: string[], values: R.RValue): R.RValue {
    if (!isSubsettable(vec)) {
        error('not a subsettable type');
    }

    let ans: R.RValue = RNull;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'double':
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

/*
*   Assigns multiple values according to the logical vector provided.
*   The indexes to be assigned to are determined and sent to assignMultipleAtIndexes for assignment.
*
*   Indexes corresponding to TRUE in the logical vector provided will be extracted, and those with
*   FALSE will be ignored.
*   Recycling will be done if the logical vector provided is not the same length as the object to be
*   subsetted.
*/
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
    const type_hierarchy = ['NULL', 'logical', 'integer', 'double', 'character', 'pairlist', 'list', 'expression'];
    const type_index = Math.max(type_hierarchy.indexOf(first_operand.tag), type_hierarchy.indexOf(second_operand.tag));

    return type_index !== -1 ? type_hierarchy[type_index] : 'NULL';
}

function isSubsettable(x: R.RValue) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'double':
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
    case 'double':
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
    case 'double':
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

        if (new_vec.tag !== RNull.tag) new_vec = setAttribute(new_vec, 'names', mkChars(newNames));

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
    case 'double':
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

function recycleToLength(vec: R.RValue, l: number) {
    if (length(vec) >= l) return vec;

    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
    case 'list':
        const vecLength = length(vec);
        const data: any[] = vec.data;
        for (let i = vecLength; i < l; i ++) {
            data.push(vec.data[i % vecLength]);
        }
        return vec;
    }
    return vec;
}
