import axios from "axios";
import helpers from "@/helpers"

export default {
    state: {
        HOST: process.env.HOST,
        searchesPerfomed: 10312343,
        searchStep: 0,
        target: '',
        lastRequestDuration: null,
    },
    mutations: {
        UPDATE_SEARCH_COUNT(state, count) {
            state.searchesPerfomed = count
        },
        UPDATE_SEARCH_STEP(state, newValue) {
            state.searchStep = newValue
        },
        UPDATE_TARGET_NAME(state, newTargetName) {
            state.target = newTargetName
        },
        UPDATE_LAST_REQUEST_DURATION(state, duration) {
            state.lastRequestDuration = duration
        }
    },
    actions: {
        async commitIssuesWithData({commit, getters}, options) {
            const target = getters.getTargetName;
            const type = options.type;
            const message = options.message;
            const url = helpers.createUrl('/api/issue');
            
            const req = await axios.post(url, {
                target, type, message
            });
        },
        
        async authenticate({commit, getters}, options){
            const url = helpers.createUrl('/api/login');
            const {login, password} = options;
            const req = await axios.post(url, {
                login, password
            }, {withCredentials: true});

        }
    },
    getters: {
        getHost(state) {
            // Returns the host url 
            return state.HOST
        },
        getSearchesPerfomed(state) {
            return state.searchesPerfomed
        },
        getSearchStep(state) {
            return state.searchStep
        },
        getTargetName(state) {
            return state.target
        },
        getRequestDuration(state) {
            return state.lastRequestDuration
        },
    },
};