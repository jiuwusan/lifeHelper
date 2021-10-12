import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: "首页"
    }
  },
  {
    path: '/',
    name: 'cooking',
    component: () => import('@/views/Cooking'),
    meta: {
      title: "个人厨房"
    }
  },
  //下面是 admin 页面
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('@/views/admin/Home'),
    meta: {
      title: "管理-首页"
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
