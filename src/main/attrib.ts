import {copy} from './copy';
import {error} from './error';
import * as R from './types';
import {getNames, head, length, tail} from './util';
import {mkChar, mkChars, mkInt, mkInts, mkPairlist, mkReals, RNull} from './values';

// Get a specific attribute's value
export const do_attr: R.PrimOp = (call, op, args, env) => {
    const vec = head(args);
    const attribute = head(tail(args));

    if (attribute.tag !== 'character') {
        error(`'which' must be of mode character`);
    } else if (attribute.data.length > 1) {
        error(`'exactly one attribute 'which' must be given`);
    } else if (attribute.data[0] === null) {
        return RNull;
    }

    return getAttribute(vec, attribute.data[0]);
};

export const do_attributes: R.PrimOp = (call, op, args, env) => {
    const vec = head(args);

    return getAttributes(vec);
};

export const do_attributesgets: R.PrimOp = (call, op, args, env) => {
    const vec = head(args);
    const attributes = head(tail(args));

    if (attributes.tag !== 'list') {
        error('attributes must be a list or NULL');
    }

    if (!hasAttributes(vec)) {
        error('attributes are not allowed on the given type');
    }

    setAttributes(vec, attributes);

    return vec;
};

// Set a specific attribute
function do_attrgets() {

}

function setAttribute(vec: R.RValue, key: string, val: R.RValue) {
    if (vec.tag === RNull.tag) {
        error('attempt to set an attribute on NULL');
    }

    if (val.tag === RNull.tag) {
        removeAttribute(vec, key);
    }

    // Ignoring special cases of 'row.names' and 'tsp'
    switch (key) {
    case 'class':
        setClass(vec, val);
        break;
    case 'comment':
        setComment(vec, val);
        break;
    case 'dim':
        setDim(vec, val);
        break;
    case 'dimnames':
        setDimNames(vec, val);
        break;
    case 'names':
        setNames(vec, val);
        break;
    default:
        setNormalAttribute(vec, key, val);
        break;
    }
}

function setAttributes(vec: R.RValue, list: R.List) {
    const names = getNames(vec);

    if (names.tag === RNull.tag) {
        error('attributes must be named');
    }

    if (names.data.length !== list.data.length) {
        error('all attributes must have names');
    }

    for (let i = 0; i < list.data.length; i ++) {
        if (names.data[i] !== null) {
            setAttribute(vec, names.data[i] as string, list.data[i]);
        }
    }
}

export function getAttribute(vec: R.RValue, which: string, match: boolean = false) : R.RValue {
    if (vec.tag === RNull.tag) {
        return RNull;
    }

    if (!hasAttributes(vec)) {
        error('attributes are not allowed on the given type');
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
                if (attribute.key === which) return attribute.value;
                potential_attributes.push(attribute);
            }
            attribute = attribute.next as R.PairList;
        }

        if (potential_attributes.length == 1) {
            return potential_attributes[0].value;
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
    }

    if ((vec as R.Logical).attributes.tag === RNull.tag) {
        return RNull;
    }

    if (vec.tag === 'pairlist') {
        const names = getNames(vec);
        const start = mkPairlist([names, 'names']) as R.PairList;
        start.next = vec.attributes;

        return attributesToList(start);
    } else {
        return attributesToList((vec as R.Logical).attributes);
    }
}

function removeAttribute(vec: R.RValue, key: string) {
    let curr: R.PairList | R.Nil = (vec as R.Logical).attributes;
    let start = curr;

    if (start.tag !== RNull.tag && start.key === key) {
        start = start.next;
    }

    while (curr.tag !== RNull.tag && curr.next.tag !== RNull.tag) {
        if (curr.next.key === key) {
            curr.next = curr.next.next;
            break;
        }
        curr = curr.next;
    }

    (vec as R.Logical).attributes = start;
}

function setNormalAttribute(vec: R.RValue, key: string, val: R.RValue) {
    const dimAttribute: R.RValue = getAttribute(vec, 'dim', true);

    let is_key_set = false;

    // If the dimensions have been specified, we copy that first before moving
    // on to the rest of the attributes
    if (dimAttribute.tag !== RNull.tag) {
        removeAttribute(vec, 'dim');
        let curr: R.PairList | R.Nil = copy((vec as R.Logical).attributes) as R.PairList;
        const start: R.PairList = mkPairlist([dimAttribute, 'dim']) as R.PairList;
        start.next = curr;

        while (curr.tag !== RNull.tag) {
            if (curr.key === key) {
                curr.value = val;
                is_key_set = true;
            }
            curr = curr.next;
        }

        (vec as R.Logical).attributes = start;
    } else {
        let curr: R.PairList | R.Nil = copy((vec as R.Logical).attributes) as R.PairList;
        const start: R.PairList | R.Nil = curr;

        while (curr.tag !== RNull.tag) {
            if (curr.key === key) {
                curr.value = val;
                is_key_set = true;
            }
            curr = curr.next;
        }

        (vec as R.Logical).attributes = start;
    }

    // Checks whether the key has been set
    if (!is_key_set) {
        if ((vec as R.Logical).attributes.tag === RNull.tag) {
            (vec as R.Logical).attributes = mkPairlist([val, key]);
        } else {
            let curr = (vec as R.Logical).attributes as R.PairList;
            while (curr.next.tag !== RNull.tag) {
                curr = curr.next;
            }
            curr.next = mkPairlist([val, key]);
        }
    }
}

