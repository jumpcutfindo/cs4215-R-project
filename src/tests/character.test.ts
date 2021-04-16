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
describe('simple string tests', () => {
    it('grepl', () => {
        const prog = `
            x <- c("Hi", "Hello");
            grepl("^H", x);
        `;
        const result = testInterpret(prog, testEnvironment);
        expect(result).toHaveProperty('data', [true, true]);
        expect(result).toHaveProperty('tag', 'logical');
        resetEnvironment();
    });
});