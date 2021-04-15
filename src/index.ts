import {RError, error, ErrorOptions, outputWarnings} from './main/error';
import {isBreak, isNext, isReturn, Reval} from './main/eval';
import {initPrimitives} from './main/globals';
import { EvalContext } from "./main/EvalContext";
import { outputValue, printValue, TEXT_TYPE } from './main/print';
import * as R from './main/types';
import {RNull, R_BaseEnv, R_GlobalEnv, R_LastValueSymbol} from './main/values';
import {parse} from './parser';

import baseLib from './library/base.R';


export function interpret(prog: string, env: R.Env): { printOutput: string, type: TEXT_TYPE }[] {
    const ast = parse(prog); // should wrap in try-catch
    if (typeof ast === 'string') {
        return [{ printOutput: ast, type: TEXT_TYPE.ErrorOutput }];
    }
    let results: ReturnType<typeof interpret> = [];
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
                results.push({ printOutput: outputValue(result), type: TEXT_TYPE.EvalOutput });
            }
            if (ErrorOptions.R_CollectWarnings) {
                const warnings = outputWarnings();
                let msg;
                switch (warnings.length) {
                case 0:
                    break;
                case 1:
                    msg = `Warning message:\nIn ${outputValue(warnings[0].call)}: ${warnings[0].msg}`;
                    results.push({printOutput: msg, type: TEXT_TYPE.WarnOutput});
                    break;
                default:
                    msg = 'Warning messages:\n';
                    msg += warnings.map((warning, ix) => `${ix+1}: In ${outputValue(warning.call)}: ${warning.msg}`).join('\n');
                    results.push({printOutput: msg, type: TEXT_TYPE.WarnOutput});
                    break;
                }
            }
        } catch (e) {
            if (e instanceof RError) {
                results.push(e.call === undefined ? 
                    {printOutput: `Error: ${e.message}`, type: TEXT_TYPE.ErrorOutput} :
                    {printOutput: `Error in ${outputValue(e.call)}: ${e.message}`, type: TEXT_TYPE.ErrorOutput});
            } else {
                throw e;
            }
        }
    }
    return results;
}

export function testInterpret(prog: string, env: R.Env) {
    const ast = parse(prog); // should wrap in try-catch
    if (typeof ast === 'string') {
        return ast;
    }
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


export function setupR() {
    initPrimitives();
    interpret(baseLib, R_BaseEnv);
    console.log("Base lib loaded!");
}


export function simpleInterpret(prog: string): { printOutput: string, type: TEXT_TYPE }[] {
    return interpret(prog, R_GlobalEnv);
}

export function setOptions(options: { warnPartialArgs: boolean, warn: boolean}) {
    ErrorOptions.R_CollectWarnings = options.warn;
    ErrorOptions.R_warn_partial_match_args = options.warnPartialArgs;
}

export {R_GlobalEnv} from './main/values';

// const sampleProg = `
//     x <- c(1, 2, 3);
//     attr(x, "test") <- "testvalue";
//     attr(x, "dim") <- 3;
//     attributes(x);
// `;

// interpret(sampleProg, R_GlobalEnv);
