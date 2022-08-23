import { createStore } from 'vuex';

import App from "./modules/App"
import News from "./modules/News"
import Sanction from "./modules/Sanction"
import Admin from "./modules/Admin"

export default createStore({
  modules: {
    App, 
    News, 
    Sanction, 
    Admin
  }
});
