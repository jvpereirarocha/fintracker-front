import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/components/NotFound.vue'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
})

export default router
