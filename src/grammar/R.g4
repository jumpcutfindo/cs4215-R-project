grammar R;

@parser::members {

public lineTerminatorAhead() : boolean {
    let possibleIndex = this.currentToken.tokenIndex + 1;
    if (possibleIndex < this._input.size) {
        let ahead : Token = this._input.get(possibleIndex);
        if (ahead.channel != Token.HIDDEN_CHANNEL) {
            return false;
        }
        return (ahead.type === RParser.COMMENT) || (ahead.text!.includes('\n'));
    }
    return true;
}
}

prog:   (   expr eoe
        )*
        EOF?
    ;

expr :  literal                                     # Lit
     |  ID                                          # Symbol
     |  op='(' expr ')'                             # Call
     |  expr '(' arglist ')'                        # FunCall
     |  'function' '(' formallist ')' expr          # Function
     |  op='{' (expr eoe)* '}'                      # Call
     |  name '::' name                              # Namespace
     |  expr '$' name                               # ComponentExtraction
     |  expr '[' arglist ']'                        # Subset
     |  expr '[[' arglist ']]'                      # Indexing
     |  <assoc=right> expr op='^' expr              # Call
     |  op=('-'|'+') expr                           # Call
     |  expr op=':' expr                            # Call
     |  expr op=USER_OP expr                        # Call
     |  expr op=('*'|'/') expr                      # Call
     |  expr op=('+'|'-') expr                      # Call
     |  expr op=('>'|'>='|'<'|'<='|'=='|'!=') expr  # Call
     |  op='!' expr                                 # Call
     |  expr op=('&'|'&&') expr                     # Call
     |  expr op=('|'|'||') expr                     # Call
     |  val=expr arrow=('->'|'->>') assignee=expr   # Assign
     |  assignee=expr arrow=('<-'|'<<-') val=expr   # Assign
     |  op='if' '(' expr ')' expr ('else' expr)?    # Call
     |  'for' '(' ID 'in' seq=expr ')' body=expr    # For
     |  op='while' '(' expr ')' expr                # Call
     |  op='repeat' expr                            # Call
     |  op='break'                                  # Call
     |  op='next'                                   # Call
     ;

// exprlist
//     :   (expr eoe)*
//     ;

// Represents end of expressions
eoe :    ';'
//        | {this.lineTerminatorAhead()}?
//        | {this._input.LT(1).type == RParser.RBRACE}?
        ;

literal :  INT 
        |  FLOAT
        |  HEX
        |  STRING
        |  NULL
        |  NA
        |  NAN
        |  INF
        |  BOOL
        ;

name : ID | STRING ;

formallist : formal (',' formal)* 
           |
           ;

formal:   ID
      |   ID '=' expr
      ;


arglist : arg (',' arg)*
        ;

arg :   expr
    |   ID '='
    |   ID '=' expr
    |   STRING '='
    |   STRING '=' expr
    |   NULL '='
    |   NULL '=' expr
    |   
    ;

LBRACE : '{' ;
RBRACE : '}' ;

NULL : 'NULL' ;

NA : 'NA' ;

NAN : 'NaN' ;

INF : 'Inf' ;

BOOL : 'TRUE'
     | 'FALSE'
     | 'T'
     | 'F'
     ;

// Only ..., ..1 and ..2 are reserved
//DOTS : '...'
//     | '..' DIGIT+
//     ;

HEX :   '0' ('x'|'X') HEXDIGIT+ ;

INT :   FLOAT 'L' 
    |   HEX 'L'
    ;

fragment
HEXDIGIT : ('0'..'9'|'a'..'f'|'A'..'F') ;

FLOAT:  DIGIT+ '.' DIGIT* EXP?
    |   DIGIT+ EXP?
    |   '.' DIGIT+ EXP?
    ;


fragment
DIGIT:  '0'..'9' ; 
fragment
EXP :   ('E' | 'e') ('+' | '-')? DIGIT+ ;

STRING
    :   '"' ( ESC | ~[\\"] )*? '"'
    |   '\'' ( ESC | ~[\\'] )*? '\''
    ;

fragment
ESC :   '\\' [abtnfrv"'\\]
    |   UNICODE_ESCAPE
    |   HEX_ESCAPE
    |   OCTAL_ESCAPE
    ;

fragment
UNICODE_ESCAPE
    :   '\\' 'u' HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT
    |   '\\' 'u' '{' HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT '}'
    ;

fragment
OCTAL_ESCAPE
    :   '\\' [0-3] [0-7] [0-7]
    |   '\\' [0-7] [0-7]
    |   '\\' [0-7]
    ;

fragment
HEX_ESCAPE
    :   '\\' HEXDIGIT HEXDIGIT?
    ;

ID  :   '.' (LETTER|'_'|'.') (LETTER|DIGIT|'_'|'.')*
    |   LETTER (LETTER|DIGIT|'_'|'.')*
    |   '`' ( ESC | ~[\\'] )*? '`'
    ;
    
fragment LETTER  : [a-zA-Z] ;

USER_OP :   '%' .*? '%' ;

COMMENT :   '#' .*? '\r'? '\n' -> channel(HIDDEN) ; // change comments to just emit NL

WS      :   [ \t\u000C\r\n]+ -> channel(HIDDEN) ;
