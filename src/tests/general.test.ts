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
            x <- 5
            y <- 10
            x + y
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [15]);
        expect(result).toHaveProperty('tag', 'numeric');
    });

    it('function declaration and application', () => {
        const prog = `
            f <- function(x) {
                x * x
            }
            f(4)
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [16]);
        expect(result).toHaveProperty('tag', 'numeric');
    });

    it('conditional expression', () => {
        const prog = `
            x <- 50 < 100
            if (x) { 50 } else { 100 }
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [50]);
        expect(result).toHaveProperty('tag', 'numeric');
    });
});

// Contains various complex programs that will test our implementation's
// capabilities
describe('complex programs tests', () => {
    it('variable lookup in multiple envs', () => {
        const prog = `
            a <- 2
            b <- 7
            f <- function(x, y) {
                c <- 100
                d <- 500
                x - y * a + b - c + d
            }
            f(30, 10)
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [417]);
        expect(result).toHaveProperty('tag', 'numeric');
    });

    it('recursive function #1', () => {
        const prog = `
            factorial <- function(n) {
                if (n == 1) {
                    1
                } else {
                    n * factorial(n - 1)
                }
            }
            factorial(4)
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [24]);
        expect(result).toHaveProperty('tag', 'numeric');
    });

    it('recursive function #2', () => {
        const prog = `
            recurse <- function(x, y, operation, initvalue) {
                if (y == 0) {
                    initvalue
                } else {
                    operation(x, recurse(x, y - 1, operation, initvalue))
                }
            }
            
            f <- function(x, z) { x * z }
            recurse(2, 3, f, 1)
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [8]);
        expect(result).toHaveProperty('tag', 'numeric');
    });
});