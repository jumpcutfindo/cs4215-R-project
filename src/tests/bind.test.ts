/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import {testInterpret} from '../index';
import * as R from '../main/types';
import {RNull, R_BaseEnv, mkPairlist, mkChars} from '../main/values';

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


describe('complex c() tests', () => {
    it(`with named objects`, () => {
        const prog = `
            x <- c(a=1, 2, 3);
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['a', '', '']), 'names']));
        expect(result).toHaveProperty('data', [1, 2, 3]);
        expect(result).toHaveProperty('tag', 'numeric');

        resetEnvironment();
    });

    it(`with coercion`, () => {
        const prog = `
            x <- c(a=1, "2", 3);
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['a', '', '']), 'names']));
        expect(result).toHaveProperty('data', ['1', '2', '3']);
        expect(result).toHaveProperty('tag', 'character');

        resetEnvironment();
    });

    it(`with flattening`, () => {
        const prog = `
            x <- c(c(2, 3), c(4, c(5,6)));
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [2, 3, 4, 5, 6]);
        expect(result).toHaveProperty('tag', 'numeric');

        resetEnvironment();
    });

    it(`with preservation of names`, () => {
        const prog = `
            x <- c(c(2, 3), c(a=4, c(5,6)));
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['', '', 'a', '', '']), 'names']));
        expect(result).toHaveProperty('data', [2, 3, 4, 5, 6]);
        expect(result).toHaveProperty('tag', 'numeric');

        resetEnvironment();
    });
    // TODO: Add tests for copying and preservation of attributes
    // TODO: Add tests for recursive setting
    // TODO: Add tests for attribute copying
});
