<template>
	<article class="search__card card" :key="newsData.id">
        <span class="card__date">{{newsData?.pubDate}}</span>
        <div class="card__title">{{newsData?.title}}</div>
        <div class="card__source">{{newsData?.body}}</div>

        <a :href="newsData.url" class="card__link" target="_blank">Details</a>
    </article>
</template>
<script>
import { defineComponent } from "vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: 'NewsCardView',
  props: ["newsData"],
  data(){
    return {
        getStep: 0
    }
  },
});

</script>


