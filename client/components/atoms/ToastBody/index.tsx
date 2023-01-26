export default defineComponent({
    props: {
        title: {
            type: String,
            required: true, 
        },
        message: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const { title, message } = reactive(props);

        return {
            title, message
        }
    },
    render() {
        return (
            <div>
                <div class="text-sm pb-2">
                    <b>{ this.title }</b>
                </div>
                <div class="text-sm text-gray-600  tracking-tight leading-6">
                    { this.message }
                </div>
            </div>
        );
    }
});
