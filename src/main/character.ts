import { getAttribute, setAttribute } from './attrib';
import { asLogical, coerceTo } from './coerce';
import { copy } from './copy';
import { error, warn } from './error';
import * as R from './types';
import { checkArity, head, modIterate, tail } from './util';
import { mkChars, mkInts, mkLogicals, RNull } from './values';

export const CHAR_OPTYPES = {
    STARTS: 0,
    ENDS: 1,
    GREP: 2,
    GREPL: 3,
    SUB: 4,
    GSUB: 5,
    LOWER: 6,
    UPPER: 7
}

// builtin internal
export const do_startsWith : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const x = head(args);
    const xfix = head(tail(args));
    if (x.tag !== 'character' || xfix.tag !== 'character') {
        error('non-character objects(s)');
    }
    const predicate: (str: string|null, fix: string|null) => boolean|null = 
        op.variant === CHAR_OPTYPES.STARTS ?
            (str, prefix) => str === null || prefix === null ? null : str.startsWith(prefix) :
            (str, suffix) => str === null || suffix === null ? null : str.endsWith(suffix);
    const resData = modIterate(x.data, xfix.data, predicate);
    return mkLogicals(resData);
}

// builtin internal
export const do_tolower : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const x = head(args);
    if (x.tag !== 'character') {
        error('non-character argument');
    }
    const transform = op.variant === CHAR_OPTYPES.LOWER ? 
        ((x: string) => x.toLowerCase()) : 
        ((x: string) => x.toUpperCase());
    const resData = x.data.map(val => val === null ? null : transform(val));
    return {
        tag: 'character',
        refcount: 0,
        attributes: copy(x.attributes) as R.PairList|R.Nil,
        data: resData
    };
}

// Note difference from R: uses javascript's regex engine 
// and thus does not support perl and useBytes options
// Argument order:
// 1. pattern
// 2. text
// 3. ignore.case
// 4. value
// 5. fixed
// 6. invert
export const do_grep : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const pattern = head(args); args = tail(args);
    const text = head(args); args = tail(args);
    const ignoreCase = asLogical(head(args)); args = tail(args);
    const value = asLogical(head(args)); args = tail(args);
    const fixed = asLogical(head(args)); args = tail(args);
    const invert = asLogical(head(args));
    if (fixed && ignoreCase) {
        warn(`argument 'ignore.case = TRUE' will be ignored`);
    }
    if (pattern.tag !== 'character' || pattern.data.length === 0) {
        error(`invalid 'pattern' argument`);
    }
    if (pattern.data.length > 1) {
        warn(`argument 'pattern' has length > 1 and only the first element will be used`);
    }
    if (text.tag !== 'character') {
        error(`invalid 'text' argument`);
    }
    const pat = pattern.data[0];
    if (pat === null) {
        if (value) {
            const names = getAttribute(text, 'names');
            let result = mkChars(Array(text.data.length).fill(null));
            setAttribute(result, 'names', copy(names));
            return result;
        }
        return {
            tag: op.variant === CHAR_OPTYPES.GREP ? 'integer' : 'logical',
            attributes: RNull,
            refcount: 0,
            data: Array(text.data.length).fill(null)
        }
    }
    let predicate : (str: string|null) => boolean;
    if (fixed) {
        predicate = str => { 
            let res = str !== null && str.includes(pat);
            return invert ? !res : res;
        }
    } else {
        const regex = new RegExp(pat, ignoreCase ? 'i' : '');
        predicate = str => {
            let res = regex.test(str!);
            return invert ? !res : res;
        }
    }
    
    if (op.variant === CHAR_OPTYPES.GREPL) {
        return mkLogicals(text.data.map(predicate));
    } else if (value) {
        const textnames = getAttribute(text, 'names');
        let matches : (string|null)[];
        let names : (string|null)[] = [];
        matches = text.data.filter((str, i) => {
            if (predicate(str)) {
                if (textnames.tag === 'character') {
                    names.push(textnames.data[i]);
                }
                return true;
            }
            return false;
        });
        let res = mkChars(matches);
        return setAttribute(res, 'names', mkChars(names));
    } else {
        return mkInts(text.data.reduce((acc: number[], str, i) => {
            if (predicate(str)) {
                acc.push(i+1);
            }
            return acc;
        }, []));
    }
}

