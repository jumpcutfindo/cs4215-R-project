import {Character, List, Logical, Nil, PairList, Raw, RValue} from './types';
import {mkChar, mkLogical, mkPairlist, RNull} from './values';

const types_with_attributes = [
    'list', 'pairlist', 'raw', 'logical',
    'integer', 'numeric', 'character', 'environment',
    'closure', 'promise', 'language', 'expression',
];

function do_attr() {

}

function do_attributes() {
    // If is null, coerce to an empty list
}

function set_attribute(vec: RValue, key: string, val: RValue) {
    if (vec.tag === RNull.tag) {
        console.error('invalid (NULL) left side of argument');
        return;
    }

    if (!has_attributes(vec)) {
        console.error('attributes are not allowed on the given type');
        return RNull;
    }

    if (val.tag === RNull.tag) {
        remove_attribute(vec, key);
        return;
    }

    const vector = vec as Raw;

    let prev_attribute: PairList | Nil = RNull;
    let attribute: PairList | Nil = vector.attributes;

    while (attribute.tag !== RNull.tag) {
        if (attribute.key === key) {
            // Exists in the pairlist
            attribute.value = val;
            return;
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

function set_attributes(vec: RValue, list: RValue) {
    if (list.tag !== 'pairlist') {
        console.error('attributes must be a list or NULL');
        return RNull;
    }

    if (!has_attributes(vec)) {
        console.error('attributes are not allowed on the given type');
        return RNull;
    }

    const vector = vec as Raw;
    vector.attributes = list as PairList;
}

function get_attribute(vec: RValue, which: string, match: boolean = false) {
    if (vec.tag === RNull.tag) {
        return RNull;
    }

    if (!has_attributes(vec)) {
        console.error('attributes are not allowed on the given type');
        return RNull;
    }

    const vector = vec as Raw;

    if (match) {
        let attribute: PairList | Nil = vector.attributes;

        while (attribute.tag !== RNull.tag) {
            if (attribute.key === which) {
                return attribute;
            }
            attribute = attribute.next;
        }

        return RNull;
    } else {
        let attribute: PairList | Nil = vector.attributes;

        const potential_attributes = [];

        while (attribute.tag !== RNull.tag) {
            if (attribute.key.includes(which)) {
                if (attribute.key === which) return attribute;
                potential_attributes.push(attribute);
            }
            attribute = attribute.next as PairList;
        }

        if (potential_attributes.length == 1) {
            return potential_attributes[0];
        }

        return RNull;
    }
}

function get_attributes(vec: RValue) {
    if (vec.tag === RNull.tag) {
        return RNull;
    }

    if (!has_attributes(vec)) {
        console.error('attributes are not allowed on the given type');
        return RNull;
    }

    return (vec as Raw).attributes;
}

function remove_attribute(vec: RValue, key: string) {
    const vector = vec as Raw;

    let prev_attribute: PairList | Nil = RNull;
    let attribute: PairList | Nil = vector.attributes;

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

function has_attributes(vec: RValue): boolean {
    return types_with_attributes.indexOf(vec.tag) !== -1;
}
