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
                class="w-full rounded-lg px-4 text-base outline-none"
                value={this.text}
            />
        );
    }
})