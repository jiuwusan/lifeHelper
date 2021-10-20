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
    path: '/cooking',
    name: 'cooking',
    component: () => import('@/views/Cooking'),
    meta: {
      title: "个人厨房"
    }
  },
  {
    path: '/cooking/basket',
    name: 'cookingBasket',
    component: () => import('@/views/Cooking/Basket'),
    meta: {
      title: "个人厨房"
    }
  },
  {
    path: '/stick',
    name: 'stick',
    component: () => import('@/views/Stick'),
    meta: {
      title: "日常记录"
    }
  },
  {
    path: '/stick/:userid',
    name: 'stickType',
    component: () => import('@/views/Stick/Type'),
    meta: {
      title: "日常记录"
    }
  },
  {
    path: '/stick/logs/:typeid',
    name: 'stickLogs',
    component: () => import('@/views/Stick/Logs'),
    meta: {
      title: "日常记录"
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
  {
    path: '/admin/cooking',
    name: 'AdminCooking',
    component: () => import('@/views/admin/Cooking'),
    meta: {
      title: "厨房"
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
