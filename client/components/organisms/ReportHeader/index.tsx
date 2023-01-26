import { useNotification } from "~~/composables/useNotification";

export default defineComponent({
    name: 'ReportHeader',
    setup() {
        const searchTargetName = ref('huawei');
        return {
            searchTargetName,
        }
    },
    render() {
        return (
            <header class='flex items-center justify-between mt-40 mx-auto'>
                <div class='target-name font-semibold'>
                    { this.searchTargetName }
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
