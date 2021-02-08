import {Logical, Int, Real, RNull, RValue, Character} from './types';

const type_hierarchy = ['logical', 'integer', 'numeric'];

const arithmetic_functions: any = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '^': power,
    '%%': modulus,
    '%/%': integer_division,
};

function apply_arithmetic_operation(
    operator: any,
    first_operand: RValue,
    second_operand: RValue,
) {
    if (
        type_hierarchy.indexOf(first_operand.tag) == -1 ||
        type_hierarchy.indexOf(second_operand.tag) == -1
    ) {
        // Error: type doesn't exist in our hierarchy
        console.error(`Error: non-numeric argument to binary operator`);
        return;
    }

    let operands = {
        first_operand: first_operand as Logical | Int | Real,
        second_operand: second_operand as Logical | Int | Real,
    };

    // 1. Coercion to the same type
    if (operands.first_operand.tag !== operands.second_operand.tag) {
        operands = coerce_types(
            first_operand as Logical | Int | Real,
            second_operand as Logical | Int | Real,
        );
    }

    let arithmetic_result_type = operands.first_operand.tag;
    // 2. Check for the expected type depending on the arithmetic operator
    if (operator === '%/%') {
        arithmetic_result_type = 'integer';
    }

    // 3. If both are logical types, convert to integer types
    if (arithmetic_result_type == 'logical') {
        operands.first_operand =
            coerce_operand_to_type(
                first_operand as Logical | Int | Real,
                'integer',
            );
        operands.second_operand =
            coerce_operand_to_type(second_operand as Logical | Int | Real,
                'integer',
            );
    }

    // 4. Check vector lengths and do recycling
    if (operands.first_operand.data.length !==
        operands.second_operand.data.length) {
        operands = recycle(operands.first_operand, operands.second_operand);
    }

    // 5. Carry out operation
    const arithmetic_result = arithmetic_functions[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );

    // 6. Return result as a newly created vector
    return create_vector_of_type(arithmetic_result, arithmetic_result_type);
}

function recycle(
    first_operand: Logical | Int | Real,
    second_operand: Logical | Int | Real,
) {
    let shorter_operand: Logical | Int | Real;
    let longer_operand: Logical | Int | Real;

    if (first_operand.data.length > second_operand.data.length) {
        longer_operand = first_operand;
        shorter_operand = second_operand;
    } else {
        longer_operand = second_operand;
        shorter_operand = first_operand;
    }

    if (longer_operand.data.length % shorter_operand.data.length != 0) {
        console.warn(
            // eslint-disable-next-line max-len
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

function coerce_types(
    first_operand: Logical | Int | Real,
    second_operand: Logical | Int | Real,
) {
    let first_operand_modified;
    let second_operand_modified;

    const type_index = Math.max(
        type_hierarchy.indexOf(first_operand.tag),
        type_hierarchy.indexOf(second_operand.tag),
    );
    switch (type_hierarchy[type_index]) {
    case 'logical':
        first_operand_modified = coerce_operand_to_type(
            first_operand,
            'logical',
        );

        second_operand_modified = coerce_operand_to_type(
            second_operand,
            'logical',
        );
        break;
    case 'integer':
        first_operand_modified = coerce_operand_to_type(
            first_operand,
            'integer',
        );

        second_operand_modified = coerce_operand_to_type(
            second_operand,
            'integer',
        );
        break;
    default:
        first_operand_modified = coerce_operand_to_type(
            first_operand,
            'numeric',
        );

        second_operand_modified = coerce_operand_to_type(
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

function coerce_operand_to_type(operand: Logical | Int | Real, type: string) {
    switch (type) {
    case 'logical':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'logical',
            data: (operand.data as any).map((x: any) => x == 0 ? false : true),
        } as Logical;
    case 'integer':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'integer',
            data: (operand.data as any).map((x: any) => {
                if (operand.tag == 'logical') {
                    return x ? 1 : 0;
                } else {
                    return x;
                }
            }),
        } as Int;
    default:
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'numeric',
            data: (operand.data as any).map((x: any) => {
                if (operand.tag == 'logical') {
                    return x ? 1 : 0;
                } else {
                    return x;
                }
            }),
        } as Real;
    }
}

function create_vector_of_type(data: [boolean | number], type: string) {
    switch (type) {
    case 'logical':
        return {
            attributes: RNull,
            refcount: 0,
            tag: 'logical',
            data: data,
        } as Logical;
    case 'integer':
        return {
            attributes: RNull,
            refcount: 0,
            tag: 'integer',
            data: data,
        } as Int;
    default:
        return {
            attributes: RNull,
            refcount: 0,
            tag: 'numeric',
            data: data,
        } as Real;
    }
}

// Arithmetic functions include +, -, *, /, ^, %% (modulus), %/% (integer division)
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
            Math.pow(num, other_num) : null;
    });
}

function modulus(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ? num % other_num : null;
    });
}

function integer_division(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return (num !== null && other_num !== null) ?
            Math.floor(num / other_num) : null;
    });
}
