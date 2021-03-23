// Implementing R's S3 generic system

import { getAttribute } from './attrib';
import * as R from './types';


export function inherits(val: R.RValue, klass: string) : boolean {
    const classes = getAttribute(val, "class", true);
    switch (classes.tag) {
    case 'character':
        return classes.data.includes(klass);
    default:
        return false;
    }
}