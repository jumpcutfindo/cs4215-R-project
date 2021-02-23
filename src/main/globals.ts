import { do_break, do_for, do_if, do_return } from './eval';
import {Name, PrimOp, Prom, Vis} from './types';
import { installSymbol, RNull, R_UnboundValue } from './values';

// Global variable that can be set by various primitive functions and is checked
// by REPL to determine whether to print the result of evaluation or not
export class EvalContext {
    public static R_Visible: Vis = Vis.On;
    public static R_PendingPromises: Prom[] = [];
}

export function initPrimitives() {
    const do_something : PrimOp = (call, op, args, env) => RNull

    const primitives = [
        primitiveSymbol('if', do_if, 'special', {visibility: Vis.OnMut, arity: 2}),
        primitiveSymbol('for', do_for, 'special', {visibility: Vis.Off, arity: 3}),
        primitiveSymbol('break', do_break, 'special', {visibility: Vis.On, arity: 0, variant: 2}),
        primitiveSymbol('next', do_break, 'special', {visibility: Vis.On, arity: 0, variant: 1}),
        primitiveSymbol('return', do_return, 'special', {visibility: Vis.On, arity: 0})
    ]

    const internals = [
        internalSymbol('something', do_something, 'builtin', {visibility: Vis.On, arity: 1, variant: 1}),
        internalSymbol('something.else', do_something, 'builtin', {visibility: Vis.On, arity: 1, variant: 2}),
        internalSymbol('something.more', do_something, 'builtin', {visibility: Vis.On, arity: 1, variant: 3})
    ]
    primitives.forEach(p => installSymbol(p));
    internals.forEach(i => installSymbol(i));
}

export function internalSymbol(
    name: string,
    internal: PrimOp,
    type: 'builtin' | 'special',
    { visibility, arity, variant=0 } : {
        visibility: Vis,
        arity: number,
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
            arity: arity,
            variant: variant
        }
    }
}

export function primitiveSymbol(
    name: string,
    value: PrimOp,
    type: 'builtin' | 'special',
    { visibility, arity, variant=0 } : {
        visibility: Vis,
        arity: number,
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
            arity: arity,
            variant: variant
        }
    }
}
