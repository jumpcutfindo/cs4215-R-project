import {setupR, simpleInterpret, setOptions, R_GlobalEnv} from './index';
import * as Vue from 'vue';
import { length } from './main/util';
import * as R from './main/types';
import { TEXT_TYPE, initPrinter } from './main/print';

setupR();

const App = Vue.defineComponent({
    data() {
        const globalEnv = new Map<R.Name, R.RValue>();
        R_GlobalEnv.frame = globalEnv;
        const hist : { printOutput: string, type: TEXT_TYPE }[] = [];
        initPrinter(hist);
        return {
            input_history: [] as string[],
            history: hist,
            program: '',
            curr_history_index: 0 as number,
            options: { warnPartialArgs: false, warn: true},
            env: globalEnv
        };
    },
    updated() {
        this.$nextTick(() => this.scrollToEnd());
    },
    methods: {
        repl(prog: string) {
            this.input_history.push(prog.substring(0, prog.length - 1));
            this.history.push({printOutput: '> ' + prog, type: TEXT_TYPE.UserInput});
            simpleInterpret(prog)
                .forEach((x) => this.history.push(x));
            this.program = '';

            if (this.input_history.length !== 0) this.curr_history_index = this.input_history.length - 1;
        },
        outputType(type: TEXT_TYPE) {
            switch (type) {
            case TEXT_TYPE.ErrorOutput:
                return 'err';
            case TEXT_TYPE.EvalOutput:
                return 'return';
            case TEXT_TYPE.UserInput:
                return 'input';
            case TEXT_TYPE.WarnOutput:
                return 'warn';
            }
        },
        scrollToEnd: function() {
            // scroll to the start of the last message
            const container: any = this.$refs.container;
            container.scrollTop = container.scrollHeight;
        },
        getPreviousInput: function() {
            this.program = this.input_history[this.curr_history_index];
            this.curr_history_index = this.curr_history_index - 1;
            if (this.curr_history_index === -1) this.curr_history_index = this.input_history.length - 1;
        },
        updateOptions() {
            setOptions(this.options);
        },
        getNextInput: function() {
            this.program = this.input_history[this.curr_history_index];
            this.curr_history_index = this.curr_history_index + 1;
            if (this.curr_history_index > this.input_history.length) {
                this.curr_history_index = this.input_history.length - 1;
            }
        },
        varlen(val: R.RValue) {
            return length(val);
        }
    },
});
const vm = Vue.createApp(App)
vm.mount('#app');
