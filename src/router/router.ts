import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    meta: {
      title: 'Главная',
      requiresAuth: false
    }
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/Calculator.vue'),
    meta: {
      title: 'Калькулятор',
      requiresAuth: false
    }
  },
  {
    path: '/guessNumber',
    name: 'GuessNumber',
    component: () => import('../views/GuessNumber.vue'),
    meta: {
      title: 'Угадай число',
      requiresAuth: false
    }
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  next()
})


export default router
