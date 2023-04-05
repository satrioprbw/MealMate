import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import RegisterView from '../views/RegisterView.vue'
import BookmarkView from '../views/BookmarkView.vue'
import MealplanView from '../views/MealplanView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView

    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookmarkView
    },
    {
      path: '/mealplan',
      name: 'mealplan',
      component: MealplanView
    }
  ]
})

router.beforeEach((to) => {
  
})

export default router
