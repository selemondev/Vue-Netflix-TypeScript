import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import { useAuthStore } from '@/stores/authStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        auth: false
      }
    }
  ]
});

const currentUser = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const token = authStore.userData;
    resolve(token);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/login")
    }
  } else {
    next();
  }
})

export default router
