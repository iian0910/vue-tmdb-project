import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/home.vue')
    },
    {
      path: '/popularMovieList',
      name: 'PopularMovie',
      component: () => import('@/pages/popularMovie.vue')
    }
  ],
})

export default router
