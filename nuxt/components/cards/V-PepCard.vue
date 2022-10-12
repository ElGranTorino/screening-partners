<template>
    <article class="v-generallcard card" :title="data.fullName">
        <div class="v-generallcard__container">
            <div class="v-generallcard__head">
                <div class="v-generallcard__head-data">
                  <div class="v-generallcard__name title" >{{data.fullName}}</div>
                  <!-- <div class="v-generallcard__country mt-1">{{data.country || 'Global'}} </div> -->
                </div>
                <div class="v-generallcard__head-managment">
                  <button v-if="showTargetsToggles" class="toggle report-toggle">
                    <input 
                      :id="`_` + data.id" 
                      :checked="checkIfSelected('pep', data.id) !== undefined" 
                      @change="togglePep($event)" 
                      type="checkbox"  
                      class="toggle__checkbox"
                    >
                    <label :for="`_` + data.id" class="toggle__label"></label>
                  </button>
                </div>
            </div>
            <div class="v-generallcard__body">
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Type</div>
                <div class="v-generallcard__value">{{type}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Gender</div>
                <div class="v-generallcard__value">{{gender}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Date Of Birth</div>
                <div class="v-generallcard__value">{{birthDate}}</div>
              </div>
              <div class="v-generallcard__row" :title="birthPlace">
                <div class="v-generallcard__key">Place Of Birth</div>
                <div class="v-generallcard__value">{{birthPlace}}</div>
              </div>
              <div class="v-generallcard__row" :title="status">
                <div class="v-generallcard__key">Status</div>
                <div class="v-generallcard__value">{{status}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Modified At</div>
                <div class="v-generallcard__value">{{modifiedAt}}</div>
              </div>
            </div>
            <div class="v-generallcard__footer text-center">
              <button class="btn btn--bg-blue v-generallcard__details mt-4" @click="showPepDetails();">
                Details
              </button>
            </div>

        </div> 
    </article>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'VPepCard',
  props: {
    data: Object
  },
  computed: {
    ...mapGetters("components-logic", [
        "showTargetsToggles"
    ]),
    ...mapGetters("report", [
      "checkIfSelected"
    ]),
    type(){return this.data.type},
    gender(){
      if(this.data.gender){
          return this.data.gender.join(', ')
      } else {
          return '-'
      }
    },
    fullName(){return this.data.fullName},


    birthDate(){
      if(this.data.birthDate){
          return this.data.birthDate.join(', ')
      } else {
          return '-'
      }
    },
    birthPlace(){
        if(this.data.birthPlace){
            return this.data.birthPlace.join(', ')
        } else {
            return '-'
        }
    },
    status(){
        if(this.data.status){
            return this.data.status.join(', ')
        } else {
            return '-'
        }
    },
    modifiedAt(){
        if(this.data.modifiedAt){
            return this.data.modifiedAt.join(', ')
        } else {
            return '-'
        }
    },
  },
  methods: {
    ...mapMutations("components-logic", [
      "addActiveModalWindow"
    ]),
    ...mapMutations("report", [
      "addSelectedPep",
      "removeSelectedPep"
    ]),
    showPepDetails(){
      this.addActiveModalWindow({id: '131313', data: this.data})
    },
    togglePep(e){
        const status = e.target.checked;
        if(status) {
            this.addSelectedPep(this.data)
        } else {
            this.removeSelectedPep(this.data.id)
        }
    }
  }
}
</script>

<style lang="scss">
</style>