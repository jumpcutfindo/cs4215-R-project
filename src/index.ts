import {RNull} from './main/values';
import {parse} from './parser';

const sampleProg1 : string = `
x <- c(1,2,3)
if (length(x) > 2) {
    print("length is more than 2")
} else {
    x <- rep(x, 2)
}
x
`;

const sampleProg2 : string = `
x <- y <<- 10
`;


parse(sampleProg1);
