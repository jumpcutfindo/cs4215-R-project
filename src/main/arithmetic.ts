import {error, warn} from './error';
import * as R from './types';
import {RNull} from './values';
import * as Coerce from './coerce';
import {PrimOp} from './types';
import {head, tail, length, checkArity} from './util';

/**
 * We define the supported unary and binary operators here.
 */
const unary_arithmetic_functions: any = {
    '+': positive,
    '-': negative,
};

const binary_arithmetic_functions: any = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '^': power,
    '%%': modulus,
    '%/%': integerDivision,
};

export const ARITH_OPTYPES = {
    PLUSOP: 1,
    MINUSOP: 2,
    TIMESOP: 3,
    DIVOP: 4,
    POWOP: 5,
    MODOP: 6,
    IDIVOP: 7,
};

export const do_arith : PrimOp = (call, op, args, env) => {
    let ans: R.RValue = RNull;

    if (length(args) === 1) {
        const operand = head(args);
        switch (op.variant) {
        case ARITH_OPTYPES.PLUSOP:
            ans = applyUnaryArithmeticOperation('+', operand);
            break;
        case ARITH_OPTYPES.MINUSOP:
            ans = applyUnaryArithmeticOperation('-', operand);
        }
    } else if (length(args) === 2) {
        const first_operand = head(args);
        const second_operand = head(tail(args));
        switch (op.variant) {
        case ARITH_OPTYPES.PLUSOP:
            ans = applyBinaryArithmeticOperation('+', first_operand, second_operand);
            break;
        case ARITH_OPTYPES.MINUSOP:
            ans = applyBinaryArithmeticOperation('-', first_operand, second_operand);
            break;
        case ARITH_OPTYPES.TIMESOP:
            ans = applyBinaryArithmeticOperation('*', first_operand, second_operand);
            break;
        case ARITH_OPTYPES.DIVOP:
            ans = applyBinaryArithmeticOperation('/', first_operand, second_operand);
            break;
        case ARITH_OPTYPES.POWOP:
            ans = applyBinaryArithmeticOperation('^', first_operand, second_operand);
            break;
        case ARITH_OPTYPES.MODOP:
            ans = applyBinaryArithmeticOperation('%%', first_operand, second_operand);
            break;
        case ARITH_OPTYPES.IDIVOP:
            ans = applyBinaryArithmeticOperation('%/%', first_operand, second_operand);
            break;
        }
    }

    return ans;
};

function applyUnaryArithmeticOperation(
    operator: string,
    operand: R.RValue,
) : R.Logical | R.Real | R.Int {
    if (
        isAllowedOperand(operand)
    ) {
        error(`Error: non-numeric argument to unary operator`);
    }

    const operands = {
        operand: operand as R.Logical | R.Int | R.Real,
    };

    let arithmetic_result_type = operands.operand.tag;
    // 1. If type logical, coerce to integer
    if (operands.operand.tag === 'logical') {
        operands.operand = coerceOperandToType(operands.operand, 'integer');
        arithmetic_result_type = 'integer';
    }

    // 2. Carry out operation
    const arithmetic_result = unary_arithmetic_functions[operator](operands.operand.data);

    return createVectorOfType(arithmetic_result, arithmetic_result_type);
}

