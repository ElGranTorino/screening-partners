<template lang="">
    <main class="home">
        <VStepsBar
        :step="step"
        />
        <div class="home__content">
            <div class="home__hero">
                <div class="home__hero-title title text-center">
                    <h1 class="">Business Partner Due Diligence</h1>
                </div>
                <div class="home__hero-paragraph paragraph text-center">
                    <p class="">
                        Conduct a screening in relation to your business partners through thousands of available public sources and identify negative media matches (e.g., corruption scandals, money laundering, criminal cases, arrests of top management, sanctions imposition, engagement in fraud, etc.). Download the findings into a convenient PDF report. 
                    </p>
                </div>
            </div>
            <div class="home__search text-center">
                <div class="home__search-wrap">
                    <form @submit.prevent="initSearch()">
                        <div class="form-group text-center mb-2">
                            <input 
                            v-model="target"
                            :disabled="formDisabled" 
                            type="text" 
                            class="text-input text-input--width-50" 
                            placeholder="ex: Alphabet group Inc." 
                            required
                            >
                        </div>
                        <div class="form-group">
                            <button

                             :disabled="formDisabled" 
                             class="btn btn--bg-blue"
                             > Inspect </button>
                        </div>
                        <div class="form-group"></div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
// import {mapGetters} from "vuex";
import VStepsBar from "@/components/navigation/V-StepsBar.vue";
export default {
    name: "VHome",
    layout: "l-default",
    components: {
        VStepsBar
    },
    data(){
        return {
            target: '',
            formDisabled: false,
            step: 0
        }
    },
    mounted(){
        this.formDisabled = false;   
        this.step = 0; 
    },
    methods: {
        initSearch(){
            this.formDisabled = true;
            this.$router.push({path: 'inspect', query: { target: encodeURIComponent(this.target) }});
        }
    },
    
}
</script>
<style lang="sass">
@import '@/static/sass/styles.sass'

    
</style>