import {copy} from './copy';
import {error} from './error';
import * as R from './types';
import {getAtLinkedListIndex, length} from './util';
import {mkChar, mkInt, mkLogical, mkPairlist, mkReal, RNull} from './values';

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
