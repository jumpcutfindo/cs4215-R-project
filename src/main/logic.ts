/*
*   This module handles the logic related functionality of JORDAN.
*/

import {error, warn} from './error';
import * as R from './types';
import {mkLogical, mkLogicals, RNull} from './values';
import {head, tail, length} from './util';
import {Reval} from './eval';
import {asLogicalVector} from './coerce';

const type_hierarchy = ['logical', 'integer', 'numeric'];

const unary_logical_functions: any = {
    '!': not,
};

const binary_logical_functions: any = {
    '&': elementwise_and,
    '&&': and,
    '|': elementwise_or,
    '||': or,
    'xor': xor,
};

export const LOGICAL_OPTYPES = {
    NOTOP: 1,
    ELEMANDOP: 2,
    ANDOP: 3,
    ELEMOROP: 4,
    OROP: 5,
    XOROP: 6,
};

/*
*   do_logic handles the unary and binary logical operations of JORDAN.
*   Depending on the arguments provided, the function dispatches the operand(s) to their
*   repsective unary / binary functions.
*/
export const do_logic : R.PrimOp = (call, op, args, env) => {
    let ans: R.RValue = RNull;

    if (length(args) === 1) {
        const operand = head(args);

        switch (op.variant) {
        case LOGICAL_OPTYPES.NOTOP:
            ans = applyUnaryLogicalOperation('!', operand);
            break;
        }
    } else if (length(args) === 2) {
        const first_operand = head(args);
        const second_operand = head(tail(args));
        switch (op.variant) {
        case LOGICAL_OPTYPES.ELEMANDOP:
            ans = applyBinaryLogicalOperation('&', first_operand, second_operand);
            break;
        case LOGICAL_OPTYPES.ELEMOROP:
            ans = applyBinaryLogicalOperation('|', first_operand, second_operand);
            break;
        case LOGICAL_OPTYPES.XOROP:
            ans = applyBinaryLogicalOperation('xor', first_operand, second_operand);
            break;
        }
    }

    return ans;
};

/*
*   do_logic2 handles the specific cases of AND and OR, as they are conditionally evaluated.
*/
export const do_logic2 : R.PrimOp = (call, op, args, env) => {
    let ans: R.RValue = RNull;

    const first_operand = head(args);
    const second_operand = head(tail(args));

    switch (op.variant) {
    case LOGICAL_OPTYPES.ANDOP:
        const first_operand_evaled_and: R.RValue = Reval(first_operand, env);
        const first_operand_result_and: R.Logical | R.Nil =
            applyBinaryLogicalOperation('&', first_operand_evaled_and, mkLogical(true));

        if (first_operand_result_and.tag === 'logical' && first_operand_result_and.data[0]) {
            const second_operand_evaled_and: R.RValue = Reval(second_operand, env);
            const second_operand_result_and: R.Logical | R.Nil =
                applyBinaryLogicalOperation('&', second_operand_evaled_and, mkLogical(true));
            if (second_operand_result_and.tag === 'logical' && second_operand_result_and.data[0]) {
                ans = mkLogical(true);
            } else {
                ans = mkLogical(false);
            }
        } else {
            ans = mkLogical(false);
        }
        break;
    case LOGICAL_OPTYPES.OROP:
        const first_operand_evaled_or: R.RValue = Reval(first_operand, env);
        const first_operand_result_or: R.Logical | R.Nil =
            applyBinaryLogicalOperation('|', first_operand_evaled_or, mkLogical(false));

        if (first_operand_result_or.tag === 'logical' && first_operand_result_or.data[0]) {
            ans = mkLogical(true);
        } else {
            const second_operand_evaled_or: R.RValue = Reval(second_operand, env);
            const second_operand_result_or: R.Logical | R.Nil =
                applyBinaryLogicalOperation('|', second_operand_evaled_or, mkLogical(false));
            if (second_operand_result_or.tag === 'logical' && second_operand_result_or.data[0]) {
                ans = mkLogical(true);
            } else {
                ans = mkLogical(false);
            }
        }
        break;
    }

    return ans;
};