// Note difference from R: we only have x and keepNA as arguments, no type and no allowNA
export const do_nchar : R.PrimOp = (call, op, args, env) => {
    const x = coerceTo(head(args), 'character') as R.Character;
    const keepNA = asLogical(head(tail(args)));
    const nchars = x.data.map(str => str === null ? (keepNA ? null : 2) : str.length);
    let res = mkInts(nchars);
    let d : R.RValue;
    if ((d = getAttribute(x, 'names')) !== RNull) {
        setAttribute(res, 'names', d);
    }
    if ((d = getAttribute(x, 'dim')) !== RNull) {
        setAttribute(res, 'dim', d);
    }
    if ((d = getAttribute(x, 'dimnames')) !== RNull) {
        setAttribute(res, 'dimnames', d);
    }
    return res;
}

export const do_substr : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const x = head(args); args = tail(args);
    if (x.tag !== 'character') {
        error('extracting substrings from a non-character object');
    }
    const start = head(args); args = tail(args);
    const end = head(args);
    if (start.tag !== 'integer' || end.tag !== 'integer' || start.data.length === 0 || end.data.length === 0) {
        error('invalid substring arguments');
    }
    const substrs = x.data.map((str, i) => {
        let startIx = start.data[i % start.data.length];
        let endIx = end.data[i % end.data.length];
        if (str === null || startIx === null || endIx === null) {
            return null;
        }
        startIx = Math.min(0, startIx - 1);
        return str.slice(startIx, endIx);
    });
    return {
        tag: 'character',
        attributes: copy(x.attributes) as R.PairList|R.Nil,
        refcount: 0,
        data: substrs
    };
}

// Difference from R: checks input types to prevent unhandled errors causing program crash
export const do_strrep : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const x = head(args); args = tail(args);
    const times = head(args);
    // R does not do this check and thus crashes if the internal function is supplied invalid arguments
    if (x.tag !== 'character' || times.tag !== 'integer') {
        error('invalid types supplied to strrep');
    }
    const resData = modIterate(x.data, times.data, (str, n) => {
        if (str === null || n === null) {
            return null;
        }
        if (n < 0) {
            error(`invalid 'times' value`);
        }
        return str.repeat(n);
    });
    let res = mkChars(resData);
    let d = getAttribute(x, 'names')
    if (res.data.length === x.data.length && d !== RNull) {
        setAttribute(res, 'names', d);
    }
    return res;
}

// Note difference from R: uses javascript's regex engine 
// and thus does not support perl and useBytes options
// Argument order:
// 1. pattern
// 2. replacement
// 3. text
// 4. ignore.case
// 5. fixed
export const do_gsub : R.PrimOp = (call, op, args, env) => {
    const global = op.variant === CHAR_OPTYPES.GSUB;
    checkArity(call, op, args);
    const pat = head(args); args = tail(args);
    const rep = head(args); args = tail(args);
    const text = head(args); args = tail(args);
    const ignoreCase = asLogical(head(args)); args = tail(args);
    const fixed = asLogical(head(args));
    if (fixed && ignoreCase) {
        warn(`argument 'ignore.case = TRUE' will be ignored`);
    }
    if (pat.tag !== 'character' || pat.data.length < 1) {
        error(`invalid 'pattern' argument`);
    }
    if (pat.data.length > 1) {
        warn(`argument 'pattern' has length > 1 and only the first element will be used`);
    }
    if (rep.tag !== 'character' || rep.data.length < 1) {
        error(`invalid 'replacement' argument`);
    }
    if (rep.data.length > 1) {
        warn(`argument 'replacement' has length > 1 and only the first element will be used`);
    }
    if (text.tag !== 'character') {
        error(`invalid 'text' argument`);
    }
    const pattern = pat.data[0];
    const replacement = rep.data[0];
    if (pattern === null) {
        return mkChars(Array(text.data.length).fill(null));
    }
    let resData : (string|null)[];
    if (fixed) {
        if (pattern.length === 0) {
            error('zero-length pattern');
        }
        resData = text.data.map(str => {
            if (str === null) {
                return null;
            }
            if (!str.includes(pattern)) {
                return str;
            }
            if (replacement === null) {
                return null;
            }
            if (global) {
                while (str.includes(pattern)) {
                    str = str.replace(pattern, replacement);
                }
                return str;
            } else {
                return str.replace(pattern, replacement);
            }
        });
    } else {
        const options = global?'g':'' + ignoreCase?'i':'';
        let regex = new RegExp(pattern, options);
        resData = text.data.map(str => {
            if (str === null) {
                return null;
            }
            if (!regex.test(str)) {
                return str;
            }
            if (replacement === null) {
                return null;
            }
            return str.replace(regex, replacement);
        });
    }
    return {
        tag: 'character',
        attributes: copy(text.attributes) as R.PairList|R.Nil,
        refcount: 0,
        data: resData
    };
}