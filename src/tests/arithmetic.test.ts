/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import {setupR, testInterpret} from '../index';
import * as R from '../main/types';
import {RNull, R_BaseEnv} from '../main/values';

let testEnvironment: R.Env = {
    tag: 'environment',
    attributes: RNull,
    parent: R_BaseEnv,
    frame: new Map(),
};

setupR();

function resetEnvironment() {
    testEnvironment = {
        tag: 'environment',
        attributes: RNull,
        parent: R_BaseEnv,
        frame: new Map(),
    };
}

describe('simple arithmetic tests', () => {
    const tests = [
        {testName: 'positive test', program: '+5;', expectedData: [5], expectedType: 'double'},
        {testName: 'negative test', program: '-5;', expectedData: [-5], expectedType: 'double'},
        {testName: 'addition test', program: '5 + 5;', expectedData: [10], expectedType: 'double'},
        {testName: 'subtraction test', program: '5 - 5;', expectedData: [0], expectedType: 'double'},
        {testName: 'multiply test', program: '5 * 5;', expectedData: [25], expectedType: 'double'},
        {testName: 'division test', program: '5 / 5;', expectedData: [1], expectedType: 'double'},
        {testName: 'power test', program: '9 ^ 5;', expectedData: [59049], expectedType: 'double'},
        {testName: 'modulus test', program: '9 %% 5;', expectedData: [4], expectedType: 'double'},
        {testName: 'integer division test', program: '10 %/% 5;',    expectedData: [2], expectedType: 'integer'},
    ];

    for (const test of tests) {
        it(`${test.testName}`, () => {
            const result = testInterpret(`${test.program}`, testEnvironment);
            expect(result).toHaveProperty('data', test.expectedData);
            expect(result).toHaveProperty('tag', test.expectedType);

            resetEnvironment();
        });
    }
});

describe('complex arithmetic tests', () => {
    const tests = [
        {testName: 'vector of length > 1', program: 'c(1, 2, 3) * c(4, 5, 6);', expectedData: [4, 10, 18], expectedType: 'double'},
        {testName: 'type coercion', program: 'c(TRUE, FALSE) + c(50, 50);', expectedData: [51, 50], expectedType: 'double'},
        {testName: 'recycling (smaller factor of larger)', program: 'c(1, 2) + c(1, 2, 3, 4);', expectedData: [2, 4, 4, 6], expectedType: 'double'},
        {testName: 'recycling (smaller not factor of larger)', program: 'c(1, 2, 3) + c(1, 2, 3, 4);', expectedData: [2, 4, 6, 5], expectedType: 'double'},
        {testName: '1 ^ y gives 1', program: '1 ^ 3000;', expectedData: [1], expectedType: 'double'},
        {testName: 'y ^ 0 gives 1', program: '3000 ^ 0;', expectedData: [1], expectedType: 'double'},
        {testName: 'x ^ y gives Infinity for y = Infinity', program: '32 ^ Inf;', expectedData: [Infinity], expectedType: 'double'},
        {testName: 'NULL handling', program: 'c(NULL, 2, 3) + c(1, 2, 3);', expectedData: [3, 5, 5], expectedType: 'double'},
        {testName: 'NA handling', program: 'c(NA, 2, 3) + c(1, 2, 3);', expectedData: [null, 4, 6], expectedType: 'double'},
    ];

    for (const test of tests) {
        it(`${test.testName}`, () => {
            const result = testInterpret(`${test.program}`, testEnvironment);
            expect(result).toHaveProperty('data', test.expectedData);
            expect(result).toHaveProperty('tag', test.expectedType);

            resetEnvironment();
        });
    }
});


