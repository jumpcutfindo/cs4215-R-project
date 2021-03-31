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
function(pattern, x, ignore.case = FALSE, perl = FALSE,
         value = FALSE, fixed = FALSE, useBytes = FALSE, invert = FALSE)
{
    ## when value = TRUE we return names
    if(!is.character(x)) x <- structure(as.character(x), names=names(x))
    .Internal(grep(as.character(pattern), x, ignore.case, value,
                   perl, fixed, useBytes, invert))
}

grepl <-
function(pattern, x, ignore.case = FALSE, perl = FALSE,
         fixed = FALSE, useBytes = FALSE)
{
    if(!is.character(x)) x <- as.character(x)
    .Internal(grepl(as.character(pattern), x, ignore.case, FALSE,
                    perl, fixed, useBytes, FALSE))
}

sub <-
function(pattern, replacement, x, ignore.case = FALSE,
         perl = FALSE, fixed = FALSE, useBytes = FALSE)
{
    if (!is.character(x)) x <- as.character(x);
     .Internal(sub(as.character(pattern), as.character(replacement), x,
                  ignore.case, perl, fixed, useBytes));
};

gsub <-
function(pattern, replacement, x, ignore.case = FALSE,
         perl = FALSE, fixed = FALSE, useBytes = FALSE)
{
    if (!is.character(x)) x <- as.character(x);
    .Internal(gsub(as.character(pattern), as.character(replacement), x,
                   ignore.case, perl, fixed, useBytes));
};

nchar <- function(x, type = "chars", allowNA = FALSE, keepNA = NA)
    .Internal(nchar(x, type, allowNA, keepNA));

`