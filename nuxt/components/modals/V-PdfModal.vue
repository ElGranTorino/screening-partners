<template lang="">
    <div v-if="activeModalWindow.id ===_id" class="v-modal">
        <div class="v-modal__backdrop" @click="removeActiveModalWindow(_id)"></div>
        <div class="v-modal__container card">
            <form @submit.prevent="selectReportType($event)">
                <div class="v-modal__head">
                <!-- <button class="btn btn--bg-light-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-m</title><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>
                </button> -->
                </div>
                <div class="v-modal__body">
                    <div class="container">
                        <div class="col-6">
                            <div class="radio-area">
                                <input id="generall-report-radio" class="radio-area__input" type="radio" name="report-type-radio" checked>
                                <label for="generall-report-radio" class="radio-area__label">
                                    <div class="radio-area__box"></div>
                                    <div class="radio-area__text ml-2">
                                        <div class="radio-area__title">Download generall report</div>
                                        <span class="radio-area__body">Download first 50 entities from each section</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="radio-area">
                                <input id="detailed-report-radio" class="radio-area__input" type="radio" name="report-type-radio">
                                <label for="detailed-report-radio" class="radio-area__label">
                                    <div class="radio-area__box"></div>
                                    <div class="radio-area__text ml-2">
                                        <div class="radio-area__title">Download detailed report</div>
                                        <span class="radio-area__body">Select targets you want to save in report</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="v-modal__footer">
                    <button class="btn btn--bg-light-gray" type="button" @click="removeActiveModalWindow(_id)">Cancel</button>
                    <button class="btn btn--bg-blue" type="submit">Download</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// Importing VueX environment
import {mapGetters, mapMutations} from "vuex";

// Importing required dependencies

// import autoTable from "jspdf-autotable";


export default {
    name: 'VModal',
    props: {
        _id: String
    },
    computed: {
        ...mapGetters('components-logic', [
            "activeModalWindow"
        ]),
        ...mapGetters('report', [
            "selectedSanctions",
            "selectedPeps",
            "selectedNews"
        ])
    },
    methods: {
        ...mapMutations("components-logic", [
            "addActiveModalWindow",
            "removeActiveModalWindow",
            "updateTargetsToggles"
        ]),
        
        initGenerallReport() {
            console.log('ooo')
            this.$emit("downloadPDF", 'generall')
        },
        initDetailedReport() {
            this.updateTargetsToggles(true)
        },
        // downloadPDF(type){
        //     (async () => {
                
        //         // Target`s name PEPs, Sanctions and News data which we are going to save in report
        //         const targetName = "Putin"
        //         const peps = type === 'detailed' ? this.selectedPeps : [];
        //         const sanctions = type === 'detailed' ? this.selectedSanctions : [];
        //         const news = type === 'detailed' ? this.selectedNews : [];

                
        //         // https://github.com/simonbengtsson/jsPDF-AutoTable
        //         const doc = new JSPDF(); // DOCUMENTATION: https://www.npmjs.com/package/jspdf
        //         const sheetWidth = doc.internal.pageSize.getWidth();
        //         // const sheetHeight = doc.internal.pageSize.getHeight();

        //         // Importing fonts from JS files
        //         const bold = fonts.Montserrat.bold;
        //         const italic = fonts.Montserrat.italic;
        //         const regular = fonts.Montserrat.regular;

        //         // Creating pdf-readable fonts formats
        //         doc.addFileToVFS('Montserrat-Bold-normal.ttf', bold);
        //         doc.addFileToVFS('Montserrat-Italic-normal.ttf', italic);
        //         doc.addFileToVFS('Montserrat-Regular-normal.ttf', regular);

        //         doc.addFont('Montserrat-Bold-normal.ttf', 'Montserrat', 'bold');
        //         doc.addFont('Montserrat-Italic-normal.ttf', 'Montserrat', 'italic');
        //         doc.addFont('Montserrat-Regular-normal.ttf', 'Montserrat', 'regular');
                
        //         // Drawing big blue rect on the top of the first page
        //         doc.setFillColor('#2653ff');
        //         doc.rect(0, 0, 300, 20, 'F');

        //         // Drawing first-page title
        //         doc.setFont('Montserrat', 'bold');
        //         doc.setFontSize(20);
        //         doc.text('Screening Partners', sheetWidth - 25, 40, {align: "right"});

        //         // Drawing report template
        //         doc.setFontSize(10);
        //         doc.text('Target Name:', 25, 90, {align: "left"});
        //         doc.text('Date Of Search:', 25, 100, {align: "left"});
        //         doc.text('Potential Adverse Media:', 25, 110, {align: "left"});
        //         doc.text('Potential Sanctions Matches:', 25, 120, {align: "left"});
        //         doc.text('Potential Politically Exposed Persons Matches:', 25, 130, {align: "left"});

        //         // Drawing report information
        //         // doc.setFont('Montserrat', 'bold');
        //         doc.text(`${targetName}`, sheetWidth - 25, 90, {align: "right"});
        //         doc.text(`${Date.now()}`, sheetWidth - 25, 100, {align: "right"});
        //         doc.text(`${news.length}`, sheetWidth - 25, 110, {align: "right"});
        //         doc.text(`${sanctions.length}`, sheetWidth - 25, 120, {align: "right"});
        //         doc.text(`${peps.length}`, sheetWidth - 25, 130, {align: "right"});

                
        //         await doc.save('report.pdf');
        //     })();
        // },
        selectReportType(e){
            const generallReport = e.target.querySelector("#generall-report-radio").checked;
            const  detailedReport = e.target.querySelector("#detailed-report-radio").checked;

            this.removeActiveModalWindow(this._id);
            
            if(generallReport) this.initGenerallReport();
            else if(detailedReport) this.initDetailedReport();
        }
    }
}
</script>
<style lang="">
    
</style>