function applyBinaryArithmeticOperation(
    operator: string,
    first_operand: R.RValue,
    second_operand: R.RValue,
) : R.Logical | R.Real | R.Int {
    if (
        !isAllowedOperand(first_operand) ||
        !isAllowedOperand(second_operand)
    ) {
        error(`Error: non-numeric argument to binary operator`);
    }

    let operands = {
        first_operand: first_operand as R.Logical | R.Int | R.Real,
        second_operand: second_operand as R.Logical | R.Int | R.Real,
    };

    // 1. Coercion to the same type
    if (operands.first_operand.tag !== operands.second_operand.tag) {
        operands = coerceTypes(
            first_operand as R.Logical | R.Int | R.Real,
            second_operand as R.Logical | R.Int | R.Real,
        );
    }

    let arithmetic_result_type = operands.first_operand.tag;
    // 2. Check for the expected type depending on the arithmetic operator
    if (operator === '%/%') {
        arithmetic_result_type = 'integer';
    } else if (operator === '/' || operator ==='%%') {
        arithmetic_result_type = 'numeric';
    }

    // 3. If both are logical types, convert to integer types
    if (arithmetic_result_type === 'logical') {
        operands.first_operand =
            coerceOperandToType(
                first_operand as R.Logical | R.Int | R.Real,
                'integer',
            );
        operands.second_operand =
            coerceOperandToType(second_operand as R.Logical | R.Int | R.Real,
                'integer',
            );

        arithmetic_result_type = 'integer';
    }

    // 4. Check vector lengths and do recycling
    if (operands.first_operand.data.length !==
        operands.second_operand.data.length) {
        operands = recycle(operands.first_operand, operands.second_operand);
    }

    // 5. Carry out operation
    const arithmetic_result = binary_arithmetic_functions[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );

    // 6. Return result as a newly created vector
    return createVectorOfType(arithmetic_result, arithmetic_result_type);
}

function isAllowedOperand(operand: R.RValue) {
    switch (operand.tag) {
    case ('logical'):
    case ('integer'):
    case ('numeric'):
        return true;
    default:
        return false;
    }
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

function coerceOperandToType(operand: R.Logical | R.Int | R.Real, type: string) {
    switch (type) {
    case 'logical':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'logical',
            data: (operand.data as any).map((x: any) => x === 0 ? false : true),
        } as R.Logical;
    case 'integer':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'integer',
            data: (operand.data as any).map((x: any) => {
                if (operand.tag === 'logical') {
                    return x ? 1 : 0;
                } else {
                    return x;
                }
            }),
        } as R.Int;
    default:
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'numeric',
            data: (operand.data as any).map((x: any) => {
                if (operand.tag === 'logical') {
                    return x ? 1 : 0;
                } else {
                    return x;
                }
            }),
        } as R.Real;
    }
}

function coerceTypes(
    first_operand: R.Logical | R.Int | R.Real,
    second_operand: R.Logical | R.Int | R.Real,
) {
    let first_operand_modified;
    let second_operand_modified;
    const type_hierarchy = ['logical', 'integer', 'numeric'];

    const type_index = Math.max(
        type_hierarchy.indexOf(first_operand.tag),
        type_hierarchy.indexOf(second_operand.tag),
    );
    switch (type_hierarchy[type_index]) {
    case 'logical':
        first_operand_modified = coerceOperandToType(
            first_operand,
            'logical',
        );

        second_operand_modified = coerceOperandToType(
            second_operand,
            'logical',
        );
        break;
    case 'integer':
        first_operand_modified = coerceOperandToType(
            first_operand,
            'integer',
        );

        second_operand_modified = coerceOperandToType(
            second_operand,
            'integer',
        );
        break;
    default:
        first_operand_modified = coerceOperandToType(
            first_operand,
            'numeric',
        );

        second_operand_modified = coerceOperandToType(
            second_operand,
            'numeric',
        );
        break;
    }

    return {
        first_operand: first_operand_modified,
        second_operand: second_operand_modified,
    };
}


// Unary arithmetic functions include +, -
function positive(
    operand_data: [number | null],
) {
    return operand_data.map((num) => num !== null ? +num : null);
}

function negative(
    operand_data: [number | null],
) {
    return operand_data.map((num) => num !== null ? -num : null);
}

// Binary arithmetic functions include +, -, *, /, ^, %% (modulus), %/% (integer division)
function add(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ? num + other_num : null;
    });
}

function subtract(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ? num - other_num : null;
    });
}

function multiply(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ? num * other_num : null;
    });
}

function divide(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ? num / other_num : null;
    });
}

function power(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ?
            num === 1 && (other_num === Infinity || other_num === -Infinity) ? 1 :
                Math.pow(num, other_num) : null;
    });
}

function modulus(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];

        if (num !== null && other_num !== null) {
            const q = num / other_num;
            if (q !== Infinity && (Math.abs(q) * Number.EPSILON )> 1) {
                warn('Warning: probable complete loss of accuracy in modulus');
            }
            return num % other_num;
        } else {
            return null;
        }
    });
}

function integerDivision(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ?
            Math.floor(num / other_num) : null;
    });
}
