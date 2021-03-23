import {Language} from './types';

// Discuss with Daniel error handling; for now use this wherever error is encountered
export function error(msg: string) : never {
    throw new Error(msg);
}

// errorcall should be used to include the call object in the message but I'm not sure yet how.
export function errorcall(call: Language, msg: string) : never {
    throw new Error(msg);
}

export function warn(msg: string) {
    // console.warn(msg);
}

export function warncall(call: Language, msg: string) {
    // console.warn(msg);
}

export function unimplementedType(fun: string, type: string) {
    error(`unimplemented type '${type}' in '${fun}'`);
}

export class ErrorOptions {
    public static R_warn_partial_match_args = false;
}
