// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios  from 'axios'
import {Message} from 'element-ui'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/base.css'
import {store} from './store/store'  //若不是export default  则import时需加{}

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.use(ELEMENT)

/*全局导航守卫*/

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && !sessionStorage.getItem('roles')) {
    next('/login')

  } else {
    next();
  }
})


// 超时时间
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
   /* if (store.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`;
    }*/
    return config;
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const headers = response.headers
    // 请求超时拦截
    if (headers['session-status'] === 'timeout') {
      Message.error('登录超时')
      setTimeout(() => {
        store.commit('LOGOUT')
        router.replace({
          path: '/login'
        })
      }, 1000)

      return
    }

    return response.data
  },
  error => {
    if (error.response) {
      const status = error.response.status

      // 权限受限
      if (status === 401) {
        Message.error('权限受限')
        // 401 清除token信息并跳转到登录页面
        store.commit('LOGOUT')
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
      }

      if (status === 404) {
        Message.error('请求路径错误')
      }

      if (status === 500) {
        Message.error('系统内部错误')
      }
    }
    return Promise.reject(error.response)
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  components: {App},
  template: '<App/>'
})
