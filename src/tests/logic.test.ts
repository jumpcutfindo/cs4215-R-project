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

function resetEnvironment() {
    testEnvironment = {
        tag: 'environment',
        attributes: RNull,
        parent: R_BaseEnv,
        frame: new Map(),
    };
}

setupR();

describe('simple logical tests', () => {
    const tests = [
        {testName: 'NOT test', program: '!TRUE;', expectedData: [false], expectedType: 'logical'},
        {testName: 'elementwise AND test', program: 'c(TRUE, FALSE, TRUE) & c(FALSE, TRUE, FALSE);', expectedData: [false, false, false], expectedType: 'logical'},
        {testName: 'AND test', program: 'c(TRUE, FALSE, TRUE) && c(FALSE, TRUE, FALSE);', expectedData: [false], expectedType: 'logical'},
        {testName: 'elementwise OR test', program: 'c(TRUE, FALSE, TRUE) | c(FALSE, TRUE, FALSE);', expectedData: [true, true, true], expectedType: 'logical'},
        {testName: 'OR test', program: 'c(TRUE, FALSE, TRUE) || c(FALSE, TRUE, FALSE);', expectedData: [true], expectedType: 'logical'},
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

describe('complex logical tests', () => {
    const tests = [
        {testName: 'type coercion', program: 'c(300, 0, 1) & c(TRUE, TRUE, TRUE);', expectedData: [true, false, true], expectedType: 'logical'},
        {testName: 'recycling (smaller factor of larger)', program: 'c(1, 0) & c(TRUE, TRUE, TRUE, TRUE);', expectedData: [true, false, true, false], expectedType: 'logical'},
        {testName: 'recycling (smaller not factor of larger)', program: 'c(1, 0) & c(TRUE, TRUE, TRUE);', expectedData: [true, false, true], expectedType: 'logical'},
        {testName: 'NULL handling', program: 'c(NULL, TRUE, FALSE) & c(TRUE, FALSE, TRUE);', expectedData: [true, false, true], expectedType: 'logical'},
        {testName: 'NA handling', program: 'c(NA, NA, FALSE) & c(TRUE, FALSE, TRUE);', expectedData: [null, false, false], expectedType: 'logical'},
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
