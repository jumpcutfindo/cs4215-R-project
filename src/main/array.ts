import {RNull} from '..';
import {Character, Int, List, Logical, Raw, Real, RValue} from './types';

const valid_objects = ['list', 'logical', 'integer', 'numeric', 'character'];

function length(x: RValue) {
    if (valid_objects.indexOf(x.tag) !== -1) {
        const data = (x as List | Logical | Int | Real | Character).data;
        return data.length;
    } else {
        return RNull;
    }
}
