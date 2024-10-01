import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/Home/HomeView.vue';
import Auth from '@/views/Auth/AuthView.vue';
import NotFoundView from '@/views/NotFound/NotFoundView.vue';
import TaskCrateView from '@/views/Task/Create/TaskCreateView.vue';
import TaskEditView from '@/views/Task/Edit/TaskEditView.vue';
import { useSessionStore } from '@/stores/Session';
import { PiniaVuePlugin } from 'pinia';
import type { Authentication } from '@/domain/Models/Api/Authentication/Authentication';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Ruta protegida
    },
    {
      path: '/tarea/crear',
      name: 'crear-tarea',
      component: TaskCrateView,
      meta: { requiresAuth: true }, // Ruta protegida
    },
    {
      path: '/tarea/editar',
      name: 'editar-tarea',
      component: TaskEditView,
      meta: { requiresAuth: true }, // Ruta protegida
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
    },
    {
      path: '*', // Catch-all route
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

// Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('session-active'); // Cambia esto según tu lógica de autenticación
  // const authStore = useSessionStore();


  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado
    console.log("aquiidd");
    if (sessionExpired() === true) {
      console.log("aqui");

      localStorage.removeItem('session-active');
      localStorage.removeItem('session-store');
      localStorage.removeItem('user');
      next({ name: 'home' });

    } else {

      next({ name: 'login' }); // Redirigir a la página de login
    }

  } else if (to.name === 'login' && isAuthenticated) {
    // Si el usuario está autenticado e intenta acceder al login, redirigir al home
    next({ name: 'home' });
  } else {
    next(); // Continuar a la ruta deseada
  }
});

function sessionExpired() {
  let session = localStorage.getItem('session-store')
  if (session) {
    console.log("aqui");

    const sessionStore = JSON.parse(session) as Authentication;
    if (!sessionStore.expires_in) {
      console.log("aqui");

      // localStorage.removeItem('session-active');
      return true
    }; // Si no hay fecha de expiración, consideramos que ha expirado

    const expirationDate = new Date(sessionStore.expires_in);
    const currentDate = new Date();
    return currentDate >= expirationDate;
  }

}

export default router;
