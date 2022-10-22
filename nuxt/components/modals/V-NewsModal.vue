<template lang="">
    <div v-if="activeModalWindow.id ===_id" class="v-modal v-newsmodal">
        <div class="v-modal__backdrop" @click="removeActiveModalWindow(_id)"></div>
        <div class="v-modal__container card">
            <div class="conainer">
                <div class="title">{{activeModalWindow.data.title}}</div>
                <div class="img mt-2 text-center"><img :src="activeModalWindow.data.details.topImage" alt=""></div>
                <div class="v-modal__body newsmodal-body paragraph">{{activeModalWindow.data.details.text}}</div>
                <div class="v-modal__footer">
                    <button class="btn btn--bg-light-gray" type="button" @click="removeActiveModalWindow(_id)">Cancel</button>
                    <a :href="activeModalWindow.data.url" target="_blank" class="btn btn--bg-blue btn--link">Source</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from "vuex";


export default {
    name: 'VNewsModal',
    props: {
        _id: String
    },
    computed: {
        ...mapGetters('components-logic', [
            "activeModalWindow"
        ]),
        ...mapGetters('api', [
            "queryTarget"
        ])
    },
    updated(){
        this.highlightQueryTarget()
    },
    methods: {
        ...mapMutations("components-logic", [
            "removeActiveModalWindow",
        ]),
        ...mapActions("api", [
            "fetchKeywords"
        ]),
        async highlightQueryTarget(){
            const words = await this.fetchKeywords();
            const $body = document.querySelector('.newsmodal-body');
            if(!$body || !words) return;

            const text = $body.textContent;
            
            const updated = words.reduce((acc, word) => {
                const targetRE = new RegExp(`${this.queryTarget}`, 'gi'); 
                const keywordRE = new RegExp(`${word.name}`, 'gi'); 
                return acc.replace(keywordRE, `<span class="highlighted">${word.name}</span>`).replace(targetRE, `<span class="target-highlighted">${this.queryTarget}</span>`);
            }, text)
            
            $body.innerHTML = updated
        }
    }
}
</script>
<style lang="">

</style>