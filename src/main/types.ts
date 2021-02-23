export interface LinkedList {
    key: string; // if all keys in linked list are "", names() returns NULL. Else missing names are ""
    value: RValue;
    next: PairList | Nil;
}

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
    value: RValue; 
    internal: RValue; 
    ddval?: number;
}

// Linked list type used internally for attributes, language objects
export interface PairList extends LinkedList {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'pairlist';
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
    formals: PairList|Nil; 
    body: RValue;
    environment: Env;
}

export interface Builtin {
    readonly tag: 'builtin';
    jsFunc: PrimOp;
    visibility: Vis;
    variant: number; // May change to something more understandable
    arity: number;
}

export interface Special {
    readonly tag: 'special';
    jsFunc: PrimOp;
    visibility: Vis;
    variant: number;
    arity: number;
}

export interface Prom {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'promise';
    cached: RValue; 
    expression: RValue;
    seen: boolean; // prevent infinite recursion
    environment: Env;
}

export interface DotDotDot extends LinkedList {
    attributes: PairList | Nil;
    refcount: number;
    readonly tag: 'dotdotdot';
}

export interface Language extends LinkedList {
    attributes: PairList | Nil
    refcount: number;
    readonly tag: 'language';
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
            | DotDotDot

// The interface of all R primitive and internal calls
// call: Used largely for error reporting
// op: Contains underlying js function, and some extra evaluation instructions
// args: Arguments
// env: Environment to execute this primitive.
export type PrimOp = (
    call: Language,
    op: Builtin | Special,
    args: PairList | Nil,
    env: Env
) => RValue

export enum Vis {
    Off,
    On,
    OnMut
}