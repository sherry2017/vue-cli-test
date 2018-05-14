import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainBorad from '@/components/MainBorad'
import Home from '@/components/Home'
import Plan from '@/components/Plan'
import Total from '@/components/Total'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'loginLink',
      component: Login
    },
    {
      path: '/main-borad',
      redirect:'/home',
      component: MainBorad,
      children:[{
        path: '/home',
        name: 'homeLink',
        component: Home
      },
        {
          path: '/plan',
          name: 'planLink',
          component: Plan
        },
        {
          path: '/total',
          name: 'totalLink',
          component: Total
        }]
    },{
      path: '*',
      redirect: '/login'
    }
  ]
})
