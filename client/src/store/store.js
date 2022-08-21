import { createStore } from 'vuex';

import App from "./modules/App"
import News from "./modules/News"
import Sanction from "./modules/Sanction"

export default createStore({
  modules: {
    App, News, Sanction
  }
});
