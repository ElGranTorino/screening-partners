
import { Notification } from "~~/components/organisms/ToastList";
const state = reactive({
    data: [] as Array<Notification>
});
export const useNotification = () => {
    const add = (note: Notification) => {
        state.data.push(note)
        console.log(state.data)
    };

    const remove = (id: number) => {
        const index = state.data.findIndex((note) => note.id !== id);
        state.data.splice(index, 1);
    };

    const clean = () => {
        state.data.length = 0;
    };

    return {
        state,
        add,
        remove,
        clean
    }
}