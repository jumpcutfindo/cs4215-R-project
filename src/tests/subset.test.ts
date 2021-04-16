/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
import {setupR, testInterpret} from '../index';
import * as R from '../main/types';
import {mkChars, mkInts, mkLogicals, mkPairlist, mkReals, RNull, R_BaseEnv} from '../main/values';

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
// TODO: test extraction and assignment with lists

describe('single extraction tests', () => {
    // Vectors
    it('vector single extraction w/ index', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[[1]];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a']);
        resetEnvironment();
    });

    it('vector single extraction w/ exact name', () => {
        const result = testInterpret(`
            x <- c(a="test1", b="test2", c="test3");
            x[["c"]];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['test3']);
        resetEnvironment();
    });

    it('vector single extraction w/ partial matching', () => {
        const result = testInterpret(`
            x <- c(a="test1", b="test2", c="test3", testname="test4");
            x[["t", exact=FALSE]];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['test4']);
        resetEnvironment();
    });
});

describe('multiple extraction tests', () => {
    it('vector extraction w/ positive integers', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[1:2];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', 'b']);
        resetEnvironment();
    });

    it('vector extraction w/ duplicate indices', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(1, 1)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', 'a']);
        resetEnvironment();
    });

    it('vector extraction w/ real numbers', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(1.5, 2.8)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', 'b']);
        resetEnvironment();
    });

    it('vector extraction w/ indices exceeding', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[1:6];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', 'b', 'c', null, null, null]);
        resetEnvironment();
    });

    it('vector extraction w/ negative indices', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(-1, -3)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['b']);
        resetEnvironment();
    });

    it('vector extraction w/ logical vectors', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(TRUE, FALSE, FALSE)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a']);
        resetEnvironment();
    });

    it('vector extraction w/ logical vectors (recycling)', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(TRUE, FALSE)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', 'c']);
        resetEnvironment();
    });

    it('vector extraction w/ NAs', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(1, NA)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', null]);
        resetEnvironment();
    });

    it('vector extraction w/ NULLs', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(1, NULL)];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a']);
        resetEnvironment();
    });

    it('vector extraction w/ names', () => {
        const result = testInterpret(`
            x <- c(a=1, b=2, c=3);
            x[c("a", "b")];
        `, testEnvironment);
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['a', 'b']), 'names']));
        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [1, 2]);
        resetEnvironment();
    });
});

describe('single assignment tests', () => {
    it('single vector assignment w/ index', () => {
        const result = testInterpret(`
            x <- c(1, 2, 3);
            x[[1]] <- c(5);
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [5, 2, 3]);
        resetEnvironment();
    });

    it('single list assignment w/ index', () => {
        const result = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x[[2]] <- c(1, 2, 3);
            x[["nul"]];
        `, testEnvironment);

        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [1, 2, 3]);
    });

    it('single list assignment w/ name (existing)', () => {
        const result = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x$nul <- c(1, 2, 3);
            x[["nul"]];
        `, testEnvironment);

        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [1, 2, 3]);

        const result2 = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x[["nul"]] <- c(1, 2, 3);
            x$nul;
        `, testEnvironment);

        expect(result2).toHaveProperty('tag', 'double');
        expect(result2).toHaveProperty('data', [1, 2, 3]);
    });

    it('single list assignment w/ name (not existing)', () => {
        const result = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x$blahblah <- c(1, 2, 3);
            x[["blahblah"]];
        `, testEnvironment);

        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [1, 2, 3]);
    });
});

describe('multiple assignment tests', () => {
    it('vector assignment w/ positive integers', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[1:2] <- c("g", "h");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['g', 'h', 'c']);
        resetEnvironment();
    });

    it('vector assignment w/ real numbers', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(1.1, 2.8)] <- c("g", "h");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['g', 'h', 'c']);
        resetEnvironment();
    });

    it('vector assignment w/ indices exceeding', () => {
        const result = testInterpret(`
            x <- c(a=1, b=2, c=3);
            x[1:5] <- 5;
        `, testEnvironment);
        expect(result).toHaveProperty('attributes', mkPairlist([mkChars(['a', 'b', 'c', '', '']), 'names']));
        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [5, 5, 5, 5, 5]);
        resetEnvironment();
    });

    it('vector assignment w/ negative indices', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(-1, -2)] <- c("g");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['a', 'b', 'g']);
        resetEnvironment();
    });

    it('vector assignment w/ logical vectors', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(TRUE, FALSE, FALSE)] <- c("g");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['g', 'b', 'c']);
        resetEnvironment();
    });

    it('vector assignment w/ logical vectors (recycling)', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(TRUE, FALSE)] <- c("g");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['g', 'b', 'g']);
        resetEnvironment();
    });

    it('vector assignment w/ logical names (recycling)', () => {
        const result = testInterpret(`
            x <- c(a=1, b=2, c=3);
            x[c("a", "b")] <- c(10, 10);
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'double');
        expect(result).toHaveProperty('data', [10, 10, 3]);
        resetEnvironment();
    });

    it('vector assignment w/ NULLs', () => {
        const result = testInterpret(`
            x <- c("a", "b", "c");
            x[c(1, NULL)] <- c("g");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['g', 'b', 'c']);
        resetEnvironment();
    });

    it('vector assignment w/ coercion', () => {
        const result = testInterpret(`
            x <- c(1, 2, 3);
            x[1:2] <- c("g");
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'character');
        expect(result).toHaveProperty('data', ['g', 'g', '3']);
        resetEnvironment();
    });

    it('list assignment w/ positive integers', () => {
        const result = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x[1:2] <- list(c("a", "b", "c"), c(1, 2, 3));
            x[1:2];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'list');
        expect(result).toHaveProperty('data', [mkChars(['a', 'b', 'c']), mkReals([1, 2, 3])]);
        resetEnvironment();
    });

    it('list assignment w/ names', () => {
        const result = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x[c("num", "nul")] <- list(c("a", "b", "c"), c(1, 2, 3));
            x[1:2];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'list');
        expect(result).toHaveProperty('data', [mkChars(['a', 'b', 'c']), mkReals([1, 2, 3])]);
        resetEnvironment();
    });

    it('list assignment w/ indices exceeding', () => {
        const result = testInterpret(`
            x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));
            x[5:6] <- list(c("a", "b", "c"), c(1, 2, 3));
            x[5:6];
        `, testEnvironment);
        expect(result).toHaveProperty('tag', 'list');
        expect(result).toHaveProperty('data', [mkChars(['a', 'b', 'c']), mkReals([1, 2, 3])]);
        resetEnvironment();
    });
});
