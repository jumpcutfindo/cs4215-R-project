import {simpleInterpret} from './index';
import * as Vue from 'vue';

enum TEXT_TYPE {
    UserInput,
    EvalOutput,
    ErrorOutput
}

const App = Vue.defineComponent({
    data() {
        return {
            input_history: [] as string[],
            history: [] as { text: string, type: TEXT_TYPE }[],
            program: '',
            curr_history_index: 0 as number,
        };
    },
    updated() {
        this.$nextTick(() => this.scrollToEnd());
    },
    methods: {
        repl(prog: string) {
            this.input_history.push(prog.substring(0, prog.length - 1));
            this.history.push({text: '> ' + prog, type: TEXT_TYPE.UserInput});
            simpleInterpret(prog)
                .map(({printOutput, isErr}) =>
                    ({text: printOutput, type: isErr ? TEXT_TYPE.ErrorOutput : TEXT_TYPE.EvalOutput}))
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
        getNextInput: function() {
            this.program = this.input_history[this.curr_history_index];
            this.curr_history_index = this.curr_history_index + 1;
            if (this.curr_history_index > this.input_history.length) {
                this.curr_history_index = this.input_history.length - 1;
            }
        },
    },
});
Vue.createApp(App).mount('#app');
