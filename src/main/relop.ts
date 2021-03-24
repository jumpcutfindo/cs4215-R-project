import {error, warn} from './error';
import * as R from './types';
import {checkArity, head, tail} from './util';
import {mkChars, mkLogicals, mkReals, RNull} from './values';

const stringToSum = (str: string) => [...str||'A'].reduce((a, x) => a += x.codePointAt(0) ?? 0, 0);

const relational_operators: any = {
    '<': lesser,
    '>': greater,
    '<=': lesserEqual,
    '>=': greaterEqual,
    '==': equal,
    '!=': notEqual,
};

export const RELATIONAL_OPTYPES = {
    LTOP: 1,
    GTOP: 2,
    LEQOP: 3,
    GEQOP: 4,
    EQOP: 5,
    NEQOP: 6,
};

export const do_relop : R.PrimOp = (call, op, args, env) => {
    let ans: R.RValue = RNull;

    checkArity(call, op, args);

    const first_operand = head(args);
    const second_operand = head(tail(args));

    switch (op.variant) {
    case RELATIONAL_OPTYPES.LTOP:
        ans = applyRelationalOperator('<', first_operand, second_operand);
        break;
    case RELATIONAL_OPTYPES.GTOP:
        ans = applyRelationalOperator('>', first_operand, second_operand);
        break;
    case RELATIONAL_OPTYPES.LEQOP:
        ans = applyRelationalOperator('<=', first_operand, second_operand);
        break;
    case RELATIONAL_OPTYPES.GEQOP:
        ans = applyRelationalOperator('>=', first_operand, second_operand);
        break;
    case RELATIONAL_OPTYPES.EQOP:
        ans = applyRelationalOperator('==', first_operand, second_operand);
        break;
    case RELATIONAL_OPTYPES.NEQOP:
        ans = applyRelationalOperator('!=', first_operand, second_operand);
        break;
    }

    return ans;
};

function applyRelationalOperator(
    operator: string,
    first_operand: R.RValue,
    second_operand: R.RValue,
) : R.Logical {
    if (!isAllowedOperand(first_operand)) {
        error(`comparison is not allowed in ${first_operand.tag}`);
    } else if (!isAllowedOperand(second_operand)) {
        error(`comparison is not allowed in ${second_operand.tag}`);
    }

    let operands = {
        first_operand: first_operand as R.Logical | R.Int | R.Real | R.Character,
        second_operand: second_operand as R.Logical | R.Int | R.Real | R.Character,
    };

    // 1. Coercion to the same type
    // Note: Coercion of characters will convert it to its ASCII value and use that to
    // compare.
    if (operands.first_operand.tag !== operands.second_operand.tag) {
        operands = coerceTypes(
            first_operand as R.Logical | R.Int | R.Real,
            second_operand as R.Logical | R.Int | R.Real,
        );
    }

    // 2. Check vector lengths and do recycling
    if (operands.first_operand.data.length !==
        operands.second_operand.data.length) {
        operands = recycle(operands.first_operand, operands.second_operand);
    }

    // 3. Carry out operation
    const relational_result = relational_operators[operator](
        operands.first_operand.data,
        operands.second_operand.data,
    );

    // 4. Return result as a newly created logical vector
    return mkLogicals(relational_result);
}

function isAllowedOperand(operand: R.RValue): boolean {
    switch (operand.tag) {
    case 'character':
    case 'numeric':
    case 'integer':
    case 'logical':
        return true;
    default:
        return false;
    }
}

function coerceOperandToType(operand: R.Logical | R.Int | R.Real | R.Character, type: string) {
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
                } else if (operand.tag === 'character') {
                    return stringToSum(x);
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
    const type_hierarchy = ['logical', 'integer', 'numeric', 'character'];

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

function recycle(
    first_operand: R.Logical | R.Int | R.Real | R.Character,
    second_operand: R.Logical | R.Int | R.Real | R.Character,
) {
    let shorter_operand: R.Logical | R.Int | R.Real | R.Character;
    let longer_operand: R.Logical | R.Int | R.Real | R.Character;

    let is_longer_first;

    if (first_operand.data.length > second_operand.data.length) {
        longer_operand = first_operand;
        shorter_operand = second_operand;
        is_longer_first = true;
    } else {
        longer_operand = second_operand;
        shorter_operand = first_operand;
        is_longer_first = false;
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

    if (is_longer_first) {
        return {
            first_operand: longer_operand,
            second_operand: shorter_operand,
        };
    } else {
        return {
            first_operand: shorter_operand,
            second_operand: longer_operand,
        };
    }
}

function lesser(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return num !== null && other_num !== null ? num < other_num : null;
    });
}

function greater(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return num !== null && other_num !== null ? num > other_num : null;
    });
}

function lesserEqual(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return num !== null && other_num !== null ? num <= other_num : null;
    });
}

function greaterEqual(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return num !== null && other_num !== null ? num >= other_num : null;
    });
}

function equal(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return num !== null && other_num !== null ? num === other_num : null;
    });
}

function notEqual(
    first_operand_data: [number | null],
    second_operand_data: [number | null],
) {
    return first_operand_data.map((num, index) => {
        const other_num = second_operand_data[index];
        return num !== null && other_num !== null ? num !== other_num : null;
    });
}

