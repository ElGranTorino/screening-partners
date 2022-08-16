import { createStore } from 'vuex';

import App from "./modules/App"
import News from "./modules/News"

export default createStore({
  modules: {
    App, News
  }
});
