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

describe('simple c() tests', () => {
    const tests = [
        {testName: 'c() test (same type)', program: 'c(1, 2, 3);', expectedData: [1, 2, 3], expectedType: 'numeric'},
        {testName: 'c() test (different types)', program: 'c(TRUE, 1, "abc");', expectedData: ['TRUE', '1', 'abc'], expectedType: 'character'},
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


describe('simple c() tests', () => {
    // TODO: Add tests for copying and preservation of attributes
    // TODO: Add tests for recursive setting
    // TODO: Add tests for attribute copying
});
