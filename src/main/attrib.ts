import {copy} from './copy';
import {error} from './error';
import * as R from './types';
import {mkPairlist, RNull} from './values';


function do_attr() {

}

function do_attributes() {
    // If is null, coerce to an empty list
}

function setAttribute(vec: R.RValue, key: string, val: R.RValue) {
    if (vec.tag === RNull.tag) {
        error('invalid (NULL) left side of argument');
        return;
    }

    if (!hasAttributes(vec)) {
        error('attributes are not allowed on the given type');
        return RNull;
    }

    if (val.tag === RNull.tag) {
        removeAttribute(vec, key);
        return;
    }

    const vector = vec as R.PairList;

    let prev_attribute: R.PairList | R.Nil = RNull;
    let attribute: R.PairList | R.Nil = vector.attributes;

    while (attribute.tag !== RNull.tag) {
        if (attribute.key === key) {
            // Exists in the pairlist
            const new_attribute = copy(attribute) as R.PairList;
            new_attribute.value = val;

            if (prev_attribute.tag !== RNull.tag) {
                prev_attribute.next = new_attribute;
            }
            new_attribute.next = attribute.next;
        }
        prev_attribute = attribute;
        attribute = attribute.next;
    }

    if (attribute.tag === RNull.tag && prev_attribute.tag === 'pairlist') {
        // Doesn't exist in the pairlist
        const new_attribute = mkPairlist([val, key]);
        prev_attribute.next = new_attribute;
    }
}

function setAttributes(vec: R.RValue, list: R.RValue) {
    if (list.tag !== 'pairlist') {
        error('attributes must be a list or NULL');
        return RNull;
    }

    if (!hasAttributes(vec)) {
        error('attributes are not allowed on the given type');
        return RNull;
    }

    const vector = vec as R.PairList;
    vector.attributes = list as R.PairList;
}

export function getAttribute(vec: R.RValue, which: string, match: boolean = false) : R.RValue {
    if (vec.tag === RNull.tag) {
        return RNull;
    }

    if (!hasAttributes(vec)) {
        error('attributes are not allowed on the given type');
        return RNull;
    }

    const vector = vec as R.PairList;

    if (match) {
        let attribute: R.PairList | R.Nil = vector.attributes;

        while (attribute.tag !== RNull.tag) {
            if (attribute.key === which) {
                return attribute.value;
            }
            attribute = attribute.next;
        }

        return RNull;
    } else {
        let attribute: R.PairList | R.Nil = vector.attributes;

        const potential_attributes = [];

        while (attribute.tag !== RNull.tag) {
            if (attribute.key.includes(which)) {
                if (attribute.key === which) return attribute;
                potential_attributes.push(attribute);
            }
            attribute = attribute.next as R.PairList;
        }

        if (potential_attributes.length == 1) {
            return potential_attributes[0];
        }

        return RNull;
    }
}

function getAttributes(vec: R.RValue) {
    if (vec.tag === RNull.tag) {
        return RNull;
    }

    if (!hasAttributes(vec)) {
        error('attributes are not allowed on the given type');
        return RNull;
    }

    return (vec as R.PairList).attributes;
}

function removeAttribute(vec: R.RValue, key: string) {
    const vector = vec as R.PairList;

    let prev_attribute: R.PairList | R.Nil = RNull;
    let attribute: R.PairList | R.Nil = vector.attributes;

    while (attribute.tag !== RNull.tag) {
        if (attribute.key === key) {
            // Exists in the pairlist
            if (prev_attribute.tag !== RNull.tag) {
                prev_attribute.next = attribute.next;
            }
            return;
        }
        prev_attribute = attribute;
        attribute = attribute.next;
    }
}

function attributesToList(vec: R.RValue) : R.List {
    const keys = [];
    const values = [];
    let attribute = (vec as R.PairList).attributes;

    while (attribute.tag !== RNull.tag) {
        keys.push(attribute.key);
        values.push(attribute.value);
        attribute = attribute.next;
    }

    const names = {
        attributes: RNull,
        refcount: 0,
        tag: 'character',
        data: keys,
    } as R.Character;

    return {
        attributes: mkPairlist([names, 'names']),
        refcount: 0,
        tag: 'list',
        data: values,
    } as R.List;
}

export function hasAttributes(vec: R.RValue): boolean {
    switch (vec.tag) {
    case ('list'):
    case ('pairlist'):
    case ('logical'):
    case ('integer'):
    case ('numeric'):
    case ('character'):
    case ('environment'):
    case ('closure'):
    case ('promise'):
    case ('language'):
    case ('expression'):
        return true;
    default:
        return false;
    }
}
