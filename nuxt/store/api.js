import helpers from "@/helpers/functions.js"
export const state = () => ({
    news: {
        total: 3211,
        entries: [
            {id: 0, date: "Sep 26th 22", body: ".. but with his government and party battling corruption scandals. ... with McCarthy Tétrault LLP and was briefly a consultant for Huawei,...", title: "Jean Charest: Quick facts about the Conservative leadership", url: "https://www.google.com"},
            {id: 1, date: "Sep 25th 22", body: "Corruption is sending shock waves through China's chipmaking industry ... But it wasn't until 2019, when the US cut off Huawei from...", title: "Corruption is sending shock waves through China’s chipmaking industry", url: "https://www.google.com"},
            {id: 2, date: "Sep 23th 22", body: "... officials to beat out Huawei in the competition for a contract in Djibouti. Ericsson had previously admitted to engaging in bribery and...", title: "Former Ericsson executives acquitted of Djibouti bribery .", url: "https://www.google.com"},
            {id: 3, date: "Sep 08th 22", body: ".. but with his government and party battling corruption scandals. ... with McCarthy Tétrault LLP and was briefly a consultant for Huawei,...", title: "Jean Charest: Quick facts about the Conservative leadership", url: "https://www.google.com"},
            {id: 4, date: "Sep 01th 22", body: "Corruption is sending shock waves through China's chipmaking industry ... But it wasn't until 2019, when the US cut off Huawei from...", title: "Corruption is sending shock waves through China’s chipmaking industry", url: "https://www.google.com"},
            {id: 5, date: "Aug 29th 22", body: "... officials to beat out Huawei in the competition for a contract in Djibouti. Ericsson had previously admitted to engaging in bribery and...", title: "Former Ericsson executives acquitted of Djibouti bribery .", url: "https://www.google.com"},
            {id: 6, date: "Aug 21th 22", body: ".. but with his government and party battling corruption scandals. ... with McCarthy Tétrault LLP and was briefly a consultant for Huawei,...", title: "Jean Charest: Quick facts about the Conservative leadership", url: "https://www.google.com"},
            {id: 7, date: "Aug 18th 22", body: "Corruption is sending shock waves through China's chipmaking industry ... But it wasn't until 2019, when the US cut off Huawei from...", title: "Corruption is sending shock waves through China’s chipmaking industry", url: "https://www.google.com"},
            {id: 8, date: "Jun 13th 22", body: "... officials to beat out Huawei in the competition for a contract in Djibouti. Ericsson had previously admitted to engaging in bribery and...", title: "Former Ericsson executives acquitted of Djibouti bribery .", url: "https://www.google.com"},
            {id: 9, date: "Jan 01th 22", body: "... sector supporting the Chinese communication giant Huawei and several corruption scandals linked to his Quebec provincial government.", title: "Poilievre will leave imprint on CPC – Winnipeg Free Press", url: "https://www.google.com"},
            {id: 10, date: "Dec 18th 21", body: ".. but with his government and party battling corruption scandals. ... with McCarthy Tétrault LLP and was briefly a consultant for Huawei,...", title: "Jean Charest: Quick facts about the Conservative leadership", url: "https://www.google.com"},
        ],
    },
    peps: {
        total: 423,
        entries: []
    },
    sanctions: {
        total: 211,
        entries: []
    },
    charts: [],
});

export const mutations = {
  updatePeps(state, newPepsData){
    state.peps = newPepsData
  },
  updateNews(state, newNewsData){
    state.news = newNewsData
  },
  updateSanctions(state, newSanctionsData){
    state.sanctions = newSanctionsData
  },
};

export const actions = {

  async fetchNews({commit, dispatch, state}, options){
    const {
      // limit,
      // offset,
      target
    } = options;
    const url = `http://localhost:9999/scrape/news?q=${target}`;
    const news = await this.$axios.$get(url);
    const total = news.length;
    const entries = helpers.refactorNewsFetchedData(news);
    commit("updateNews", {total, entries});
  },

  async fetchPeps({commit, dispatch, state}, options){
    const {
        limit,
        offset,
        target
    } = options;
    const url = `https://api.opensanctions.org/search/peps?q=${target}&limit=${limit}&offset=${offset}`

    const peps = await this.$axios.$get(url)
    const total = peps.total.value;
    const entries = helpers.refactorPepsFetchedData(peps.results)

    commit("updatePeps", {total, entries})
  },

  async fetchSanctions({commit, dispatch, state}, options){
    const url = `http://localhost:9999/scrape/sanctions`;
    const {
        limit,
        offset,
        target,
        update = true
    } = options;

    const sanctions = await this.$axios.$post(url, {
      limit,
      offset,
      target
    })
    const updatedData = {
      total: sanctions.count, 
      entries: sanctions.entities
    };

    
    if(update){
      commit("updateSanctions", updatedData)
    } else {
      return updatedData
    }
  },

  

};

export const getters = {
    news: s => s.news,
    peps: s => s.peps,
    sanctions: s => s.sanctions,
};

// {
//   id: '1e64f9e4-2d78-4d3a-90c5-b660d1d50df1',
//   authority: 'BIS',
//   firstName: '',
//   lastName: '',
//   fullName: 'HUAWEI MACHINE CO., LTD.',
//   type: '-',
//   remarks: '',
//   created: '2022-09-11T18:30:49.224Z',
//   list: 'EL',
//   website: 'http://www.bis.doc.gov/entities/default.htm',
//   pubDate: '2022-09-11T18:30:47.136Z',
//   SanctionPrograms: [],
//   SanctionAddresses: [Array],
//   SanctionInfos: [Array],
//   SanctionAliases: [],
//   SanctionDocuments: [],
//   SanctionNationalities: []
// },
