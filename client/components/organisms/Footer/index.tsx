export default defineComponent({
    name: 'Footer',
    setup(){
        const currentYear = new Date().getUTCFullYear();

        return {
            currentYear
        }
    },
    render(){
        return (
            <footer class='v-footer'>
                <div className="inner flex justify-between items-center">
                    <div className="copyright font-semibold text-sm tracking-wider text-gray-700">
                        &copy; { this.currentYear } All rights reserver
                    </div>
                    <div className="search-count font-semibold text-sm tracking-wider text-gray-700">
                        <b>1k</b> searches performed
                    </div>
                </div>
            </footer>
        );
    }
})