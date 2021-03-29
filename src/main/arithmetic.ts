import {error, warn} from './error';
import * as R from './types';
import {mkChar, mkPairlist, mkReal, mkReals, RNull} from './values';
import {head, tail, length, checkArity, getAttributeOfName} from './util';
import {asInt, asReal, asRealVector} from './coerce';
import {copy} from './copy';

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

export const MATH_OPTYPES = {
    FLOOR: 0,
    CEILING: 1,
    SQRT: 2,
    SIGN: 3,
    TRUNC: 4,
    ROUND: 5,
    SIGNIF: 6,

    EXP: 10,
    EXPM1: 11,
    LOG: 12,
    // LOGB: 13,
    LOG10: 14,
    LOG2: 15,
    LOG1P: 16,

    COS: 20,
    SIN: 21,
    TAN: 22,
    ACOS: 23,
    ASIN: 24,
    ATAN: 25,
    ATAN2: 26,

    COSH: 30,
    SINH: 31,
    TANH: 32,
    ACOSH: 33,
    ASINH: 34,
    ATANH: 35,
    COSPI: 36,
    SINPI: 37,
    TANPI: 38,
};

export const do_arith: R.PrimOp = (call, op, args, env) => {
    let ans: R.RValue = RNull;

    if (length(args) === 1) {
        const operand = head(args);
        switch (op.variant) {
        case ARITH_OPTYPES.PLUSOP:
            ans = applyUnaryArithmeticOperation('+', operand);
            break;
        case ARITH_OPTYPES.MINUSOP:
            ans = applyUnaryArithmeticOperation('-', operand);
            break;
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

export const do_math1: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);

    let operand = head(args);
    if (!isNumeric(operand)) error('non-numeric argument to mathematical function');

    operand = asRealVector(copy(operand)) as R.Real;

    return applyMathFunction(operand, op.variant);
};

export const do_math2: R.PrimOp = (call, op, args, env) => {
    let operand = head(args);
    if (!isNumeric(operand)) error('non-numeric argument to mathematical function');

    let arg;
    operand = asRealVector(copy(operand)) as R.Real;

    switch (op.variant) {
    case MATH_OPTYPES.ATAN2:
        if (tail(args).tag === RNull.tag) return applyMathFunction(operand, op.variant);
        else {
            if (!isNumeric(head(tail(args)))) error('non-numeric argument to mathematical function');

            if (tail(args).tag === RNull.tag) return applyMathFunction(operand, op.variant);

            const temp = asRealVector((tail(args) as R.PairList).value) as R.Real;
            arg = {x: temp.data[0]};
            return applyMathFunction(operand, op.variant, arg);
        }
    case MATH_OPTYPES.ROUND:
    case MATH_OPTYPES.SIGNIF:
        if (tail(args).tag === RNull.tag) return applyMathFunction(operand, op.variant);
        else {
            if (!isNumeric(head(tail(args)))) error('non-numeric argument to mathematical function');

            if (tail(args).tag === RNull.tag) return applyMathFunction(operand, op.variant);

            const temp = asInt((tail(args) as R.PairList).value) as R.Int;
            arg = {digits: temp.data[length(temp) - 1]};
            return applyMathFunction(operand, op.variant, arg);
        }
    default:
        return operand;
    }
};

export const do_log: R.PrimOp = (call, op, args, env) => {
    let operand = head(args);
    if (!isNumeric(operand)) error('non-numeric argument to mathematical function');

    operand = asRealVector(copy(operand)) as R.Real;

    let log_args;
    if (tail(args).tag === RNull.tag) return applyMathFunction(operand, op.variant);
    else {
        if (!isNumeric(head(tail(args)))) error('non-numeric argument to mathematical function');

        if (tail(args).tag === RNull.tag) return applyMathFunction(operand, op.variant);

        const temp = asRealVector((tail(args) as R.PairList).value) as R.Real;
        log_args = {base: temp.data[0]};
        return applyMathFunction(operand, op.variant, log_args);
    }
};

function applyMathFunction(operand: R.Real, operation: number, args: any = null ) {
    switch (operation) {
    case (MATH_OPTYPES.FLOOR):
        applyMathNoArgs(operand, Math.floor);
        break;
    case (MATH_OPTYPES.CEILING):
        applyMathNoArgs(operand, Math.ceil);
        break;
    case (MATH_OPTYPES.SQRT):
        applyMathNoArgs(operand, Math.sqrt);
        break;
    case (MATH_OPTYPES.SIGN):
        applyMathNoArgs(operand, Math.sign);
        break;
    case (MATH_OPTYPES.TRUNC):
        applyMathNoArgs(operand, Math.trunc);
        break;
    case (MATH_OPTYPES.ROUND):
        // Does not handle negative values, like R does
        if (!args || !args.digits) args = {digits: 0};
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : Number(x.toFixed(args.digits)));
        break;
    case (MATH_OPTYPES.SIGNIF):
        // Does not handle negative values, like R does
        if (!args || !args.digits) args = {digits: 6};
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : Number(x.toPrecision(args.digits)));
        break;

    case (MATH_OPTYPES.EXP):
        applyMathNoArgs(operand, Math.exp);
        break;
    case (MATH_OPTYPES.EXPM1):
        applyMathNoArgs(operand, Math.expm1);
        break;
    case (MATH_OPTYPES.LOG):
        if (!args || !args.base) args = {base: Math.exp(1)};
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : Math.log(x) / Math.log(args.base));
        break;
    case (MATH_OPTYPES.LOG10):
        applyMathNoArgs(operand, Math.log10);
        break;
    case (MATH_OPTYPES.LOG2):
        applyMathNoArgs(operand, Math.log2);
        break;
    case (MATH_OPTYPES.LOG1P):
        applyMathNoArgs(operand, Math.log1p);
        break;

    case (MATH_OPTYPES.COS):
        applyMathNoArgs(operand, Math.cos);
        break;
    case (MATH_OPTYPES.SIN):
        applyMathNoArgs(operand, Math.sin);
        break;
    case (MATH_OPTYPES.TAN):
        applyMathNoArgs(operand, Math.tan);
        break;

    case (MATH_OPTYPES.ACOS):
        applyMathNoArgs(operand, Math.acos);
        break;
    case (MATH_OPTYPES.ASIN):
        applyMathNoArgs(operand, Math.asin);
        break;
    case (MATH_OPTYPES.ATAN):
        applyMathNoArgs(operand, Math.atan);
        break;
    case (MATH_OPTYPES.ATAN2):
        if (!args || !args.x) error('argument x is missing, with no default');
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : Math.atan2(x, args.x));
        break;

    case (MATH_OPTYPES.COSH):
        applyMathNoArgs(operand, Math.cosh);
        break;
    case (MATH_OPTYPES.SINH):
        applyMathNoArgs(operand, Math.sinh);
        break;
    case (MATH_OPTYPES.TANH):
        applyMathNoArgs(operand, Math.tanh);
        break;

    case (MATH_OPTYPES.ACOSH):
        applyMathNoArgs(operand, Math.acosh);
        break;
    case (MATH_OPTYPES.ASINH):
        applyMathNoArgs(operand, Math.asinh);
        break;
    case (MATH_OPTYPES.ATANH):
        applyMathNoArgs(operand, Math.atanh);
        break;

    case (MATH_OPTYPES.COSPI):
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : x * Math.PI);
        applyMathNoArgs(operand, Math.cos);
        break;
    case (MATH_OPTYPES.SINPI):
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : x * Math.PI);
        applyMathNoArgs(operand, Math.sin);
        break;
    case (MATH_OPTYPES.TANPI):
        operand.data = operand.data.map((x: (number | null)) => x === null ? null : x * Math.PI);
        applyMathNoArgs(operand, Math.tan);
        break;
    }

    return operand;
}

