/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
import {do_arith, ARITH_OPTYPES, do_math1, MATH_OPTYPES, do_math2, do_log} from './arithmetic';
import {do_begin, do_break, do_for, do_function, do_if, do_paren, do_repeat, do_return, do_set, do_while, RevalList} from './eval';
import {do_c} from './bind';
import {do_logic, do_logic2, LOGICAL_OPTYPES} from './logic';
import {do_relop, RELATIONAL_OPTYPES} from './relop';
import {Name, PrimOp, Prom, Vis} from './types';
import {install, installSymbol, RNull, R_UnboundValue} from './values';
import {do_colon} from './seq';
import {do_attr, do_attrgets, do_attributes, do_attributesgets, do_class, do_classgets, do_dim, do_dimgets, do_names, do_namesgets} from './attrib';
import {do_length} from './array';
import { do_subassign, do_subassign2, do_subassign3, do_subset, do_subset2, do_subset3 } from './subset';
import { do_makelist } from './builtin';
import { CHAR_OPTYPES, do_grep, do_gsub, do_nchar, do_startsWith, do_strrep, do_substr, do_tolower } from './character';
import { checkArity, head, tail } from './util';
import { errorcall } from './error';

// Global variable that can be set by various primitive functions and is checked
// by REPL to determine whether to print the result of evaluation or not
export class EvalContext {
    public static R_Visible: Vis = Vis.On;
    public static R_PendingPromises: Prom[] = [];
}

