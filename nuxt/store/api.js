import helpers from "@/helpers/functions.js"
export const state = () => ({
    authenticated: false,
    queryTarget: '',
    news: {
        total: 0,
        entries: [],
    },
    peps: {
        total: 423,
        entries: []
    },
    sanctions: {
        total: 0,
        entries: []
    },
    charts: [],
    keywords: [],
});

export const mutations = {
  updatePeps(state, newPepsData){
    const {total, entries } = newPepsData;
    state.peps.total = total
    state.peps.entries = entries
  },
  updateNews(state, newNewsData){
    const {total, entries } = newNewsData;
    state.news.total = total
    state.news.entries = entries
  },
  updateSanctions(s, newSanctionsData){
    s.sanctions = newSanctionsData
  },
  updateQueryTarget(s, newTarget){
    s.queryTarget = decodeURIComponent(newTarget)
  },
  updateAuthenticated(s, boolean){
    s.authenticated = boolean
  },
  updateKeywords(s, newKeywords){
    s.keywords = newKeywords
  }
};

export const actions = {

  async fetchNews({commit, dispatch, getters}, options){
    const {
      target
    } = options;
    const url = `http://localhost:9999/scrape/news?q=${target}`;
    const news = await this.$axios.$get(url);
    const total = news.length;
    const entries = helpers.refactorNewsFetchedData(news);
    
    commit("updateQueryTarget", target)
    return {
      total, entries
    };
  },

  async fetchPeps({commit, dispatch, getters}, options){
    const {
        limit,
        offset,
        target
    } = options;
    const url = `https://api.opensanctions.org/search/peps?q=${target}&limit=${limit}&offset=${offset}`

    const peps = await this.$axios.$get(url)
    const total = peps.total.value;
    const entries = helpers.refactorPepsFetchedData(peps.results)

    return {
      total, entries
    }
  },

  async fetchSanctions({commit, getters}, options){
    const url = `http://localhost:9999/scrape/sanctions`;
    const {target ,limit,offset} = options;
    
    const sanctions = await this.$axios.$post(url, {limit,offset,target,})
    commit("updateQueryTarget", target)
    return {
      total: sanctions.count, 
      entries: sanctions.entries,
    };
  },

  async fetchAndUPDSanctions({commit, dispatch, getters}, options){
    const dataToUpdate = await dispatch("fetchSanctions", options);
    commit("updateSanctions", dataToUpdate)
  },
  async fetchAndUPDPeps({commit, dispatch, getters}, options){
    const dataToUpdate = await dispatch("fetchPeps", options);
    commit("updatePeps", dataToUpdate)
  },
  async fetchAndUPDNews({commit, dispatch, getters}, options){
    const dataToUpdate = await dispatch("fetchNews", options);
    commit("updateNews", dataToUpdate)
  },

  async authenticate({commit, getters}, options){
   
    const url =  `http://localhost:9999/api/login`;
    const {login, password} = options;
    await this.$axios.$post(url, {
        login, password
    }, {withCredentials: true});
  },
  async isAuthenticated({commit}){
    const url = 'http://localhost:9999/verify'

    const isAuthenticated = await this.$axios.$get(url, {withCredentials: true})
    return isAuthenticated.verified
  },
  async fetchKeywords({commit}){
    const url = `http://localhost:9999/api/keyword`;
    const res = await this.$axios.$get(url)
    commit("updateKeywords", res)
  },
  async createKeyword({dispatch}, options){
    const url = `http://localhost:9999/api/keyword`
    await this.$axios.$post(url, {name: options.name})
    dispatch('fetchKeywords')
  },
  async deleteKeyword({dispatch}, options){
    const url = `http://localhost:9999/api/keyword`
    console.log(options.id)
    await this.$axios.$delete(url, {data: {id: options.id}})
    dispatch('fetchKeywords')
  }
};

export const getters = {
    news: s => s.news,
    peps: s => s.peps,
    sanctions: s => s.sanctions,
    queryTarget: s => s.queryTarget,
    authenticated: s => s.authenticated,
    sanctionsPG: s => s.pagination.sanctions,
    keywords: s => s.keywords
};