/*
*   This module handles the retrieval and setting of attributes in JORDAN.
*   JORDAN does not handle the special attributes 'row.names' and 'tsp'.
*/

import {asCharVector, asIntVector, asListObject, coerceTo} from './coerce';
import {copy} from './copy';
import {error, errorcall} from './error';
import * as R from './types';
import {checkArity, getNames, head, length, tail} from './util';
import {mkChar, mkChars, mkPairlist, RNull} from './values';

/*
 *   Retrieves a single specified attribute of the object provided.
 */
export const do_attr: R.PrimOp = (call, op, args, env) => {
    if (length(args) !== 2) {
        errorcall(call, '2 arguments required');
    }
    const object = head(args);
    const attribute = head(tail(args));

    if (attribute.tag !== 'character') {
        error(`'which' must be of mode character`);
    } else if (attribute.data.length !== 1) {
        error(`'exactly one attribute 'which' must be given`);
    } else if (attribute.data[0] === null) {
        return RNull;
    }

    return getAttribute(object, attribute.data[0]);
};

/*
*   Sets a single specified attribute of the object provided.
*/
export const do_attrgets: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(head(args));
    const attribute = head(tail(args));
    const value = head(tail(tail(args)));

    if (attribute.tag !== 'character' || attribute.data.length === 0 || attribute.data[0] === null) {
        error(`'name' must be non-null character string`);
    } else if (attribute.data[0].length === 0) {
        error(`attempt to use zero-length variable name`);
    }

    return setAttribute(object, attribute.data[0], value);
};

/*
*   Retrieves all the attributes of the object provided.
*/
export const do_attributes: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    return getAttributes(object);
};

/*
*   Sets all the attributes of the object provided.
*/
export const do_attributesgets: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(head(args));
    const attributes = head(tail(args));

    if (attributes.tag !== 'list') {
        error('attributes must be a list or NULL');
    }

    if (!hasAttributes(object)) {
        error('attributes are not allowed on the given type');
    }

    setAttributes(object, attributes);

    return object;
};

/*
*   The 'do_..." functions below handle the attribute setting and extraction of
*   the specific attributes 'names', 'class', 'dim', 'dimnames' and 'comment'.
*
*   These attributes only can take specific values and as such are segregated into
*   their own special functions for handling of various cases.
*/


/*
*   Retrieves the 'names' attribute of the object provided.
*/
export const do_names: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    return getAttribute(object, 'names', true);
};

/*
*   Sets the 'names' attribute of the object provided.
*/
export const do_namesgets: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(head(args));
    const names = head(tail(args));

    return setAttribute(object, 'names', names);
};

/*
*   Retrieves the 'class' attribute of the object provided.
*/
export const do_class: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    return s3Classes(head(args));
};

/*
*   Sets the 'class' attribute of the object provided.
*/
export const do_classgets: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(head(args));
    const class_name = head(tail(args));

    return setAttribute(object, 'class', class_name);
};

/*
*   Retrieves the 'dim' attribute of the object provided.
*/
export const do_dim: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    return getAttribute(object, 'dim', true);
};

/*
*   Sets the 'dim' attribute of the object provided.
*/
export const do_dimgets: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(head(args));
    const dim = head(tail(args));

    return setAttribute(object, 'dim', dim);
};

/*
*   Retrieves the 'comment' attribute of the object provided.
*/
export const do_comment: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = head(args);

    return getAttribute(object, 'comment', true);
};

/*
*   Sets the 'comment' attribute of the object provided.
*/
export const do_commentgets: R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const object = copy(head(args));
    const comment = head(tail(args));

    return setAttribute(object, 'comment', comment);
};

/*
*   Sets an attribute of the object provided. The attribute to be set is provided under 'key'.
*
*   For non-special attributes, we simply set the value of that particular attribute to the given
*   value. If the attribute does not exist, we append it to the end of the attributes pairlist. If
*   the intended value of the attribute is NULL, we consider this a deletion and remove that attribute
*   entirely from the object.
*
*   For special attributes, we dispatch the setting of the values to functions that are meant to
*   handle that specific case.

*/
export function setAttribute(object: R.RValue, key: string, val: R.RValue): R.RValue {
    if (object.tag === RNull.tag) {
        error('attempt to set an attribute on NULL');
    }

    if (val.tag === RNull.tag) {
        removeAttribute(object, key);
        return object;
    } else {
        // Ignoring special cases of 'row.names' and 'tsp'
        switch (key) {
        case 'class':
            return setClass(object, val);
        case 'comment':
            return setComment(object, val);
        case 'dim':
            return setDim(object, val);
        case 'dimnames':
            return setDimNames(object, val);
        case 'names':
            return setNames(object, val);
        default:
            return setNormalAttribute(object, key, val);
        }
    }
}

