import {ANTLRInputStream, CommonTokenStream, ANTLRErrorListener, Recognizer, RecognitionException} from 'antlr4ts';
import {RLexer} from './grammar/RLexer';
import {RParser} from './grammar/RParser';
import {ASTVisitor} from './grammar/ASTVisitor';
import {RValue} from './main/types';

export function parse(prog: string) : RValue|string {
    const input = new ANTLRInputStream(prog);
    const lexer = new RLexer(input);
    const tokens = new CommonTokenStream(lexer);
    const parser = new RParser(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(StringErrorListener.INSTANCE);
    const tree = parser.prog();
    if (StringErrorListener.INSTANCE.msg !== '') {
        const res = StringErrorListener.INSTANCE.msg;
        StringErrorListener.INSTANCE.msg = '';
        return res;
    }
    const visitor = new ASTVisitor();
    return visitor.visit(tree);
}

class StringErrorListener implements ANTLRErrorListener<any> {
    static readonly INSTANCE : StringErrorListener = new StringErrorListener();
    public msg: string = '';
    syntaxError<T>(recognizer: Recognizer<T, any>, 
                   offendingSymbol: T, line: number, 
                   charPositionInLine: number, 
                   msg: string, e: RecognitionException | undefined): void {
        this.msg = `line ${line}:${charPositionInLine} ${msg}`;
    }
}