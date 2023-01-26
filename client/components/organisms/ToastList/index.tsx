import Toast from "@/components/molecules/Toast";
import { PropType } from "nuxt/dist/app/compat/capi";
import ToastBody from '@/components/atoms/ToastBody'
import { TIcons } from "~~/utils/Icons";
import { useNotification } from "~~/composables/useNotification";
export type AbsolutePosition = 
    'left-top' |
    'center-top' |
    'right-top' |
    'left-center' |
    'center-center' |
    'right-center' |
    'left-bottom' |
    'center-bottom' |
    'right-bottom';

export interface Notification {
    id: Number,
    message: string;
    title: string;
    icon?: keyof TIcons
}
export default defineComponent({
    name: 'ToastList',
    setup() {
        const notifications = useNotification().state.data;

        return {
            notifications
        };
    },
    render() {
        return (
            <div class={`fixed toast-list`}>
                {
                    this.notifications.map((item) => {
                        return (
                            <Toast>
                                <ToastBody
                                    title={item.title}
                                    message={item.message}
                                />
                            </Toast>
                        );
                    })
                }
            </div>
        );
    }
})