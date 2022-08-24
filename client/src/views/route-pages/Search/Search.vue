<template>
  <div class="search">
    <SearchSteps></SearchSteps>
    <div class="search__container">
      <div class="search__content">
        <div class="search__title">Business Partner Due Diligence</div>
        <div class="search__subtitle paragraph"> Conduct a screening in relation to your business partners through thousands of available public sources and identify negative media matches (e.g., corruption scandals, money laundering, criminal cases, arrests of top management, sanctions imposition, engagement in fraud, etc.). Download the findings into a convenient PDF report. </div>
      </div>
      <div class="search__form">
        <form class="form-group" @submit.prevent="submitForm();">
          <input type="text" class="text-field fullwidth interact" placeholder="ex: Alphabet group Inc." data-interact-input="" @change="onChangeTargetName($event)">
          <div class="d-flex justify-center">
             <button class="btn interact" type="submit" data-interact-btn="">Search</button>
          </div>
        </form>
        <div class="form-group search__popular"></div>
        <div class="form-group tags search__tags" @click="setTargetNameFromTag($event)">
          <span style="font-weight: bold;">Popular:</span>
          <span class="tag interact" data-value="Snap">Snap</span>
          <span class="tag interact" data-value="Apple Inc.">Apple Inc.</span>
          <span class="tag interact" data-value="Amazon.com Inc">Amazon.com Inc.</span>
          <span class="tag interact" data-value="Microsoft">Microsoft</span>
          <span class="tag interact" data-value="Adobe">Adobe</span>
          <span class="tag interact" data-value="PepsiCo Inc.">PepsiCo Inc.</span>
          <span class="tag interact" data-value="Visa">Visa</span>
          <span class="tag interact" data-value="Samsung">Samsung</span>
          <span class="tag interact" data-value="Netflix">Netflix</span>
        </div>
      </div>    
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from "vuex";

import Footer from "@/components/Footer.vue";
import SearchSteps from "@/components/SearchSteps.vue";

export default {
  name: 'SearchView',
  components: {
    Footer, SearchSteps
  },
  mounted(){
    this.setFormState('active');
  },
  methods: {
    ...mapMutations(["UPDATE_TARGET_NAME", "UPDATE_LAST_REQUEST_DURATION", "UPDATE_SEARCH_STEP"]),
    ...mapActions(["fetchGoogleNews", "fetchOFACsanctions", "fetchAndUpdateSanctions", "incrementRequestCount"]),
    onChangeTargetName(e){
      this.UPDATE_TARGET_NAME(e.target.value)
    },
    setTargetNameFromTag(e){
      // Change value of the input on the tag`s value we clicked on
      if(!e.target.classList.contains('tag')) return;
      const input = document.querySelector('[data-interact-input]'), 
            value = e.target.getAttribute('data-value');
      
      input.value = value;
      this.UPDATE_TARGET_NAME(value)
    },
    isValid(){
      // This function checks if search input has valid data value
      return true
    },
    setFormState(state){
      // We use this function to disable form elements until 
      // promise is fullfiled or rejected. If state is true - we enable form elements
      // if false - we disable them
      const btn = document.querySelector("[data-interact-btn]"),
            input = document.querySelector("[data-interact-input]");
      switch(state){
        case 'active':
          btn.removeAttribute("disabled");
          input.removeAttribute("disabled");
          btn.textContent = 'Search';
          break;
        case 'disabled':
          btn.setAttribute("disabled", "");
          input.setAttribute("disabled", "");
          btn.textContent = 'Loading...';
          break;
      }
      this.UPDATE_SEARCH_STEP(0)
      
    },
    submitForm(){
      // We use this function on onSubmit event
      if(!this.isValid()) return;
      this.setFormState('disabled');
      const promises = [this.fetchGoogleNews(), this.fetchAndUpdateSanctions()]
      let requestStarted, requestEndend, requestDuration;

      requestStarted = Date.now()
      this.UPDATE_SEARCH_STEP(1)
      Promise.all(promises).then(() => {
        this.UPDATE_SEARCH_STEP(2)
        this.incrementRequestCount()
        this.$router.push({name: 'SearchResults'});

        requestEndend = Date.now();
        requestDuration = ((requestEndend - requestStarted) / 1000).toFixed(1);

        this.UPDATE_LAST_REQUEST_DURATION(requestDuration);
      }).catch((err) => {
        console.log(err)
        this.UPDATE_SEARCH_STEP(0)
      })

    }
  }
}
</script>
