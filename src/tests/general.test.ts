/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import {testInterpret} from '../index';
import * as R from '../main/types';
import {RNull, R_BaseEnv} from '../main/values';

let testEnvironment: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: R_BaseEnv,
    frame: new Map(),
};

function resetEnvironment() {
    testEnvironment = {
        tag: 'environment',
        attributes: RNull,
        parent: R_BaseEnv,
        frame: new Map(),
    };
}

// Simple tests to check if our implementation does the proper evaluation
describe('simple programs tests', () => {
    it('variable declaration & lookup', () => {
        const prog = `
            x <- 5;
            y <- 10;
            x + y;
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [15]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('function declaration and application', () => {
        const prog = `
            f <- function(x) {
                x * x;
            };
            f(4);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [16]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('conditional expression', () => {
        const prog = `
            x <- 50 < 100;
            if (x) { 50; } else { 100; };
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [50]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });
});

// Contains various complex programs that will test our implementation's
// capabilities
describe('complex programs tests', () => {
    it('variable lookup in multiple envs', () => {
        const prog = `
            a <- 2;
            b <- 7;
            f <- function(x, y) {
                c <- 100;
                d <- 500;
                x - y * a + b - c + d;
            };
            f(30, 10);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [417]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('recursive function #1', () => {
        const prog = `
            factorial <- function(n) {
                if (n == 1) {
                    1;
                } else {
                    n * factorial(n - 1);
                };
            };
            factorial(4);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [24]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('recursive function #2', () => {
        const prog = `
            recurse <- function(x, y, operation, initvalue) {
                if (y == 0) {
                    initvalue;
                } else {
                    operation(x, recurse(x, y - 1, operation, initvalue));
                };
            };
            
            f <- function(x, z) { x * z; };
            recurse(2, 3, f, 1);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [8]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('vectorized operations', () => {
        const prog = `
            output <- NULL;
            triangle <- function(x, output="") {
                y <- x * (x - 1);
                if (output != "") {
                    output <<- y / 2;
                };
                return (y / 2);
            };
            values <- 1:10;
            triangle(values, out="yes");
            output;
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [0,1,3,6,10,15,21,28,36,45]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('dotdotdot operations', () => {
        const prog = `
            testdots <- function(times, ...) {
                res <- c(...);
                res * times;
            };
            values <- 1:10;
            testdots(10, a=1, b=2, c=3);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [10, 20, 30]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    // currently fails as there is an error with the parser. since function call and assignment share the same
    // left-recursion function call takes higher precedence thus the assignment is ignored...
    it('replacement functions', () => {
        const prog = `
            \`duck<-\` <- function(x, value) {
                x + value;
            };
            values <- c(4,5);
            duck(values) <- 33;
            values;
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [37, 38]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('for loop functions', () => {
        const prog = `
            x <- 1;
            for (i in 15:17.5) {
                x <- c(x, x+i);
            };
            x;
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [1, 16, 17, 32, 18, 33, 34, 49]);
        expect(result).toHaveProperty('tag', 'numeric');
        resetEnvironment();
    });

    it('while loop functions', () => {
        const prog = `
            abs <- function(x) {
                if (x > 0) {
                    x;
                } else {
                    -x;
                };
            };
            init <- 1;
            x <- 1 + (1/init);
            while (abs(init - x) > 0.01) {
                init <- x;
                x <- 1 + (1/x);
            };
            x;
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('tag', 'numeric');
        expect((result as R.Real).data[0]).toBeCloseTo(1.615);
        resetEnvironment();
    });

    it('higher order functions', () => {
        const prog = `
            abs <- function(x) {
                if (x > 0) {
                    x;
                } else {
                    -x;
                };
            };
            # Finds the fix point of function x = f(x)
            fp_iterate <- function(init, f, precision) {
                prev <- init;
                x <- f(prev);
                while (abs(prev - x) > precision) {
                    prev <- x;
                    x <- f(x);
                };
                x;
            };
            fp_iterate(prec=0.001, 1, function(x) { 1 + (1/x); });
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('tag', 'numeric');
        const val = (result as R.Real).data[0]!;
        expect(Math.abs(val - (1 + (1/val)))).toBeLessThanOrEqual(0.001);
        resetEnvironment();
    });
});
