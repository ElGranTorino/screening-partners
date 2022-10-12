<template>
    <article class="v-generallcard card" :title="data.fullName">
        <div class="v-generallcard__container">
            <div class="v-generallcard__head">
                <div class="v-generallcard__head-data">
                  <div class="v-generallcard__name title">{{data.fullName}}</div>
                  <div class="v-generallcard__country mt-1"></div>
                </div>
                <div class="v-generallcard__head-managment">
                  <button v-if="showTargetsToggles" class="toggle report-toggle">
                    <input 
                      :id="`_` + data.id"  
                      @change="toggleSanction($event)" 
                      :checked="checkIfSelected('sanction', data.id) !== undefined" 
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
                <div class="v-generallcard__value">{{data.type}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Authority</div>
                <div class="v-generallcard__value">{{data.authority}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Current Programm</div>
                <div class="v-generallcard__value">{{program}}</div>
              </div>
              <div class="v-generallcard__row">
                <div class="v-generallcard__key">Sanctioned Since</div>
                <div class="v-generallcard__value">{{date}}</div>
              </div>
            </div>
            <div class="v-generallcard__footer text-center">
              <button class="btn btn--bg-blue v-generallcard__details mt-4" @click="showSanctionDetails();">
                Details
              </button>
            </div>

        </div> 
    </article>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import moment from "moment";
export default {
  name: 'VSanctionCard',
  props: {
    data: Object
  },
  
  methods: {
    ...mapMutations("components-logic", [
      "addActiveModalWindow",
    ]),
    ...mapMutations('report', [
        "addSelectedSanction",
        "removeSelectedSanction"
    ]),
    showSanctionDetails(){
      
      this.addActiveModalWindow({id: '0000', data: this.data})
    },
    toggleSanction(e){
        const status = e.target.checked;
        
        if(status) {
            this.addSelectedSanction(this.data)
        } else {
            this.removeSelectedSanction(this.data.id)
        }
    }
  },
  computed: {
    ...mapGetters("components-logic", [
        "showTargetsToggles"
    ]),
    ...mapGetters("report", [
      "checkIfSelected"
    ]),
    date(){
      return moment(this.data.pubDate).format('L')
    },
    program() {
            if(this.data.SanctionPrograms.length){
                return this.data.SanctionPrograms.map((i) => i.name).join(', ')
            } else {
                return '-'
            }
        },
  },
}
</script>

<style lang="scss">
</style>