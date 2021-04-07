/*
*   This module handles the summary functionality of joRdan.
*/
import {asLogicalVector} from './coerce';
import { copy } from './copy';
import {error} from './error';
import * as R from './types';
import {head, tail, length, getAttributeOfName, getAttributeFromAttributes} from './util';
import {mkInt, mkReal, mkReals, RNull} from './values';

export const SUMMARY_OPTYPES = {
    SUM: 0,
    MIN: 1,
    MAX: 2,
    PROD: 3,
    MEAN: 4,
    RANGE: 5,
};

/*
*   do_summary handles the summary related operations of joRdan.
*   It will check if the user has input the 'na.rm' argument along with the object,
*   and dispatches to the respective functions with their necessary values.
*/
export const do_summary: R.PrimOp = (call, op, args, env) => {
    let object = head(args);

    if (!isValidSummaryType(object)) error(`invalid 'type' (${object.tag}) of argument`);

    object = copy(object) as R.Int | R.Real;

    // Handle ignore NAs argument
    const ignoreNA = getAttributeOfName(args, 'na.rm');
    let ignoreNA_value: R.Logical | R.Nil = RNull;
    let hasIgnoreNAArg = false;
    if (ignoreNA.tag !== RNull.tag) {
        hasIgnoreNAArg = true;
        ignoreNA_value = asLogicalVector((ignoreNA as R.PairList).value);
        if (ignoreNA_value.tag !== 'logical') error(`missing value where TRUE/FALSE needed`);
        if (ignoreNA_value.tag === 'logical' && length(ignoreNA_value) === 0) error(`argument is of length zero`);
    }

    switch (op.variant) {
    case SUMMARY_OPTYPES.SUM:
        if (hasIgnoreNAArg) return sum(object, (ignoreNA_value as R.Logical).data[0] !== null ?? false);
        else return sum(object);
    case SUMMARY_OPTYPES.MIN:
        if (hasIgnoreNAArg) return min(object, (ignoreNA_value as R.Logical).data[0] !== null ?? null);
        else return min(object);
    case SUMMARY_OPTYPES.MAX:
        if (hasIgnoreNAArg) return max(object, (ignoreNA_value as R.Logical).data[0] !== null ?? null);
        else return max(object);
    case SUMMARY_OPTYPES.PROD:
        if (hasIgnoreNAArg) return prod(object, (ignoreNA_value as R.Logical).data[0] !== null ?? null);
        else return prod(object);
    case SUMMARY_OPTYPES.MEAN:
        if (hasIgnoreNAArg) return mean(object, (ignoreNA_value as R.Logical).data[0] !== null ?? null);
        else return mean(object);
    default:
        return object;
    }
};

export const do_range: R.PrimOp = (call, op, args, env) => {
    let object = head(args);

    if (!isValidSummaryType(object)) error(`invalid 'type' (${object.tag}) of argument`);

    object = copy(object) as R.Int | R.Real;

    // Handle ignore NAs argument
    const ignoreNA = getAttributeFromAttributes(args, 'na.rm');
    let ignoreNA_value: R.Logical | R.Nil = RNull;
    let hasIgnoreNAArg = false;
    if (ignoreNA.tag !== RNull.tag) {
        hasIgnoreNAArg = true;
        ignoreNA_value = asLogicalVector((ignoreNA as R.PairList).value);
        if (ignoreNA_value.tag !== 'logical') error(`missing value where TRUE/FALSE needed`);
        if (ignoreNA_value.tag === 'logical' && length(ignoreNA_value) === 0) error(`argument is of length zero`);
    }

    // Handle ignore infinites argument
    const ignoreInf = getAttributeFromAttributes(args, 'finite');
    let ignoreInf_value: R.Logical | R.Nil = RNull;
    let hasIgnoreInfArg = false;
    if (ignoreInf.tag !== RNull.tag) {
        hasIgnoreInfArg = true;
        ignoreInf_value = asLogicalVector((ignoreInf as R.PairList).value);
        if (ignoreInf_value.tag !== 'logical') error(`missing value where TRUE/FALSE needed`);
        if (ignoreInf_value.tag === 'logical' && length(ignoreInf_value) === 0) error(`argument is of length zero`);
    }

    if (hasIgnoreNAArg && hasIgnoreInfArg) {
        return range(
            object,
            (ignoreNA_value as R.Logical).data[0] !== null ?? null,
            (ignoreInf_value as R.Logical).data[0] !== null ?? null);
    } else if (hasIgnoreNAArg && !hasIgnoreInfArg) {
        return range(object, (ignoreNA_value as R.Logical).data[0] !== null ?? null, false);
    } else if (!hasIgnoreNAArg && hasIgnoreInfArg) {
        return range(object, false, (ignoreInf_value as R.Logical).data[0] !== null ?? null);
    } else {
        return range(object);
    }
};


