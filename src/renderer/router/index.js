import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/library',
    name: 'library',
    component: require('@/pages/Library').default
  },
  {
    path: '/',
    redirect: '/library'
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
