import { RValue } from "./types";
import { length } from "./util";

export function lengthDots(val: RValue) : number {
    return val.tag === 'dotdotdot' ? length(val) : 0;
}

// Checks a name if it is a ddval of the for ..n where n is an integer
export function ddval(name: string) : number|null {
    let match = name.match(/^\.\.(\d+)$/);
    if (match === null) {
        return null;
    } else {
        return parseInt(match[1]);
    }
}