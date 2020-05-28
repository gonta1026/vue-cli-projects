import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
// import axios02 from "axios";

Vue.config.productionTip = false
Vue.config.silent = true;
axios.defaults.baseURL = "http://localhost:3000/" //APIで取得するURLを設定
// axios02.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/twitter-spa/databases/(default)/documents/comments" //APIで取得するURLを設定

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
