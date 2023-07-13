import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Menu from '../components/Menu.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: Menu,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'recipe',
        component: () => import('../views/RecipeListPage.vue'),
      },
      {
        path: 'familly',
        component: () => import('../views/FamillyPage.vue'),
      },
      {
        path: 'settings',
        component: () => import('../views/SettingsPage.vue'),
      },
      {
        path: 'credit',
        component: () => import('../views/CreditPage.vue'),
      },
    ],
  },
  {
    path: '/recipe/:id',
    component: () => import('../views/RecipePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