function applyMathNoArgs(operand: R.Real, func: (x: number) => number): R.Real {
    operand.data = operand.data.map((x: (number | null)) => {
        return x === null ? null : func(x);
    });

    return operand;
}

function applyUnaryArithmeticOperation(
    operator: string,
    operand: R.RValue,
) : R.Logical | R.Real | R.Int {
    if (
        !isAllowedOperand(operand)
    ) {
        error(`Error: non-numeric argument to unary operator`);
    }

    const operands = {
        operand: operand as R.Logical | R.Int | R.Real,
    };

    let arithmetic_result_type = operands.operand.tag;
    let was_coerced = false;
    // 1. If type logical, coerce to integer
    if (operands.operand.tag === 'logical') {
        operands.operand = coerceOperandToType(operands.operand, 'integer');
        arithmetic_result_type = 'integer';
        was_coerced = true;
    }

    // 2. Carry out operation
    const arithmetic_result = unary_arithmetic_functions[operator](operands.operand.data);

    const ans = createVectorOfType(arithmetic_result, arithmetic_result_type);

    // If coerced, no attributes other than names, dims and dimnames should be copied
    if (was_coerced) {
        const names: R.PairList | R.Nil = getAttributeOfName(operands.operand, 'names');
        const dims: R.PairList | R.Nil = getAttributeOfName(operands.operand, 'dims');
        const dimnames: R.PairList | R.Nil = getAttributeOfName(operands.operand, 'dimnames');

        const array = [names, dims, dimnames];

        let orig: R.PairList | R.Nil = RNull;
        let attributes: R.PairList | R.Nil = RNull;

        for (const pairlist of array) {
            if (pairlist.tag === RNull.tag) {
                continue;
            }

            if (attributes.tag === RNull.tag) {
                orig = pairlist;
                attributes = pairlist;
            } else {
                attributes.next = pairlist;
                attributes = attributes.next;
            }
        }

        ans.attributes = orig;
    } else ans.attributes = operands.operand.attributes;

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

    // 1. Handle attributes
    const resultant_attributes: R.PairList | R.Nil =
        binaryArithCopyAttributes(operands.first_operand, operands.second_operand);

    // 2. Coercion to the same type
    if (operands.first_operand.tag !== operands.second_operand.tag) {
        operands = coerceTypes(
            first_operand as R.Logical | R.Int | R.Real,
            second_operand as R.Logical | R.Int | R.Real,
        );
    }

    let arithmetic_result_type = operands.first_operand.tag;
    // 3. Check for the expected type depending on the arithmetic operator
    if (operator === '%/%') {
        arithmetic_result_type = 'integer';
    } else if (operator === '/' || operator ==='%%' || operator === '^') {
        arithmetic_result_type = 'numeric';
    }

    // 4. If both are logical types, convert to integer types
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

    // 5. Check vector lengths and do recycling
    if (operands.first_operand.data.length !==
        operands.second_operand.data.length) {
        operands = recycle(operands.first_operand, operands.second_operand);
    }

    // 6. Carry out operation
    const arithmetic_result = binary_arithmetic_functions[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );

    // 7. Return result as a newly created vector
    const ans = createVectorOfType(arithmetic_result, arithmetic_result_type);
    ans.attributes = resultant_attributes;
    return ans;
}

