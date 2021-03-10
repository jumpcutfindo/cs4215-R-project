import {error} from './main/error';
import {isBreak, isNext, isReturn, Reval} from './main/eval';
import {EvalContext, initPrimitives} from './main/globals';
import * as R from './main/types';
import { head, LinkedListIter, tail } from './main/util';
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

const sampleProg2 : string = 
`x <- 4
fun <- function(x) {
    x <- x + 3;
    x <- x * 2;
    x * x
}
fun(x)
`;

const sampleProg3 : string = `
if (T) 3 else 4
.Last.value
`;

const sampleProg4 : string = `
c(abc=1, def=2, "a", recursive=TRUE);
`;

const sampleProg5 : string = `
x <- 4
x * 2
x <- x * 4
x
`

function printCall(call: R.Language) {
    var str = ''
    for (let i of new LinkedListIter(call)) {
        if (i.value.tag === 'name') {
            str += i.value.pname;
        } else if (i.value.tag === 'numeric') {
            str += i.value.data;
        } else if (i.value.tag === 'language') {
            printCall(i.value);
        }
        str += ', ';
    }
    console.log(str);
}


function interpret(prog: string, env: R.Env) {
    const ast = parse(prog); // should wrap in try-catch
    for (const expr of (<R.Expression>ast).data) {
        // printCall(expr as R.Language);
        const result = Reval(expr, env);
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
const printWarnings = () => {};

initPrimitives();
interpret(sampleProg5, R_GlobalEnv);
