export default {
    state: {
        HOST: process.env.HOST,
        searchesPerfomed: 10312343,
        searchStep: 1
      },
    mutations: {
      UPDATE_SEARCH_COUNT(state, count){
        state.searchesPerfomed = count
      },
      UPDATE_SEARCH_STEP(state, newValue){
        state.searchStep = newValue
      },
    },
    actions: {
      
    },
    getters: {
      getHost(state) {
        // Returns the value of host ip or domain server.
        return state.HOST
      },
      getSearchesPerfomed(state) { 
        return state.searchesPerfomed
      },
      getSearchStep(state) {
        return state.searchStep
      }
    },
};
