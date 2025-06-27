import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import Dashboard from "@/pages/DashboardPage.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      // 👇 여기에 추가적인 페이지들
      // {
      //   path: 'settings',
      //   component: () => import('@/pages/Settings.vue')
      // }
    ],
  },
  // 나중에 메인 페이지 등 추가
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
