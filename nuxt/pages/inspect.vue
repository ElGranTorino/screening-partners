<template>
 
  <main class="inspection">
    <VStatusBar
      @downloadPDF="downloadPDF"
    />
    <!-- 
      <div class="preloader">
      <div class="preloader__letters">
        <span class="preloader__letter l1">L</span>
        <span class="preloader__letter l2">O</span>
        <span class="preloader__letter l3">A</span>
        <span class="preloader__letter l4">D</span>
        <span class="preloader__letter l5">I</span>
        <span class="preloader__letter l6">N</span>
        <span class="preloader__letter l7">G</span>
      </div>
    </div>
    -->
    <VModal
    :_id="`4321`"
    @downloadPDF="downloadPDF"
    />
    <VSanctionModal
    :_id="'0000'"
    />
    <VPepModal
    :_id="`131313`"
    />
    <VNewsModal
    :_id="`newsModal`"
    />
    <div class="toasts">
      <VToast
      v-for="toast in toasts"
      :key="toast.id" 
      :message="toast.message"
      :position="toast.position"
      :display="toast.display"
      :running="toast.running"
      />
    </div>
    <div class="inspection__content content">
        <!-- INSPECTION HEAD -->
        <section class="inspection__head">
          <div class="inspection__request-data">
              <h1 class="inspection__target-name title">
                {{queryTarget}}
              </h1>
              <div class="inspection__request-duration">
                <!-- request performed in 2.3 seconds -->
              </div>
          </div>
          <div class="inspection__export-control">
            <button class="btn btn--bg-blue" @click="addActiveModalWindow({id: '4321'})">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" style="max-width: 26px; max-height: 26px; vertical-align: middle" fill="#fff" width="512" height="512" viewBox="0 0 512 512"> <path d="M428,224H288a48,48,0,0,1-48-48V36a4,4,0,0,0-4-4H144A64,64,0,0,0,80,96V416a64,64,0,0,0,64,64H368a64,64,0,0,0,64-64V228A4,4,0,0,0,428,224ZM336,384H176a16,16,0,0,1,0-32H336a16,16,0,0,1,0,32Zm0-80H176a16,16,0,0,1,0-32H336a16,16,0,0,1,0,32Z"/><path d="M419.22,188.59,275.41,44.78A2,2,0,0,0,272,46.19V176a16,16,0,0,0,16,16H417.81A2,2,0,0,0,419.22,188.59Z"/></svg>
              </span>
              <span style="vertical-align: middle;">
                Download PDF report
              </span>
            </button>
          </div>
        </section>
        <!-- INSPECTION HEAD -->

        <!-- INSPECTION CHARTS -->
        <section class="inspection__charts hidden">
          <section class="container">
            <div class="col-4 col-lg-6 col-md-12">
                <VChartCard
                :title="`Total requests made`"
                :sortBy="`This week`"
                :chartData="charts[0].chartData"
                :chartOptions="charts[0].chartOptions"
                :chartType="`line`"
                :chartStyles="``"
                class="mt-2"
                />
              </div>
              <div class="col-8 col-lg-6 col-md-12">
                <VChartCard
                :title="`Other information`"
                :sortBy="`This week`"
                :chartData="charts[1].chartData"
                :chartOptions="charts[1].chartOptions"
                :chartType="`bar`"
                :chartStyles="``"
                class="mt-2"
                />
              </div>
               
              <div class="col-8 col-lg-12 col-md-12">
                <VChartCard
                :title="`Target searched`"
                :sortBy="`This week`"
                :chartData="charts[1].chartData"
                :chartOptions="charts[1].chartOptions"
                :chartType="`line`"
                :chartStyles="``"
                class="mt-2"
                />
              </div>
              <div class="col-4 col-lg-12 col-md-12 mt-2" >
                <div class="card card--pro">
                  <img src="@/static/img/pro.png"/>
                    <nuxt-link to="/about" class="btn btn--bg-orange btn--link">Try PRO For Free</nuxt-link>
                </div>
              </div>
          </section>
        </section>
        <!-- INSPECTION CHARTS -->


        <div class="delimiter mt-5 mb-5"></div>
        
        <!-- INSPECTION CONTENT -->
        <section class="inspection__body">

            <!-- INSPECTION NEWS -->
            <section class="inspection__related-news">

              <div v-if="news.total && news.status === 'loaded'" class="inspection__if-related-news" >
                <div class="inspection__related-news-title">
                  <h2 class="title mb-2">Adverse Media Search ({{news.total}})</h2>
                </div>
                <div class="container" style="display: flex; flex-wrap: wrap">
                  <div v-for="article in news.entries" :key="article.id" class="col-4 col-lg-6 col-md-12"
                  >
                    <VNewsCard 
                    style="display: -webkit-flex; display: -ms-flexbox; display: flex;"
                      :news="article"
                      class="mt-2"
                      />
                      
                  </div>
                </div>

                <!-- <div class="inspection__more-related-news-pagination mt-2 mb-1 text-center">
                  <button class="btn btn--bg-blue">Show More</button>
                </div> -->
              </div>
              <div v-else-if="news.total < 1 && news.status === 'loaded'" class="inspection__else-related-news not-found" >
                <div class="title text-center not-found__title">No news found.</div>
                <div class="paragraph text-center mt-1 not-found__paragraph">It seems we can’t find any news based on your search.</div>
              </div>
              
              <div v-else class="container" >
                <div class="paragraph text-center mt-1 pb-1 not-found__paragraph">It takes 1-2 minutes to find potential adverse media related to <b>{{queryTarget}}</b></div>
                <div v-for="i in 3" class="mt-1 col-4 col-lg-6 col-md-12" :key="i">
                  <VSkeletonCard/>
                </div>
              </div>
            </section>
            <!-- INSPECTION NEWS END -->

            <div class="delimiter mt-5 mb-5"></div>
            <!-- INSPECTION SANCTIONS -->
            <section class="inspection__related-sanctions">
              <div v-if="sanctions.entries.length" class="inspection__if-related-sanctions" >
                <div class="inspection__related-sanctions-title">
                  <h2 class="title mb-2">Potential Sanctions Matches ({{sanctions.total}})</h2>
                </div>

                <div class="container">
                  <div v-for="entry in sanctions.entries" :key="entry.id" class="col-4 col-lg-12 col-md-12 mt-2">
                    <VSanctionCard
                      
                      :data="entry"
                    />
                  </div>
                </div>
                <Pagination :total="Math.ceil(sanctions.total / pagination.sanctions.limit)" :current="pagination.sanctions.page" @set="switchSanctionsPage"/>
                <!-- <div class="inspection__related-sanctions-pagination pagination mt-3">
                  <div class="pagination__inner text-center">
                    <button class="btn btn--pagination btn--bg-blue" disabled>1</button>
                    <button class="btn btn--pagination btn--bg-blue" @click="switchPage('sanctions', 2)">2</button>
                    <button class="btn btn--pagination btn--bg-blue" @click="switchPage('sanctions', 3)">3</button>
                  </div>
                </div> -->
              </div>
              
              <div v-else class="inspection__else-related-sanctions not-found" >
                <div class="title text-center not-found__title">No sanctions or export controls matches found.</div>
                <div class="paragraph text-center mt-1 not-found__paragraph">It seems there are no matches against the EU, OFAC, BIS, UN, and UK OFSI sanctions or export controls lists.</div>
              </div>

            </section>
            <!-- INSPECTION SANCTIONS END -->

            <div class="delimiter mt-3 mb-5"></div>

            <!-- INSPECTION PEPs -->
            <section class="related__peps">
              <div v-if="peps.entries.length" class="inspection__if-related-peps" >
                <div class="inspection__related-peps-title">
                  <h2 class="title mb-2">Politicallly Exposed Persons Matches ({{peps.total}})</h2>
                </div>

                <div class="container">
                  <div v-for="entry in peps.entries" :key="entry.id" class="col-4 col-lg-12 col-md-12 mt-2">
                    <VPepCard
                      :data="entry"
                    />
                  </div>
                </div>
                <Pagination :total="Math.ceil(peps.total / pagination.peps.limit)" :current="pagination.peps.page" @set="switchPepPage"/>
              </div>
              
              <div v-else class="inspection__else-related-peps not-found">
                <div class="title text-center not-found__title">No politicallly exposed persons matches found.</div>
                <div class="paragraph text-center mt-1 not-found__paragraph">A search through a number of PEPs international databases has not identified any matches against the search target.</div>
              </div>
            </section>
            <!-- INSPECTION PEPs END -->

        </section>
        <!-- INSPECTION CONTENT END -->
    </div>
    
  </main>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
