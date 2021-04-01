import {error} from './main/error';
import {isBreak, isNext, isReturn, Reval} from './main/eval';
import {EvalContext, initPrimitives} from './main/globals';
import { outputValue, printValue } from './main/print';
import * as R from './main/types';
import {RNull, R_BaseEnv, R_GlobalEnv, R_LastValueSymbol} from './main/values';
import {parse} from './parser';

import baseLib from './library/base.R';

export function interpret(prog: string, env: R.Env): { printOutput: string, isErr: boolean }[] {
    const ast = parse(prog); // should wrap in try-catch
    let results = [];
    for (const expr of (<R.Expression>ast).data) {
        try {
            const result = Reval(expr, env);
            if (isReturn(result)) {
                error('no function to return from, jumping to top level');
            }
            if (isBreak(result) || isNext(result)) {
                error('no loop for break/next, jumping to top level');
            }
            R_LastValueSymbol.value = result;
            if (EvalContext.R_Visible) {
                results.push({ printOutput: outputValue(result), isErr: false });
            }
            if (true) {
                printWarnings();
            }
        } catch (e) {
            results.push({ printOutput: 'Error: ' + e.message, isErr: true });
        }
    }
    return results;
}

export function testInterpret(prog: string, env: R.Env) {
    const ast = parse(prog); // should wrap in try-catch
    let result;
    for (const expr of (<R.Expression>ast).data) {
        result = Reval(expr, env);
        if (isReturn(result)) {
            error('no function to return from, jumping to top level');
        }
        if (isBreak(result) || isNext(result)) {
            error('no loop for break/next, jumping to top level');
        }
    }
    return result;
}

// placeholders
// const printValueEnv = (r: R.RValue, e: R.Env) => console.log(r);
const printWarnings = () => {};

export function setupR() {
    initPrimitives();
    interpret(baseLib, R_BaseEnv);
}

setupR();

export function simpleInterpret(prog: string): { printOutput: string, isErr: boolean }[] {
    return interpret(prog, R_GlobalEnv);
}

// const sampleProg = `
//     x <- c(1, 2, 3);
//     attr(x, "test") <- "testvalue";
//     attr(x, "dim") <- 3;
//     attributes(x);
// `;

// interpret(sampleProg, R_GlobalEnv);
