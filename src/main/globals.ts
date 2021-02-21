import {do_if} from './eval';
import {Name, PrimOp} from './types';
import {installSymbol, RNull, R_UnboundValue} from './values';

// Global variable that can be set by various primitive functions and is checked
// by REPL to determine whether to print the result of evaluation or not
export class EvalContext {
    public static R_Visible: boolean = true;
}

// R_DotsSymbol

export const R_SymbolTable : Map<string, Name> = new Map();


// SAMPLE OF OUR VERSION OF SYMBOL TABLE + FUNCTION TABLE COMBINED

const do_nothing : PrimOp = (call, op, args, env) => RNull;
const do_something : PrimOp = (call, op, args, env) => RNull;

const primitives = [
    primitiveSymbol('if', do_if, 'special', {visibility: 'on-but-mutable'}),
];

const internals = [
    internalSymbol('something', do_something, 'builtin', {visibility: 'on', variant: 1}),
    internalSymbol('something.else', do_something, 'builtin', {visibility: 'on', variant: 2}),
    internalSymbol('something.more', do_something, 'builtin', {visibility: 'on', variant: 3}),
];

// Should put into initializing function and explicitly call it
primitives.forEach((p) => installSymbol(p));
internals.forEach((i) => installSymbol(i));

export function internalSymbol(
    name: string,
    internal: PrimOp,
    type: 'builtin' | 'special',
    {visibility, variant=0} : {
        visibility: 'on' | 'off' | 'on-but-mutable',
        variant?: number
    },
) : Name {
    return {
        tag: 'name',
        pname: name,
        value: R_UnboundValue,
        internal: {
            tag: type,
            jsFunc: internal,
            visibility: visibility,
            variant: variant,
        },
    };
}

export function primitiveSymbol(
    name: string,
    value: PrimOp,
    type: 'builtin' | 'special',
    {visibility, variant=0} : {
        visibility: 'on' | 'off' | 'on-but-mutable',
        variant?: number
    },
) : Name {
    return {
        tag: 'name',
        pname: name,
        internal: R_UnboundValue,
        value: {
            tag: type,
            jsFunc: value,
            visibility: visibility,
            variant: variant,
        },
    };
}
