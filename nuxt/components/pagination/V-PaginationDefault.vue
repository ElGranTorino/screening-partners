<template lang="">
    <div class="inspection__related-sanctions-pagination pagination mt-3">
        <div class="pagination__inner text-center">

            <button class="btn btn--pagination btn--bg-blue" 
            @click="setCurrent(1)"
            :disabled="current === 1"
            v-if="total > 5"
            >{{1}}</button>
            <button class="btn btn--pagination btn--bg-blue" disabled
            v-if="total > 5">...</button>

            <template
                v-for="page in pages"
            >
                <button class="btn btn--pagination btn--bg-blue" 
                :key="page"
                @click="setCurrent(page)"
                :disabled="page == current">{{page}}</button>
            </template>
            
            <button class="btn btn--pagination btn--bg-blue" disabled
            v-if="total > 5">...</button>
            <button class="btn btn--pagination btn--bg-blue" 
            @click="setCurrent(total)"
            :disabled="total === current"
            v-if="total > 5"
            >{{total}}</button>
           
        </div>
    </div>
</template>
<script>
// Importing VueX environment
// import {mapGetters, mapMutations} from "vuex";


export default {
    name: 'VPaginationDefault',
    props: {
        total: {
            type: Number
        },
        current: {
            type: Number
        }
    },
    data() {
        return {
            numShown: 5
        }
    },
    computed: {
        pages() {
            const numShown = Math.min(this.numShown, this.total);
            let first = this.current - Math.floor(numShown / 2);
            first = Math.max(first, 1);
            first = Math.min(first, this.total - numShown + 1);
            return [...Array(numShown)].map((k,i) => i + first);
        }
    },
    methods: {
        setCurrent(page){
            this.$emit("set", page);
        }
    }
}
</script>
<style lang="sass" scoped>
</style>