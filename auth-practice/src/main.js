import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;

//  Cloud Firestore REST API の使用でググる
axios.defaults.baseURL = 'https://firestore.googleapis.com/v1/projects/vuejs-http-1956e/databases/(default)/documents';

// axiosを使ったリクエストの前に処理される。
const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// axiosを使ったレスポンスの前に処理される。
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
// ejectで消す。
axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

new Vue({
  render: h => h(App)
}).$mount('#app');
