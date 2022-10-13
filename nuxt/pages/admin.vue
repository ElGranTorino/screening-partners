<template lang="">
    
    <main class="admin">
        <VStatusBar/>
        <div class="admin__home mt-5">
            <div class="admin__keywords-form">
                <form @submit.prevent="addKeyword()">
                    <div class="form-group">
                        <input type="text" class="text-input" placeholder="ex: Investigation" v-model="keyword" required>
                    </div>
                    <div class="form-group text-center mt-1 text-center">
                        <button class="btn btn--bg-blue" type="submit">Add</button>
                    </div>
                    <div class="mt-2">
                        <button 
                        v-for="keyword,i in keywords"
                        :key="i"
                        @click="removeKeyWord(keyword._id)"
                        class="btn btn--bg-light-gray chips"
                        style="border-radius: 2rem; font-size: 0.85rem; padding: 0.5rem 1rem; margin: 0.5rem" 
                        type="button"
                        >{{keyword.name}}</button>
                        
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import {mapGetters, mapActions} from  "vuex";

import VStatusBar from "@/components/navigation/V-StatusBar.vue";


export default {
    head(){
        return {
            title: 'ScreeningPartners | Admin page'
        }
    },
    data(){
        return {
            keyword: ''
        }
    },
    computed: {
        ...mapGetters('api', [
            "keywords"
        ])
    },
    components: {
        VStatusBar
    },
    name: 'VAdmin',
    layout: 'l-default',
    async fetch({ store, error }) {
        const isAuth = await store.dispatch('api/isAuthenticated')
        if (!isAuth) {
            error({ statusCode: 401, message: 'Unauthorised' })
        }
    },
    mounted() {
        this.fetchAndUpdateKeywords()
    },
    methods: {
        ...mapActions('api', [
            "fetchAndUpdateKeywords",
            "createKeyword",
            "deleteKeyword"
        ]),
        addKeyword(){
            this.createKeyword({name: this.keyword})
            this.keyword = ''
        },
        removeKeyWord(id){
            this.deleteKeyword({id})
        }
    }
    
}
</script>
<style lang="sass">
@import '@/static/sass/styles.sass'
.admin
    min-height: 100vh
    &__home
        display: flex
        justify-content: center
    &__keywords-form
        max-width: 60%
        margin: 200px auto
</style>