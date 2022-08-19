<template>
   <!-- STEPS -->
   <SearchSteps></SearchSteps>
   <!-- STEPS -->  
   <div class="offcanvas hidden">
      <div class="offcanvas__container">
         <div class="offcanvas__backdrop"></div>
         <div class="offcanvas__body">
            <button class="btn" @click="toggleOffcanvas('hide')">
               <ion-icon name="chevron-back" style="vertical-align: middle; line-height: 0;"></ion-icon>
               <span style="vertical-align: middle; margin: 0 0.5rem 0" >Back</span>  
            </button>
            <div class="offcanvas__entity">
               <div class="offcanvas__entity-name title mb-2">Gazprom Energo</div>
               <div class="offcanvas__entity-type d-flex justify-between">
                  <span class="offcanvas__key">Type</span>
                  <span class="offcanvas__value">Organization</span>
               </div>
               <div class="offcanvas__entity-programm d-flex justify-between mt-1">
                  <span class="offcanvas__key">Current program</span>
                  <span class="offcanvas__value">UKRAINE-EO13662</span>
               </div>
               <div class="offcanvas__entity-update d-flex justify-between mt-1">
                  <span class="offcanvas__key">Latest update</span>
                  <span class="offcanvas__value">2016-09-01</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Authority</span>
                  <span class="offcanvas__value">OFAC</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Status</span>
                  <span class="tag tag--warning tag--entity offcanvas__value" style="margin: 0">Active</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Date added</span>
                  <span class="offcanvas__value">2012-08-01</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Reference</span>
                  <span class="offcanvas__value">2012-08-01</span>
               </div>
               <div class="delimiter mt-2 mb-2"></div>
               <div class="offcanvas__tabs tabs">
                  <div class="tabs__container">
                     <div class="tabs__head">
                        <button class="tabs__head-item ">Alias</button>
                        <button class="tabs__head-item tabs__head-item--active">Identification</button>
                        <button class="tabs__head-item">Address</button>  
                     </div>
                     <div class="tabs__body">
                        <div class="tabs__body-item">
                           <table class="search__sanctions-table table fullwidth">
                              <thead class="table__head">
                                 <tr class="table__head-row">
                                    <th class="table__head-cell search__sanctions-td">Id type</th>
                                    <th class="table__head-cell search__sanctions-td">Id number</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row">
                                    <th class="table__body-cell search__sanctions-td">Registration Number</th>
                                    <th class="table__body-cell search__sanctions-td">1072308003063</th>
                                 </tr>
                                 <tr class="table__body-row">
                                    <th class="table__body-cell search__sanctions-td">Tax ID No.</th>
                                    <th class="table__body-cell search__sanctions-td">2308128945</th>
                                 </tr>
                                 <tr class="table__body-row">
                                    <th class="table__body-cell search__sanctions-td">Website</th>
                                    <th class="table__body-cell search__sanctions-td">Krasnodar-tr.gazprom.ru</th>
                                 </tr>
                                 <tr class="table__body-row">
                                    <th class="table__body-cell search__sanctions-td">Email Address</th>
                                    <th class="table__body-cell search__sanctions-td"><a href="#" mailto="d.matutin@tgk.gazprom.ru">d.matutin@tgk.gazprom.ru</a></th>
                                 </tr>
                                 <tr class="table__body-row">
                                    <th class="table__body-cell search__sanctions-td">Website</th>
                                    <th class="table__body-cell search__sanctions-td"><a href="http://www.treasury.gov/resource">http://www.treasury.gov/resource</a></th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <section class="search">
      <div class="search__container">
         <div class="search__data d-flex justify-between">
            <div class="search__target-info d-flex align-center">
               <div class="search__target-image hidden">
                  <img src="data:image/png;base64,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" alt="">
               </div>
               <div class="search__target-data">
                  <div class="search__target-name">
                     Gazprom 
                     <span class="tag">
                        <ion-icon name="alert-circle-outline" style="vertical-align: middle; font-size: 1.3rem; margin-right: 0.4rem;"></ion-icon>
                        <span style="vertical-align: middle;">Report issues with data</span>
                     </span>
                  </div>
                  <div class="search__target-details">request performed in 23.3 seconds</div>
               </div>
            </div>
            <div class="search__controls d-flex">
               <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem ">Back to search</router-link>
               <button class="btn" style="margin: 1.5rem 1rem">Download PDF</button>
            </div>
         </div>
         <div class="search__news">
            <div class="search__news-container" v-if="getAllNews.length">
               <div class="results__data hidden">
                  <div class="results__count title text-center">
                     <span v-if="getAllNews.length > 100" >Over 100 results found</span>
                     <span v-else>Total results: {{getAllNews.length}}</span>
                  </div>
                  <div class="results__pdf d-flex justify-center">
                     <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem ">Back to search</router-link>
                     <button class="btn" style="margin: 1.5rem 1rem">Download PDF</button>
                  </div>
               </div>
               <div class="title search__header">Relevant news <span>(100+)</span></div>
               <div class="search__row">
                  <!-- CARD -->
                  <NewsCard v-for="news in getAllNews" :newsData="news"></NewsCard>
                  <!-- CARD --> 
               </div>
               <!-- HIDDEN PAGINATION --> 
               <div class="d-flex justify-center">
                  <button class="btn" style="margin: 1.5rem 1rem">View all</button>
               </div>
               <!-- HIDDEN PAGINATION --> 
            </div>
            <div class="search__noresults" style="padding: 0 0 200px 0" v-else>
               <div class="title text-center">No results found</div>
               <div class="paragraph" style="padding: 25px 0 15px 0">It seems we can’t find any results based on your search.</div>
               <div class="results__pdf d-flex justify-center">
                  <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem ">Back to search</router-link>
                  <button class="btn" style="margin: 1.5rem 1rem">Download PDF</button>
               </div>
            </div>
         </div>
         <div class="delimiter mt-4"></div>
         <div class="search__sanctions">
            <div class="title search__header">Economic sanctions <span>(863)</span></div>
            <table class="search__sanctions-table table fullwidth">
               <thead class="table__head">
                  <tr class="table__head-row">
                     <th class="table__head-cell search__sanctions-td">Entity name</th>
                     <th class="table__head-cell search__sanctions-td">Type</th>
                     <th class="table__head-cell search__sanctions-td">Country</th>
                     <th class="table__head-cell search__sanctions-td">Authority</th>
                     <th class="table__head-cell search__sanctions-td">Current Program</th>
                     <th class="table__head-cell search__sanctions-td">Last Update</th>
                  </tr>
               </thead>
               <tbody class="table__body">
                  <tr class="table__body-row" v-for="sanction in results">
                     <th class="table__body-cell search__sanctions-td">
                        <a href="javascript:void(0);" @click="toggleOffcanvas('show')">
                           {{sanction?.firstName || ''}}
                           {{sanction.lastName}}
                        </a>
                     </th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.type}}</th>
                     <th class="table__body-cell search__sanctions-td">{{getCountryIconByName(sanction?.SanctionAddresses[0]?.country) || `🌎 Globally`}} </th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.authority || 'OFAC'}}</th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.SanctionPrograms[0].name}}</th>
                     <th class="table__body-cell search__sanctions-td">{{getFormatTimeString(sanction.latestUpdate, 'L')}}</th>
                  </tr>

               </tbody>
            </table>
         </div>
         <div class="search__pagination">
            <ul class="search__pagination-list list horizontal">
               <li class="search__pagination-item ">
                  <button class="btn small btn-pg active">1</button>
               </li>
               <li class="search__pagination-item">
                  <button class="btn small btn-pg">2</button>
               </li>
               <li class="search__pagination-item">
                  <button class="btn small btn-pg">3</button>
               </li>
               <li class="search__pagination-item">
                  <button class="btn small btn-pg">4</button>
               </li>
               <li class="search__pagination-item">
                  <button class="btn small btn-pg active">...</button>
               </li>
               <li class="search__pagination-item">
                  <button class="btn small btn-pg">78</button>
               </li>
               <li class="search__pagination-item">
                  <button class="btn small btn-pg">79</button>
               </li>
            </ul>
         </div>
         
      </div>
   </section>
   <!-- FOOTER -->
   <Footer></Footer>
   <!-- FOOTER -->
