
import { ButtonHTMLAttributes, PropType } from "nuxt/dist/app/compat/capi";
import Spinner from "../Spinner";

export default defineComponent({
    props: {
        isLoading: Boolean,
        attributes: Object as PropType<ButtonHTMLAttributes>,
    },
    emits: ['click'],
    setup(props, {emit}) {
        const { isLoading, attributes } = toRefs(props)

        const onClick = () => {
            emit('click');
        }
        
        return {
            isLoading, attributes, onClick
        }
    },
    render() {
        const slot = useSlots()?.default?.();

        return (
            <button
                onClick={() => this.onClick()}
                class="hover:bg-blue-600 transition-colors bg-blue-700 text-white font-medium py-2 px-6 rounded tracking-wide"
                {...this.attributes}
            >
                {this.isLoading ? <Spinner/> : slot}
            </button>
        );
    }
})