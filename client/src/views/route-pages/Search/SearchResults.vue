<template>
   <!-- STEPS -->
   <SearchSteps></SearchSteps>
   <!-- STEPS -->  
   <div class="offcanvas" v-if="activeOffcanvas">
      <div class="offcanvas__container">
         <div class="offcanvas__backdrop" @click="toggleOffcanvas()"></div>
         <div class="offcanvas__body">
            <button class="btn" @click="toggleOffcanvas()">
               <ion-icon name="chevron-back" style="vertical-align: middle; line-height: 0;"></ion-icon>
               <span style="vertical-align: middle; margin: 0 0.5rem 0" >Back</span>  
            </button>
            <div class="offcanvas__entity">
               <div class="offcanvas__entity-name title mb-2">
                  {{activeOffcanvas?.firstName || ''}}
                  {{activeOffcanvas.lastName}}
               </div>
               <div class="offcanvas__entity-type d-flex justify-between">
                  <span class="offcanvas__key">Type</span>
                  <span class="offcanvas__value">{{activeOffcanvas.type}}</span>
               </div>
               <div class="offcanvas__entity-programm d-flex justify-between mt-1">
                  <span class="offcanvas__key">Current program</span>
                  <span class="offcanvas__value">
                  {{parseSanctionProgram(activeOffcanvas.SanctionPrograms)}}
                  </span>
               </div>
               <div class="offcanvas__entity-update d-flex justify-between mt-1">
                  <span class="offcanvas__key">Latest update</span>
                  <span class="offcanvas__value">{{getFormatTimeString(activeOffcanvas.created, 'L')}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Authority</span>
                  <span class="offcanvas__value">{{activeOffcanvas.authority || 'OFAC'}}</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Status</span>
                  <span class="tag tag--warning tag--entity offcanvas__value" style="margin: 0">Active</span>
               </div>
               <div class="offcanvas__entity-authority d-flex justify-between mt-1">
                  <span class="offcanvas__key">Sanctioned since</span>
                  <span class="offcanvas__value">{{getFormatTimeString(activeOffcanvas.latestUpdate, 'L')}}</span>
               </div>
               <div class="delimiter mt-2 mb-2"></div>
               <div class="offcanvas__tabs tabs">
                  <div class="tabs__container">
                     <!--   <div class="tabs__head hidden">
                        <button class="tabs__head-item " v-if="activeOffcanvas.SanctionAliases">Alias</button>
                        <button class="tabs__head-item tabs__head-item--active" v-if="activeOffcanvas.SanctionInfos">Identification</button>
                        <button class="tabs__head-item" v-if="activeOffcanvas.SanctionAddresses"></button>  
                        </div>
                        -->
                     <div class="tabs__body">
                        <div class="tabs__body-item" v-if="activeOffcanvas?.SanctionInfos?.length">
                           <div class="title search__header" style="margin-bottom: 20px">Generall info</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Id type</th>
                                    <th class="table__head-cell search__sanctions-td">Id number</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row">
                                    <th class="table__body-cell search__sanctions-td">Registration Number</th>
                                    <th class="table__body-cell search__sanctions-td">1072308003063</th>
                                 </tr>
                                 <tr class="table__body-row" v-for="info in activeOffcanvas.SanctionInfos" :key="info.id">
                                    <th class="table__body-cell search__sanctions-td">{{info.key}}</th>
                                    <th class="table__body-cell search__sanctions-td" v-if="info.key === 'Website'">
                                       <a :href="info.value">{{info.value}}</a>
                                    </th>
                                    <th class="table__body-cell search__sanctions-td" v-else-if="info.key === 'Email Address'">
                                       <a :href="'mailto:' + info.value">{{info.value}}</a>
                                    </th>
                                    <th class="table__body-cell search__sanctions-td" v-else>
                                       {{info.value}}
                                    </th>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <div class="tabs__body-item mt-2" v-if="activeOffcanvas?.SanctionAddresses?.length">
                           <div class="title search__header" style="margin-bottom: 20px">Location</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Address</th>
                                    <th class="table__head-cell search__sanctions-td">City</th>
                                    <th class="table__head-cell search__sanctions-td">Postal code</th>
                                    <th class="table__head-cell search__sanctions-td">Country</th>
                                    <th class="table__head-cell search__sanctions-td">State or Province</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="location, i in activeOffcanvas.SanctionAddresses">
                                    <td class="table__head-cell search__sanctions-td">{{location.address1 || '-'}}</td>
                                    <td class="table__head-cell search__sanctions-td">{{location.city || '-'}}</td>
                                    <td class="table__head-cell search__sanctions-td">{{location.postalCode || '-'}}</td>
                                    <td class="table__head-cell search__sanctions-td">{{location.country || '-'}}</td>
                                    <td class="table__head-cell search__sanctions-td">{{location.stateOrProvince || '-'}}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <div class="tabs__body-item mt-2" v-if="activeOffcanvas?.SanctionAliases?.length">
                           <div class="title search__header" style="margin-bottom: 20px">Alternative names</div>
                           <table class="search__sanctions-table table fullwidth" >
                              <thead class="table__head">
                                 <tr class="table__head-row" >
                                    <th class="table__head-cell search__sanctions-td">Name</th>
                                 </tr>
                              </thead>
                              <tbody class="table__body">
                                 <tr class="table__body-row" v-for="name, i in activeOffcanvas.SanctionAliases">
                                    <td class="table__head-cell search__sanctions-td">
                                       {{name.firstName}}
                                       {{name.lastName}}
                                    </td>
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
                     {{getTargetName}} 
                     <button class="tag" @click="reportIssues($event)">
                        <ion-icon name="alert-circle-outline" style="vertical-align: middle; font-size: 1.3rem; margin-right: 0.4rem; pointer-events: none;"></ion-icon>
                        <span style="vertical-align: middle; pointer-events: none;">Report issues with data</span>
                     </button>
                  </div>
                  <div class="search__target-details">request performed in {{getRequestDuration}} seconds</div>
               </div>
            </div>
            <div class="search__controls d-flex">
               <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem " @click="clearBeforeRoute();">Back to search</router-link>
               <button class="btn" style="margin: 1.5rem 1rem" @click="downloadPDF();">Download PDF</button>
            </div>
         </div>
         <div class="search__news">
            <div class="search__news-container" v-if="allNews.length">
               <div class="results__data hidden">
                  <div class="results__count title text-center">
                     <span v-if="allNews.length > 100" >Over 100 results found</span>
                     <span v-else>Total results: {{allNews.length}}</span>
                  </div>
                  <div class="results__pdf d-flex justify-center">
                     <router-link to="/" class="btn ghost" style="margin: 1.5rem 1rem " @click="clearBeforeRoute();">Back to search</router-link>
                     <button class="btn" style="margin: 1.5rem 1rem" @click="downloadPDF();">Download PDF</button>
                  </div>
               </div>
               <div class="title search__header">
                  Relevant news 
                  <span v-if="allNews.length > 100" >(100+)</span>
                  <span v-else>({{allNews.length}})</span>
               </div>
               <div class="search__row">
                  <!-- CARD -->
                  <NewsCard v-for="news, index in allNews.filter((item) => {
                     return item.id < displayLimit
                     })" :newsData="news"></NewsCard>
                  <!-- CARD --> 
               </div>
               <!-- HIDDEN PAGINATION --> 
               <div class="d-flex justify-center">
                  <button class="btn" style="margin: 1.5rem 1rem" @click="showAllRelevantNews($event);" v-if="allNews?.length > 6">View all</button>
               </div>
               <!-- HIDDEN PAGINATION --> 
            </div>
            <div class="search__noresults mb-10 mt-10" v-else>
               <div class="title text-center">No news found</div>
               <div class="paragraph" style="padding: 25px 0 15px 0">It seems we can’t find any news based on your search.</div>
            </div>
         </div>
         <div class="delimiter mt-4"></div>
         <div class="search__sanctions" v-if="allSanctions.length">
            <div class="title search__header">
               Economic sanctions 
               <span v-if="allSanctions.length">({{getTotalSanctionsCount}})</span>
            </div>
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
                  <tr class="table__body-row" v-for="sanction, indx in allSanctions">
                     <th class="table__body-cell search__sanctions-td">
                        <a href="javascript:void(0);" @click="toggleOffcanvas(indx)">
                        {{sanction?.firstName || ''}}
                        {{sanction.lastName}}
                        </a>
                     </th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.type == "Entity" ? "Organization" : sanction.type}}</th>
                     <th class="table__body-cell search__sanctions-td">{{getCountryIconByName(sanction?.SanctionAddresses[0]?.country) || 'Globally'}} </th>
                     <th class="table__body-cell search__sanctions-td">{{sanction.authority || 'OFAC'}}</th>
                     <th class="table__body-cell search__sanctions-td">{{
                        parseSanctionProgram(sanction.SanctionPrograms)
                     }}</th>
                     <th class="table__body-cell search__sanctions-td">{{getFormatTimeString(sanction.latestUpdate, 'L')}}</th>
                  </tr>
               </tbody>
            </table>
            <div class="search__pagination mt-1">
               <ul class="search__pagination-list list horizontal">
                  <li class="search__pagination-item">
                     <button class="btn small btn-pg"  @click="moveSanctionsTo(getSanctionsCurrentPage - 1)" v-if="getSanctionsCurrentPage > 1">{{getSanctionsCurrentPage - 1}}</button>
                  </li>
                  <li class="search__pagination-item">
                     <button class="btn small btn-pg active"  @click="moveSanctionsTo(1)">{{getSanctionsCurrentPage}}</button>
                  </li>

                  <li class="search__pagination-item">
                     <button class="btn small btn-pg"  
                     @click="moveSanctionsTo(getSanctionsCurrentPage + 1)"
                     v-if="
                        (getSanctionsCurrentPage + 1) <= Math.ceil(getTotalSanctionsCount / getSanctionsLimit)
                     "
                     >{{getSanctionsCurrentPage + 1}}</button>
                  </li>
               </ul>
            </div>
         </div>
        
         <div class="search__noresults mb-10 mt-10" v-else>
            <div class="title text-center">No sanctions found</div>
            <div class="paragraph" style="padding: 25px 0 15px 0">It seems we can’t find any EU, OFAC, UN sanctions based on your search.</div>
         </div>
      </div>
   </section>
   <!-- FOOTER -->
   <Footer></Footer>
   <!-- FOOTER -->
