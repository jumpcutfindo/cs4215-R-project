import * as RValue from './types';
import {R_SymbolTable} from './globals';

const v : any = {tag: 'name', pname: ''};
v.internal = v;
const v2 : any = {tag: 'name', pname: ''};
v2.internal = v2;


export const RNull : RValue.Nil = {tag: 'NULL'};
export const R_MissingArg = v as RValue.Name;
export const R_UnboundValue = v2 as RValue.Name;

export function mkName(
    name: string,
    internal: RValue.RValue=R_UnboundValue,
) : RValue.Name {
    return {tag: 'name', pname: name, internal: internal};
}

/**
 * The proper method of declaring symbols. install adds the symbol to the global symbol table,
 * or if the symbol already exists, just returns the existing symbol
 *
 * @param {string} symbolname The name of the symbol to install/retrieve
 * @return {RValue.Name} A Name with given string as pname
 */
export function install(symbolname: string) : RValue.Name {
    let result = R_SymbolTable.get(symbolname);
    if (result !== undefined) {
        return result;
    } else {
        // TODO: Check with Daniel error handling
        if (symbolname.length === 0) {
            throw new Error('attempt to use zero-length variable name');
        }
        result = mkName(symbolname);
        R_SymbolTable.set(symbolname, result);
        return result;
    }
}

export function mkLogical(value: boolean | null) : RValue.Logical {
    return {tag: 'logical', refcount: 0, attributes: RNull, data: [value]};
}

export function mkInt(value: number) : RValue.Int {
    return {tag: 'integer', refcount: 0, attributes: RNull, data: [value]};
}

export function mkReal(value: number) : RValue.Real {
    return {tag: 'numeric', refcount: 0, attributes: RNull, data: [value]};
}

export function mkChar(value: string) : RValue.Character {
    return {tag: 'character', refcount: 0, attributes: RNull, data: [value]};
}


// Make sure you supply at least 1 argument!
export function mkPairlist(
    ...pairs: [RValue.RValue, string?][]
) : RValue.PairList | RValue.Nil {
    let result : RValue.PairList | RValue.Nil = RNull;
    pairs.reverse().forEach(([val, key]) => {
        result = {
            attributes: RNull,
            tag: 'pairlist',
            refcount: 0,
            key: key ?? '',
            value: val,
            next: result,
        };
    });
    return result;
}

export function mkLang(
    pair: [RValue.RValue, string?],
    ...pairs: [RValue.RValue, string?][]
) : RValue.Language {
    return {
        tag: 'language',
        refcount: 0,
        attributes: RNull,
        call: mkPairlist(pair, ...pairs) as RValue.PairList,
    };
}

// TODO: Global Symbol Table, install function
