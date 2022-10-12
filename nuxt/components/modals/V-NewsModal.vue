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
import {mapGetters, mapMutations} from "vuex";


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
        highlightQueryTarget(){
            const $body = document.querySelector('.newsmodal-body');
            if(!$body) return;
            const bodyText = $body.textContent;
            const re = new RegExp(this.queryTarget, "gi")
            const updatedText = bodyText.replace(re, `<span class="highlighted">${this.queryTarget}</span>`)
            $body.innerHTML = updatedText
        }
    }
}
</script>
<style lang="">
    
</style>