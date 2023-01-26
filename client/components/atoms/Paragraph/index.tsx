export default defineComponent({
    name: 'Paragraph',
    render() {
        const slot = useSlots()?.default?.();
        
        return (
            <p class='text-gray-400 opacity-90 font-semibold leading-8 tracking-widest text-n font-montserrat'>
                { slot }
            </p>
        );
    }
})