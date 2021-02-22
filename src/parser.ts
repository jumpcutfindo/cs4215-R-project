import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {RLexer} from './grammar/RLexer';
import {RParser} from './grammar/RParser';
import {ASTVisitor} from './grammar/ASTVisitor';
import {RValue} from './main/types';


export function parse(prog: string) : RValue {
    const input = new ANTLRInputStream(prog);
    const lexer = new RLexer(input);
    const tokens = new CommonTokenStream(lexer);
    const parser = new RParser(tokens);
    const tree = parser.prog();
    console.log(tree.toStringTree(parser));
    const visitor = new ASTVisitor();
    return visitor.visit(tree);
}
