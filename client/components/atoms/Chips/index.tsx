export default defineComponent({
    name: 'Chips',
    render() {
        const slot = useSlots()?.default?.();
        
        return (
            <div class="inline-block">
                <div class="flex flex-wrap justify-center space-x-2">
                    <span
                        class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                    >
                        { slot }
                    </span>
                </div>
            </div>
        );
    },
});