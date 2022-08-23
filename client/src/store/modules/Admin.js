import axios from "axios";
import helpers from "@/helpers"

export default {
    state: {
        keywords: [],
        input: '',
        issues: []
    },
    mutations: {
        UPDATE_SEARCH_KEYWORDS(state, keywords){
            state.keywords = keywords
        },
        PUSH_SEARCH_KEYWORD(state, newKeyword){
            state.keywords.push(newKeyword)
        },
        UPDATE_ADMIN_INPUT(state, newInput){
            state.input = newInput
        },
        UPDATE_ADMIN_ISSUES(state, issues) {
            state.issues = issues
        }
    },
    actions: {
        async fetchDataIssueReports(){
            const url = helpers.createUrl('/api/issue');
            
            return await axios.get(url);
        },
        async fetchAndUpdateDataIssueReports({dispatch, commit}){
            await dispatch("fetchDataIssueReports")
                    .then((res) => {
                        commit("UPDATE_ADMIN_ISSUES", res.data)
                    })
        },
        async fetchSearchKeywords({commit}){
            const url = helpers.createUrl('/api/keyword');

            await axios.get(url)
                    .then((res) => {
                        commit("UPDATE_SEARCH_KEYWORDS", res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
        },
        async commitSearchKeyword({dispatch}, name){
            const url = helpers.createUrl('/api/keyword');
            
            await axios.post(url, { name })
                    .then((res) => {
                        dispatch("fetchSearchKeywords")
                    }).catch((err) => {
                        console.log(err)
                    })
        },
        async deleteSearchKeyword({dispatch}, id){
            const url = helpers.createUrl('/api/keyword');
            
            await axios.delete(url, {
                data: {
                    id
                }
            })
                    .then(async (res) => {
                        await dispatch("fetchSearchKeywords")
                    }).catch((err) => {
                        console.log(err)
                    })
        }
    },
    getters: {
        getSearchKeywords(state) {
            return state.keywords
        },
        getAdminInput(state) {
            return state.input
        },
        getAdminIssues(state) {
            return state.issues
        }
    },
};