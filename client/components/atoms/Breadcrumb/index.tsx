

export default defineComponent({
    name: 'BreadCrumb',
    props: {
        isColored: {
            type: Boolean, 
            required: false,
            default: false
        }, 
        num: {
            type: Number,
            default: 1,
            required: true,
        },
    },
    setup(props){
        const { isColored, num } = reactive(props);
        
        return {
            isColored, num,
        };
    },
    render() {
        const slot = useSlots()?.default?.();
        return (
            <li class='flex items-center justify-end v-breadcrumb'>
                <span
                    class={`circle bg-gray-400 text-white font-semibold rounded-full w-8 h-8 flex text-sm items-center justify-center mr-2 ${this.isColored ? 'bg-blue-700' : 'bg-gray-400'}`}
                >{ this.num }</span>
                <span 
                    class={`font-bold tracking-wide text-sm font-montserrat ${!this.isColored ? 'text-gray-400' : ''}`}
                > { slot } </span>
            </li>
        );
    },
});