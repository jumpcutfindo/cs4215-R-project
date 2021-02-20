# Parsing

## Special things to take note

The specially parsed symbols: 
* if
* for
* repeat
* while
* break
* next
* function
* \`(\`
* \`<-\` and friends
* \`::\`
* \`$\`
* \`[\` and \`[[\`

Are all turned into language objects in a special way in the ASTVisitor. It should mimic the following behavior in R:

```R
> x <- parse(text="`if`()")[[1]]
> x
if (NULL) NULL
> x <- parse(text="`for`()")[[1]]
> x
for (NULL in NULL) NULL
> x <- parse(text="`break`(10)")[[1]]
> x
break
> x <- parse(text="`<-`(10)")[[1]]
> x
10 <- NULL
> ()
Error: unexpected ')' in "()"
> x <- parse(text="`(`()")[[1]]
> x
(NULL)
> parse(text="`$`()")[[1]]
NULL$NULL
> parse(text="`::`()")[[1]]
NULL::NULL
> parse(text="`[`()")[[1]]
NULL[]
> parse(text="`[[`()")[[1]]
NULL[[]]
```

On the other hand, these are fine:

```R
> {}
NULL
> x <- parse(text="`{`()")[[1]]
> x
{
}
> x <- parse(text="`+`()")[[1]]
> x
`+`()
> eval(x)
Error in `+`() : operator needs one or two arguments
```

Function is another whole different weird beast:

```R
> x <- parse(text="`function`(10)")[[1]]
Error in deparse(obj) : badly formed function expression
> x <- parse(text="`function`(x)")[[1]]
Error in deparse(obj) : badly formed function expression
> x <- parse(text="`function`(x, 1)")[[1]]
Error in deparse(obj) : badly formed function expression
> parse(text="`function`(list(x), x)")
expression(`function`(list(x), x))
> x <- parse(text="`function`(list(x), x)")[[1]]
> x
function(list, x) x
> x <- parse(text="`function`((x), x)")[[1]]
> x
function(`(`, x) x
> x <- parse(text="`function`((x, x)")[[1]]
Error in parse(text = "`function`((x, x)") : <text>:1:14: unexpected ','
1: `function`((x,
                 ^
> x <- parse(text="`function`(a(x), x)")[[1]]
> x
function(a, x) x
> x <- parse(text="`function`(b(a(x)), x)")[[1]]
> x
function(b, a(x)) x
> x <- parse(text="`function`(b(a, x), x)")[[1]]
> x
function(b, a, x) x
```

Most plausible explanation: b(a,x) is parsed as a language object, which is a pairlist, which is the shape
expected by function for its formals argument (a pairlist).