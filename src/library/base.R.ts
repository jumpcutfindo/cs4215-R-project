export default `
substr <- function(x, start, stop)
{
    if(!is.character(x)) x <- as.character(x);
    .Internal(substr(x, as.integer(start), as.integer(stop)));
};

startsWith <- function(x, prefix) .Internal(startsWith(x, prefix));
endsWith   <- function(x, suffix) .Internal(endsWith  (x, suffix));

tolower <- function(x)
{
    if(!is.character(x)) x <- as.character(x);
    .Internal(tolower(x));
};

toupper <- function(x)
{
    if(!is.character(x)) x <- as.character(x);
    .Internal(toupper(x));
};

casefold <- function(x, upper = FALSE)
    if(upper) toupper(x) else tolower(x);

strrep <-
function(x, times)
{
    if(!is.character(x)) x <- as.character(x);
    .Internal(strrep(x, as.integer(times)));
};

grep <-
function(pattern, x, ignore.case = FALSE,
         value = FALSE, fixed = FALSE, invert = FALSE)
{
    ## when value = TRUE we return names
    if(!is.character(x)) x <- structure(as.character(x), names=names(x));
    .Internal(grep(as.character(pattern), x, ignore.case, value,
                   fixed, invert));
};

grepl <-
function(pattern, x, ignore.case = FALSE,
         fixed = FALSE)
{
    if(!is.character(x)) x <- as.character(x);
    .Internal(grepl(as.character(pattern), x, ignore.case, FALSE,
                    fixed, FALSE));
};

sub <-
function(pattern, replacement, x, ignore.case = FALSE, fixed = FALSE)
{
    if (!is.character(x)) x <- as.character(x);
     .Internal(sub(as.character(pattern), as.character(replacement), x,
                  ignore.case, fixed));
};

gsub <-
function(pattern, replacement, x, ignore.case = FALSE, fixed = FALSE)
{
    if (!is.character(x)) x <- as.character(x);
    .Internal(gsub(as.character(pattern), as.character(replacement), x,
                   ignore.case, fixed));
};

nchar <- function(x, keepNA = T)
    .Internal(nchar(x, keepNA));


ifelse <- function(test, yes, no) {
    
}
`