import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Register.vue')
    },
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
        },
        {
          path: 'meetings',
          component: () => import('./components/Mentor/Meetings.vue')
        },
        {
          path: 'sprints',
          component: () => import('./components/Mentor/SprintSettings.vue')
        },
        {
          path: 'exam',
          component: () => import('./components/Mentor/Exam.vue')
        },
        {
          path: 'question',
          component: () => import('./components/Mentor/Question.vue')
        },
        {
          path: 'feedback',
          component: () => import('./components/Mentor/Feedback.vue')
        },
        {
          path: 'test',
          component: () => import('./components/Mentor/Test.vue')
        }
      ]
    }
  ]
})
