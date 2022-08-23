<template>
  <div class="search">
    <div class="search__container">
      <div class="search__content">
        <div class="search__title">ScreeningPartners admin dashboard</div>
        <div class="search__subtitle paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit et unde dolorum ratione veniam ut commodi animi labore id, ea, doloremque officia fuga dolor non.</div>
      </div>
      <div class="search__form">
        <form class="form-group" @submit.prevent="submitKeyWordForm();">

          <input type="text" class="text-field fullwidth interact" placeholder="ex: Investigation" data-main-input="" v-model="input">
          <div class="d-flex">
          <button type="submit" class="btn">Add</button>

          </div>
        </form>
        <div class="form-group search__popular"></div>
        <div class="form-group tags search__tags">
          <div v-if="getSearchKeywords.length">
            <span style="font-weight: bold;" >Active keywords:</span>
            <button class="tag interact noselect" v-for="keyword in getSearchKeywords" @click="deleteSearchKeyword(keyword._id)">{{keyword.name}} <span class="icon btn__icon">&#215;</span></button>
          </div>
          
          <div class="text-center subtitle mt-2" style="margin-right: 2rem" v-else>Your keyword list is empty</div>
        </div>
      </div>
      <div class="admin__issues mt-5">
      <table class="search__sanctions-table table fullwidth" v-if="getAdminIssues.length">
               <thead class="table__head">
                  <tr class="table__head-row">
                     <th class="table__head-cell search__sanctions-td">ID</th>
                     <th class="table__head-cell search__sanctions-td">Date</th>
                     <th class="table__head-cell search__sanctions-td">Target</th>
                     <th class="table__head-cell search__sanctions-td">Type</th>
                     <th class="table__head-cell search__sanctions-td">Message</th>
                  </tr>
               </thead>
               <tbody class="table__body">
                  <tr class="table__body-row" v-for="issue in getAdminIssues">
                     <th class="table__body-cell search__sanctions-td">{{issue.id}}</th>
                     <th class="table__body-cell search__sanctions-td">{{getFormatTimeString(issue.date, 'LLL')}}</th>
                     <th class="table__body-cell search__sanctions-td"><i>{{issue.target}}</i></th>
                     <th class="table__body-cell search__sanctions-td italic">{{issue.type}}</th>
                     <th class="table__body-cell search__sanctions-td">{{issue.message}}</th>
                  </tr>
               </tbody>
            </table>
      </div>
    </div>
    
  </div>
</template>

<script>
import helpers from "@/helpers";

import { mapGetters, mapActions, mapMutations } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminView',
  data() {
    return {
      input: ''
    }
  },
  computed: mapGetters(["getSearchKeywords", "getAdminInput", "getAdminIssues" ]),
  methods: {
    ...mapMutations(["UPDATE_SEARCH_KEYWORDS", "PUSH_SEARCH_KEYWORD", "UPDATE_ADMIN_INPUT", "UPDATE_ADMIN_ISSUES"]),
    ...mapActions([ "fetchAndUpdateDataIssueReports", "fetchSearchKeywords", "commitSearchKeyword", "deleteSearchKeyword"]),
    getFormatTimeString: helpers.getFormatTimeString,
    submitKeyWordForm(){
      this.commitSearchKeyword(this.input)
      this.input = ''
    }
  },
  mounted() {
    this.fetchSearchKeywords();
    this.fetchAndUpdateDataIssueReports()
  },
});

</script>
<style>

</style>