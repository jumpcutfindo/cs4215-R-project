/** *******************************************************************
 * Module for matching of formals to arguments
 *
 * Differences from GNU R:
 *
 * 1. Error messages do not have separate singular/plural form
 * 2. matchArgs does not search the supplied arguments 1 extra time to
 *    determine which arguments are unused, but just reports that there
 *    are unused arguments
 **********************************************************************/

import {errorcall, ErrorOptions, warncall} from './error';
import {DotDotDot, Language, Nil, PairList, RValue} from './types';
import {cons, length, LinkedListIter, tail} from './util';
import {mkPairlist, RNull, R_MissingArg} from './values';

// From match.c line 60
function psmatch(formal: string, supplied: string, exact: boolean) {
    return exact ? formal === supplied : formal.startsWith(supplied);
}

export function matchArgs(formals: PairList|Nil, supplied: PairList|Nil, call: Language) {
    let fargi = 0;
    let actuals: PairList|Nil = RNull;
    for (const _ of new LinkedListIter(formals)) {
        actuals = cons(R_MissingArg, actuals);
        fargi++;
    }
    const formalUsed = new Array(fargi).fill(0);
    const argUsed = new Array(length(supplied)).fill(0);
    let actualptr = actuals;

    // first pass: exact key matching
    fargi = 0;
    for (const f of new LinkedListIter(formals)) {
        if (f.key !== '...' && f.key !== '') {
            let argi = 1;
            for (const b of new LinkedListIter(supplied)) {
                if (f.key === b.key) {
                    if (formalUsed[fargi] === 2) {
                        errorcall(call, `formal argument "${f.key}" matched by multiple actual arguments`);
                    }
                    if (argUsed[argi-1] === 2) {
                        errorcall(call, `argument ${argi} matches multiple formal arguments`);
                    }
                    (<PairList>actualptr).value = b.value;
                    argUsed[argi-1] = 2;
                    formalUsed[fargi] = 2;
                }
                argi++;
            }
        }
        actualptr = tail(actualptr);
        fargi++;
    }

    // Second pass: partial matches based on tags
    // An exact match is required after first ...
    // The location of the first ... is saved in "dots"
    let dots: PairList|Nil = RNull;
    let seendot = false;
    fargi = 0;
    actualptr = actuals;
    for (const f of new LinkedListIter(formals)) {
        if (formalUsed[fargi] === 0) {
            if (f.key === '...' && !seendot) {
                // record where ... goes for 3rd pass
                dots = actualptr;
                seendot = true;
            } else {
                let argi = 1;
                for (const b of new LinkedListIter(supplied)) {
                    if (argUsed[argi-1] !== 2 && psmatch(f.key, b.key, seendot)) {
                        if (argUsed[argi-1]) {
                            errorcall(call, `argument ${argi} matches multiple formal arguments`);
                        }
                        if (formalUsed[fargi]) {
                            errorcall(call, `formal argument "${f.key}" matched by multiple actual arguments`);
                        }
                        if (ErrorOptions.R_warn_partial_match_args) {
                            warncall(call, `partial argument match of '${b.key}' to '${f.key}'`);
                        }
                        (<PairList>actualptr).value = b.value;
                        argUsed[argi-1] = 1;
                        formalUsed[fargi] = 1;
                    }
                    argi++;
                }
            }
        }
        actualptr = tail(actualptr);
        fargi++;
    }

    // Third pass: matches based on order
    // All args specified in tag=value form
    // have now been matched.  If we find ...
    // we gobble up all the remaining args.
    // Otherwise we bind untagged values in
    // order to any unmatched formals.
    let f: PairList|Nil = formals;
    actualptr = actuals;
    let b = supplied;
    let argi = 0;
    seendot = false;

    while (f.tag !== 'NULL' && actualptr.tag !== 'NULL' && b.tag !== 'NULL' && !seendot) {
        if (f.key === '...') {
            // Skip ... matching until all tags done
            seendot = true;
            f = tail(f);
            actualptr = tail(actualptr);
        } else if (actualptr.value !== R_MissingArg) {
            // Already matched by tag
            // skip to next formal
            f = tail(f);
            actualptr = tail(actualptr);
        } else if (argUsed[argi] || b.key !== '') {
            b = tail(b);
            argi++;
        } else {
            actualptr.value = b.value;
            argUsed[argi] = 1;
            argi++;
            b = tail(b);
            f = tail(f);
            actualptr = tail(actualptr);
        }
    }

    if (dots.tag !== 'NULL') {
        if (argUsed.some((i) => i === 0)) {
            argi = 0;
            const result: [RValue, string][] = [];
            for (const b of new LinkedListIter(supplied)) {
                if (!argUsed[argi]) {
                    result.push([b.value, b.key]);
                }
                argi++;
            }
            const dotval : any = mkPairlist(...result);
            dotval.tag = 'dotdotdot';
            dots.value = dotval as DotDotDot;
        }
    } else {
        // cut a little corner here, do not search and deparse unused argument
        // but just error and tell user that some argument is unused
        if (argUsed.some((i) => i === 0)) {
            errorcall(call, 'unused argument(s)');
        }
    }

    return actuals;
}
