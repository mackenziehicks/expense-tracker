import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.filter('currency', function (value) {
    return '$' + parseFloat(value).toFixed(2);
});