</template>
<script>
   import moment from "moment"
   import axios from "axios";
   // Vue environment
   import { defineComponent } from "vue";
   import {mapGetters, mapActions} from "vuex";
   
   // Components
   import Footer from "@/components/Footer.vue";
   import SearchSteps from "@/components/SearchSteps.vue";
   import NewsCard from "@/components/NewsCard.vue";
   
   export default defineComponent({
     name: 'SearchResultsView',
     components: {
       SearchSteps, Footer, NewsCard
     },
     data(){
       return {
         results: []
       }
     },
     async mounted() {
      this.fetchSanctions()
     },
     computed: mapGetters(["getAllNews"]),
     methods: {
       getFormatTimeString(date, type){
         return moment(date).format(type)
       },
       toggleOffcanvas(state){
         switch(state){
           case 'hide':
             document.querySelector('.offcanvas').classList.add('hidden');
             break;
           case 'show':
             document.querySelector('.offcanvas').classList.remove('hidden');
             break;
         }
       },
       async fetchSanctions(){
         const url = `http://localhost:3000/sanction?q=ABU`
         
         await axios.get(url).then((data) => {
           this.results = data.data
         })
       },
       getCountryIconByName(name){
         
         
         switch(name){
            case 'Palestinian':
               return '🇵🇸 ' + name
         }
       }
     }
   });
</script>
<style>
</style>
