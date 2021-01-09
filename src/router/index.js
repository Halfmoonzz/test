import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirct: '/login',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
     path: "/login",
     name:'login' ,
      component: ()=> import('@/bone/page/login/Index')
    }
  ]
})
