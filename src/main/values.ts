import * as R from './types';
import {R_SymbolTable} from './globals';

const v : any = {tag: 'name', pname: ''};
v.internal = v;
const v2 : any = {tag: 'name', pname: ''};
v2.internal = v2;

// Special sentinel values
export const RNull : R.Nil = {tag: 'NULL'};
export const R_MissingArg = v as R.Name;
export const R_UnboundValue = v2 as R.Name;


// Global constants which are the base environments
export const R_EmptyEnv: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: RNull,
    frame: new Map()
}
export const R_BaseEnv: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: R_EmptyEnv,
    frame: new Map()
}

export function mkName(name: string) : R.Name {
    return {
        tag: 'name', 
        pname: name, 
        internal: R_UnboundValue, 
        value: R_UnboundValue
    };
}

/**
 * The proper method of declaring symbols. install adds the symbol to the global symbol table,
 * or if the symbol already exists, just returns the existing symbol
 *
 * @param {string} symbolname The name of the symbol to install/retrieve
 * @return {R.Name} A Name with given string as pname
 */
export function install(symbolname: string) : R.Name {
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

// Used to directly install symbols in setup
export function installSymbol(symbol: R.Name) {
    R_SymbolTable.set(symbol.pname, symbol);
}

export function mkLogical(value: boolean | null) : R.Logical {
    return {tag: 'logical', refcount: 0, attributes: RNull, data: [value]};
}

export function mkInt(value: number) : R.Int {
    return {tag: 'integer', refcount: 0, attributes: RNull, data: [value]};
}

export function mkReal(value: number) : R.Real {
    return {tag: 'numeric', refcount: 0, attributes: RNull, data: [value]};
}

export function mkChar(value: string) : R.Character {
    return {tag: 'character', refcount: 0, attributes: RNull, data: [value]};
}


// Make sure you supply at least 1 argument!
export function mkPairlist(
    ...pairs: [R.RValue, string?][]
) : R.PairList | R.Nil {
    let result : R.PairList | R.Nil = RNull;
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
    [val, key]: [R.RValue, string?],
    ...pairs: [R.RValue, string?][]
) : R.Language {
    const tail = mkPairlist(...pairs);
    return {
        tag: 'language',
        refcount: 0,
        attributes: RNull,
        key: key ?? '',
        value: val,
        next: tail
    };
}
