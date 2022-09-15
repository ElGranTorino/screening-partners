import { createStore } from 'vuex';

import App from "./modules/App"
import News from "./modules/News"
import Sanction from "./modules/Sanction"
import Admin from "./modules/Admin"
import PEP from "./modules/PEP"
export default createStore({
  modules: {
    App, 
    News, 
    Sanction, 
    Admin,
    PEP
  }
});
