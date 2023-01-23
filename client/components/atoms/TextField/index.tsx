export default defineComponent({
    name: 'TextField',
    setup(props){
        const text = ref<string>('');

        return {
            text: text.value
        }
    },
    render() {
        return (
            <input 
                class="w-full rounded-lg border-gray-200 px-4 text-base border-none outline-none"
                value={this.text}
            />
        );
    }
})