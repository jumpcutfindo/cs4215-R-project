import {error, warn} from './error';
import * as R from './types';
import {RNull} from './values';
import {head, tail, length, checkArity} from './util';

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
        case LOGICAL_OPTYPES.ANDOP:
            ans = applyBinaryLogicalOperation('&&', first_operand, second_operand);
            break;
        case LOGICAL_OPTYPES.ELEMOROP:
            ans = applyBinaryLogicalOperation('|', first_operand, second_operand);
            break;
        case LOGICAL_OPTYPES.OROP:
            ans = applyBinaryLogicalOperation('||', first_operand, second_operand);
            break;
        case LOGICAL_OPTYPES.XOROP:
            ans = applyBinaryLogicalOperation('xor', first_operand, second_operand);
            break;
        }
    }

    return ans;
};

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

    const logical_result_type = 'logical';
    let logical_result;

    // 1. Check if the operator is 'isTRUE' or 'isFALSE'
    if (operator === 'isTRUE') {
        // TODO: Implement isTRUE using R code
        console.log(`Developer: '${operator}' operator is not yet implemented!`);
    } else if (operator === 'isFALSE') {
        console.log(`Developer: '${operator}' operator is not yet implemented!`);
    } else {
        // 1. Coerce types to logical
        operands.operand = coerceOperandToLogical(operands.operand);

        // 2. Carry out operation
        logical_result = unary_logical_functions[operator](operands.operand.data);
    }

    return createVectorOfType(logical_result, logical_result_type);
}

function applyBinaryLogicalOperation(
    operator: any,
    first_operand: R.RValue,
    second_operand: R.RValue,
) {
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
    operands.first_operand = coerceOperandToLogical(operands.first_operand);
    operands.second_operand = coerceOperandToLogical(operands.second_operand);

    // 2. Check vector lengths and do recycling if operation is elementwise
    if (
        (operator === '|' || operator === '&' || operator === 'xor') &&
        operands.first_operand.data.length !== operands.second_operand.data.length
    ) {
        operands = recycle(operands.first_operand, operands.second_operand);
    }

    // 3. Carry out operation
    const logical_result_type = 'logical';
    const logical_result = binary_logical_functions[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );

    return createVectorOfType(logical_result, logical_result_type);
}

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

function createVectorOfType(data: [boolean | number], type: string) {
    switch (type) {
    case 'logical':
        return {
            attributes: RNull,
            refcount: 0,
            tag: 'logical',
            data: data,
        } as R.Logical;
    case 'integer':
        return {
            attributes: RNull,
            refcount: 0,
            tag: 'integer',
            data: data,
        } as R.Int;
    default:
        return {
            attributes: RNull,
            refcount: 0,
            tag: 'numeric',
            data: data,
        } as R.Real;
    }
}

function coerceOperandToLogical(operand: R.Logical | R.Int | R.Real) {
    return {
        attributes: operand.attributes,
        refcount: operand.refcount,
        tag: 'logical',
        data: (operand.data as any).map((x: any) => {
            if (x === null) {
                return null;
            } else if (x === 0 || x === false) {
                return false;
            } else {
                return true;
            }
        }),
    } as R.Logical;
}

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
        return and([bool], [other_bool]);
    });
}

function and(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    const bool = first_operand_data[0];
    const other_bool = second_operand_data[0];

    if (bool !== null && other_bool !== null) {
        return bool && other_bool;
    } else if (bool !== null && other_bool === null) {
        return bool === false ? false : null;
    } else if (bool === null && other_bool !== null) {
        return other_bool === false ? false : null;
    } else {
        return null;
    }
}

function elementwise_or(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    return first_operand_data.map((bool, index) => {
        const other_bool = second_operand_data[index];
        return or([bool], [other_bool]);
    });
}

function or(
    first_operand_data: [boolean | null],
    second_operand_data: [boolean | null],
) {
    const bool = first_operand_data[0];
    const other_bool = second_operand_data[0];

    if (bool !== null && other_bool !== null) {
        return bool || other_bool;
    } else if (bool !== null && other_bool === null) {
        return bool === true ? true : null;
    } else if (bool === null && other_bool !== null) {
        return other_bool === true ? true : null;
    } else {
        return null;
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

