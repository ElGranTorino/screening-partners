export default defineComponent({
    render() {
        const slot = useSlots().default?.();
        
        return (
            <div class='layout'>
                {slot}
            </div>
        );
    }
});