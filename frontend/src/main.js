import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false

const mentor = Axios.create({baseURL: 'http://localhost:8080'});
window.Mentor = mentor;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
