import axios from 'axios';
import helpers from "@/helpers"
export default {
    state: {
        allSanctions: [],
        count: 0,
        limit: 10,
        page: 1,
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
        }
    },
    actions: {
        async fetchOFACsanctions({
            commit,
            getters
        }) {
            const target = getters.getTargetName;
            const page = getters.getSanctionsCurrentPage;
            const limit = getters.getSanctionsLimit;
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
        }
    },
};