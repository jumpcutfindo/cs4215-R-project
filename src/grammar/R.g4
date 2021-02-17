grammar R;

@parser::members {

public lineTerminatorAhead() : boolean {
    let possibleIndex = this.currentToken.tokenIndex - 1;
    let ahead : Token = this._input.get(possibleIndex);
    if (ahead.channel != Token.HIDDEN_CHANNEL) {
        return false;
    }
    return (ahead.type == RParser.COMMENT) || (ahead.type == RParser.NL);
}
}

prog:   (   expr eoe
        )*
        EOF
    ;

expr :  literal # Lit
     |  ID # Symbol
     |  '(' expr ')' # Parens
     |  expr '(' arglist ')' # Call
     |  'function' '(' formallist ')' expr # Function
     |  '{' exprlist '}' # Brace
     |  (ID|STRING) '::' (ID|STRING) # Namespace
     |  expr '$' (ID|STRING) # ComponentExtraction
     |  expr '[' arglist ']' # Subset
     |  expr '[[' arglist ']]' # Indexing
     |  <assoc=right> expr '^' expr # Call
     |  ('-'|'+') expr # Call
     |  expr ':' expr # Seq
     |  expr USER_OP expr # Call
     |  expr ('*'|'/') expr # Call
     |  expr ('+'|'-') expr # Call
     |  expr ('>'|'>='|'<'|'<='|'=='|'!=') expr # Call
     |  '!' expr # Call
     |  expr ('&'|'&&') expr # Call
     |  expr ('|'|'||') expr # Call
     |  val=expr ('->'|'->>') sym=(ID|STRING) # Assign
     |  sym=(ID|STRING) ('<-'|'<<-') val=expr # Assign
     |  'if' '(' cond=expr ')' conseq=expr ('else' alt=expr)? # If
     |  'for' '(' ID 'in' seq=expr ')' body=expr # For
     |  'while' '(' cond=expr ')' body=expr # While
     |  'repeat' body=expr # Repeat
     |  'break' # Break
     |  'next'  # Next
     ;

exprlist
    :   (expr eoe)*
    ;

// Represents end of expressions
eoe :    ';'
        | {this.lineTerminatorAhead()}?
        | {this._input.LT(1).type == RParser.RBRACE}?
        ;

literal :  INT 
        |  FLOAT
        |  STRING
        |  NULL
        |  NA
        |  BOOL
        ;

formallist : formal (',' formal)* ;

formal:   ID
      |   ID '=' expr
      |   '...'
      ;


arglist : arg (',' arg)* ;

arg :   expr
    |   ID '='
    |   ID '=' expr
    |   STRING '='
    |   STRING '=' expr
    |   NULL '='
    |   NULL '=' expr
    |   DOTS
    |   
    ;

LBRACE : '{' ;
RBRACE : '}' ;

NULL : 'NULL' ;

NA : 'NA' ;

BOOL : 'TRUE'
     | 'FALSE'
     | 'T'
     | 'F'
     ;

// Only ..., ..1 and ..2 are reserved
DOTS : '...'
     | '..' DIGIT+
     ;

HEX :   '0' ('x'|'X') HEXDIGIT+ [Ll]? ;

INT :   DIGIT+ [Ll]? ;

fragment
HEXDIGIT : ('0'..'9'|'a'..'f'|'A'..'F') ;

FLOAT:  DIGIT+ '.' DIGIT* EXP? [Ll]?
    |   DIGIT+ EXP? [Ll]?
    |   '.' DIGIT+ EXP? [Ll]?
    |   'NaN'
    |   'Inf'
    ;


fragment
DIGIT:  '0'..'9' ; 
fragment
EXP :   ('E' | 'e') ('+' | '-')? INT ;

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

// Match both UNIX and Windows newlines
NL      :   '\r'? '\n' -> channel(HIDDEN);

WS      :   [ \t\u000C]+ -> channel(HIDDEN) ;
