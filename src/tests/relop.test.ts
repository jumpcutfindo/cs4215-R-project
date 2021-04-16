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
describe('simple relop tests', () => {
    const tests = [
        {testName: 'lesser test', program: '5 < 10;', expectedData: [true], expectedType: 'logical'},
        {testName: 'greater test', program: '5 > 10;', expectedData: [false], expectedType: 'logical'},
        {testName: 'lesser equal test', program: '5 <= 10;', expectedData: [true], expectedType: 'logical'},
        {testName: 'greater equal test', program: '5 >= 10;', expectedData: [false], expectedType: 'logical'},
        {testName: 'equal test', program: '10 == 10;', expectedData: [true], expectedType: 'logical'},
        {testName: 'not equal test', program: '10 != 10;', expectedData: [false], expectedType: 'logical'},
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

describe('complex relop tests', () => {
    const tests = [
        {testName: 'vector of length > 1', program: 'c(1, 2, 3) > c(0, 5, 3);', expectedData: [true, false, false], expectedType: 'logical'},
        {testName: 'type coercion', program: 'c(TRUE, FALSE, TRUE) > c(FALSE, FALSE, FALSE);', expectedData: [true, false, true], expectedType: 'logical'},
        {testName: 'recycling (smaller factor of larger)', program: 'c(1, 2) > c(4, 5, 6, 7);', expectedData: [false, false, false, false], expectedType: 'logical'},
        {testName: 'recycling (smaller not factor of larger)', program: 'c(1, 2, 3) > c(4, 5, 6, 7);', expectedData: [false, false, false, false], expectedType: 'logical'},
        {testName: 'string comparison (diff. strings)', program: '"abc"=="xyz";', expectedData: [false], expectedType: 'logical'},
        {testName: 'string comparison (same strings)', program: '"abc"=="abc";', expectedData: [true], expectedType: 'logical'},
        {testName: 'NULL handling', program: 'c(NULL, 2, 3) > c(0, 1, 2);', expectedData: [true, true, false], expectedType: 'logical'},
        {testName: 'NA handling', program: 'c(NA, 2, 3) > c(0, 1, 2);', expectedData: [null, true, true], expectedType: 'logical'},
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

