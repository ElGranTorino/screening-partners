import Navigation from "@/components/organisms/Navigation";
import Footer from "@/components/organisms/Footer";
import ToastList from "@/components/organisms/ToastList";
export default defineComponent({
    setup(){},
    render(){
        const slot = useSlots()?.default?.();
        return (
            <div class='layout'>
                <Navigation/>
                <ToastList class='bottom-10 left-10 fixed notes'/>
                { slot }
                <Footer class='max-w-4xl mx-auto mt-40 pb-10'/>
            </div>
        )
    }
})