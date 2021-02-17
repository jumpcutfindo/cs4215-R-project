import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {RLexer} from './grammar/RLexer';
import {RParser} from './grammar/RParser';

const sampleProg : string = `
x <- c(1,2,3)
if (length(x) > 2) {
    print("length is more than 2")
} else {
    x <- rep(x, 2)
}
x
`;

export function main() {
    const input = new ANTLRInputStream(sampleProg);
    const lexer = new RLexer(input);
    const tokens = new CommonTokenStream(lexer);
    const parser = new RParser(tokens);
    parser.buildParseTree = true;
    const tree = parser.prog();
    console.log(tree.toStringTree(parser));
}