function binaryArithCopyAttributes(
    first_operand: R.Logical | R.Int | R.Real,
    second_operand: R.Logical | R.Int | R.Real,
): R.PairList | R.Nil {
    if (first_operand.attributes.tag === RNull.tag &&
        second_operand.attributes.tag === RNull.tag) {
        return RNull;
    }

    let orig: R.PairList | R.Nil = RNull;
    let attributes: R.PairList | R.Nil = RNull;

    // Attributes are taken from the longer argument
    // Names are taken from the argument with length equal to the answer (a.k.a. the longer argument)
    if (first_operand.data.length > second_operand.data.length) {
        orig = first_operand.attributes;
    } else if (first_operand.data.length > second_operand.data.length) {
        orig = second_operand.attributes;
    } else {
        const first_operand_attr_names = [];
        let second_operand_attr_names = [];

        let curr: R.PairList | R.Nil = first_operand.attributes;
        while (curr.tag !== RNull.tag) {
            first_operand_attr_names.push(curr.key);
            curr = curr.next;
        }

        curr = second_operand.attributes;
        while (curr.tag !== RNull.tag) {
            second_operand_attr_names.push(curr.key);
            curr = curr.next;
        }

        // Creating the pairlist
        orig = RNull;
        attributes = RNull;

        for (const key of first_operand_attr_names) {
            if (second_operand_attr_names.indexOf(key) !== -1) {
                second_operand_attr_names = second_operand_attr_names.filter((x)=> x !== key);
            }

            if (attributes.tag === RNull.tag) {
                attributes = getAttributeOfName(first_operand, key);
                orig = attributes;
            } else {
                attributes.next = getAttributeOfName(first_operand, key);
                attributes = attributes.next;
            }
        }
    }

    return orig;
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
        if (num !== null && other_num !== null) {
            if (num === 1) return 1;
            if (other_num === 0) return 1;
            if (num === Infinity || other_num === Infinity) return Infinity;
            if (num === -Infinity || other_num === -Infinity) return -Infinity;

            return Math.pow(num, other_num);
        } else {
            return null;
        }
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

function isNumeric(vec: R.RValue) {
    switch (vec.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
        return true;
    default:
        return false;
    }
}

