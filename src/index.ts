import {error} from './main/error';
import {isBreak, isNext, isReturn, Reval} from './main/eval';
import {EvalContext, initPrimitives} from './main/globals';
import * as R from './main/types';
import {head, LinkedListIter, tail} from './main/util';
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
    x <- x + 3
    x <- x * 2   # random comment
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
x <- 5
attributes(x)<-c(1,2,3)
`;

function printAST(call: R.Language) {
    for (let i of new LinkedListIter(call)) {
        if (i.value.tag === 'name') {
            process.stdout.write(i.value.pname + ', ');
        } else if (i.value.tag === 'numeric') {
            process.stdout.write(`${i.value.data}, `);
        }
    }
    console.log();
}


function interpret(prog: string, env: R.Env) {
    const ast = parse(prog); // should wrap in try-catch
    let result;
    for (const expr of (<R.Expression>ast).data) {
        // printAST(expr as R.Language);
        result = Reval(expr, env);
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
    return result;
}

export function testInterpret(prog: string, env: R.Env) {
    const ast = parse(prog); // should wrap in try-catch
    let result;
    for (const expr of (<R.Expression>ast).data) {
        // printAST(expr as R.Language);
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
const printValueEnv = (r: R.RValue, e: R.Env) => console.log(r);
const printWarnings = () => {};

initPrimitives();

// const sampleProg = `
//     x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
//     x[1:2] <- c(c("a", "b", "c"), c(1, 2, 3));
//     x;
//     x[1:2];
// `;

// interpret(sampleProg, R_GlobalEnv);
