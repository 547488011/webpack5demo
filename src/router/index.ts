import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes :RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
    },
    {
        path: '/editor',
        name: 'editor',
        component:() => import('@/views/editor')
    }
]

const router = createRouter({
    routes,
    history:createWebHashHistory()
})


export default router

