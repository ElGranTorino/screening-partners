import Spinner from '@/components/atoms/Spinner';

export default defineComponent({
    name: 'Preloader',
    render() {
        return (
            <div class="bg-white fixed w-full h-full z-50">
                <Spinner class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
            </div>
        );
    },
});
