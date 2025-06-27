import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import Dashboard from '@/pages/DashboardPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
  // 나중에 메인 페이지 등 추가
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router