import { getAttribute } from './attrib';
import * as R from './types';
import { head, length, LinkedListIter, tail } from './util';
import { mkClosure, RNull, R_GlobalEnv, R_MissingArg } from './values';

class Printer {
    public options = { width: NaN };
    private currWidth = NaN;
    private currStr = '';
    public indent = 0;
    public print(str: string) {
        this.currStr += str;
    }

    public println(str: string) {
        this.currStr += str + '\n';
        this.currStr += '\t'.repeat(this.indent);
    }

    public flush() {
        console.log(this.currStr);
        this.currStr = '';
    }
}

const P = new Printer();


const reserved = ["if", "else", "repeat", "while", "function", "for", "in", "next", "break", "TRUE", "FALSE", "NULL", "Inf", "NaN", "NA"];
const syntaxValid = /^((\.\D)|[a-zA-Z])[\w.]*/;

function isOperator(name: string): boolean {
    const rOps = [
        '<<-', '<-', '+', '-', '*', '/', '^', '%%', '%/%', 
        '!', '&', '|', '||', '&&', '<', '>', '<=', '>=', '==', '!=', 
        ':', '$', '::'
    ];
    const userOps = /^%.*%$/;
    return (rOps.includes(name) || userOps.test(name));
}

function validName(name: string): string {
    if (reserved.includes(name) || !syntaxValid.test(name)) {
        return '`' + name + '`';
    } 
    return name;
}


export function printValue(val: R.RValue) {
    const classes = getAttribute(val, 'class');
    if (classes.tag !== 'character') {
        printDefault(val);
    } else {
        printS3Object(val, classes.data);
    }
    P.flush();

}

export function printDefault(val: R.RValue) {
    switch (val.tag) {
    case 'NULL':
        P.print('NULL');
        break;
    case 'name':
        P.print(validName(val.pname));
        break;
    case 'builtin':
    case 'special':
        P.print(`.Primitive("${val.primName}")`);
        break;
    case 'expression':
        val.data.forEach(rval => { printValue(rval); P.println(';'); });
        break;
    case 'language':
        printLanguage(val);
        break;
    case 'dotdotdot':
        P.print('<...>');
        break;
    case 'closure':
        printClosure(val);
        break;
    case 'environment':
        P.print('<environment>');
        break;
    case 'promise':
        P.print('<promise>');
        break;
    case 'list':
    case 'pairlist':
        printList(val);
        break;
    case 'integer':
    case 'numeric':
    case 'logical':
    case 'character':
        printAtomicVector(val);
    }
}

export function printClosure(cls: R.Closure) {
    P.print('function (');
    for (const formal of new LinkedListIter(cls.formals)) {
        P.print(formal.key);
        if (formal.value !== R_MissingArg) {
            P.print(' = ' + deparse(formal.value));
        }
        if (formal.next !== RNull) {
            P.print(', ');
        }
    }
    P.print(')');
    printDefault(cls.body);
}

export function printAtomicVector(val: R.Int|R.Real|R.Logical|R.Character) {
    const names = getAttribute(val, 'names');
    if (names.tag !== 'character') {
        P.print('[1] ');
        if (val.tag === 'character') {
            val.data.forEach(str => {
                P.print(str === null ? 'NA\t' : `"${str}"\t`);
            });
        } else if (val.tag === 'logical') {
            val.data.forEach(l => P.print(l === null ? 'NA\t' : l ? 'TRUE\t' : 'FALSE\t'));
        } else {
            val.data.forEach(i => P.print(i === null ? 'NA\t' : `${i}\t`));
        }
    } else {
        names.data.forEach(str => P.print(str === null ? 'NA\t' : `${str}\t`));
        P.println('');
        if (val.tag === 'character') {
            val.data.forEach(str => {
                P.print(str === null ? 'NA\t' : `"${str}"\t`);
            });
        } else if (val.tag === 'logical') {
            val.data.forEach(l => P.print(l === null ? 'NA\t' : l ? 'TRUE\t' : 'FALSE\t'));
        } else {
            val.data.forEach(i => P.print(i === null ? 'NA\t' : `${i}\t`));
        }
    }
}