</template>

<script>
   // Required plugins and libraries
   import helpers from "@/helpers";
   import moment from "moment"
   import axios from "axios";
   import jsPDF from "jspdf";
   import autoTable from "jspdf-autotable";

   // Fonts
   import Montserrat from "@/assets/fonts/Montserrat/Montserrat.js"

   // Vue environment
   import {
      defineComponent
   } from "vue";
   import {
      mapGetters,
      mapActions,
      mapMutations
   } from "vuex";

   // Components
   import Footer from "@/components/Footer.vue";
   import SearchSteps from "@/components/SearchSteps.vue";
   import NewsCard from "@/components/NewsCard.vue";
   import Offcanvas from "@/components/Offcanvas";

   export default defineComponent({
      name: 'SearchResultsView',
      components: {
         SearchSteps,
         Footer,
         NewsCard,
         Offcanvas
      },
      data() {
         return {
               results: [],
               activeOffcanvas: null,
               issueReported: false,
         }
      },
      async mounted() {

      },
      computed: mapGetters([
         "allNews", "displayLimit", "getRequestDuration",
         "allSanctions", "getTotalSanctionsCount", "getSanctionsLimit",
         "getSanctionsCurrentPage", "getTargetName"
      ]),
      methods: {
         ...mapActions(["fetchGoogleNews", "fetchOFACsanctions", "fetchAndUpdateSanctions", "commitIssuesWithData"]),
         ...mapMutations(["UPDATE_DISPLAY_LIMIT", "UPDATE_SANCTIONS_PAGE"]),
         showSanctionDetails() {
               const offcanvas = document.querySelector()
               offcanvas.classList.remove('hidden')
         },
         getFormatTimeString(date, type) {
               return moment(date).format(type)
         },
         showAllRelevantNews(e) {
               e.target.classList.add('hidden');
               this.UPDATE_DISPLAY_LIMIT(100);
         },
         parseSanctionProgram(data) {
            console.log(data)
            if(data.constructor === Object) {
               return data.name
            } else if (data.constructor === Array) {
               if(!data.length) return '-'
               return data.map(item => item.name).join(', ')
            } else if(data.constructor === String) {
               return data
            } else {
               return '-'
            }
         },
         getCountryIconByName(name) {
               switch (name) {
                  case 'Palestinian':
                     return '🇵🇸 ' + 'Palestine'
                  case 'Russia':
                     return '🇷🇺 ' + 'Russia'
                  case 'China':
                     return '🇨🇳 ' + 'China'
                  case 'Iran':
                     return '🇮🇷 ' + 'Iran'
                  case 'Iraq':
                     return '🇮🇶 ' + 'Iraq'
                  case 'Ukraine':
                     return '🇺🇦 ' + 'Ukraine'
                  case 'UKRAINE':
                     return '🇺🇦 ' + 'Ukraine'
                  case 'Belarus':
                     return '🇧🇾 ' + 'Belarus'
                  case 'Switzerland':
                     return '🇨🇭 ' + 'Switzerland'
                  case 'Cyprus':
                     return '🇨🇾 ' + 'Cyprus'

                  case 'Luxembourg':
                     return '🇱🇺 ' + 'Luxembourg'
                  case 'Kazakhstan':
                     return '🇰🇿 ' + 'Kazakhstan'
                  case 'Austria':
                     return '🇦🇹 ' + 'Austria'
                  case 'Armenia':
                     return '🇦🇲 ' + 'Armenia'
                  case 'Azerbaijan':
                     return '🇦🇿 ' + 'Azerbaijan'
                  case 'Angola':
                     return '🇦🇴 ' + 'Angola'
                  case 'Georgia':
                     return '🇬🇪 ' + 'Georgia'
                  case 'Serbia':
                     return '🇷🇸 ' + 'Serbia'

                  case 'Netherlands':
                     return '🇳🇱 ' + 'Netherlands'
                  case 'Czech Republic':
                     return '🇨🇿 ' + 'Czech Republic'
                  case 'Turkey':
                     return '🇹🇷 ' + 'Turkey'
                  case 'Cayman Islands':
                     return '🇰🇾 ' + 'Cayman Islands'
                  case 'Virgin Islands, British':
                     return '🇻🇮 ' + 'Virgin Islands'
                  case 'USA':
                     return '🇺🇸 ' + 'USA'
                  case 'United States of America':
                     return '🇺🇸 ' + 'USA'
                  default:
                     return `🌎 Globally`

                  // BURKINA FASO 🇧🇫
                  // ALGERIA 🇩🇿
                  // Bangladesh 🇧🇩
                  // Indonesia
               }
         },
         clearBeforeRoute() {
            this.UPDATE_DISPLAY_LIMIT(6);
            this.UPDATE_SANCTIONS_PAGE(1);
         },
         reportIssues(e) {
            if(this.issueReported) return;
            this.issueReported = true;

            this.commitIssuesWithData({
               message: 'Wrong arabic nombers',
               type: 'News issue',
            }).then((res) => {
               e.target.innerHTML = `Reported successfully <ion-icon name="checkmark-done" style="vertical-align: middle; font-size: 1.3rem"></ion-icon>`
            }).catch((err) => {
               this.issueReported = false;
               console.log(err)
            })
         },
         moveSanctionsTo(pageNum) {
               this.UPDATE_SANCTIONS_PAGE(pageNum);
               this.fetchAndUpdateSanctions()
         },
         toggleOffcanvas(id = null) {
               if (id !== null) {
                  document.body.classList.add('overflow-hidden')
                  this.activeOffcanvas = this.allSanctions[id]
               } else {
                  this.activeOffcanvas = null
                  document.body.classList.remove('overflow-hidden')
               }
         },
         downloadPDF() {
               const doc = new jsPDF();
               const width = doc.internal.pageSize.getWidth(),
                  height = doc.internal.pageSize.getHeight();

               doc.setFillColor('#2653ff');
               doc.rect(0, 0, 300, 20, 'F');

               const bold = Montserrat.bold;
               const italic = Montserrat.italic;
               const regular = Montserrat.regular;

               doc.addFileToVFS('Montserrat-Bold-normal.ttf', bold);
               doc.addFileToVFS('Montserrat-Italic-normal.ttf', italic);
               doc.addFileToVFS('Montserrat-Regular-normal.ttf', regular);

               doc.addFont('Montserrat-Bold-normal.ttf', 'Montserrat', 'bold');
               doc.addFont('Montserrat-Italic-normal.ttf', 'Montserrat', 'italic');
               doc.addFont('Montserrat-Regular-normal.ttf', 'Montserrat', 'regular');

               doc.setFont('Montserrat', 'bold');
               doc.setFontSize(20);
               doc.text('Screening Partners', width - 25, 40, {
                  align: "right"
               });

               doc.setFontSize(10);
               doc.text('Target:', 25, 80, {
                  align: "left"
               });
               doc.text('Date:', 25, 90, {
                  align: "left"
               });
               doc.text('Related news:', 25, 100, {
                  align: "left"
               });
               doc.text('Sanctions:', 25, 110, {
                  align: "left"
               });


               doc.setFont('Montserrat', 'bold');
               doc.text(this.getTargetName, width - 25, 80, {
                  align: "right"
               });
               doc.text(moment().format('LL'), width - 25, 90, {
                  align: "right"
               });
               doc.text(`${this.allNews.length}`, width - 25, 100, {
                  align: "right"
               });
               doc.text(`${this.allSanctions.length}`, width - 25, 110, {
                  align: "right"
               });

               doc.setTextColor('#898989');
               doc.setFont('Montserrat', 'italic');

               doc.text('Our service does not guarantee the ', width - 25, 55, {
                  align: "right"
               });
               doc.text('truthfulness of the results provided. ', width - 25, 60, {
                  align: "right"
               });
               doc.text('All results are based on data from public sources', width - 25, 65, {
                  align: "right"
               });

               const generateNewsTableBody = (data) => {
                  return data.reduce((acc, nextItem, indx) => {
                     acc.push([indx + 1, nextItem?.source, nextItem?.pubDate, nextItem?.title, nextItem?.url]);
                     return acc;
                  }, []);
               };
               const generateSanctionsTableBody = (data) => {
                  return data.reduce((acc, nextItem, indx) => {
                     acc.push([
                        indx + 1,
                        `${nextItem?.firstName || ''} ${nextItem?.lastName}`, 
                        nextItem?.SanctionAddresses[0]?.country || 'Globally', 
                        nextItem?.authority || 'OFAC', 
                        nextItem.SanctionPrograms.map(item => item.name).join(', '),
                        helpers.getFormatTimeString(nextItem?.latestUpdate, 'L')
                     ]);
                     return acc;
                  }, []);
               };
               const newsTableBody = generateNewsTableBody(this.allNews);
               const sanctionsTableBody = generateSanctionsTableBody(this.allSanctions)

               if(sanctionsTableBody.length){
                  // Sanctions table
                  const columnSizes = {
                     c1: width - 30 / 100 * 5.40540540541 ,
                     c2: width - 30 / 100 * 27.027027027,
                     c3: width - 30 / 100 * 16.2162162162,
                     c4: width - 30 / 100 * 18.9189189189,
                     c5: width - 30 / 100 * 18.9189189189,
                     c6: width - 30 / 100 * 13.5135135135,
                  };
                  autoTable(doc, {
                     // html: '#my-table',
                     head: [
                        ['#', 'Name', 'Country', 'Authority', 'Programs', 'Latest Update']
                     ],
                     body: sanctionsTableBody,
                     startY: 130,
                     columnStyles: {
                        0: {
                              cellWidth: 10,
                              cellPadding: 0,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                              fontStyle: 'bold'
                        },
                        1: {
                              cellWidth: 50,
                              cellPadding: 3,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                              fontStyle: 'italic'
                        },
                        2: {
                              cellWidth: 30,
                              cellPadding: 5,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                        },
                        3: {
                              cellWidth: 31.7793333,
                              cellPadding: 5,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                        },
                        4: {
                              cellWidth: 35,
                              cellPadding: 5,
                              textColor: '#373941',
                              fillColor: '#F8FAFF',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                        },
                        5: {
                              cellWidth: 25,
                              cellPadding: 0,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                        },
                     },
                     didParseCell: (data) => {
                        if (data.section === 'head') {
                              data.cell.styles.fillColor = '#2653ff';
                              data.cell.styles.textColor = '#f8f8f8';
                              data.cell.styles.fontStyle = 'bold';
                              data.cell.styles.lineColor = '#2553ff';
                              data.cell.styles.halign = 'center';
                        }
                     },
                     didDrawPage: (data) => {

                        const width = doc.internal.pageSize.getWidth(),
                              height = doc.internal.pageSize.getHeight();
                        doc.setFillColor('#2653ff')
                        doc.rect(0, height - 10, 300, 10, 'F');
                        doc.setTextColor('#f8f8f8')
                        doc.setFontSize(8)
                        doc.setFont('Montserrat', 'bold')
                        doc.text('Screening Partners © 2022 All right reserved', width / 2, height - 4, {
                              align: "center"
                        })
                     }
                  })
               }

               if(newsTableBody.length){
                  // // News table
                  autoTable(doc, {
                     // html: '#my-table',
                     head: [
                        ['#', 'Source', 'Date', 'Description', 'Link']
                     ],
                     body: newsTableBody,
                     // startY: 130,
                     columnStyles: {
                        0: {
                              cellWidth: 10,
                              cellPadding: 0,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                              fontStyle: 'bold'
                        },
                        1: {
                              cellWidth: 25,
                              cellPadding: 3,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                              fontStyle: 'italic'
                        },
                        2: {
                              cellWidth: 40,
                              cellPadding: 5,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                        },
                        3: {
                              cellWidth: 50,
                              cellPadding: 5,
                              fillColor: '#F7FAFF',
                              textColor: '#373941',
                              halign: 'center',
                              valign: 'middle',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                        },
                        4: {
                              cellWidth: 56.7793333333,
                              cellPadding: 5,
                              overflow: 'ellipsize',
                              textColor: '#373941',
                              fillColor: '#F8FAFF',
                              halign: 'center',
                              lineColor: '#373941',
                              lineWidth: 0.1,
                              fontStyle: 'bold'
                        }
                     },
                     didParseCell: (data) => {
                        if (data.section === 'head') {
                              data.cell.styles.fillColor = '#2653ff';
                              data.cell.styles.textColor = '#f8f8f8';
                              data.cell.styles.fontStyle = 'bold';
                              data.cell.styles.lineColor = '#2553ff';
                              data.cell.styles.halign = 'center';
                        }
                     },
                     willDrawCell: (data) => {
                        doc.setFont('Montserrat', 'regular')
                        if (data.section === 'body' && data.column.index === 4) {
                              if (data.row.index < 0) return
                              doc.setFont('Montserrat', 'bold')
                              doc.textWithLink('________________________________', data.cell.x, data.cell.y + 7, {
                                 url: newsTableBody[data.row.index][4],
                                 overflow: 'ellipsize'
                              })
                        }
                     },
                     didDrawPage: (data) => {

                        const width = doc.internal.pageSize.getWidth(),
                              height = doc.internal.pageSize.getHeight();
                        doc.setFillColor('#2653ff')
                        doc.rect(0, height - 10, 300, 10, 'F');
                        doc.setTextColor('#f8f8f8')
                        doc.setFontSize(8)
                        doc.setFont('Montserrat', 'bold')
                        doc.text('Screening Partners © 2022 All right reserved', width / 2, height - 4, {
                              align: "center"
                        })
                     }
                  })
               }

               doc.save("ScreeningPartnersReport.pdf");
         }
      }
   });
</script>
<style>
</style>
