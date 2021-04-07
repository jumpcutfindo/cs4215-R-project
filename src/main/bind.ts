/*
*   This module handles binding in JORDAN (specifically the c(...) function).
*/

import {hasAttributes} from './attrib';
import {coerceTo} from './coerce';
import * as R from './types';
import {getNames, length} from './util';
import {mkChars, mkInts, mkLogicals, mkPairlist, mkReals, RNull} from './values';

const type_hierarchy = ['NULL', 'logical', 'integer', 'double', 'character', 'pairlist', 'list', 'expression'];

/*
*   do_c handles the combination of values into a vector or a list.
*
*   All arguments provided a coerced to a common type, which is the type of the returned value.
*   All attributes except 'names' are removed.
*/
export const do_c: R.PrimOp = (call, op, args, env) => {
    if (length(args) === 0) return RNull;
    const values: R.RValue[] = [];

    let isRecursive = false;
    let isUseNames = true;
    let curr = args;
    while (curr.tag !== RNull.tag) {
        if (curr.key === 'recursive' && curr.value.tag === 'logical') {
            isRecursive = curr.value.data[0] as boolean;
        } else if (curr.key === 'use.names' && curr.value.tag === 'logical') {
            isUseNames = curr.value.data[0] as boolean;
        } else {
            // Two places for the names:
            // 1. The key in the argument pairlist is already named
            // 2. The data itself holds the names
            if (hasAttributes(curr.value)) {
                let names: (string | null)[] = (getNames(curr.value) as R.Character).data;
                if (!names) {
                    names = [curr.key];
                }

                if (names.length != length(curr.value)) {
                    const object_length = length(curr.value);
                    names = [];
                    for (let i = 0; i < object_length; i ++) names.push('');
                }

                (curr.value as R.Logical).attributes = mkPairlist([mkChars(names), 'names']);
            }
            values.push(curr.value);
        }
        curr = curr.next;
    }

    return combineValues(values, isRecursive, isUseNames);
};

/*
*   Combines the values provided into a vector / list.
*
*   If 'recursive' argument is specified, any lists / pairlists within the arguments are flattened
*   and will end up as part of the result. The 'preserveNames' argument determines whether names are
*   to be preserved in the final result.
*/
function combineValues(values: R.RValue[], recursive: boolean, preserveNames: boolean): R.RValue {
    // 1. Check for expected output type, handle NULL type
    let outputType = getOutputType(values);
    if (outputType === 'NULL') return RNull;

    let actual_values;
    let names: (string | null)[] = [];
    if (recursive) {
        names = recursivelyExtractNames(values);
        actual_values = recursivelyExtractValues(values);

        if (outputType === 'expression') outputType = 'list';
    } else {
        actual_values = values;
    }

    // 2. Coerce all values to expected output type
    const coercedValues = [];

    for (const value of actual_values) {
        if (value.tag === RNull.tag) continue;
        const temp = coerceTo(value, outputType) as R.Logical | R.Int | R.Real | R.Character | R.List | R.Expression;
        transferNames(value as R.Logical | R.Int | R.Real | R.Character | R.List | R.Expression, temp);
        coercedValues.push(coerceTo(value, outputType));
    }

    // 3. Combine the data and create the new value
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
    case 'double':
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

    if (!preserveNames) {
        (output as R.Logical).attributes = RNull;
    } else {
        let hasNames: boolean = false;
        let names: (string | null)[] = [];

        for (const value of values) {
            const name = getNames(value);

            if (name.tag !== RNull.tag) {
                if (name.data.length !== 1) {
                    for (const n of name.data) if (n !== '') hasNames = true;
                    names = names.concat(name.data);
                } else {
                    if (name.data[0] !== '') hasNames = true;
                    names.push(name.data[0]);
                }
            }
        }

        if (hasNames) {
            (output as R.Logical).attributes = mkPairlist([mkChars(names), 'names']);
        }
    }

    return output;
}

/*
*   Transfers names (if existing) from one operand to another.
*/
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

/*
*   Determines the output type using the type hierarchy.
*   It takes the type of the value with the highest level in the type hierarchy.
*/
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

/*
*   Recursively flattens lists and pairlists.
*/
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

/*
*   Recursively retrieves the names of lists and pairlists.
*/
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
