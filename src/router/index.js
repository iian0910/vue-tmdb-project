import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login.vue'),
      meta: {
        hideFooter: true,
        hideHeader: true,
        requiresAuth: false,
        title: '登入'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/home.vue'),
      meta: {
        requiresAuth: true,
        title: '首頁'
      }
    },
    {
      path: '/topRateMovieList',
      name: 'TopRateMovie',
      component: () => import('@/pages/topRateMovie.vue'),
      meta: {
        requiresAuth: true,
        title: '發燒電影'
      }
    },
    {
      path: '/movie/:id',
      name: 'MovieDetailInfo',
      component: () => import('@/pages/movieDetailInfo.vue'),
      meta: {
        requiresAuth: true,
        title: '電影詳情'
      }
    }
  ],
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLogin || !!sessionStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: '/login'
    }
  }

  if (to.path === '/login' && isLoggedIn) {
    return '/'
  }

  return true
})

router.afterEach((to) => {
  const baseTitle = 'TMDB 電影館'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
})

export default router
