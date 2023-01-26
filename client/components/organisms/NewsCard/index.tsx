import { PropType } from "nuxt/dist/app/compat/capi";

export default defineComponent({
    name: 'NewsCard',
    props: {
        date: Object as PropType<Date>,
        title: String,
        body: String,
        source: String
    },
    setup(props, ctx) {
        const { date, title, body, source } = props;
        return {
            date, title, body, source
        }
    },
    render() {
        return (
            <div class="border-black rounded-md shadow-2xl shadow-slate-200 p-6">
                <div class="date font-semibold tracking-wider text-gray-600">
                    { this.date?.getFullYear() }
                </div>
                <div class="title text-lg font-bold tracking-wide text-slate-800 mt-6" >
                    { this.title }
                </div>
                <div class="body font-light text-gray-400 tracking-wide mt-4 italic leading-7">
                    { this.body}
                </div>
                <div class="source">
                    <a
                        class="btn bg-blue-600 mt-6"
                        target="_blank"
                    href={this.source}
                >Source</a>
            </div>
        </div > 
        );
    }
})