import moment from "moment";
export default {
    env: {
        HOST: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://screeningpartners.net:9999'
    },
    createUrl: function (endpoint) { 
        return this.env.HOST + endpoint;  
    },
    getFormatTimeString: function(date, type) {
        return moment(date).format(type)
    },

}