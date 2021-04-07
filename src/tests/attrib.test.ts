/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import {testInterpret} from '../index';
import * as R from '../main/types';
import {mkChar, mkChars, mkInt, mkPairlist, RNull, R_BaseEnv} from '../main/values';

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

describe('simple attribute tests', () => {
    it(`set a single attribute`, () => {
        const prog = `
            x <- c(1, 2, 3);
            attr(x, "test") <- "testvalue";
            x;
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [1, 2, 3]);
        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('attributes', mkPairlist([mkChar('testvalue'), 'test']));

        resetEnvironment();
    });

    it(`get a single attribute`, () => {
        const prog = `
            x <- c(1, 2, 3);
            attr(x, "test") <- "testvalue";
            attr(x, "test");
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['testvalue']);

        resetEnvironment();
    });

    it(`get all attributes`, () => {
        const prog = `
            x <- c(1, 2, 3);
            attr(x, "test1 name") <- "test1";
            attr(x, "test2 name") <- "test2";
            attr(x, "test3 name") <- "test3";
            attributes(x);
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('tag', 'list');
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['test1 name', 'test2 name', 'test3 name']), 'names']));
        expect(result).toHaveProperty('data', [mkChar('test1'), mkChar('test2'), mkChar('test3')]);

        resetEnvironment();
    });

    // TODO: Set multiple attributes using list

    it(`attribute replacement`, () => {
        const prog = `
            x <- c(1, 2, 3);
            attr(x, "test") <- "testvalue";
            attr(x, "test") <- "no, this is test value!";
            x;
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [1, 2, 3]);
        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('attributes', mkPairlist([mkChar('no, this is test value!'), 'test']));

        resetEnvironment();
    });

    it(`attribute matching`, () => {
        const prog = `
            x <- c(1, 2, 3);
            attr(x, "test") <- "testvalue";
            attr(x, "t");
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['testvalue']);
    });
});

describe('special case attribute tests', () => {
    it(`dim has to be set first`, () => {
        const prog = `
            x <- c(1, 2, 3);
            attr(x, "test") <- "testvalue";
            attr(x, "dim") <- 3;
            attributes(x);
        `;

        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('tag', 'list');
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['dim', 'test']), 'names']));
        expect(result).toHaveProperty('data', [mkInt(3), mkChar('testvalue')]);
    });
});
