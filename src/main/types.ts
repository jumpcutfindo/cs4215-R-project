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
    value: Builtin | Special | Name; // Name is only used to mark unbound/missing sentinels
    internal: Builtin | Special | Name; 
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
    jsFunc: PrimOp;
    visibility: 'on' | 'off' | 'on-but-mutable';
    variant: number; // May change to something more understandable
}

export interface Special {
    readonly tag: 'special';
    jsFunc: PrimOp;
    visibility: 'on' | 'off' | 'on-but-mutable';
    variant: number;
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


export type PrimOp = (
    call: Language, 
    op: Builtin | Special, 
    args: PairList | Nil, 
    env: Env
) => RValue