export function printList(list: R.PairList|R.List, prefix: string = '') {
    const names = getAttribute(list, 'names');
    const entries = list.tag === 'list' ? list.data : [...new LinkedListIter(list)].map(x => x.value);
    entries.forEach((val, i) => {
        let index = prefix;
        if (names.tag === 'character' && names.data[i] !== '') {
            index += `$${names.data[i]}`;
        } else {
            index += `[[${i+1}]]`;
        }
        P.println(index);
        if (val.tag === 'pairlist' || val.tag === 'list') {
            printList(val, index);
        } else {
            printDefault(val);
        }
    });
}

export function printLanguage(call: R.Language) {
    if (call.value.tag === 'name') {
        let done = false;
        switch (call.value.pname) {
        case 'if':
            if (length(call) >= 3) {
                P.print('if (');
                printDefault(head(tail(call)));
                P.print(')');
                printDefault(head(tail(tail(call))));
                let alt = tail(tail(tail(call)));
                if (alt.tag !== 'NULL') {
                    P.print('else');
                    printDefault(alt.value);
                }
                done = true;
                break;
            }
        case 'for':
            if (length(call) === 4) {
                P.print('for (');
                printDefault(head(tail(call)));
                P.print(' in ');
                printDefault(head(tail(tail(call))));
                P.print(')');
                printDefault(head(tail(tail(tail(call)))));
                done = true;
                break;
            }
        case 'while':
            if (length(call) === 3) {
                P.print('while (');
                printDefault(head(tail(call)));
                P.print(')');
                printDefault(head(tail(tail(call))));
                done = true;
                break;
            }
        case 'repeat':
            if (length(call) === 2) {
                P.print('repeat ');
                printDefault(head(tail(call)));
                done = true;
                break;
            }
        case 'break':
            P.print('break');
            done = true;
            break;
        case 'next':
            P.print('next');
            done = true;
            break;
        case 'function':
            if (length(call) >= 3 && ['pairlist', 'NULL'].includes(head(tail(call)).tag)) {
                printClosure(mkClosure(head(tail(call)) as R.PairList, head(tail(tail(call))), R_GlobalEnv));
                done = true;
                break;
            }
        case '(':
            if (length(call) === 2) {
                P.print('(');
                printDefault(head(tail(call)));
                P.print(')');
                done = true;
                break;
            }
        case '{':
            printBraces(tail(call));
            done = true;
            break;
        }
        if (!done) {
            if (isOperator(call.value.pname) && length(call) === 3) {
                printDefault(head(tail(call)));
                P.print(` ${call.value.pname} `);
                printDefault(head(tail(tail(call))));
            } else if ((call.value.pname === '[' || call.value.pname === '[[') && length(call) >= 2) {
                const isOne = call.value.pname === '[';
                printDefault(head(tail(call)));
                P.print(isOne ? '[' : '[[');
                for (const arg of new LinkedListIter(tail(tail(call)))) {
                    if (arg.key !== '') {
                        P.print(`${arg.key}=`);
                    }
                    printDefault(arg.value);
                    if (arg.next !== RNull) {
                        P.print(', ');
                    }
                }
                P.print(isOne ? ']' : ']]');
            } else {
                printDefault(call.value);
                P.print('(');
                for (const arg of new LinkedListIter(tail(call))) {
                    if (arg.key !== '') {
                        P.print(`${arg.key}=`);
                    }
                    printDefault(arg.value);
                    if (arg.next !== RNull) {
                        P.print(', ');
                    }
                }
                P.print(')');
            }
        }
    } else {
        printDefault(call.value);
        P.print('(');
        for (const arg of new LinkedListIter(tail(call))) {
            if (arg.key !== '') {
                P.print(`${arg.key}=`);
            }
            printDefault(arg.value);
            if (arg.next !== RNull) {
                P.print(', ');
            }
        }
        P.print(')');
    }
}

export function printBraces(args: R.PairList|R.Nil) {
    P.println('');
    P.print('{');
    P.indent++;
    P.println('');
    for (const arg of new LinkedListIter(args)) {
        printDefault(arg.value);
        P.print(';');
    }
    P.indent--;
    P.println('');
    P.println('}');
}

export function printS3Object(val: R.RValue, classes: (string|null)[]) {
    P.print('<S3 object>');
}

export function deparse(val: R.RValue) : string {
    return '<some value>';
}