import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: "Register",
      component: () => import('./views/Register.vue')
    },
    {
      path: "/student",
      component: () => import('./views/Student.vue'),
      children: [
        {
          path: 'dashboard',
          name: "StudentDashboard",
          component: () => import('./components/Student/Dashboard.vue')
        },
        {
          path: 'team',
          component: () => import('./components/Student/Team.vue')
        },
        {
          path: 'evaluation',
          component: () => import('./components/Student/Exam.vue')
        },
        {
          path: 'feedback',
          component: () => import('./components/Student/Feedback.vue')
        },
        {
          path: 'settings',
          component: () => import('./components/Student/Settings.vue')
        }
      ]
    },
    {
      path: '/mentor',
      component: () => import('./views/Mentor.vue'),
      children: [
        {
          path: 'dashboard',
          name: "MentorDashboard",
          component: () => import('./components/Mentor/Dashboard.vue')
        },
        {
          path: 'team',
          name: "Team",
          component: () => import('./components/Mentor/Team.vue')
        },
        {
          path: 'meetings',
          component: () => import('./components/Mentor/Meetings.vue')
        },
        {
          path: 'sprints',
          name: "SprintSettings",
          component: () => import('./components/Mentor/SprintSettings.vue')
        },
        {
          path: 'evaluation',
          name: "Exam",
          component: () => import('./components/Mentor/Exam.vue')
        },
        {
          path: 'question/:id?',
          name: 'Question',
          component: () => import('./components/Mentor/Question.vue')
        },
        {
          path: 'feedback',
          component: () => import('./components/Mentor/Feedback.vue')
        },
        {
          path: 'test',
          component: () => import('./components/Mentor/Test.vue')
        },
        {
          path: 'settings',
          component: () => import('./components/Mentor/Settings.vue')
        },
        {
          path: 'results',
          component: () => import('./components/Mentor/Results.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: "Admin",
      component: () => import('./views/Admin.vue')
    }
  ]
})
