<template>
    <div class="v-tablecard">
        <table class="table">
            <thead class="table__head">
                <tr class="table__head-row">
                    <th class="table__head-cell">Full Name</th>
                    <th class="table__head-cell">Type</th>
                    <th class="table__head-cell">Authority</th>
                    <th class="table__head-cell">Current Programm</th>
                    <th class="table__head-cell">Sanctioned Since</th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr class="table__body-row" v-for="s in data" :key="s.id">
                    <td class="table__body-cell" >
                        <button 
                        type="button" 
                        class="link-button" 
                        @click="showSanctionDetails(s);"
                        >{{s.fullName}}</button>
                    </td>
                    <td class="table__body-cell">{{s.type}}</td>
                    <td class="table__body-cell">{{s.authority}}</td>
                    <td class="table__body-cell">{{getProgramsList(s.SanctionPrograms)}}</td>
                    <td class="table__body-cell">{{getPubDate(s.pubDate)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import moment from "moment";
export default {
  name: 'VTableCard',
  props: {
    data: Array
  },
  computed: {
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
  methods: {
    ...mapMutations("components-logic", [
      "addActiveModalWindow",
    ]),
    getProgramsList(program){
        if(program.length){
            return program.map((i) => i.name).join(', ')
        } else {
            return '-'
        }
    },
    getPubDate(date){
        return moment(date).format('L')
    },
    showSanctionDetails(modalData){
      this.addActiveModalWindow({id: '0000', data: modalData})
    },
    
  }
 

}
</script>

<style lang="sass">
.link-button
    background: transparent
    border: none
    outline: none
    &:hover
        text-decoration: underline

</style>