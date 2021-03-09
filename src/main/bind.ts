import {copy} from './copy';
import {error} from './error';
import * as R from './types';
import {getNames} from './util';
import {mkChar, mkChars, mkInt, mkInts, mkLang, mkList,
    mkLogical, mkLogicals, mkPairlist, mkReal,
    mkReals, RNull} from './values';

const type_hierarchy = ['NULL', 'logical', 'integer', 'numeric', 'character', 'pairlist', 'list', 'expression'];

export const do_c: R.PrimOp = (call, op, args, env) => {
    return RNull;
};

function combineValues(values: R.RValue[], recursive: boolean): R.RValue {
    // 1. Check if the values provided are combinable
    if (!isCombinable) {
        error('Not combinable');
    }

    // 2. Check for expected output type, handle NULL type
    const outputType = getOutputType(values);
    if (outputType === 'NULL') return RNull;

    let actual_values;
    let names: (string | null)[] = [];
    if (recursive) {
        names = recursivelyExtractNames(values);
        actual_values = recursivelyExtractValues(values);
    } else {
        actual_values = values;
    }

    // 3. Coerce all values to expected output type
    const coercedValues = [];

    for (const value of actual_values) {
        if (value.tag === RNull.tag) continue;
        coercedValues.push(
            coerceToType(
                value as R.Logical | R.Int | R.Real | R.Character | R.PairList | R.List | R.Expression, outputType,
            ),
        );
    }

    // 4. Combine the data and create the new value
    let output: R.RValue = RNull;
    switch (outputType) {
    case 'logical':
        let newLogicals: (boolean | null)[] = [];
        for (const logical of coercedValues as R.Logical[]) {
            newLogicals = newLogicals.concat(logical.data);
        }

        output = mkLogicals(newLogicals);
        break;
    case 'integer':
        let newInts: (number | null)[] = [];
        for (const integer of coercedValues as R.Int[]) {
            newInts = newInts.concat(integer.data);
        }

        output = mkInts(newInts);
        break;
    case 'numeric':
        let newReals: (number | null)[] = [];
        for (const integer of coercedValues as R.Real[]) {
            newReals = newReals.concat(integer.data);
        }

        output = mkReals(newReals);
        break;
    case 'character':
        let newChars: (string | null)[] = [];
        for (const character of coercedValues as R.Character[]) {
            newChars = newChars.concat(character.data);
        }

        output = mkChars(newChars);
        break;
    case 'list':
        let newListVals: R.RValue[] = [];
        const newListNames: R.Character = {
            attributes: RNull,
            refcount: 0,
            tag: 'character',
            data: [],
        };
        for (const list of coercedValues as R.List[]) {
            newListVals = newListVals.concat(list.data);

            const listNames = getNames(list);
            if (listNames.tag !== RNull.tag) {
                newListNames.data = newListNames.data.concat(listNames.data);
            } else {
                const temp = list.data.map(() => '');
                newListNames.data = newListNames.data.concat(temp);
            }
        }

        output = {
            attributes: mkPairlist([newListNames, 'names']),
            refcount: 0,
            tag: 'list',
            data: newListVals,
        } as R.List;
        break;
    case 'expression':
        let newExprVals: R.RValue[] = [];
        const newExprNames: R.Character = {
            attributes: RNull,
            refcount: 0,
            tag: 'character',
            data: [],
        };

        for (const expr of coercedValues as R.Expression[]) {
            newExprVals = newExprVals.concat(expr.data);

            const listNames = getNames(expr);
            if (listNames.tag !== RNull.tag) {
                newExprNames.data = newExprNames.data.concat(listNames.data);
            } else {
                const temp = expr.data.map(() => '');
                newExprNames.data = newExprNames.data.concat(temp);
            }
        }

        output = {
            attributes: mkPairlist([newExprNames, 'names']),
            refcount: 0,
            tag: 'expression',
            data: newExprVals,
        } as R.Expression;
        break;
    }

    if (recursive && names.length !== 0) {
        (output as R.Logical).attributes = mkPairlist([mkChars(names), 'names']);
    }

    return output;
}

