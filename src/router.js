import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },{
        path:'/index',
        name:'index',
        title:'编辑器',
        component: ()=> import('./views/index/index.vue')
    }
  ]
})