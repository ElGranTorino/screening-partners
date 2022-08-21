import axios from 'axios';
import helpers from "../helpers.js"
export default {
    state: {
        allNews: [],
        displayLimit: 6, // How many news show display on the page
      },
      mutations: {
        UPDATE_ALL_NEWS(state, array) {
            state.allNews = array.map((item, i) => {
              item.id = i
              return item
            })
        },
        UPDATE_DISPLAY_LIMIT(state, newLimit) {
          state.displayLimit = newLimit
        }
      },
      actions: {
        async fetchGoogleNews({commit, getters}) {
          const url = helpers.createUrl('/scrape/news'),
                name = getters.getTargetName;
          const req = await axios.post(url, {
            name
          });

          commit('UPDATE_ALL_NEWS', req.data)
        }
      },
      getters: {
        allNews(state) {
          return state.allNews
        },
        displayLimit(state) {
          return state.displayLimit
        }
      },
};
