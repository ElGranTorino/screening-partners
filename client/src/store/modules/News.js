import axios from 'axios';
export default {
    state: {
        allNews: [
          {id: 0, pubDate: '08/09/2022', title: 'Donald Trump has been arested in his house in Houston, TX', body: 'Formal US president Donald Trump this Friday has been arested in his house in Houston', url: 'https://www.google.com'},
          {id: 1, pubDate: '08/09/2022', title: 'Donald Trump has been arested in his house in Houston, TX', body: 'Formal US president Donald Trump this Friday has been arested in his house in Houston', url: 'https://www.google.com'},
          {id: 2, pubDate: '08/09/2022', title: 'Donald Trump has been arested in his house in Houston, TX', body: 'Formal US president Donald Trump this Friday has been arested in his house in Houston', url: 'https://www.google.com'},
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
