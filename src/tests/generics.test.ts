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
        expect(result).toHaveProperty('attributes.key', 'names');
        expect(result).toHaveProperty('attributes.value.data', ['num', 'chr', 'int']);
        resetEnvironment();
    });

    it('generic variables', () => {
        const prog = `
            showClasses <- function(x) UseMethod("showClasses");
            showClasses.default <- function(x) {
                c(.Class, .Generic, .Method);
            };
            showClasses.foo <- function(x) {
                c(.Generic, .Class, .Method);
            };
            x <- 1;
            class(x) <- "foo";
            showClasses(x);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', ['showClasses', 'foo', 'showClasses.foo']);
        resetEnvironment();
    })
});