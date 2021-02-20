import { stringFalse, stringTrue } from "./util";

export function logicalFromString(x: string|null) : boolean|null {
    if (x !== null) {
        if (stringTrue(x)) return true;
        if (stringFalse(x)) return false;
    }
    return null;
}