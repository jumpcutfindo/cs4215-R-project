export interface Nil {
    readonly tag: 'NULL';
}

export interface List {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'list';
    data: RValue[];
}


// Represents Symbols in the language. No attributes.
// (attributes(name) returns NULL, attributes<- gives error)
export interface Name {
    readonly tag: 'name';
    pname: string;
    // Difference from R: no field for primitive value; simply place Special/Builtin in environment
    internal: RValue; // internal field still needed as INTERNAL field must be accessible from the symbol
}

// Linked list type used internally for attributes, language objects
export interface PairList {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'pairlist';
    key: string; // if all keys in linked list are "", names() returns NULL. Else missing names are ""
    value: RValue; // Change: value cannot be null. Missing Args are implemented as R_MissingArg, which is a SYMSXP symbol marker
    next: PairList | Nil;
}

// getAtindex(rval, ix)
//   case pairlist:
//       for i 1:ix
//          pairlist = pairlist.next
//       return pairlist.val

// getByName(rval, ix)
//     case pairlist:
//         for i in 1:ix:
//             if pairlist.key = ix
//             return
//             else
//             pairlist = pairlist.next

export interface Raw {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'raw';
    data: ArrayBuffer;
}

export interface Logical {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'logical';
    data: (boolean|null)[];
}

export interface Int {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'integer';
    data: (number|null)[];
}

export interface Real {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'numeric';
    data: (number|null)[];
}

export interface Character {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'character';
    data: (string|null)[];
}

export interface Env {
    attributes: PairList | Nil;
    readonly tag: 'environment';
    parent: Env | Nil;
    frame: Map<Name, RValue>; // Changed: Missing Arg, Unbound Val are all RValues implemented as symbols
}

export interface Closure {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'closure';
    formals: PairList; // should we make a pairlist type which can have undefined values? Or just have a single list type
    body: Language;
    environment: Env;
}

export interface Builtin {
    readonly tag: 'builtin';
    name: string; // We shall use a map for primitive functions, thus a string index instead of an offset
}

export interface Special {
    readonly tag: 'special';
    name: string; // We shall use a map for primitive functions, thus a string index instead of an offset
}

export interface Prom {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'promise';
    cached: RValue // changed - UnboundValue is implemented as a sentinel RValue, not undefined
    expression: RValue
    environment: Env;
}

export interface Language {
    attributes: PairList | Nil
    refcount: number;
    readonly tag: 'language';
    // Must be of length at least 1. 1st item is the function
    // (symbol or language object evaluating to function). Rest are arguments
    call: PairList;
}

export interface Expression {
    attributes: PairList | Nil
    refcount: number;
    readonly tag: 'expression';
    data: RValue[]; // Mainly language objects, but could include literals of the atomic types as well
}


export type RValue =
              Nil
            | Name
            | PairList
            | List
            | Raw
            | Logical
            | Int
            | Real
            | Character
            | Env
            | Closure
            | Builtin
            | Special
            | Prom
            | Language
            | Expression
