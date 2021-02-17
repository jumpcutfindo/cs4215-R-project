import {RNull} from './values';
import {main} from './parser';

const world = 'world';

export function hello(word: string = world): string {
    return `Hello ${RNull}! `;
}

export {RNull};

main();
