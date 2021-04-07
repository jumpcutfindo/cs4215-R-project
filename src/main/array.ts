import {mkInt, RNull} from './values';
import * as R from './types';
import { checkArity, head, length } from './util';

const valid_objects = ['list', 'logical', 'integer', 'double', 'character'];

export const do_length : R.PrimOp = (call, op, args, env) => {
    checkArity(call, op, args);
    return mkInt(length(head(args)));
}