/*
    coerceToType makes the assumption that coercion will follow the type hierarchy
    i.e. if the expected type is some type, then the operand supplied will be
    assumed to be below that particular type in the type hierarchy.
*/
function coerceToType(
    operand: R.Logical | R.Int | R.Real | R.Character | R.PairList | R.List | R.Expression,
    type: string,
) {
    let ans;

    switch (type) {
    case 'logical':
        operand = operand as R.Logical;
        ans = mkLogicals(operand.data);
        transferNames(operand, ans);
        break;
    case 'integer':
        operand = operand as R.Logical | R.Int;
        if (operand.tag === 'logical') {
            ans = mkInts(operand.data.map((x) => {
                return x !== null ? (x ? 1 : 0) : null;
            }));
        } else ans = mkInts(operand.data);
        transferNames(operand, ans);
        break;
    case 'numeric':
        operand = operand as R.Logical | R.Int | R.Real;
        if (operand.tag === 'logical') {
            ans = mkReals(operand.data.map((x) => {
                return x !== null ? (x ? 1 : 0) : null;
            }));
        } else ans = mkReals(operand.data);
        transferNames(operand, ans);
        break;
    case 'character':
        operand = operand as R.Logical | R.Int | R.Real | R.Character;
        if (operand.tag === 'logical') {
            ans = mkChars(operand.data.map((x) => {
                return x !== null ? (x ? 'true' : 'false') : null;
            }));
        } else if (operand.tag === 'integer' || operand.tag === 'numeric') {
            ans = mkChars(operand.data.map((x) => {
                return x !== null ? x.toString() : null;
            }));
        } else ans = mkChars(operand.data);
        transferNames(operand, ans);
        break;
    case 'list':
        operand = operand as R.Logical | R.Int | R.Real | R.Character | R.PairList | R.List;
        if (operand.tag === 'list') {
            ans = copy(operand) as R.List;
            transferNames(operand, ans);
        } else if (operand.tag === 'pairlist') {
            const data: R.RValue[] = [];
            let curr: R.PairList | R.Nil = operand;
            while (curr.tag !== RNull.tag) {
                if (curr.tag === 'pairlist') data.push(curr.value);
                curr = curr.next;
            }

            const namesList: R.Character | R.Nil = getNames(operand);
            let names;
            if (namesList.tag === RNull.tag) {
                names = data.map(() => '');
            } else {
                names = namesList.data;
            }

            const namesObject: R.Character = mkChars(names);

            ans = {
                attributes: mkPairlist([namesObject, 'names']),
                refcount: 0,
                tag: 'list',
                data: data,
            };
        } else {
            const namesList: R.Character | R.Nil = getNames(operand);
            let names = [];
            if (namesList.tag === RNull.tag) {
                for (const item of operand.data) {
                    names.push('');
                }
            } else {
                names = namesList.data;
            }

            const data: R.RValue[] = [];

            for (const item of operand.data) {
                switch (operand.tag) {
                case 'logical':
                    data.push(mkLogical(item as (boolean | null)));
                    break;
                case 'integer':
                    data.push(mkInt(item as (number | null)));
                    break;
                case 'numeric':
                    data.push(mkReal(item as (number | null)));
                    break;
                case 'character':
                    data.push(mkChar(item as (string | null)));
                    break;
                }
            }

            const namesObject: R.Character = mkChars(names);
            ans = {
                attributes: mkPairlist([namesObject, 'names']),
                refcount: 0,
                tag: 'list',
                data: data,
            };
        }
        break;
    case 'expression':
        operand = operand as R.Logical | R.Int | R.Real | R.Character | R.PairList | R.List | R.Expression;

        if (operand.tag === 'expression') {
            ans = copy(operand) as R.Expression;
            transferNames(operand, ans);
        } else if (operand.tag === 'list') {
            ans = {
                attributes: mkPairlist([getNames(operand), 'names']),
                refcount: 0,
                tag: 'expression',
                data: operand.data,
            } as R.Expression;
        } else if (operand.tag === 'pairlist') {
            const data: R.RValue[] = [];
            let curr: R.PairList | R.Nil = operand;
            while (curr.tag !== RNull.tag) {
                if (curr.tag === 'pairlist') data.push(curr.value);
                curr = curr.next;
            }

            const namesList: R.Character | R.Nil = getNames(operand);
            let names;
            if (namesList.tag === RNull.tag) {
                names = data.map(() => '');
            } else {
                names = namesList.data;
            }

            const namesObject: R.Character = mkChars(names);

            ans = {
                attributes: mkPairlist([namesObject, 'names']),
                refcount: 0,
                tag: 'expression',
                data: data,
            } as R.Expression;
        } else {
            const namesList: R.Character | R.Nil = getNames(operand);
            let names = [];
            if (namesList.tag === RNull.tag) {
                for (const item of operand.data) {
                    names.push('');
                }
            } else {
                names = namesList.data;
            }

            const data: R.RValue[] = [];

            for (const item of operand.data) {
                switch (operand.tag) {
                case 'logical':
                    data.push(mkLogical(item as (boolean | null)));
                    break;
                case 'integer':
                    data.push(mkInt(item as (number | null)));
                    break;
                case 'numeric':
                    data.push(mkReal(item as (number | null)));
                    break;
                case 'character':
                    data.push(mkChar(item as (string | null)));
                    break;
                }
            }

            const namesObject: R.Character = mkChars(names);
            ans = {
                attributes: mkPairlist([namesObject, 'names']),
                refcount: 0,
                tag: 'expression',
                data: data,
            } as R.Expression;
        }
        break;
    default:
        ans = RNull;
    }

    return ans;
}

// This function will add the 'names' attribute to the vector / list if it exists
function transferNames(
    from_operand: R.Logical | R.Int | R.Real | R.Character | R.List | R.Expression,
    to_operand: R.Logical | R.Int | R.Real | R.Character | R.List | R.Expression,
) {
    const namesList: R.Character | R.Nil = getNames(from_operand);
    let names;
    if (namesList.tag !== RNull.tag) {
        names = namesList.data;
        const namesObject: R.Character = mkChars(names);
        to_operand.attributes = mkPairlist([namesObject, 'names']);
    }
}