/*
*   Finds the sum of the values of the given vector.
*/
function sum(vec: R.Int | R.Real, removeNAs: boolean = false) {
    let result: number | null = 0;
    let isResultNA = false;

    for (const value of vec.data) {
        if (value === null && removeNAs) continue;
        else if (value === null && !removeNAs) {
            isResultNA = true;
            break;
        } else if (value !== null) result += value;
    }

    if (isResultNA) result = null;

    switch (vec.tag) {
    case 'integer':
        return mkInt(result);
    case 'double':
        return mkReal(result);
    }
}

/*
*   Finds the product of the values of the given vector.
*/
function prod(vec: R.Int | R.Real, removeNAs: boolean = false) {
    let result: number | null = 1;
    let isResultNA = false;

    for (const value of vec.data) {
        if (value === null && removeNAs) continue;
        else if (value === null && !removeNAs) {
            isResultNA = true;
            break;
        } else if (value !== null) result *= value;
    }

    if (isResultNA) result = null;

    switch (vec.tag) {
    case 'integer':
        return mkInt(result);
    case 'double':
        return mkReal(result);
    }
}

/*
*   Finds the mean value of the given vector. Always returns a numeric object.
*/
function mean(vec: R.Int | R.Real, removeNAs: boolean = false) {
    let result: number | null = 0;
    let isResultNA = false;

    for (const value of vec.data) {
        if (value === null && removeNAs) continue;
        else if (value === null && !removeNAs) {
            isResultNA = true;
            break;
        } else if (value !== null) result += value;
    }

    if (isResultNA) result = null;

    // Figuring out the length of the vector if NAs have been removed
    const length = removeNAs ? vec.data.filter((x)=> x !== null).length : vec.data.length;

    return result === null ? mkReal(result) : mkReal(result / length);
}

/*
*   Finds the minimum value of the given vector.
*/
function min(vec: R.Int | R.Real, removeNAs: boolean = false) {
    let result: number | undefined | null = undefined;
    let isResultNA = false;

    for (const value of vec.data) {
        if (result === undefined) result = value;
        if (value === null && removeNAs) continue;
        else if (value === null && !removeNAs) {
            isResultNA = true;
            break;
        } else if (value !== null && result !== null && value < result) result = value;
    }

    if (isResultNA) result = null;
    if (result === undefined) result = 0;

    switch (vec.tag) {
    case 'integer':
        return mkInt(result);
    case 'double':
        return mkReal(result);
    }
}

/*
*   Finds the maximum values of the given vector.
*/
function max(vec: R.Int | R.Real, removeNAs: boolean = false) {
    let result: number | undefined | null = undefined;
    let isResultNA = false;

    for (const value of vec.data) {
        if (result === undefined) result = value;
        if (value === null && removeNAs) continue;
        else if (value === null && !removeNAs) {
            isResultNA = true;
            break;
        } else if (value !== null && result !== null && value > result) result = value;
    }

    if (isResultNA) result = null;
    if (result === undefined) result = 0;

    switch (vec.tag) {
    case 'integer':
        return mkInt(result);
    case 'double':
        return mkReal(result);
    }
}

/*
*   Finds the range of the values of the vector given. If ignoreInf is specified, the function will
*   ignore any Infinity values.
*/
function range(vec: R.Int | R.Real, removeNAs: boolean = false, ignoreInf: boolean = false) {
    let min: number | undefined | null = undefined;
    let max: number | undefined | null = undefined;
    let isResultNA = false;

    for (const value of vec.data) {
        if (min === undefined) min = value;
        if (max === undefined) max = value;
        if (value === null && removeNAs) continue;
        else if (value === null && !removeNAs) {
            isResultNA = true;
            break;
        } else if (ignoreInf && (value === Infinity || value == -Infinity)) continue;
        else if (value !== null && min !== null && value < min) min = value;
        else if (value !== null && max !== null && value > max) max = value;
    }

    if (isResultNA) {
        min = null;
        max = null;
    }

    if (min === undefined) min = 0;
    if (max === undefined) max = 0;

    return mkReals([min, max]);
}

function isValidSummaryType(vec: R.RValue) {
    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'double':
        return true;
    default:
        return false;
    }
}
