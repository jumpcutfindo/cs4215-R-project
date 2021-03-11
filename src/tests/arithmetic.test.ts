/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import {testInterpret} from '../index';
import * as Arith from '../main/arithmetic';
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

describe('simple arithmetic tests', () => {
    const tests = [
        {testName: 'positive test', program: '+5', expectedData: [5], expectedType: 'numeric'},
        {testName: 'negative test', program: '-5', expectedData: [-5], expectedType: 'numeric'},
        {testName: 'addition test', program: '5 + 5', expectedData: [10], expectedType: 'numeric'},
        {testName: 'subtraction test', program: '5 - 5', expectedData: [0], expectedType: 'numeric'},
        {testName: 'multiply test', program: '5 * 5', expectedData: [25], expectedType: 'numeric'},
        {testName: 'division test', program: '5 / 5', expectedData: [1], expectedType: 'numeric'},
        {testName: 'modulus test', program: '9 %% 5', expectedData: [4], expectedType: 'numeric'},
        {testName: 'integer division test', program: '10 %/% 5',    expectedData: [2], expectedType: 'integer'},
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
        {testName: 'vector of length > 1', program: 'c(1, 2, 3) * c (4, 5, 6)', expectedData: [4, 10, 18], expectedType: 'numeric'},
        {testName: 'type coercion', program: 'c(TRUE, FALSE) + c(50, 50)', expectedData: [51, 50], expectedType: 'numeric'},
        {testName: 'recycling', program: 'c(1, 2, 3) + c(1, 2, 3, 4)', expectedData: [2, 4, 6, 5], expectedType: 'numeric'},
        {testName: 'NULL handling', program: 'c(NULL, 2, 3) + c(1, 2, 3)', expectedData: [3, 5, 5], expectedType: 'numeric'},
        {testName: 'NA handling', program: 'c(NA, 2, 3) + c(1, 2, 3)', expectedData: [null, 4, 6], expectedType: 'numeric'},
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


