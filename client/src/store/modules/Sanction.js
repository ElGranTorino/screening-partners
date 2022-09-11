import axios from 'axios';
import helpers from "@/helpers"
export default {
    state: {
        allSanctions: [],
        count: 0,
        limit: 10,
        page: 1,
        sorting: {
            by: 'name',
            type: 'ascending'
        },
    },
    mutations: {
        UPDATE_ALL_SANCTIONS(state, array) {
            state.allSanctions = array
        },
        UPDATE_TOTAL_SANCTIONS(state, count) {
            state.count = count
        },
        UPDATE_SANCTIONS_PAGE(state, page) {
            state.page = page
        },
        UPDATE_SORT_BY(state, newValue){
            state.sortBy = newValue;
        },
        UPDATE_SORTING(state, newSorting) {
            state.sorting = newSorting;
        }
    },
    actions: {
        sortSanctions({
            commit,
            getters,
            dispatch
        }, payload){
            const {sortBy = 'name', type = 'ascending'} = payload;
            var sorted = [];
            const unSorted = getters.allSanctions;
            const exists = (data) => {
                if(data) return data;
                return 'z'
            }
            const sortFunctions = {
                name: {
                    ascending: () => {
                        sorted = unSorted.sort((a, b) => a.fullName.trim() > b.fullName.trim());
                    },
                    descending: () => {
                        sorted = unSorted.sort((a, b) =>  b.fullName.trim() > a.fullName.trim());
                    }
                },
                country: {
                    ascending: () => {
                        sorted = unSorted.sort((a, b) => exists(a.SanctionAddresses[0]?.country) > exists(b.SanctionAddresses[0]?.country));
                    },
                    descending: () => {
                        sorted = unSorted.sort((a, b) =>  exists(b.SanctionAddresses[0]?.country) > exists(a.SanctionAddresses[0]?.country));
                    }
                },
                type: {
                    ascending: () => {
                        sorted = unSorted.sort((a, b) => a.type > b.type);
                    },
                    descending: () => {
                        sorted = unSorted.sort((a, b) =>  b.type > a.type);
                    }
                },
                program: {
                    ascending: () => {
                        sorted = unSorted.sort((a, b) => exists(a.SanctionPrograms[0]?.name) > exists(b.SanctionPrograms[0]?.name));
                    },
                    descending: () => {
                        sorted = unSorted.sort((a, b) => exists(b.SanctionPrograms[0]?.name) > exists(a.SanctionPrograms[0]?.name));
                    }
                },

                authority: {
                    ascending: () => {
                        sorted = unSorted.sort((a, b) => a.authority > b.authority);
                    },
                    descending: () => {
                        sorted = unSorted.sort((a, b) =>  b.authority > a.authority);
                    }
                },

                date: {
                    ascending: () => {
                        sorted = unSorted.sort((a, b) => Date.parse(a.pubDate) > Date.parse(b.pubDate));
                    },
                    descending: () => {
                        sorted = unSorted.sort((a, b) =>  Date.parse(b.pubDate) > Date.parse(a.pubDate));
                    }
                },
            }

            sortFunctions[sortBy][type]()
            commit("UPDATE_SORTING", {by: sortBy, type: type})
            commit("UPDATE_ALL_SANCTIONS", sorted)
        },
        async fetchOFACsanctions({
            commit,
            getters,    
        }, options = {}) {
            const target = options.target || getters.getTargetName;
            const page = options.page || getters.getSanctionsCurrentPage;
            const limit = options.limit || getters.getSanctionsLimit;
            const url = helpers.createUrl(`/scrape/sanctions`);
            const res = await axios.post(url, {
                target,
                page,
                limit
            });

           return res
        },
        async fetchAndUpdateSanctions({
            commit, 
            getters,
            dispatch
        }) {
            await dispatch("fetchOFACsanctions").then((res) => {
                commit("UPDATE_TOTAL_SANCTIONS", res.data.count);
                commit("UPDATE_ALL_SANCTIONS", res.data.entities)
                dispatch("sortSanctions", {sortBy: getters.getSorting.by, type: getters.getSorting.type})
            })
        },
    },
    getters: {
        allSanctions(state) {
            return state.allSanctions
        },
        getTotalSanctionsCount(state) {
            return state.count
        },
        getSanctionsLimit(state) {
            return state.limit
        },
        getSanctionsCurrentPage(state) {
            return state.page
        },
        getSortBy(state) {
            return state.sortBy
        },
        getSorting(state) {
            return state.sorting
        }
    },
};