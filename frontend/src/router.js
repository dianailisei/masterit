import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mentor',
      component: () => import('./views/Mentor.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('./components/Mentor/Dashboard.vue')
        },
        {
          path: 'team',
          component: () => import('./components/Mentor/Team.vue')
        }
      ]
    }
  ]
})
