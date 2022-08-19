import axios from 'axios';
export default {
    state: {
        allNews: [
          {id: 0, pubDate: '08/09/2022', title: 'Explained: What is Gazprom and what makes it so powerful?', body: "Europe is on edge,following Gazprom'senergy move. The energy giant has already reduced gas flows to 12 EU countries, eithe", url: 'https://www.google.com'},
          {id: 1, pubDate: '08/09/2022', title: "Gazprom daily gas output in July lowest since 2008, analysi", body: "Output last month of Russian firm was down 14% on June, sharpening fears Moscow could provoke energy crisis in Europe. Gazprom", url: 'https://www.google.com'},
          {id: 2, pubDate: '08/09/2022', title: "Output last month of Russian firm was down 14% on June, sharpening fears Moscow could provoke energy crisis in Europe. Gazprom", body: "Output last month of Russian firm was down 14% on June, sharpening fears Moscow could provoke energy crisis in Europe. Gazprom", url: 'https://www.google.com'},
          {id: 3, pubDate: '08/09/2022', title: "Gazprom claims Canada-to-Germany gas turbine transfer not in step with contract", body: "Gazprom claims Canada-to-Germany gas turbine transfer not in step with contract", url: 'https://www.google.com'},
          {id: 4, pubDate: '08/09/2022', title: "Gazprom Singapore misses LNG deliveries to Indian customer -sources", body: "Gazprom Singapore misses LNG deliveries to Indian customer -sources", url: 'https://www.google.com'},
          {id: 5, pubDate: '08/09/2022', title: "Gazprom daily gas output in July lowest since 2008, analysi", body: "Formal US president Donald Trump this Friday has been arested in his house in Houston", url: 'https://www.google.com'},
          
        ],    
        host: process.env.HOST,
      },
      mutations: {
        UPDATE_ALL_NEWS(state, array) {
            state.allNews = array
        }
      },
      actions: {
        
      },
      getters: {
        getAllNews(state) {
          return state.allNews
        }
      },
};
