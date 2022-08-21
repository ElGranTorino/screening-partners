import * as store from "./store.js";
export default {
    env: {
        HOST: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://screeningpartners.net'
    },
    createUrl: function (endpoint) { 
        return this.env.HOST + endpoint;  
    }

}