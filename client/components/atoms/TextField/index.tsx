export default defineComponent({
    name: 'TextField',
    setup(){
        const text = ref<string>('');

        return {
            text,
        };
    },
    render() {
        return (
            <input 
                class="w-full rounded-lg px-4 text-base outline-none"
                value={this.text}
            />
        );
    },
});