export function initPrimitives() {
    const primitives = [
        /* Language construct primitives */
        primitiveSymbol('if',           do_if,          'special',  {visibility: Vis.OnMut, arity: 2}),
        primitiveSymbol('for',          do_for,         'special',  {visibility: Vis.Off, arity: 3}),
        primitiveSymbol('while',        do_while,       'special',  {visibility: Vis.Off, arity: 2}),
        primitiveSymbol('repeat',       do_repeat,      'special',  {visibility: Vis.Off, arity: 1}),
        primitiveSymbol('break',        do_break,       'special',  {visibility: Vis.On, arity: 0, variant: 2}),
        primitiveSymbol('next',         do_break,       'special',  {visibility: Vis.On, arity: 0, variant: 1}),
        primitiveSymbol('return',       do_return,      'special',  {visibility: Vis.On, arity: 0}),
        primitiveSymbol('function',     do_function,    'special',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('{',            do_begin,       'special',  {visibility: Vis.OnMut, arity: -1}),
        primitiveSymbol('(',            do_paren,       'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('<-',           do_set,         'special',  {visibility: Vis.Off, arity: -1, variant: 0}),
        primitiveSymbol('<<-',          do_set,         'special',  {visibility: Vis.Off, arity: -1, variant: 1}),
        primitiveSymbol('.Internal',    do_internal,    'special',  {visibility: Vis.OnMut, arity: 1}),
        primitiveSymbol('.Primitive',   do_primitive,   'builtin',  {visibility: Vis.On, arity: 1}),

        /* Arithmetic operators, all primitve */
        primitiveSymbol('+',        do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.PLUSOP}),
        primitiveSymbol('-',        do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.MINUSOP}),
        primitiveSymbol('*',        do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.TIMESOP}),
        primitiveSymbol('/',        do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.DIVOP}),
        primitiveSymbol('^',        do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.POWOP}),
        primitiveSymbol('%%',       do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.MODOP}),
        primitiveSymbol('%/%',      do_arith,   'builtin',  {visibility: Vis.On, arity: 2, variant: ARITH_OPTYPES.IDIVOP}),

        /* Logical operators, all primitive. && and || are special since they do short-circuit evaluation */
        primitiveSymbol('!',        do_logic,   'builtin',  {visibility: Vis.On, arity: 1, variant: LOGICAL_OPTYPES.NOTOP}),
        primitiveSymbol('&',        do_logic,   'builtin',  {visibility: Vis.On, arity: 2, variant: LOGICAL_OPTYPES.ELEMANDOP}),
        primitiveSymbol('|',        do_logic,   'builtin',  {visibility: Vis.On, arity: 2, variant: LOGICAL_OPTYPES.ELEMOROP}),
        /* Specials as we conditionally evaluate the 2nd arg */
        primitiveSymbol('||',       do_logic2,  'special',  {visibility: Vis.On, arity: 2, variant: LOGICAL_OPTYPES.OROP}),
        primitiveSymbol('&&',       do_logic2,  'special',  {visibility: Vis.On, arity: 2, variant: LOGICAL_OPTYPES.ANDOP}),

        /* Relational operators, all primitive */
        primitiveSymbol('<',        do_relop,   'builtin',  {visibility: Vis.On, arity: 2, variant: RELATIONAL_OPTYPES.LTOP}),
        primitiveSymbol('>',        do_relop,   'builtin',  {visibility: Vis.On, arity: 2, variant: RELATIONAL_OPTYPES.GTOP}),
        primitiveSymbol('<=',       do_relop,   'builtin',  {visibility: Vis.On, arity: 2, variant: RELATIONAL_OPTYPES.LEQOP}),
        primitiveSymbol('>=',       do_relop,   'builtin',  {visibility: Vis.On, arity: 2, variant: RELATIONAL_OPTYPES.GEQOP}),
        primitiveSymbol('==',       do_relop,   'builtin',  {visibility: Vis.On, arity: 2, variant: RELATIONAL_OPTYPES.EQOP}),
        primitiveSymbol('!=',       do_relop,   'builtin',  {visibility: Vis.On, arity: 2, variant: RELATIONAL_OPTYPES.NEQOP}),

        /* Vectors, Matrices and Arrays*/
        primitiveSymbol('length',           do_length,              'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('c',                do_c,                   'builtin',  {visibility: Vis.On, arity: -1}),

        /* Subsetting extraction and assignment */
        /* Note that these are supposed to be specials (for method dispatching), but we leave them as builtin first */
        primitiveSymbol('[',                do_subset,              'special',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('[[',               do_subset2,             'special',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('$',                do_subset3,             'special',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('[<-',              do_subassign,           'special',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('[[<-',             do_subassign2,          'special',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('$<-',              do_subassign3,          'special',  {visibility: Vis.On, arity: -1}),

        /* Attribute-related functions */
        primitiveSymbol('attr',             do_attr,                'builtin',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('attr<-',           do_attrgets,            'builtin',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('attributes',       do_attributes,          'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('attributes<-',     do_attributesgets,      'builtin',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('names',            do_names,               'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('names<-',          do_namesgets,           'builtin',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('class',            do_class,               'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('class<-',          do_classgets,           'builtin',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('dim',              do_dim,                 'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('dim<-',            do_dimgets,             'builtin',  {visibility: Vis.On, arity: -1}),
        primitiveSymbol('comment',          do_dim,                 'builtin',  {visibility: Vis.On, arity: 1}),
        primitiveSymbol('comment<-',        do_dimgets,             'builtin',  {visibility: Vis.On, arity: -1}),

        /* Sequencing, builtin */
        primitiveSymbol(':',        do_colon,   'builtin',  {visibility: Vis.On, arity: 2}),

        /* Math functions, builtin */
        primitiveSymbol('floor',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.FLOOR}),
        primitiveSymbol('ceiling',      do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.CEILING}),
        primitiveSymbol('sqrt',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.SQRT}),
        primitiveSymbol('sign',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.SIGN}),
        primitiveSymbol('trunc',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.TRUNC}),
        primitiveSymbol('round',        do_math2,   'builtin',      {visibility: Vis.On, arity: -1, variant: MATH_OPTYPES.ROUND}),
        primitiveSymbol('signif',       do_math2,   'builtin',      {visibility: Vis.On, arity: -1, variant: MATH_OPTYPES.SIGNIF}),

        primitiveSymbol('exp',          do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.EXP}),
        primitiveSymbol('expm1',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.EXPM1}),
        primitiveSymbol('log',          do_log,     'builtin',      {visibility: Vis.On, arity: -1, variant: MATH_OPTYPES.LOG}),
        primitiveSymbol('log10',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.LOG10}),
        primitiveSymbol('log2',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.LOG2}),
        primitiveSymbol('log1p',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.LOG1P}),

        primitiveSymbol('sin',          do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.SIN}),
        primitiveSymbol('cos',          do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.COS}),
        primitiveSymbol('tan',          do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.TAN}),
        primitiveSymbol('acos',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.ACOS}),
        primitiveSymbol('asin',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.ASIN}),
        primitiveSymbol('atan',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.ATAN}),
        primitiveSymbol('atan2',        do_math2,   'builtin',      {visibility: Vis.On, arity: -1, variant: MATH_OPTYPES.ATAN2}),

        primitiveSymbol('sinh',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.SINH}),
        primitiveSymbol('cosh',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.COSH}),
        primitiveSymbol('tanh',         do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.TANH}),
        primitiveSymbol('acosh',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.ACOSH}),
        primitiveSymbol('asinh',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.ASINH}),
        primitiveSymbol('atanh',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.ATANH}),
        primitiveSymbol('sinpi',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.SINPI}),
        primitiveSymbol('cospi',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.COSPI}),
        primitiveSymbol('tanpi',        do_math1,   'builtin',      {visibility: Vis.On, arity: 1, variant: MATH_OPTYPES.TANPI}),

        /* Miscellaneous */
        primitiveSymbol('list',         do_makelist,            'builtin',  {visibility: Vis.On, arity: -1}),
    ];

    const internals = [
        /* String manipulation facilities */
        internalSymbol('sub',       do_gsub,        'builtin',  {visibility: Vis.On, arity: 5, variant: CHAR_OPTYPES.SUB}),
        internalSymbol('gsub',      do_gsub,        'builtin',  {visibility: Vis.On, arity: 5, variant: CHAR_OPTYPES.GSUB}),
        internalSymbol('tolower',   do_tolower,     'builtin',  {visibility: Vis.On, arity: 1, variant: CHAR_OPTYPES.LOWER}),
        internalSymbol('toupper',   do_tolower,     'builtin',  {visibility: Vis.On, arity: 1, variant: CHAR_OPTYPES.UPPER}),
        internalSymbol('grep',      do_grep,        'builtin',  {visibility: Vis.On, arity: 6, variant: CHAR_OPTYPES.GREP}),
        internalSymbol('grepl',     do_grep,        'builtin',  {visibility: Vis.On, arity: 6, variant: CHAR_OPTYPES.GREPL}),
        internalSymbol('startsWith',do_startsWith,  'builtin',  {visibility: Vis.On, arity: 2, variant: CHAR_OPTYPES.STARTS}),
        internalSymbol('endsWith',  do_startsWith,  'builtin',  {visibility: Vis.On, arity: 2, variant: CHAR_OPTYPES.ENDS}),
        internalSymbol('nchar',     do_nchar,       'builtin',  {visibility: Vis.On, arity: 2}),
        internalSymbol('substr',    do_substr,      'builtin',  {visibility: Vis.On, arity: 3}),
        internalSymbol('strrep',    do_strrep,      'builtin',  {visibility: Vis.On, arity: 2}),
    ];

    primitives.forEach((p) => installSymbol(p));
    internals.forEach((i) => installSymbol(i));
}

