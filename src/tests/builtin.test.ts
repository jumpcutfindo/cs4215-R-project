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
describe('simple list tests', () => {
    it('access list items', () => {
        const prog = `x <- list(num=1, nul=NULL, str=c("hello", "bye"), bulz=c(TRUE, TRUE, FALSE, FALSE));`;
        const accesses = [
            { access: ['x$num;', 'x[["num"]];', 'x[[1]];'], data: [1] },
            { access: ['x$nul;', 'x[["nul"]];', 'x[[2]];', 'x$blahblah;'], tag: 'NULL' },
            { access: ['x$str;', 'x[["str"]];', 'x[[3]];'], data: ["hello", "bye"] },
            { access: ['x$bulz;', 'x[["bulz"]];', 'x[[4]];'], data: [true, true, false, false] },
        ]
        for (let test of accesses) {
            const result = testInterpret(prog + test.access, testEnvironment);
            if (test.tag) {
                expect(result).toHaveProperty('tag', test.tag);
            } else if (test.data) {
                expect(result).toHaveProperty('data', test.data)
            }
            resetEnvironment();
        }
    });
});
