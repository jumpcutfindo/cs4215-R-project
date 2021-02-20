import * as R from './types';
import { RNull } from './values';

// Copies RValues with correct semantics. Loses type information since it seems
// impossible to indicate that the return type is the same as the argument type
// which is a union.
export function copy(val: R.RValue) : R.RValue {
    let result: R.RValue = RNull;
    switch (val.tag) {
    case 'NULL':
    case 'name':
    case 'builtin':
    case 'special':
    case 'promise':
    case 'environment':
    case 'dotdotdot': // not sure if it is ever copied
        result = val;
        break;
    case 'pairlist':
    case 'language':
        result = {...val};
        result.attributes = copy(val.attributes) as R.Nil|R.PairList;
        result.value = copy(val.value);
        result.next = copy(val.next) as R.Nil|R.PairList;
        break;
    case 'character':
    case 'logical':
    case 'integer':
    case 'numeric':
        result = {...val};
        result.attributes = copy(val.attributes) as R.Nil|R.PairList;
        result.data = val.data.slice();
        break;
    case 'expression':
    case 'list':
        result = {...val};
        result.attributes = copy(val.attributes) as R.Nil|R.PairList;
        result.data = val.data.map(copy);
        break;
    case 'closure':
        result = {...val};
        result.formals = copy(val.formals) as R.PairList;
        result.body = copy(val.body) as R.Language;
        break;
    }
    return result;
}