export function internalSymbol(
    name: string,
    internal: PrimOp,
    type: 'builtin' | 'special',
    {visibility, arity, variant=0} : {
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
            variant: variant,
        },
    };
}

export function primitiveSymbol(
    name: string,
    value: PrimOp,
    type: 'builtin' | 'special',
    {visibility, arity, variant=0} : {
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
            variant: variant,
        },
    };
}

export const do_internal : PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const internalCall = head(args);
    if (internalCall.tag !== 'language') {
        errorcall(call, 'invalid .Internal() argument');
    }
    const fun = head(internalCall);
    if (fun.tag !== 'name') {
        errorcall(call, 'invalid .Internal() argument');
    }
    if (fun.internal === R_UnboundValue) {
        errorcall(call, `there is no .Internal function '${fun.pname}'`);
    }
    args = tail(internalCall);
    // Sanity check
    if (fun.internal.tag !== 'special' && fun.internal.tag !== 'builtin') {
        errorcall(call, 'invalid .Internal function');
    }
    if (fun.internal.tag === 'builtin') {
        args = RevalList(args, env, call, 0);
    }
    
    EvalContext.R_Visible = fun.internal.visibility;
    let result = (fun.internal.jsFunc)(internalCall, fun.internal, args, env);
    if (fun.internal.visibility !== Vis.OnMut) {
        EvalContext.R_Visible = op.visibility;
    }
    return result;
}

export const do_primitive : PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    const arg = head(args);
    if (arg.tag !== 'character' || arg.data.length !== 1 || arg.data[0] === null) {
        errorcall(call, 'string argument required');
    }
    const res = install(arg.data[0]).value;
    if (res === R_UnboundValue) {
        errorcall(call, 'no such primitive function');
    }
    return res;
}