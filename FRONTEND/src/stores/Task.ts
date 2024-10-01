import { TaskDTO } from '@/domain/DTOs/Task/TaskDTO';
import type { Task } from '@/domain/Models/ToDo/Task';
import { defineStore } from 'pinia'

export const useTaskStore = defineStore({
    id: 'task',
    state: (): Task => ({
        created_at: '',
        descripcion: '',
        date_expired: '',
        image: '',
        tags: [],
        title: '',
        user: ''
    }),
    getters: {
        // doubleCount: (state) => state.counter * 2
        // getDatos: (state) => state
        
    },
    actions: {
        setDatos(task: Task) {
            this.created_at = task.created_at;
            this.date_expired = task.date_expired;
            this.descripcion = task.descripcion;
            this.image = task.image;
            this.tags = task.tags;
            this.title = task.title;
            this.user = task.user;
        }

    }
})