/*
*   Sets all the attributes of an object with the provided list of attributes.
*/
function setAttributes(object: R.RValue, list: R.List) {
    const names = getNames(object);

    if (names.tag === RNull.tag) {
        error('attributes must be named');
    }

    if (names.data.length !== list.data.length) {
        error('all attributes must have names');
    }

    for (let i = 0; i < list.data.length; i ++) {
        if (names.data[i] !== null) {
            setAttribute(object, names.data[i] as string, list.data[i]);
        }
    }
}

/*
*   Retrieves a specified attribute of the object.
*
*   This uses partial matching to retrieve the attribute, unless 'match' has been specified to be true,
*   in which case an exact match is required.
*/
export function getAttribute(object: R.RValue, which: string, match: boolean = false) : R.RValue {
    if (object.tag === RNull.tag) {
        return RNull;
    }

    if (!hasAttributes(object)) {
        error('attributes are not allowed on the given type');
    }

    const vector = object as R.PairList;

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

/*
*   Retrieves all the attributes of the object.
*/
function getAttributes(object: R.RValue) {
    if (object.tag === RNull.tag) {
        return RNull;
    }

    if (!hasAttributes(object)) {
        error('attributes are not allowed on the given type');
    }

    if ((object as R.Logical).attributes.tag === RNull.tag) {
        return RNull;
    }

    if (object.tag === 'pairlist') {
        const names = getNames(object);
        const start = mkPairlist([names, 'names']) as R.PairList;
        start.next = object.attributes;

        return attributesToList(start);
    } else {
        return attributesToList((object as R.Logical).attributes);
    }
}

/*
*   Removes a specified attribute from the object.
*/
function removeAttribute(object: R.RValue, key: string) {
    let curr: R.PairList | R.Nil = (object as R.Logical).attributes;
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

    (object as R.Logical).attributes = start;
}

/*
*   Sets a non-special attribute of the object, using the value provided.
*/
function setNormalAttribute(object: R.RValue, key: string, val: R.RValue): R.RValue {
    const dimAttribute: R.RValue = getAttribute(object, 'dim', true);

    let is_key_set = false;

    // If the dimensions have been specified, we copy that first before moving
    // on to the rest of the attributes
    let curr;
    let start;
    if (dimAttribute.tag !== RNull.tag) {
        removeAttribute(object, 'dim');
        curr = copy((object as R.Logical).attributes) as R.PairList;
        start = mkPairlist([dimAttribute, 'dim']) as R.PairList;
        start.next = curr;
    } else {
        curr = copy((object as R.Logical).attributes) as R.PairList;
        start = curr;
    }

    while (curr.tag !== RNull.tag) {
        if (curr.key === key) {
            curr.value = val;
            is_key_set = true;
        }
        curr = curr.next;
    }

    (object as R.Logical).attributes = start;

    // Checks whether the key has been set: if not, it's a new key and we append it
    // to the end of the attributes
    if (!is_key_set) {
        if ((object as R.Logical).attributes.tag === RNull.tag) {
            (object as R.Logical).attributes = mkPairlist([val, key]);
        } else {
            let curr = (object as R.Logical).attributes as R.PairList;
            while (curr.next.tag !== RNull.tag) {
                curr = curr.next;
            }
            curr.next = mkPairlist([val, key]);
        }
    }

    return object;
}

function setClass(object: R.RValue, val: R.RValue) {
    if (val.tag !== 'character') {
        error(`attempt to set invalid 'class' attribute`);
    }

    const new_type = val.data[0];

    let ans;

    switch (new_type) {
    case 'logical':
    case 'integer':
    case 'double':
    case 'character':
        removeAttribute(object, 'class');
        const attributes_copy: R.PairList | R.Nil = copy((object as R.Logical).attributes) as R.PairList | R.Nil;
        ans = coerceTo(object, new_type);
        (ans as R.Logical).attributes = attributes_copy;
        break;
    default:
        ans = setNormalAttribute(object, 'class', val);
        break;
    }

    return ans;
}

function setComment(object: R.RValue, val: R.RValue) {
    if (val.tag !== 'character' && val.tag !== RNull.tag) {
        error(`attempt to set invalid 'comment' attribute`);
    }

    return setNormalAttribute(object, 'comment', val);
}

function setDim(object: R.RValue, val: R.RValue) {
    let new_val = val;
    // Ensure value provided is either a vector or null
    if (val.tag === RNull.tag || !isVector(val)) {
        error('invalid second argument, must be vector or NULL');
    }

    // Attempt to coerce values to integer, take first value regardless
    new_val = asIntVector(val);

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
    if (new_val.tag !== RNull.tag) {
        let product = 1;
        for (const num of new_val.data) {
            if (num === null) error('the dims contain missing values');
            else product *= num;
        }

        if (product !== length(object)) {
            error(`dims [${new_val.data[0]}] do not match the length of the object [${length(object)}]`);
        }
    }

    const dimAttribute: R.RValue = getAttribute(object, 'dim', true);

    // If the dimensions have been specified, we delete it and replace with our new dims
    if (dimAttribute.tag !== RNull.tag) {
        removeAttribute(object, 'dim');
    }
    const curr: R.PairList | R.Nil = copy((object as R.Logical).attributes) as R.PairList;
    const start: R.PairList = mkPairlist([new_val, 'dim']) as R.PairList;
    start.next = curr;

    (object as R.Logical).attributes = start;

    return object;
}

function setDimNames(object: R.RValue, val: R.RValue) {
    // Must be a list
    if (val.tag !== 'list') {
        error(`'dimnames' must be a list`);
    } else {
        // Value must be a list of length identical to the dimensions
        const dims: R.Int | R.Nil = getAttribute(object, 'dim', true) as R.Int | R.Nil;
        if (dims.tag !== RNull.tag) {
            for (let i = 0; i < val.data.length; i++) {
                if (length(val.data[i]) !== dims.data[i]) {
                    error(`length of 'dimnames[${i + 1}] not equal to array extent`);
                }
            }
        }
    }

    return setNormalAttribute(object, 'dimnames', val);
}

function setNames(object: R.RValue, val: R.RValue) {
    // Values provided coerced to character vector
    const new_val = asCharVector(val) as R.Character;

    if (object.tag === 'pairlist') {
        let curr: R.PairList | R.Nil = object;
        let index = 0;
        while (curr.tag !== RNull.tag) {
            curr.key = (new_val.data[index] === null) ? '' : new_val.data[index] as string;
            curr = curr.next;
            index ++;
        }

        return object;
    } else {
        if (new_val.data.length !== (object as R.Logical).data.length) {
            for (let i = new_val.data.length; i < (object as R.Logical).data.length; i ++) {
                new_val.data.push(null);
            }
        }
        return setNormalAttribute(object, 'names', new_val);
    }
}

function attributesToList(attributes: R.PairList | R.Nil): R.List {
    const keys = [];
    const values = [];
    let attribute: R.PairList | R.Nil = attributes;

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

function isVector(object: R.RValue): boolean {
    switch (object.tag) {
    case ('logical'):
    case ('integer'):
    case ('double'):
    case ('character'):
        return true;
    default:
        return false;
    }
}

export function hasAttributes(object: R.RValue): boolean {
    switch (object.tag) {
    case ('list'):
    case ('pairlist'):
    case ('logical'):
    case ('integer'):
    case ('double'):
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

// Equivalent to R_data_class2
// Retrieves implicit classes 
// Note that it differs from R in the number of variations of classes of base types.
// All language objects are "call", and all other base types are simply their type tag
export function s3Classes(object: R.RValue) : R.Character {
    const classes = getAttribute(object, 'class');
    if (length(classes) > 0) {
        if (classes.tag !== 'character') {
            error('Bug: class attribute not character');
        }
        return classes;
    }
    if (object.tag === 'language') {
        return mkChar('call');
    }
    const ndim = length(getAttribute(object, 'dim'));
    let objType : string[];
    switch (object.tag) {
    case 'builtin':
    case 'special':
    case 'closure':
        objType = ['function'];
        break;
    case 'integer':
    case 'double':
        objType = [object.tag, 'numeric'];
        break;
    default:
        objType = [object.tag];
        break;
    }
    if (ndim === 0) {
        return mkChars(objType);
    } else if (ndim === 2) {
        objType.unshift('matrix');
        return mkChars(objType);
    } else {
        objType.unshift('array');
        return mkChars(objType);
    }
}