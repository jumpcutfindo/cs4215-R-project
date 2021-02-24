import {copy} from './copy';
import {error} from './error';
import * as R from './types';
import {getAtLinkedListIndex, length} from './util';
import {mkChar, mkChars, mkInt, mkInts, mkList, mkLogical, mkLogicals, mkPairlist, mkReal, mkReals, RNull} from './values';

/**
 * Implementation for '[' subsetting
 */
function do_subset() {

}

/**
 * Implementation for '[[' subsetting
 */

function do_subset2() {
    // Extract a single value at a specific index (note that R indexing begins from 1)
}

/**
 * Implementation for '$' subsetting
 */
function do_subset3() {
    if (!isSubsettableList) {
        error('$ operator is invalid for atomic vectors');
        return;
    }
}

function extractSingleAtIndex(x: R.RValue, index: number) {
    if (!isSubsettable(x)) {
        error('not a subsettable type');
        return;
    }
    if (isIndexOutOfBounds(x, index)) {
        error('subscript out of bounds');
        return;
    }

    let ans;

    switch (x.tag) {
    case 'logical':
        ans = mkLogical(x.data[index]);
        break;
    case 'integer':
        ans = mkInt(x.data[index]);
        break;
    case 'numeric':
        ans = mkReal(x.data[index]);
        break;
    case 'character':
        ans = mkChar(x.data[index]);
        break;
    case 'expression':
        ans = copy(x.data[index]);
        break;
    case 'list':
        ans = copy(x.data[index]);
        break;
    case 'pairlist':
        const temp = getAtLinkedListIndex(x, index);
        if (temp === RNull) ans = RNull;
        else {
            ans = (temp as R.PairList).value;
        }
        break;
    default:
        ans = RNull;
        break;
    }

    return ans;
}

function extractSingleByName(x: R.RValue, name: string, exact: boolean = true) {
    if (!isSubsettable(x)) {
        error('not a subsettable type');
        return;
    }

    let ans;

    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
        let names: R.PairList | R.Nil = x.attributes;
        while (names.tag !== RNull.tag) {
            if (names.key === 'names') break;
            names = names.next;
        }

        if (names.tag === RNull.tag) {
            error('subscript out of bounds');
            return;
        }

        const nameValues = names.value as R.Character;

        if (!exact) {
            const matches = nameValues.data.filter((n) => n?.includes(name));
            if (matches.length !== 1) {
                error('subscript out of bounds');
                return;
            } else {
                ans = extractSingleAtIndex(x, nameValues.data.indexOf(matches[0]));
            }
        } else {
            if (nameValues.data.indexOf(name) !== -1) {
                ans = extractSingleAtIndex(x, nameValues.data.indexOf(name));
            } else {
                error('subscript out of bounds');
                return;
            }
        }
        break;
    case 'pairlist':
        let curr: R.PairList | R.Nil = x;

        if (!exact) {
            const matches = [];
            while (curr.tag !== RNull.tag) {
                if (curr.key.includes(name)) {
                    matches.push(curr);
                }
                curr = curr.next;
            }

            if (matches.length === 0) return RNull;

            if (matches.length !== 1) {
                error('subscript out of bounds');
                return;
            } else {
                ans = copy(matches[0].value);
            }
        } else {
            while (curr.tag !== RNull.tag) {
                if (curr.key === name) {
                    break;
                }
                curr = curr.next;
            }

            if (curr === RNull) return RNull;
            else {
                ans = copy((curr as R.PairList).value);
            }
        }

        break;
    default:
        ans = RNull;
        break;
    }

    return ans;
}

function extractMultipleAtIndexes(x: R.RValue, indexes: number[]) {
    if (!isSubsettable(x)) {
        error('not a subsettable type');
        return;
    }

    let ans;

    switch (x.tag) {
    case 'logical':
        ans = mkLogicals(indexes.map((index) => {
            return index < x.data.length ? x.data[index] : null;
        }));
        break;
    case 'integer':
        ans = mkInts(indexes.map((index) => {
            return index < x.data.length ? x.data[index] : null;
        }));
        break;
    case 'numeric':
        ans = mkReals(indexes.map((index) => {
            return index < x.data.length ? x.data[index] : null;
        }));
        break;
    case 'character':
        ans = mkChars(indexes.map((index) => {
            return index < x.data.length ? x.data[index] : null;
        }));
        break;
    case 'expression':
        ans = {
            attributes: RNull,
            refcount: 0,
            tag: 'expression',
            data: indexes.map((index) => {
                return index < x.data.length ? copy(x.data[index]) : RNull;
            }),
        } as R.Expression;
        break;
    case 'list':
        const temp = indexes.map((index) => {
            return index < x.data.length ? copy(x.data[index]) : RNull;
        });

        ans = {
            attributes: RNull,
            refcount: 0,
            tag: 'list',
            data: temp,
        } as R.List;
        break;
    case 'pairlist':
        let curr: R.PairList | R.Nil = x;
        let index: number = 0;
        let indexes_curr: number = 0;
        const names = [];
        const values: R.RValue[] = [];
        while (curr.tag !== RNull.tag) {
            if (index === indexes[indexes_curr]) {
                names.push(curr.key);
                values.push(curr.value);
                indexes_curr ++;
            }
            curr = curr.next;
            index ++;
        }

        while (indexes_curr < indexes.length) {
            names.push(null);
            values.push(RNull);
            indexes_curr ++;
        }
        ans = {
            attributes: mkPairlist([mkChars(names), 'names']),
            refcount: 0,
            tag: 'list',
            data: values,
        } as R.List;
        break;
    default:
        ans = RNull;
        break;
    }

    if (ans && ans.tag !== RNull.tag && x.tag !== 'pairlist' && isNamedVector(x)) {
        const names: R.Character | R.Nil = getNamesAttributeOfVector(
            x as R.Logical | R.Int | R.Real | R.Character | R.Expression | R.List | R.PairList,
        );

        if (names.tag !== RNull.tag) {
            const newNames: (string | null)[] = indexes.map(
                (index) => index < names.data.length ? names.data[index] : null,
            );
            ans.attributes = mkPairlist([mkChars(newNames), 'names']);
        }
    }

    return ans;
}

function isSubsettable(x: R.RValue) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
    case 'NULL':
        return true;
    default:
        return false;
    }
}

function isIndexOutOfBounds(x: R.RValue, index: number) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
        return index >= x.data.length;
    case 'pairlist':
        return index >=length(x as R.PairList);
    case 'NULL':
        return false;
    default:
        return;
    }
}

function isSubsettableList(x: R.RValue) {
    switch (x.tag) {
    case 'list':
    case 'pairlist':
    case 'NULL':
        return true;
    default:
        return false;
    }
}

function isNamedVector(x: R.RValue) {
    switch (x.tag) {
    case 'logical':
    case 'integer':
    case 'numeric':
    case 'character':
    case 'expression':
    case 'list':
    case 'pairlist':
        let curr = x.attributes;
        while (curr.tag !== RNull.tag) {
            if (curr.key === 'names') {
                return true;
            }
            curr = curr.next;
        }
        return false;
    default:
        return false;
    }
}

function getNamesAttributeOfVector(
    x: R.Logical | R.Int | R.Real | R.Character | R.Expression | R.List | R.PairList,
): R.Character | R.Nil {
    let curr = x.attributes;

    while (curr.tag !== RNull.tag) {
        if (curr.key === 'names') {
            return curr.value as R.Character;
        }
        curr = curr.next;
    }

    return curr;
}