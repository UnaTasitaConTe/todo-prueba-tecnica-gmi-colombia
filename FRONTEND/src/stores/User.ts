import type { User } from '@/domain/Models/User/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: (): User => ({
        email: '',
        name: '',
        userId: ''
    }),
    getters: {
        // doubleCount: (state) => state.counter * 2
    },
    actions: {
        setDatos(user: User) {
            this.email = user.email ?? '';
            this.name = user.name ?? '';
            this.userId = user.userId ?? '';
        },
    }
})
