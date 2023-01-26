import NewsCard from '@/components/organisms/NewsCard'

export default defineComponent({
    name: 'ReportNews',
    render() {
        return (
            <section class="news">
                <div class="section-title my-20 tracking-wide font-bold">Adverse Media Search (30)</div>
                <div class="grid grid-cols-3 gap-4">
                    <NewsCard
                        date={new Date()}
                        title='CNN Exclusive: FBI investigation determined Chinese-made Huawei equipment could'
                        body='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque velit, mollitia cum alias, dolores quisquam cumque nobis esse amet nam vero in ipsam ducimus.'
                        source='https://www.google.com'
                    />
                </div>
            </section>
        );
    }
})