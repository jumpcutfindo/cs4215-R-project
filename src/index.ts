import { error } from './main/error';
import { isBreak, isNext, isReturn, Reval } from './main/eval';
import { EvalContext, initPrimitives } from './main/globals';
import * as R from './main/types';
import {RNull, R_GlobalEnv, R_LastValueSymbol} from './main/values';
import {parse} from './parser';

const sampleProg1 : string = `
x <- c(1,2,3)
if (length(x) > 2) {
    print("length is more than 2")
} else {
    x <- rep(x, 2)
}
x
`;

const sampleProg2 : string = `
x <- y <<- 10
`;

const sampleProg3 : string = `
if (T) 3 else 4
`;

function interpret(prog: string, env: R.Env) {
    let ast = parse(prog); // should wrap in try-catch
    for (let expr of (<R.Expression>ast).data) {
        let result = Reval(expr, env);
        if (isReturn(result)) {
            error('no function to return from, jumping to top level');
        }
        if (isBreak(result) || isNext(result)) {
            error('no loop for break/next, jumping to top level');
        }
        R_LastValueSymbol.value = result;
        if (EvalContext.R_Visible) {
            printValueEnv(result, env);
        }
        if (true) {
            printWarnings();
        }
    }
}

// placeholders
const printValueEnv = (r: R.RValue, e: R.Env) => console.log(r);
const printWarnings = () => {}

initPrimitives();
interpret(sampleProg3, R_GlobalEnv);