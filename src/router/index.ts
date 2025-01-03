import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageView from '../views/PageView.vue'
import { navigationConfig } from '@/config/navigation'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...navigationConfig.map(({ path, name }) => ({
      path,
      name,
      component: PageView,
    })),
  ],
})

export default router