/*
*   Applies a specified unary operator to the operand provided.
*   Coerces the given operand to a logical if required.
*/
function applyUnaryLogicalOperation(
    operator: any,
    operand: R.RValue,
) {
    if (type_hierarchy.indexOf(operand.tag) == -1) {
        error(`Error: logical operations are possible only for logical, integer or numeric types`);
    }

    const operands = {
        operand: operand as R.Logical | R.Int | R.Real,
    };

    // 1. Coerce types to logical
    operands.operand = asLogicalVector(operands.operand) as R.Logical;

    // 2. Carry out operation
    const logical_result = unary_logical_functions[operator](operands.operand.data);

    return mkLogicals(logical_result);
}

/*
*   Applies a specified binary operator to the operands provided.
*   Coerces the given operands to logical objects if required.
*   Recycling is also carried out on the shorter operand if required.
*/
function applyBinaryLogicalOperation(
    operator: any,
    first_operand: R.RValue,
    second_operand: R.RValue,
): R.Logical | R.Nil {
    if (
        type_hierarchy.indexOf(first_operand.tag) === -1 ||
        type_hierarchy.indexOf(second_operand.tag) === -1
    ) {
        error(`Error: logical operations are possible only for logical, integer or numeric types`);
    }

    let operands = {
        first_operand: first_operand as R.Logical | R.Int | R.Real,
        second_operand: second_operand as R.Logical | R.Int | R.Real,
    };

    // 1. Coerce both operands to logical type
    operands.first_operand = asLogicalVector(operands.first_operand) as R.Logical;
    operands.second_operand = asLogicalVector(operands.second_operand) as R.Logical;

    // 2. Check vector lengths and do recycling if operation is elementwise
    if (
        (operator === '|' || operator === '&' || operator === 'xor') &&
        operands.first_operand.data.length !== operands.second_operand.data.length
    ) {
        operands = recycle(operands.first_operand, operands.second_operand);
    }

    // 3. Carry out operation
    const logical_result = binary_logical_functions[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );

    return mkLogicals(logical_result);
}

/*
*   Recycles the shorter operand of the two provided to the length of the longer operand.
*/
function recycle(
    first_operand: R.Logical | R.Int | R.Real,
    second_operand: R.Logical | R.Int | R.Real,
) {
    let shorter_operand: R.Logical | R.Int | R.Real;
    let longer_operand: R.Logical | R.Int | R.Real;

    if (first_operand.data.length > second_operand.data.length) {
        longer_operand = first_operand;
        shorter_operand = second_operand;
    } else {
        longer_operand = second_operand;
        shorter_operand = first_operand;
    }

    if (longer_operand.data.length % shorter_operand.data.length != 0) {
        warn(
            'Warning: longer object length is not a multiple of shorter object length',
        );
    }

    const factor: number = shorter_operand.data.length;

    shorter_operand.data = (longer_operand.data as any).map(
        (x: any, index: number) => {
            return shorter_operand.data[index % factor];
        },
    );

    return {
        first_operand: longer_operand,
        second_operand: shorter_operand,
    };
}

/*
*   The basic logical functions are supported below. The elementwise version of the AND and OR
*   operators work on the individual values of the vectors provided, while the standard AND and OR
*   only consider the first value of the vectors provided.
*/
function not(
    operand_data: [boolean | null],
) {
    return operand_data.map((bool) => bool !== null ? !bool : null);
}

function elementwise_and(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    return first_operand_data.map((bool, index) => {
        const other_bool = second_operand_data[index];
        return and([bool], [other_bool])[0];
    });
}

function and(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    const bool = first_operand_data[0];
    const other_bool = second_operand_data[0];

    if (bool !== null && other_bool !== null) {
        return [bool && other_bool];
    } else if (bool !== null && other_bool === null) {
        return [bool === false ? false : null];
    } else if (bool === null && other_bool !== null) {
        return [other_bool === false ? false : null];
    } else {
        return [null];
    }
}

function elementwise_or(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    return first_operand_data.map((bool, index) => {
        const other_bool = second_operand_data[index];
        return or([bool], [other_bool])[0];
    });
}

function or(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    const bool = first_operand_data[0];
    const other_bool = second_operand_data[0];

    if (bool !== null && other_bool !== null) {
        return [bool || other_bool];
    } else if (bool !== null && other_bool === null) {
        return [bool === true ? true : null];
    } else if (bool === null && other_bool !== null) {
        return [other_bool === true ? true : null];
    } else {
        return [null];
    }
}

function xor(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    return first_operand_data.map((bool, index) => {
        const other_bool = second_operand_data[index];
        return (bool !== null && other_bool !== null) ?
            (bool || other_bool) && !(bool && other_bool) : null;
    });
}