function getOutputType(values: R.RValue[]): string {
    let ans: string = 'NULL';
    let val = -1;

    for (const value of values) {
        const index = type_hierarchy.indexOf(value.tag);
        if (type_hierarchy.indexOf(value.tag) > val) {
            val = index;
            ans = type_hierarchy[index];
        }
    }

    // Note: pairlists are treated as lists
    if (ans === 'pairlist') ans = 'list';

    return ans;
}

function isCombinable(values: R.RValue[]) {
    const ans = values.map((value) => {
        return type_hierarchy.indexOf(value.tag) !== -1;
    });

    return ans.indexOf(false) === -1;
}

function recursivelyExtractValues(values: R.RValue[]) {
    let output: R.RValue[] = [];
    for (const value of values) {
        switch (value.tag) {
        case 'list':
            let listOutputData: R.RValue[] = [];
            for (const data of value.data) {
                listOutputData = listOutputData.concat(recursivelyExtractValues([data]));
            }
            output = output.concat(listOutputData);
            break;
        case 'language':
        case 'pairlist':
            let plOutputData: R.RValue[] = [];
            let curr: R.PairList | R.Language | R.Nil = value;
            while (curr.tag !== RNull.tag) {
                plOutputData = plOutputData.concat(recursivelyExtractValues([curr.value]));
                curr = curr.next;
            }
            output = output.concat(plOutputData);
            break;
        default:
            output.push(value);
            break;
        }
    }

    return output;
}

function recursivelyExtractNames(values: R.RValue[]) {
    let output: (string | null)[] = [];
    for (const value of values) {
        switch (value.tag) {
        case 'list':
            let list_names = [];
            if (getNames(value).tag === RNull.tag) {
                for (const item of value.data) list_names.push('');
            } else {
                list_names = (getNames(value) as R.Character).data;
            }

            let list_index = 0;
            for (const list_item of value.data) {
                if (list_item.tag === 'list' || list_item.tag === 'pairlist' || list_item.tag === 'language') {
                    output = output.concat(recursivelyExtractNames([list_item]));
                } else {
                    output.push(list_names[list_index]);
                }
                list_index ++;
            }

            break;
        case 'language':
        case 'pairlist':
            let plist_names = [];
            if (getNames(value).tag === RNull.tag) {
                let curr: R.PairList | R.Language | R.Nil = value;
                while (curr.tag !== RNull.tag) {
                    plist_names.push('');
                    curr = curr.next;
                }
            } else {
                plist_names = (getNames(value) as R.Character).data;
            }

            let curr: R.PairList | R.Language | R.Nil = value;
            let plist_index = 0;
            while (curr.tag !== RNull.tag) {
                if (curr.value.tag === 'list' || curr.value.tag === 'pairlist' ||curr.value.tag === 'language') {
                    output = output.concat(recursivelyExtractNames([curr.value]));
                } else {
                    output.push(plist_names[plist_index]);
                }
                plist_index ++;
                curr = curr.next;
            }

            break;
        default:
            if (getNames(value).tag === RNull.tag) {
                output.push('');
            } else {
                output = output.concat((getNames(value) as R.Character).data);
            }
            break;
        }
    }

    return output;
}

// =========== c() TESTS ===========
// const type_hierarchy =
//  ['NULL', 'logical', 'integer', 'numeric', 'character', 'pairlist', 'list', 'expression'];
const null_value = RNull;
const logical_value = mkLogicals([true, false, true]);
(logical_value as R.Logical).attributes = {
    attributes: RNull,
    key: 'names',
    value: mkChars(['logical_01', 'logical_02', 'logical_03']),
    tag: 'pairlist',
    refcount: 0,
} as R.PairList;
const integer_value = mkInts([1, 2, 3, 4]);
const numeric_value = mkReals([100, 101, 102, 103]);
const char_value = mkChars(['a', 'b', 'c', 'd']);
const pairlist_value = mkPairlist([mkInt(1), 'abc'], [mkInt(2), 'xyz']);

(pairlist_value as R.PairList).attributes = {
    attributes: RNull,
    key: 'names',
    value: mkChars(['abc', 'xyz']),
    tag: 'pairlist',
    refcount: 0,
} as R.PairList;

const list_value = mkList([mkInt(1000), 'hello'], [mkInt(2000), 'world']);
const expression_value = {
    attributes: RNull,
    refcount: 0,
    tag: 'expression',
    data: [mkLang([mkChar('5 + 5')], [RNull])],
} as R.Expression;

const list_1 = mkList([list_value, 'list_1'], [pairlist_value, 'plist_1'], [expression_value, 'expr_1']);

console.log('actual: ');
console.log(combineValues([logical_value, list_1, expression_value], true));
console.log('attributes: ');
console.log((combineValues([logical_value, list_1, expression_value], true) as R.List).attributes);
console.log('values: ');
console.log((combineValues([logical_value, list_1, expression_value], true) as R.List).data);
