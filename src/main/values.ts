import * as RValue from './types';


const v : any = {tag: 'name', pname: ''};
v.internal = v;
const v2 : any = {tag: 'name', pname: ''};
v2.internal = v2;


export const RNull : RValue.Nil = {tag: 'NULL'};
export const R_MissingArg = v as RValue.Name;
export const R_UnboundValue = v2 as RValue.Name;

export function mkName(
    name: string,
    internal: RValue.RValue=R_UnboundValue,
) : RValue.Name {
    return {tag: 'name', pname: name, internal: internal};
}

// TODO: Global Symbol Table, install function
