import { PropType } from 'nuxt/dist/app/compat/capi';
import IconsJSON, { TIcons } from '@/utils/Icons';

export default defineComponent({
    props: {
        name: {
            type: String as PropType<keyof TIcons>,
            required: true,
        },
    },
    setup(props) {
        const name = props.name;
        const svg = ref(IconsJSON[name]);
        
        return {
            svg,
        };
    },
    render() {
        return (
            <span v-html={this.svg}></span>
        );
    },
});
