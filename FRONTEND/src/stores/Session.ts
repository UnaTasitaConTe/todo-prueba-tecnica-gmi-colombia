import type { Authentication } from '@/domain/Models/Api/Authentication/Authentication';
import type { User } from '@/domain/Models/User/User'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore({
  id: 'session',
  state: (): Authentication => ({
    access_token: '',
    type: '',
    expires_in: ''
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    setDatos(session: Authentication) {
      this.access_token = session.access_token ?? '';
      this.type = session.type ?? '';
      this.expires_in = session.expires_in ?? '';
    },
    isTokenExpired(): boolean {
      if (!this.expires_in) {
        localStorage.removeItem('session-active');
        return true
      }; // Si no hay fecha de expiración, consideramos que ha expirado

      const expirationDate = new Date(this.expires_in);
      const currentDate = new Date();
      return currentDate >= expirationDate;
    }
  }
})
