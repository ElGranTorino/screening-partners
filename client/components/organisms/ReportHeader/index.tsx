export default defineComponent({
    name: 'ReportHeader',
    setup() {
        const searchTargetName = ref('');


        return {
            searchTarget: searchTargetName
        }
    },
    render() {
        return (
            <header class='flex items-center justify-between max-w-7xl mt-40 mx-auto'>
                <div class='target-name font-semibold'>
                    { this.searchTarget }
                </div>
                <div class='target-report'>
                    <button class='btn bg-blue-700'>
                        Download report
                    </button>
                </div>
            </header>
        );
    }
});
