<template>
 
  <main class="inspection">
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
    />
    <VSanctionModal
    :_id="'0000'"
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
                Vladimir Putin
              </h1>
              <div class="inspection__request-duration">
                request performed in 2.3 seconds
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
        <section class="inspection__charts">
          <section class="container">
            <div class="col-4">
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
              <div class="col-8">
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
               
              <div class="col-8">
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
              <div class="col-4 mt-2" >
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

              <div v-if="news.total" class="inspection__if-related-news" >
                <div class="inspection__related-news-title">
                  <h2 class="title mb-2">Adverse Media Search ({{news.total}})</h2>
                </div>
                <div class="container">
                  <div v-for="article in news.entries" :key="article.id" class="col-4">
                    <VNewsCard
                      :news="article"
                      class="mt-2"
                      />
                  </div>
                </div>

                <div class="inspection__more-related-news-pagination mt-2 mb-1 text-center">
                  <button class="btn btn--bg-blue">Show More</button>
                </div>
              </div>

              <div v-else class="inspection__else-related-news" >
                No news found.
It seems we can’t find any news based on your search.
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
                  <div v-for="entry in sanctions.entries" :key="entry.id" class="col-6 mt-2">
                    <VSanctionCard
                      
                      :data="entry"
                    />
                  </div>
                </div>
                <div class="inspection__related-sanctions-pagination pagination mt-3">
                  <div class="pagination__inner text-center">
                    <button class="btn btn--pagination btn--bg-blue" disabled>1</button>
                    <button class="btn btn--pagination btn--bg-blue" @click="switchPage('sanctions', 2)">2</button>
                    <button class="btn btn--pagination btn--bg-blue" @click="switchPage('sanctions', 3)">3</button>
                  </div>
                </div>
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
                  <div v-for="entry in peps.entries" :key="entry.id" class="col-4 mt-2">
                    <VPepCard
                      :data="entry"
                    />
                  </div>
                </div>
                <div class="inspection__related-peps-pagination mt-3">
                  <div class="pagination__inner text-center">
                    <!-- <button
                    v-for="item in pagination.sanctions.items"
                    :key="item.id"
                    class="btn btn--pagination btn--bg-blue">{{item.value}}</button> -->
                  </div>
                </div>
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

// Components
import VToast from "@/components/generall/V-Toast.vue";
// import VStatusBar from "@/components/navigation/V-StatusBar.vue";
import VChartCard from "@/components/cards/V-ChartCard.vue";
import VNewsCard from "@/components/cards/V-NewsCard.vue";
import VPepCard from "@/components/cards/V-PepCard.vue";
import VSanctionCard from "@/components/cards/V-SanctionCard.vue";
import VModal from "@/components/modals/V-PdfModal.vue"
import VSanctionModal from "@/components/modals/V-SanctionModal.vue";


export default {
  name: "InspectionView",
  components: {
    VToast,
    // VStatusBar,
    VChartCard,
    VNewsCard,
    VSanctionCard,
    VPepCard,
    VModal,
    VSanctionModal,
  },
  layout: "l-default",
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    
  // },
  async fetch({store, query, params}){
    const targetDecoded = query.target.split('+').join(' ')
    // store.dispatch('api/setTarget', targetDecoded)
    // await store.dispatch('api/fetchPeps', {
    //   limit: 9,
    //   offset: 0,
    //   target: targetDecoded,
    // });
    
    
    await store.dispatch('api/fetchSanctions', {
      target: targetDecoded,
      limit: 10,
      offset: 1,
      update: true
    });
    // console.log(query.target)
    // await store.dispatch('api/fetchNews', {
    //   target: query.target,
    // });

  },

  data(){
    return {
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

  computed: {
    ...mapGetters("api", [
      "news",
      "peps",
      "sanctions",
    ]),
    
  },
  methods: {
    ...mapActions("api", [
      "fetchPeps",
      "fetchSanctions",
      "fetchNews"
    ]),
    ...mapMutations("", [
      "updatePeps",
      "updateNews",
      "updateSanctions"
    ]),
    ...mapMutations("components-logic", [
      "addActiveModalWindow",
    ]),

    async switchPage(entity, to){
      if(entity === 'sanctions'){
        await this.fetchSanctions({
          offset: to,
          limit: 10,
          target: this.target,
          update: true
        })
      }
    },
  }
}
</script>
<style lang="sass">
@import '@/static/sass/styles.sass'
</style>
