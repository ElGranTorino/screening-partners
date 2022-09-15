import axios from "axios";

export default {
    state: {
        allPEPs: [],
        selected: null,
        count: 0,
        limit: 10,
        offset: 0,
        page: 1,
    },
    mutations: {
      UPDATE_PEPs_COUNT: (state, newCount) => state.count = newCount,
      UPDATE_PEPs_LIMIT: (state, newLimit) => state.limit = newLimit,
      UPDATE_PEPs_OFFSET: (state, newOffset) => state.offset = newOffset,
      UPDATE_ALL_PEPs: (state, newPEPs) => state.allPEPs = newPEPs,
      UPDATE_SELECTED_PEP: (state, newPEP) => state.selected = newPEP,
      UPDATE_CURRENT_PEP_PAGE: (state, newPage) => state.page = newPage,
    },
    actions: {
      async fetchPEPs({
          commit,
          getters
        }, options) {
          const target = getters.getTargetName
                          .split(/\s+/)
                          .join('+');
          const offset = options?.offset || getters.getPEPsOffset;
          const limit = options?.limit || getters.getPEPsLimit;

          if(!target) return;
          const url = `https://api.opensanctions.org/search/peps?q=${target}&limit=${limit}&offset=${offset}`
          const res = await axios.get(url);
          
        return res
      },
      switchPEPsPageTo({
        commit,
        dispatch,
        getters
      }, nextPage){
        commit("UPDATE_CURRENT_PEP_PAGE", nextPage);
        commit("UPDATE_PEPs_OFFSET", (getters.currentPEPPage - 1) * getters.getPEPsLimit);
        
        dispatch("fetchAndUpdatePEPs");
      },
      async fetchAndUpdatePEPs({
        commit, 
        getters,
        dispatch
      }){
        await dispatch("fetchPEPs", {}).then((res) => {
          if(!res) return;
          commit("UPDATE_PEPs_COUNT", res.data.total.value);
          commit("UPDATE_ALL_PEPs", res.data.results);
        }).catch((err) => {
          console.log(err);
          commit("UPDATE_ALL_PEPs", []);
        })
      },
      setSelectePEP({
        getters,
        commit,
      }, id){
        if(id === null || id === undefined) return commit("UPDATE_SELECTED_PEP", null);

        const PEP = getters.allPEPs[id];
        commit("UPDATE_SELECTED_PEP", PEP);
      }
    },
    getters: {
        allPEPs: (state) => state.allPEPs,
        getPEPsCount: (state) => state.count,
        getPEPsLimit: (state) => state.limit,
        getPEPsOffset: (state) => state.offset,
        selectedPEP: (state) => state.selected,
        currentPEPPage: (state) => state.page,
    }
}


// Available properties:
// alias: ["alias1", "alias2"],
// firstName: ["John"],
// lastName: ["John"],
// secondName,
// fatherName
// email: ["jhon@gmail.com"],
// gender: ["male"],
// nationality: ["Russian"],
// name: ["Name 1", "Name2],
// wikidata: ["data"],
// notes: ["note1", "note2"],
// topics: ["topic1", "topic2"],
// position ["position1", "position2"],
// sourceUrl: ["url1", "url2",],


// website,
// country,
// modifiedAt
// createdAt
// education
// birthDate,
// birthPlace,
// religion
// deathDate
// phone
// status,
// innCode
