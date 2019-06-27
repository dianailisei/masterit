import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import { store } from './store/store'
import VueSwal from 'vue-swal'
import Utils from './utils'
import '../public/serviceWorker'
Vue.use(VueSwal)
Vue.config.productionTip = false

const axios = Axios.create({baseURL: 'http://localhost:4041'});
window.axios = axios;
const utils = Utils
window.utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
