<template>
    <article class="v-newscard card">
        <div class="v-newscard__container">
            <div class="v-newscard__date">{{news.date}}</div>
            <div class="v-newscard__title title">{{news.title}}</div>
            <div class="v-newscard__body paragraph">{{news.body}}</div>
            <div class="v-newscard__footer">
                <div class="v-newscard__details-wrap">
                    <a :href="news.url" target="_blank" class="v-newscard__details-link link">Source</a>
                </div>
                <div class="v-newscard__toggle-wrap">
                    <button v-if="showTargetsToggles" class="toggle report-toggle">
                        <input :id="`_` + news.id" type="checkbox" @change="toggleNews($event)" class="toggle__checkbox">
                        <label :for="`_` + news.id" class="toggle__label"></label>
                    </button>
                </div>
            </div>
        </div> 
    </article>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'VNewsCard',
  props: {
    news: Object,
  },
  computed: {
    ...mapGetters("components-logic", [
        "showTargetsToggles"
    ]),
    ...mapGetters("report", [
        "selectedNews",
    ]),
  },
  methods: {
    ...mapMutations('report', [
        "addSelectedNews",
        "removeSelectedNews"
    ]),
    toggleNews(e){
        const status = e.target.checked;
        
        if(status) {
            this.addSelectedNews(this.news)
        } else {
            this.removeSelectedNews(this.news.id)
        }
    }
  }
}
</script>

<style lang="scss">
</style>