function setClass(vec: R.RValue, val: R.RValue) {
    if (val.tag !== 'character') {
        error(`attempt to set invalid 'class' attribute`);
    }

    setNormalAttribute(vec, 'class', val);
}

function setComment(vec: R.RValue, val: R.RValue) {
    if (val.tag !== 'character') {
        error(`attempt to set invalid 'comment' attribute`);
    }

    setNormalAttribute(vec, 'comment', val);
}

function setDim(vec: R.RValue, val: R.RValue) {
    let new_val = val;
    // Ensure value provided is either a vector or null
    if (val.tag === RNull.tag || !isVector(val)) {
        error('invalid second argument, must be vector or NULL');
    }

    // Attempt to coerce values to integer, take first value regardless
    new_val = coerceToInt(val);

    // Must not be null or negative
    if (new_val.tag !== RNull.tag && new_val.data[0] === null) {
        if (new_val.data[0] === null) {
            error(`the dims contain missing values`);
        } else {
            if (new_val.data[0] < 0) {
                error(`the dims contain negative values`);
            }
        }
    }

    // Must match length of vector
    // TODO: Handle matrices and dataframes
    if (new_val.tag !== RNull.tag && new_val.data[0] !== length(vec)) {
        error(`dims [${new_val.data[0]}] do not match the length of the object [${length(vec)}]`);
    }

    const dimAttribute: R.RValue = getAttribute(vec, 'dim', true);

    // If the dimensions have been specified, we delete it and replace with our new dims
    if (dimAttribute.tag !== RNull.tag) {
        removeAttribute(vec, 'dim');
    }
    const curr: R.PairList | R.Nil = copy((vec as R.Logical).attributes) as R.PairList;
    const start: R.PairList = mkPairlist([new_val, 'dim']) as R.PairList;
    start.next = curr;

    (vec as R.Logical).attributes = start;
}

function setDimNames(vec: R.RValue, val: R.RValue) {
    // Must be a list
    if (val.tag !== 'list') {
        error(`'dimnames' must be a list`);
    } else {
        // Value must be a list of length identical to the dimensions
        const dims: R.Int | R.Nil = getAttribute(vec, 'dim', true) as R.Int | R.Nil;
        if (dims.tag !== RNull.tag) {
            for (let i = 0; i < val.data.length; i++) {
                if (length(val.data[i]) !== dims.data[i]) {
                    error(`length of 'dimnames[${i + 1}] not equal to array extent`);
                }
            }
        }
    }

    setNormalAttribute(vec, 'dimnames', val);
}

function setNames(vec: R.RValue, val: R.RValue) {
    // Values provided coerced to character vector
    const new_val = coerceToChar(val) as R.Character;

    if (vec.tag === 'pairlist') {
        let curr: R.PairList | R.Nil = vec;
        let index = 0;
        while (curr.tag !== RNull.tag) {
            curr.value = mkChar(new_val.data[index]);
            curr = curr.next;
            index ++;
        }
    } else {
        setNormalAttribute(vec, 'names', new_val);
    }
}

function attributesToList(vec: R.RValue): R.List {
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

function isVector(vec: R.RValue): boolean {
    switch (vec.tag) {
    case ('logical'):
    case ('integer'):
    case ('numeric'):
    case ('character'):
        return true;
    default:
        return false;
    }
}

function coerceToInt(vec: R.RValue): R.Int | R.Nil {
    let ans: R.Int | R.Nil = RNull;

    switch (vec.tag) {
    case 'logical':
        ans = mkInts(vec.data.map((x) => {
            if (x === null) return null;
            else return x ? 1 : 0;
        }));
        break;
    case 'integer':
        ans = mkInts(vec.data);
        break;
    case 'numeric':
        ans = mkInts(vec.data.map((x)=> x === null ? null : Math.floor(x)));
        break;
    case 'character':
        ans = mkInts(vec.data.map((x)=> x === null ? null : Number(x) === NaN ? null : Number(x)));
    }

    return ans;
}

function coerceToChar(vec: R.RValue): R.Character | R.Nil {
    let ans: R.Character | R.Nil = RNull;

    switch (vec.tag) {
    case 'logical':
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? (x ? 'TRUE' : 'FALSE') : null;
        }));
        break;
    case 'integer':
    case 'numeric':
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    case 'character':
        ans = copy(vec) as R.Character;
        break;
    case 'list':
        // TODO: List to string
        ans = mkChars(vec.data.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    case 'pairlist':
        // TODO: pairlist to string
        const temp = [];
        let curr: R.PairList | R.Nil = vec;
        while (curr.tag !== RNull.tag) {
            temp.push(curr.value);
            curr = curr.next;
        }
        ans = mkChars(temp.map((x) => {
            return x !== null ? x.toString() : null;
        }));
        break;
    }

    return ans;
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
    case ('dotdotdot'):
    case ('expression'):
        return true;
    default:
        return false;
    }
}
