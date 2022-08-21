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
        commitIssuesWithData({commit, getters}) {
            
        }
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
        },
        getTargetName(state) {
            return state.target
        },
        getRequestDuration(state) {
            return state.lastRequestDuration
        },
    },
};