import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

Vue.directive("scroll", {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});
// コンポーネントの書き方の例
// Vue.component("TopHeader", TopHeader);
new Vue({
  render: h => h(App),
}).$mount('#app')
