
import BreadCrumb from '@/components/atoms/Breadcrumb';
import { PropType } from 'nuxt/dist/app/compat/capi';

export interface Crumb {
    text: string;
    number: number;
}
export default defineComponent({
    props: {
        crumbs: {
            type: Object as PropType<Array<Crumb>>,
            required: true,
        },
    },
    setup(props){
        const crumbs = reactive<Array<Crumb>>(props.crumbs);

        return {
            crumbs,
        };
    },
    render() {
        return (
            <ul class='flex'>
                {
                    this.crumbs.map((item, i) => {
                        return (
                            <BreadCrumb
                            key={i}
                            isColored={true}
                            num={item.number}
                            >{item.text}</BreadCrumb>
                        );
                    })
                }
            </ul>
        );            
    },
});
