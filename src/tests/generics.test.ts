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
describe('generic tests', () => {
    it('shouting', () => {
        const prog = `
            shout <- function(x, ...) UseMethod("shout");
            shout.default <- function(x) { "AAH"; };
            shout.integer <- function(x, str="A") { strrep(str, x); };
            shout.character <- function(x) { toupper(x); };
            c(num=shout(4), chr=shout("hello"), int=shout(4L, str="HA"));
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', ["AAH", "HELLO", "HAHAHAHA"]);
        expect(result).toHaveProperty('tag', 'character');
        resetEnvironment();
    });
});