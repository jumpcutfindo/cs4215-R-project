import {simpleInterpret, TEXT_TYPE, setOptions, R_GlobalEnv} from './index';
import * as Vue from 'vue';
import { length } from './main/util';


const App = Vue.defineComponent({
    data() {
        return {
            input_history: [] as string[],
            history: [] as { printOutput: string, type: TEXT_TYPE }[],
            program: '',
            curr_history_index: 0 as number,
            options: { warnPartialArgs: false, warn: true},
            env: R_GlobalEnv.frame
        };
    },
    updated() {
        this.$nextTick(() => this.scrollToEnd());
    },
    computed: {
        envEntries() {
            return [...this.env.entries()].map(([name, rval]) => ({
                variable: name,
                type: rval.tag,
                length: length(rval)
            }));
        }
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
        }
    },
});
const vm = Vue.createApp(App)
vm.mount('#app');
