import Vue from 'vue';
import Router from 'vue-router';
import Auth from './components/auth/Auth.vue';
import Main from './components/content/Main.vue';
import Option1 from './components/content/pages/Option1';
import Option2 from './components/content/pages/Option2';


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Auth, meta: { isPublic: true } },
    { 
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/option1', component: Option1 },
        { path: '/option2', component: Option2 }
      ]
    }
  ]
})
router.beforeEach((to, from ,next) => {
  // if (!to.meta.isPublic && !localStorage.token) {
  //   return next('/login')
  // }
  next()
})
export default router