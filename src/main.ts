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
            history: [] as { text: string, type: TEXT_TYPE }[],
            program: '',
        };
    },
    updated() {
        this.$nextTick(() => this.scrollToEnd());
    },
    methods: {
        repl(prog: string) {
            this.history.push({text: '> ' + prog, type: TEXT_TYPE.UserInput});
            simpleInterpret(prog)
                .map(({printOutput, isErr}) =>
                    ({text: printOutput, type: isErr ? TEXT_TYPE.ErrorOutput : TEXT_TYPE.EvalOutput}))
                .forEach((x) => this.history.push(x));
            this.program = '';
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
    },
});
Vue.createApp(App).mount('#app');
