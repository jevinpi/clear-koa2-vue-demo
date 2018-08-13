import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import loginView from '@/page/login/'
import listView from '@/page/list/'
import store from './../store/store'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/login',
      name: 'login',
      component: loginView
    }, {
      path: '/list',
      name: 'list',
      component: listView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.isLogin) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' +  store.state.token
  }
  if ( !store.state.isLogin && to.path != '/login' ) {
    // 重定向到首页
    next('login')
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  // next()
})
export default router;
