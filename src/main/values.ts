import * as R from './types';
import {ddval} from './dotdotdot';
import { error } from './error';

const R_SymbolTable: Map<string, R.Name> = new Map();

const v: any = {tag: 'name', pname: ''};
v.internal = v;
const v2: any = {tag: 'name', pname: ''};
v2.internal = v2;

// Special sentinel values
export const RNull: R.Nil = {tag: 'NULL'};
export const R_MissingArg = v as R.Name;
export const R_UnboundValue = v2 as R.Name;

// Symbols used in code
export const R_DotsSymbol: R.Name = install('...');
export const R_LastValueSymbol: R.Name = install('.Last.value');

// Global constants which are the base environments
export const R_EmptyEnv: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: RNull,
    frame: new Map(),
};
export const R_BaseEnv: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: R_EmptyEnv,
    frame: new Map(),
};

export const R_GlobalEnv: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: R_BaseEnv,
    frame: new Map(),
};

export function mkName(name: string): R.Name {
    const ddnum = ddval(name);
    return ddnum !== null ?
        {
            tag: 'name',
            pname: name,
            internal: R_UnboundValue,
            value: R_UnboundValue,
            ddval: ddnum,
        } :
        {
            tag: 'name',
            pname: name,
            internal: R_UnboundValue,
            value: R_UnboundValue,
        };
}

/**
 * The proper method of declaring symbols. install adds the symbol to the global symbol table,
 * or if the symbol already exists, just returns the existing symbol
 *
 * @param {string} symbolname The name of the symbol to install/retrieve
 * @return {R.Name} A Name with given string as pname
 */
export function install(symbolname: string): R.Name {
    let result = R_SymbolTable.get(symbolname);
    if (result !== undefined) {
        return result;
    } else {
        // TODO: Check with Daniel error handling
        if (symbolname.length === 0) {
            error('attempt to use zero-length variable name');
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

export function mkLogical(value: boolean | null): R.Logical {
    return {tag: 'logical', refcount: 0, attributes: RNull, data: [value]};
}

export function mkInt(value: number | null): R.Int {
    return {tag: 'integer', refcount: 0, attributes: RNull, data: [value]};
}

export function mkReal(value: number | null): R.Real {
    return {tag: 'numeric', refcount: 0, attributes: RNull, data: [value]};
}

export function mkChar(value: string | null): R.Character {
    return {tag: 'character', refcount: 0, attributes: RNull, data: [value]};
}

export function mkList(...pairs: [R.RValue, string?][]): R.List | R.Nil {
    const result: R.List | R.Nil = {
        attributes: RNull,
        refcount: 0,
        tag: 'list',
        data: [],
    };

    const namedPairs: [R.RValue, string][] = pairs.map((pair) => {
        const res = [];
        res[0] = pair[0];
        res[1] = pair[1] ?? '';

        return res as [R.RValue, string];
    });

    const names: string[] = namedPairs.map((pair) => pair[1]);

    result.attributes = mkPairlist([mkChars(names), 'names']);
    result.data = namedPairs.map((pair) => pair[0]);

    return result;
}

export function mkLogicals(values: (boolean | null)[]) : R.Logical {
    return {tag: 'logical', refcount: 0, attributes: RNull, data: values};
}

export function mkInts(values: (number | null)[]): R.Int {
    return {tag: 'integer', refcount: 0, attributes: RNull, data: values};
}

export function mkReals(values: (number | null)[]): R.Real {
    return {tag: 'numeric', refcount: 0, attributes: RNull, data: values};
}

export function mkChars(values: (string | null)[]): R.Character {
    return {tag: 'character', refcount: 0, attributes: RNull, data: values};
}

// Make sure you supply at least 1 argument!
export function mkPairlist(
    ...pairs: [R.RValue, string?][]
): R.PairList | R.Nil {
    let result: R.PairList | R.Nil = RNull;
    pairs.reverse().forEach(([val, key]) => {
        result = {
            attributes: RNull,
            tag: 'pairlist',
            refcount: 0,
            key: key ?? '',
            value: val,
            next: result,
        } as R.PairList;
    });
    return result;
}

export function mkLang(
    [val, key]: [R.RValue, string?],
    ...pairs: [R.RValue, string?][]
): R.Language {
    const tail = mkPairlist(...pairs);
    return {
        tag: 'language',
        refcount: 0,
        attributes: RNull,
        key: key ?? '',
        value: val,
        next: tail,
    };
}

export function mkPromise(expr: R.RValue, env: R.Env): R.Prom {
    return {
        tag: 'promise',
        attributes: RNull,
        refcount: 0,
        cached: R_UnboundValue,
        expression: expr,
        seen: false,
        environment: env,
    };
}

export function mkClosure(formals: R.PairList, body: R.RValue, env: R.Env): R.Closure {
    return {
        tag: 'closure',
        attributes: RNull,
        refcount: 0,
        formals: formals,
        body: body,
        environment: env
    }
}
