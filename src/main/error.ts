import { EvalContext } from "./EvalContext";
import {Language} from './types';

export class RError extends Error {
    public call?: Language;
    constructor(msg: string, call?: Language) {
        super(msg);
        this.call = call;
    }
}


// Discuss with Daniel error handling; for now use this wherever error is encountered
export function error(msg: string) : never {
    throw new RError(msg);
}

// errorcall should be used to include the call object in the message but I'm not sure yet how.
export function errorcall(call: Language, msg: string) : never {
    throw new RError(msg, call);
}

let warningBuffer : {msg: string, call: Language}[] = [];

export function warn(msg: string) {
    if (ErrorOptions.R_CollectWarnings) {
        warningBuffer.push({msg: msg, call: EvalContext.CallStack[EvalContext.CallStack.length - 1].call});
    }
}

export function warncall(call: Language, msg: string) {
    if (ErrorOptions.R_CollectWarnings) {
        warningBuffer.push({msg: msg, call: call});
    }
}

export function outputWarnings(): typeof warningBuffer {
    const res = warningBuffer;
    warningBuffer = [];
    return res;
}

export function unimplementedType(fun: string, type: string) {
    error(`unimplemented type '${type}' in '${fun}'`);
}

export class ErrorOptions {
    public static R_warn_partial_match_args = false;
    public static R_CollectWarnings = true;
}
