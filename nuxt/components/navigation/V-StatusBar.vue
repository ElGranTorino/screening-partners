<template>
    <header class="v-statusbar">
        <div class="container">
            <div class="v-statusbar__search col-4">
                <form class="v-statusbar__search-wrap" @submit.prevent="initSearch();">
                    <span class="v-statusbar__search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"/></svg>
                    </span>
                    <input 
                        v-model="target" 
                        type="search" 
                        class="v-statusbar__search-input" 
                        placeholder="Search for anything..."
                    >
                </form>
            </div>
            <div class="v-statusbar__date col-4 text-center">
                Today <b>{{getFormattedDateString(new Date(), 'MMMM D')}}</b>
            </div>
            <div class="v-statusbar__targets col-4 text-right">
                <button class="v-statusbar__show-targets-btn" @click="showSelectedTargetsDropdown = !showSelectedTargetsDropdown">
                    <span class="v-statusbar__targets-count-chip">
                        {{totalSelectedEntries}}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M336,80H176a16,16,0,0,0-16,16v16H352V96A16,16,0,0,0,336,80Z" style="fill:none"/><path d="M496,176a64.07,64.07,0,0,0-64-64H384V96a48.05,48.05,0,0,0-48-48H176a48.05,48.05,0,0,0-48,48v16H80a64.07,64.07,0,0,0-64,64v48H496ZM352,112H160V96a16,16,0,0,1,16-16H336a16,16,0,0,1,16,16Z"/><path d="M336,264a24,24,0,0,1-24,24H200a24,24,0,0,1-24-24v-4a4,4,0,0,0-4-4H16V400a64,64,0,0,0,64,64H432a64,64,0,0,0,64-64V256H340a4,4,0,0,0-4,4Z"/></svg>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M440.08,341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118,0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3,3,0,0,1-.82-.67C306.6,51.49,282.82,32,256,32s-50.59,19.49-59.28,48.56a3.13,3.13,0,0,1-.81.65c-56.38,23.21-83.78,67.74-83.78,136.14,0,75.36-13.29,91.42-35.31,118-1.6,1.93-3.23,3.89-4.89,5.93a35.16,35.16,0,0,0-4.65,37.62c6.17,13,19.32,21.07,34.33,21.07H410.5c14.94,0,28-8.06,34.19-21A35.17,35.17,0,0,0,440.08,341.31Z"/><path d="M256,480a80.06,80.06,0,0,0,70.44-42.13,4,4,0,0,0-3.54-5.87H189.12a4,4,0,0,0-3.55,5.87A80.06,80.06,0,0,0,256,480Z"/></svg> -->
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-i</title><path d="M479.66,268.7l-32-151.81C441.48,83.77,417.68,64,384,64H128c-16.8,0-31,4.69-42.1,13.94s-18.37,22.31-21.58,38.89l-32,151.87A16.65,16.65,0,0,0,32,272V384a64,64,0,0,0,64,64H416a64,64,0,0,0,64-64V272A16.65,16.65,0,0,0,479.66,268.7Zm-384-145.4c0-.1,0-.19,0-.28,3.55-18.43,13.81-27,32.29-27H384c18.61,0,28.87,8.55,32.27,26.91,0,.13.05.26.07.39l26.93,127.88a4,4,0,0,1-3.92,4.82H320a15.92,15.92,0,0,0-16,15.82,48,48,0,1,1-96,0A15.92,15.92,0,0,0,192,256H72.65a4,4,0,0,1-3.92-4.82Z"/><path d="M368,160H144a16,16,0,0,1,0-32H368a16,16,0,0,1,0,32Z"/><path d="M384,224H128a16,16,0,0,1,0-32H384a16,16,0,0,1,0,32Z"/></svg> -->
                </button>
                <div v-if="showSelectedTargetsDropdown" class="dropdown">
                    <div class="dropdown__card card">
                        <div
                        v-if="totalSelectedEntries" 
                        class="dropdown__content"
                        >
                            <div class="dropdown__head container">
                                <div class="dropdown__head-title title">Selected Entries ({{totalSelectedEntries}})</div>
                                <!-- <button class="dropdown__head-button">Clear all</button> -->
                            </div>
                            <div class="dropdown__body pt-4">
                                <div class="dropdown__item" v-for="sanction, i in selectedSanctions" :key="`s-` + i">
                                    <div class="dropdown__item-wrap">
                                        <div class="dropdown__item-data text-left">
                                            <div class="dropdown__item-name">{{sanction.fullName}}</div>
                                            <div class="dropdown__item-type">Sanction</div>
                                        </div>
                                        <div class="dropdown__remove-item">
                                            <button class="btn btn--has-icon btn--transparent" @click="removeSelectedSanction(sanction.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M296,64H216a7.91,7.91,0,0,0-8,8V96h96V72A7.91,7.91,0,0,0,296,64Z" style="fill:none"/><path d="M432,96H336V72a40,40,0,0,0-40-40H216a40,40,0,0,0-40,40V96H80a16,16,0,0,0,0,32H97L116,432.92c1.42,26.85,22,47.08,48,47.08H348c26.13,0,46.3-19.78,48-47L415,128h17a16,16,0,0,0,0-32ZM192.57,416H192a16,16,0,0,1-16-15.43l-8-224a16,16,0,1,1,32-1.14l8,224A16,16,0,0,1,192.57,416ZM272,400a16,16,0,0,1-32,0V176a16,16,0,0,1,32,0ZM304,96H208V72a7.91,7.91,0,0,1,8-8h80a7.91,7.91,0,0,1,8,8Zm32,304.57A16,16,0,0,1,320,416h-.58A16,16,0,0,1,304,399.43l8-224a16,16,0,1,1,32,1.14Z"/></svg>
                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-m</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/></svg> -->
                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="48"/><circle cx="416" cy="256" r="48"/><circle cx="96" cy="256" r="48"/></svg> -->
                                            </button>
                                        </div>
                                    </div>
                                    <div class="delimiter mt-1 mb-2"></div>
                                </div>
                                <div class="dropdown__item" v-for="article, i in selectedNews" :key="`n-` + i">
                                    <div class="dropdown__item-wrap">
                                        <div class="dropdown__item-data text-left">
                                            <div class="dropdown__item-name">{{article.title}}</div>
                                            <div class="dropdown__item-type">News</div>
                                        </div>
                                        <div class="dropdown__remove-item">
                                            <button class="btn btn--has-icon btn--transparent" @click="removeSelectedNews(article.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M296,64H216a7.91,7.91,0,0,0-8,8V96h96V72A7.91,7.91,0,0,0,296,64Z" style="fill:none"/><path d="M432,96H336V72a40,40,0,0,0-40-40H216a40,40,0,0,0-40,40V96H80a16,16,0,0,0,0,32H97L116,432.92c1.42,26.85,22,47.08,48,47.08H348c26.13,0,46.3-19.78,48-47L415,128h17a16,16,0,0,0,0-32ZM192.57,416H192a16,16,0,0,1-16-15.43l-8-224a16,16,0,1,1,32-1.14l8,224A16,16,0,0,1,192.57,416ZM272,400a16,16,0,0,1-32,0V176a16,16,0,0,1,32,0ZM304,96H208V72a7.91,7.91,0,0,1,8-8h80a7.91,7.91,0,0,1,8,8Zm32,304.57A16,16,0,0,1,320,416h-.58A16,16,0,0,1,304,399.43l8-224a16,16,0,1,1,32,1.14Z"/></svg>
                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-m</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/></svg> -->
                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="48"/><circle cx="416" cy="256" r="48"/><circle cx="96" cy="256" r="48"/></svg> -->
                                            </button>
                                        </div>
                                    </div>
                                    <div class="delimiter mt-1 mb-2"></div>
                                </div>
                                <div class="dropdown__item" v-for="pep, i in selectedPeps" :key="`p-` + i">
                                    <div class="dropdown__item-wrap">
                                        <div class="dropdown__item-data text-left">
                                            <div class="dropdown__item-name">{{pep.fullName}}</div>
                                            <div class="dropdown__item-type">Politicallly Exposed Person</div>
                                        </div>
                                        <div class="dropdown__remove-item">
                                            <button class="btn btn--has-icon btn--transparent" @click="removeSelectedPep(pep.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M296,64H216a7.91,7.91,0,0,0-8,8V96h96V72A7.91,7.91,0,0,0,296,64Z" style="fill:none"/><path d="M432,96H336V72a40,40,0,0,0-40-40H216a40,40,0,0,0-40,40V96H80a16,16,0,0,0,0,32H97L116,432.92c1.42,26.85,22,47.08,48,47.08H348c26.13,0,46.3-19.78,48-47L415,128h17a16,16,0,0,0,0-32ZM192.57,416H192a16,16,0,0,1-16-15.43l-8-224a16,16,0,1,1,32-1.14l8,224A16,16,0,0,1,192.57,416ZM272,400a16,16,0,0,1-32,0V176a16,16,0,0,1,32,0ZM304,96H208V72a7.91,7.91,0,0,1,8-8h80a7.91,7.91,0,0,1,8,8Zm32,304.57A16,16,0,0,1,320,416h-.58A16,16,0,0,1,304,399.43l8-224a16,16,0,1,1,32,1.14Z"/></svg>
                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-m</title><path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/></svg> -->
                                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="48"/><circle cx="416" cy="256" r="48"/><circle cx="96" cy="256" r="48"/></svg> -->
                                            </button>
                                        </div>
                                    </div>
                                    <div class="delimiter mt-1 mb-2"></div>
                                </div>
                                <div class="dropdown__download text-center">
                                    <button class="btn btn--bg-blue" @click="downloadDetailedReport()">Download Report</button>
                                </div>
                            </div>
                        </div>
                        <div class="targets__not-exist" v-else>
                            <h3 class="title text-center">No targets selected</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
//
import {mapGetters, mapMutations} from  "vuex";

// Importing helpers
import helpers from "@/helpers/functions.js";

// Importing components

export default {
    name: "VStatusBar",
    components: {
    },
    computed: {
        ...mapGetters("report", [
            "selectedNews",
            "selectedPeps",
            "selectedSanctions",
            "totalSelectedEntries",
        ])
    },
    data(){
        return {
            target: '',
            showSelectedTargetsDropdown: false,
            src: {
                brand: `${require(`~/static/img/Brand.jpg`)}`
            }
        }
    },
    mounted(){
        this.target = ''
    },
    
    methods: {
        ...mapMutations("report", [
            "removeSelectedSanction",
            "removeSelectedNews",
            "removeSelectedPep"
        ]),
        getFormattedDateString: helpers.getFormattedDateString,
        initSearch(){
            this.$router.push({path: '/inspect', query: {target: encodeURIComponent(this.target)} })
            
        },
        downloadDetailedReport(){
            this.$emit("downloadPDF", "detailed")
        }
    }
}
</script>
<style>

</style>