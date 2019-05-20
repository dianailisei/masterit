import Vue from 'vue'
import Vuetify, { VLayout, VSelect } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    navbarColor: '#42b883',
    cardColor: '#35495e'
  },
  components: {
    VLayout, VSelect
  }
})
