import {Logical, Int, Real, RNull} from './types';

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
    first_operand: any,
    second_operand: any,
) {
    let operands = {first_operand, second_operand};
    // 1. Coercion to the same type
    if (operands.first_operand.tag !== operands.second_operand.tag) {
        try {
            operands = coerce_types(first_operand, second_operand);
        } catch {
            // Error handling on failure to coerce types
        }
    }

    // 2. Check if the types are of number type (throw error if not)
    if (operands.first_operand.tag !== operands.second_operand.tag) {
        // Throw error: incompatible types
    }

    // 3. Check vector lengths and do recycling
    if (operands.first_operand.data.length !==
        operands.second_operand.data.length) {
        try {
            operands = recycle(operands.first_operand, operands.second_operand);
        } catch {
            // Error handling on failure to recycle operands
        }
    }

    // 4. Carry out operation
    const arithmetic_result = arithmetic_functions[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );
    return arithmetic_result;
}

function recycle(first_operand: any, second_operand: any) {
    let shorter_operand;
    let longer_operand;

    if (first_operand.data.length > second_operand.data.length) {
        longer_operand = first_operand;
        shorter_operand = second_operand;
    } else {
        longer_operand = second_operand;
        shorter_operand = first_operand;
    }

    if (longer_operand.data.length % shorter_operand.data.length != 0) {
        // Throw error: Length of vector of shorter vector not multiple of longer vector
    } else {
        const recycled_data = [];
        const factor = shorter_operand.data.length;

        for (let i = 0; i < longer_operand.data.length; i ++) {
            recycled_data.push(shorter_operand.data[i % factor]);
        }

        shorter_operand.data = recycled_data;
    }

    return {
        first_operand: longer_operand,
        second_operand: shorter_operand,
    };
}

function coerce_types(first_operand: any, second_operand: any) {
    let first_operand_modified;
    let second_operand_modified;

    if (
        type_hierarchy.indexOf(first_operand.tag) == -1 ||
        type_hierarchy.indexOf(second_operand.tag) == -1
    ) {
        // Throw error: type doesn't exist in our hierarchy
    } else {
        const type_index = Math.max(
            type_hierarchy.indexOf(first_operand.tag),
            type_hierarchy.indexOf(second_operand.tag),
        );
        console.log('type hierarchy', type_hierarchy[type_index]);
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
        case 'numeric':
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
    }

    return {
        first_operand: first_operand_modified,
        second_operand: second_operand_modified,
    };
}

function coerce_operand_to_type(operand: any, type: any) {
    if (type_hierarchy.indexOf(type) == -1) {
        // Throw error: type doesn't exist in our hierarchy
    }

    switch (type) {
    case 'logical':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'logical',
            data: operand.data.map((x: any) => x == 0 ? false : true),
        } as Logical;
    case 'integer':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'integer',
            data: operand.data.map((x: any) => {
                if (operand.tag == 'logical') {
                    return x ? 1 : 0;
                } else {
                    return x;
                }
            }),
        } as Int;
    case 'numeric':
        return {
            attributes: operand.attributes,
            refcount: operand.refcount,
            tag: 'numeric',
            data: operand.data.map((x: any) => {
                if (operand.tag == 'logical') {
                    return x ? 1 : 0;
                } else {
                    return x;
                }
            }),
        } as Real;
    }
}

// Arithmetic operators will include +, -, *, /, ^, %% (modulus), %/% (integer division)
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
        return (num !== null && other_num !== null) ? Math.pow(num, other_num) : null;
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
) {}

const x = {
    attributes: RNull,
    refcount: 0,
    tag: 'numeric',
    data: [10, 20, 30, 10, 20, 30],
} as Real;

const y = {
    attributes: RNull,
    refcount: 0,
    tag: 'numeric',
    data: [40, 30, 20],
} as Real;

console.log('x', x, 'y', y);

console.log(apply_arithmetic_operation('+', x, y));