import moment from "moment";
import JSPDF from "jspdf";
import autoTable from "jspdf-autotable";

import fonts from "@/helpers/fonts";
// Components
import VToast from "@/components/generall/V-Toast.vue";
import VStatusBar from "@/components/navigation/V-StatusBar.vue";
import VChartCard from "@/components/cards/V-ChartCard.vue";
import VNewsCard from "@/components/cards/V-NewsCard.vue";
import VPepCard from "@/components/cards/V-PepCard.vue";
import VSanctionCard from "@/components/cards/V-SanctionCard.vue";
import VModal from "@/components/modals/V-PdfModal.vue"
import VSanctionModal from "@/components/modals/V-SanctionModal.vue";
import VPepModal from "@/components/modals/V-PepModal.vue";
import Pagination from "@/components/pagination/V-PaginationDefault.vue"
import VNewsModal from "@/components/modals/V-NewsModal.vue";
import VSkeletonCard from "@/components/cards/V-SkeletonCard.vue";
export default {
  name: "InspectionView",
  components: {
    VToast,
    VStatusBar,
    VChartCard,
    VNewsCard,
    VSanctionCard,
    VPepCard,
    VModal,
    VSanctionModal,
    VPepModal,
    Pagination,
    VNewsModal,
    VSkeletonCard
  },
  layout: "l-default",
  data(){
    return {
      pagination: {
        sanctions: {
          limit: 6,
          page: 1,
        },
        peps: {
          limit: 6,
          page: 1
        }
      },
      toasts: [],
      charts: [
          {
            chartData: {
              labels: ["M", "T", "W", "T", "F", "S", "S"],
              datasets: [
                {
                  label: "",
                  data: [920, 150, 300, 200, 200, 500, 150],
                  borderRadius: 20,
                  borderWidth: 2,
                  barThickness: 10,
                  borderColor: [
                    "#222FE6"
                  ],
                  backgroundColor: [
                    "#222FE6"
                  ]
                }
              ]
            },
            chartOptions: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    boxWidth: 0
                  }
                },
              },
              scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: true,
                        drawBorder: false,
                    },
                    ticks: {
                      min: 0,
                      max: 1000,
                      stepSize: 200,
                      padding: 20
                    },
                    gridLines: {
                      display: false,
                      
                    }
                }
              }
            }
          },

          {
            chartData: {
              labels: ["M", "T", "W", "T", "F", "S", "S"],
              datasets: [
                {
                  label: "",
                  data: [215, 445, 412, 85, 47, 555, 435],
                  borderRadius: 20,
                  borderWidth: 2,
                  barThickness: 10,
                  borderColor: [
                    "#222FE6"
                  ],
                  backgroundColor: [
                    "#222FE6"
                  ]
                }
              ]
            },
            chartOptions: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    boxWidth: 0
                  }
                },
              },
              scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: true,
                        drawBorder: false,
                    },
                    ticks: {
                      min: 0,
                      max: 500,
                      stepSize: 200,
                      padding: 20
                    },
                    gridLines: {
                      display: false,
                      
                    }
                }
              }
            }
          },


          {
            chartData: {
              labels: ["M", "T", "W", "T", "F", "S", "S"],
              datasets: [
                {
                  label: "",
                  data: [920, 620, 418, 550, 230, 618, 800],
                  borderRadius: 20,
                  borderWidth: 2,
                  barThickness: 10,
                  borderColor: [
                    "#222FE6"
                  ],
                  backgroundColor: [
                    "#222FE6"
                  ]
                }
              ]
            },
            chartOptions: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    boxWidth: 0
                  }
                },
              },
              scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: true,
                        drawBorder: false,
                    },
                    ticks: {
                      max: 1000,
                      stepSize: 400,
                      padding: 20
                    },
                    gridLines: {
                      display: false,
                      
                    }
                }
              }
            }
          },
        ],
      }
  },
  head(){
    return {
      title: this.title
    }
  },


  async fetch({store, query, params}){
    const targetDecoded = decodeURIComponent(query.target);
    await store.commit("api/cleanNews")
    await store.commit("report/removeSelectedItems");
    await store.dispatch('api/fetchAndUPDSanctions', {
      limit: 6,
      offset: 1,
      target: targetDecoded,
    })
    await store.dispatch('api/fetchAndUPDPeps', {
      limit: 6,
      offset: 0,
      target: targetDecoded,
    })
  },
  created(){
    this.cleanNews();
    this.updateQueryTarget(this.$route.query.target);
    
    this.fetchAndUPDNews({
      target: this.queryTarget
    })
  },
  watch: {
    $route(to, from) {
      if (to.query.target !== from.query.target) {
        this.fetchAndUPDNews({
          target: this.queryTarget
        })
      }
    },
  },
  

  computed: {
    ...mapGetters("api", [
      "news",
      "peps",
      "sanctions",
      "sanctionsPG",
      "queryTarget"
    ]),
    ...mapGetters("report", [
      "selectedSanctions",
      "selectedNews",
      "selectedPeps"
    ]),
    title(){
      return `Corruption, sanctions and money laundering risks about ${this.queryTarget}`
    }
  },
 
  methods: {
    ...mapActions("api", [
      "fetchPeps",
      "fetchSanctions",
      "fetchNews",
      "fetchAndUPDSanctions",
      "fetchAndUPDPeps",
      "fetchAndUPDNews"
      
    ]),
    ...mapMutations("api", [
      "updateQueryTarget",
      "cleanNews"
    ]),
    ...mapMutations("report", [
      "removeSelectedItems"
    ]),
    ...mapMutations("components-logic", [
      "addActiveModalWindow",
    ]),
 
    async switchSanctionsPage(p){
      this.pagination.sanctions.page = p
      await this.fetchAndUPDSanctions({
        target: this.queryTarget,
        offset: p,
        limit: this.pagination.sanctions.limit
      })
    },
    async switchPepPage(p){
      this.pagination.peps.page = p;
      await this.fetchAndUPDPeps({
        limit: this.pagination.peps.limit,
        offset: (p - 1) * this.pagination.peps.limit,
        target: this.queryTarget,
      })
    },
    initPageBackDrop(el){
      const $el = document.querySelector(el);
      // const backDrop = document.querySelector('.page-backdrop')
      $el.style.zIndex = 10000;
    },
    downloadPDF(type){
      (async () => {
          // Target`s name PEPs, Sanctions and News data which we are going to save in report
          const targetName = this.queryTarget
          let peps, sanctions, news;

          if(type === 'detailed'){
            peps = this.selectedPeps;
            sanctions = this.selectedSanctions;
            news = this.selectedNews
          } else {
            peps =  await this.fetchPeps({limit: 50,offset: 1,target: this.queryTarget,})
            peps = peps.entries
            sanctions = await this.fetchSanctions({limit: 50,offset: 1,target: this.queryTarget,})
            sanctions = sanctions.entries
            news = this.news.entries
          }

          // const peps = type === 'detailed' ? this.selectedPeps : await this.fetchSanctions({limit: 50,offset: 1,target: this.queryTarget,}).entries;
          // const sanctions = type === 'detailed' ? this.selectedSanctions : await this.fetchPeps({limit: 50,offset: 1,target: this.queryTarget,}).entries;
          // const news = type === 'detailed' ? this.selectedNews : this.news.entries;




          // https://github.com/simonbengtsson/jsPDF-AutoTable
          const doc = new JSPDF(); // DOCUMENTATION: https://www.npmjs.com/package/jspdf
          const sheetWidth = doc.internal.pageSize.getWidth();
          const sheetHeight = doc.internal.pageSize.getHeight();

          // Importing fonts from JS files
          const bold = fonts.Montserrat.bold;
          const italic = fonts.Montserrat.italic;
          const regular = fonts.Montserrat.regular;

          // Creating pdf-readable fonts formats
          doc.addFileToVFS('Montserrat-Bold-normal.ttf', bold);
          doc.addFileToVFS('Montserrat-Italic-normal.ttf', italic);
          doc.addFileToVFS('Montserrat-Regular-normal.ttf', regular);

          doc.addFont('Montserrat-Bold-normal.ttf', 'Montserrat', 'bold');
          doc.addFont('Montserrat-Italic-normal.ttf', 'Montserrat', 'italic');
          doc.addFont('Montserrat-Regular-normal.ttf', 'Montserrat', 'regular');
          
          // Drawing big blue rect on the top of the first page
          doc.setFillColor('#2653ff');
          doc.rect(0, 0, 300, 20, 'F');

          // Drawing first-page title
          doc.setFont('Montserrat', 'bold');
          doc.setFontSize(20);
          doc.text('Screening Partners', sheetWidth - 25, 40, {align: "right"});

          // Drawing report template
          doc.setFontSize(10);
          doc.text('Target Name:', 25, 90, {align: "left"});
          doc.text('Date Of Search:', 25, 100, {align: "left"});
          doc.text('Potential Adverse Media:', 25, 110, {align: "left"});
          doc.text('Potential Sanctions Matches:', 25, 120, {align: "left"});
          doc.text('Potential Politically Exposed Persons Matches:', 25, 130, {align: "left"});

          // Drawing report information
          // doc.setFont('Montserrat', 'bold');
          doc.text(`${targetName}`, sheetWidth - 25, 90, {align: "right"});
          doc.text(`${moment(Date.now()).format('DD/MM/YYYY')}`, sheetWidth - 25, 100, {align: "right"});
          doc.text(`${news.length}`, sheetWidth - 25, 110, {align: "right"});
          doc.text(`${sanctions.length}`, sheetWidth - 25, 120, {align: "right"});
          doc.text(`${peps.length}`, sheetWidth - 25, 130, {align: "right"});

          // Report warning
          doc.setTextColor('#898989');
          doc.setFont('Montserrat', 'italic');
          doc.text('Our service does not guarantee the truthfulness', sheetWidth - 25, 55, {
              align: "right"
          });
          doc.text('correctness and completeness of the results generated. ', sheetWidth - 25, 60, {
              align: "right"
          });
          doc.text('All results are based on automatic searches of data from public sources.', sheetWidth - 25, 65, {
              align: "right"
          });

          const sanctionsTableBody = () => {
            if(!sanctions.length) return;
            return sanctions.reduce((acc, item, i) => {
              const id = i + 1;
              const fullName = item.fullName;
              const country = item.SanctionAddresses.map((c) => c.country).join(', ');
              const authority = item.authority;
              const programs = item.SanctionPrograms.map((p) => p.name).join(', ')
              const pubDate = moment(item.pubDate).format('L')
              acc.push([
                id,
                fullName,
                country,
                authority,
                programs,
                pubDate
              ])

              return acc
            }, []);
          };
          const newsTableBody = () => {
            if (!news.length) return;
              return news.reduce((acc, article, i) => {
                  acc.push([i + 1, article?.source, article?.date, article?.title, article?.url]);
                  return acc;
              }, []);
          };
          const pepsTableBody = () => {
            if(!peps.length) return;
            
            return peps.reduce((acc, pep, i) => {
              const country = pep.nationality ? pep.nationality.join(', ') : '-';
              const gender = pep.gender ? pep.gender.join(', ') : '-';
              const birthPlace = pep.birthPlace ? pep.birthPlace[0] : '-';
              const birthDate = pep.birthDate ? pep.birthDate[0] : '-';
              acc.push([
                  `${i + 1}`,
                  `${pep.fullName.toUpperCase()}`,
                  country,
                  gender,
                  birthPlace,
                  birthDate
              ]);

              return acc
            }, [])
          }
          if (news.length) {
            doc.setTextColor('#000')
            doc.setFont('Montserrat', 'bold');
            doc.text(`Potential Adverse Media: ${news.length}`, sheetWidth / 2, 150 , {
                align: "center"
            });
            // // News table
            autoTable(doc, {
                // html: '#my-table',
                head: [
                    ['#', 'Source', 'Date', 'Description', 'Link']
                ],
                body: newsTableBody(),
                startY: 160,
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
                            url: newsTableBody()[data.row.index][4],
                            overflow: 'ellipsize'
                        })
                    }
                },
                didDrawPage: (data) => {
                    doc.setFillColor('#2653ff')
                    doc.rect(0, sheetHeight - 10, 300, 10, 'F');
                    doc.setTextColor('#f8f8f8')
                    doc.setFontSize(8)
                    doc.setFont('Montserrat', 'bold')
                    doc.text('Screening Partners © 2022 All right reserved', sheetWidth / 2, sheetHeight - 4, {
                        align: "center"
                    })
                }
            })
          }
          if (sanctions.length) {
              const finalY = doc.previousAutoTable.finalY || 150;
              doc.setTextColor('#000');
              doc.setFont('Montserrat', 'bold');
              doc.text(`Potential Sanctions Matches: ${sanctions.length}`, sheetWidth / 2, finalY + 20, {
                  align: "center"
              });

              autoTable(doc, {
                  // html: '#my-table',
                  head: [
                      ['#', 'Name', 'Country', 'Authority', 'Programs', 'Latest Update']
                  ],
                  startY: finalY + 30,
                  body: sanctionsTableBody(),
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
                  willDrawCell(data) {
                    doc.setFont('Montserrat', 'regular')
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
                      doc.setFillColor('#2653ff')
                      doc.rect(0, sheetHeight - 10, 300, 10, 'F');
                      doc.setTextColor('#f8f8f8')
                      doc.setFontSize(8)
                      doc.setFont('Montserrat', 'bold')
                      doc.text('Screening Partners © 2022 All right reserved', sheetWidth / 2, sheetHeight - 4, {
                          align: "center"
                      })
                  }
              })
          }
          if (peps.length) {
            const finalY = doc.previousAutoTable.finalY || 140;
            doc.setTextColor('#000');
            doc.setFont('Montserrat', 'bold');
            doc.text(`Potential Politically Exposed Persons Matches: ${peps.length}`, sheetWidth / 2, finalY + 20, {
                align: "center"
            });
            autoTable(doc, {
                // html: '#my-table',
                head: [
                    ['#', 'Full Name', 'Nationality', 'Gender', 'Birth Place', 'Birth Date']
                ],
                startY: finalY + 30,
                body: pepsTableBody(),
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
                        cellWidth: 40,
                        cellPadding: 8,
                        fillColor: '#F7FAFF',
                        textColor: '#373941',
                        halign: 'center',
                        valign: 'middle',
                        lineColor: '#373941',
                        lineWidth: 0.1,
                        fontStyle: 'italic'
                    },
                    2: {
                        cellWidth: 25,
                        cellPadding: 5,
                        fillColor: '#F7FAFF',
                        textColor: '#373941',
                        halign: 'center',
                        valign: 'middle',
                        lineColor: '#373941',
                        lineWidth: 0.1,
                    },
                    3: {
                        cellWidth: 26.7793333,
                        cellPadding: 5,
                        fillColor: '#F7FAFF',
                        textColor: '#373941',
                        halign: 'center',
                        valign: 'middle',
                        lineColor: '#373941',
                        lineWidth: 0.1,
                    },
                    4: {
                        cellWidth: 55,
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
                willDrawCell(data) {
                  doc.setFont('Montserrat', 'regular')
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
                    doc.setFillColor('#2653ff')
                    doc.rect(0, sheetHeight - 10, 300, 10, 'F');
                    doc.setTextColor('#f8f8f8')
                    doc.setFontSize(8)
                    doc.setFont('Montserrat', 'bold')
                    doc.text('Screening Partners © 2022 All right reserved', sheetWidth / 2, sheetHeight - 4, {
                        align: "center"
                    })
                }
            })
          }
          
          
         
          const reportTargetName = this.queryTarget.split(/\s/gi).join('_');
          const reportDate = moment(new Date()).format('MM-DD-YYYY')
          const reportFileName = `report_${reportTargetName}_${reportDate}.pdf`;

          // Saving document with specified name
          await doc.save(reportFileName);
          this.removeSelectedItems();
      })();
    },
  }
}
</script>
<style lang="sass">
@import '@/static/sass/styles.sass'
@keyframes skeleton
  0%
    background: darken(#F7F7FA, 6%)
  100%
    background: rgba(darken(#F7F7FA, 6%), 30%)

.highlighted
  background: map-get($colors, pink)
  color: #fff
.page-backdrop
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100vh
  z-index: 9999
  background: rgba(#000, .5)


</style>
