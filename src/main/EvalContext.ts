import { Language, Prom, Vis } from './types';

// Global variable that can be set by various primitive functions and is checked
// by REPL to determine whether to print the result of evaluation or not

export class EvalContext {
    public static R_Visible: Vis = Vis.On;
    public static R_PendingPromises: Prom[] = [];
    public static CurrentCall: Language;
}
