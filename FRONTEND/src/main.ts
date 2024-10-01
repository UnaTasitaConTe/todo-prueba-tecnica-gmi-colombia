import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

Vue.use(PiniaVuePlugin)
const pinia = createPinia();

new Vue({
  pinia: createPinia(),
  router,
  render: (h) => h(App)
}).$mount('#app')
