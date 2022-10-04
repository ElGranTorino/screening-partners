<template>
    <article class="v-generallcard card">
        <div class="v-generallcard__container">
            <div class="v-generallcard__head">
                <div class="v-generallcard__head-data">
                  <div class="v-generallcard__name title">{{data.fullName}}</div>
                  <div class="v-generallcard__country mt-1">Russia 🇷🇺</div>
                </div>
                <div class="v-generallcard__head-managment">
                  <button v-if="showTargetsToggles" class="toggle report-toggle">
                    <input :id="`_` + data.id" type="checkbox"  class="toggle__checkbox">
                    <label :for="`_` + data.id" class="toggle__label"></label>
                  </button>
                </div>
            </div>
            <div class="v-generallcard__body">
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Type</div>
                <div class="v-generallcard__value">{{data.type}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Authority</div>
                <div class="v-generallcard__value">{{data.authority}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Current Programm</div>
                <div class="v-generallcard__value">{{data.programs}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Latest Update</div>
                <div class="v-generallcard__value">{{data.pubDate}}</div>
              </div>
            </div>
            <div class="v-generallcard__footer text-center">
              <button class="btn btn--bg-blue v-generallcard__details mt-4" @click="addActiveModalWindow({id: '0000', data: data})">
                Details
              </button>
            </div>

        </div> 
    </article>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'VSanctionCard',
  props: {
    data: Object
  },
  
  methods: {
    ...mapMutations("components-logic", [
      "addActiveModalWindow",
    ]),
  },
  computed: {
    ...mapGetters("components-logic", [
        "showTargetsToggles"
    ])
  },
}
</script>

<style lang="scss">
</style>