<template>
    <article class="v-generallcard card">
        <div class="v-generallcard__container">
            <div class="v-generallcard__head">
                <div class="v-generallcard__head-data">
                  <div class="v-generallcard__name title" :title="data.fullName">{{data.fullName}}</div>
                  <div class="v-generallcard__country mt-1">{{data.country || 'Global'}} </div>
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
                <div class="v-generallcard__key">Gender</div>
                <div class="v-generallcard__value">{{data.gender}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Date Of Birth</div>
                <div class="v-generallcard__value">{{data.birthDate}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Place Of Birth</div>
                <div class="v-generallcard__value">{{data.placeOfBirth}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Status</div>
                <div class="v-generallcard__value">{{data.status}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Modified At</div>
                <div class="v-generallcard__value">{{data.modifiedAt}}</div>
              </div>
            </div>
            <div class="v-generallcard__footer text-center">
              <button class="btn btn--bg-blue v-generallcard__details mt-4">
                Details
              </button>
            </div>

        </div> 
    </article>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'VPepCard',
  props: {
    data: Object
  },
  computed: {
    ...mapGetters("components-logic", [
        "showTargetsToggles"
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss">
</style>