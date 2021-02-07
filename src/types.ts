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
    value: string;
}

// Linked list type used internally for attributes, language objects
export interface PairList {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'pairlist';
    key: string; // if all keys in linked list are "", names() returns NULL. Else missing names are ""
    value: RValue | null;
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
    frame: Map<Name, RValue | null>; // It is possible to extract missing value from a pairlist and assign a variable to it
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
}

export interface Special {
    readonly tag: 'special';
}

export interface Prom {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'promise';
    cached: undefined | RValue
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
    data: List; // Mainly language objects, but could include literals of the atomic types as well
}

export const RNull : Nil = {tag: 'NULL'};


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
