<template>
    <main class="min-h-screen bg-base-200">
        <Spinner v-if="activeSpinner"></Spinner>

        <Navbar @logout="logoutUser"></Navbar>
        <div class="breadcrumbs mx-5 mt-20 text-lg">
            <ul>
                <li>
                    <RouterLink to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="me-2 bi bi-house" viewBox="0 0 16 16">
                            <path
                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg>
                        Inicio
                    </RouterLink>
                </li>
                <li>
                    Tarea
                </li>
                <li>
                    Crear
                </li>
            </ul>
        </div>

        <div class="container mx-auto mx-5">
            <div class="bg-base-100 p-1 rounded-lg">

                <FormTask @create="createTask"></FormTask>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import router from '@/router';
import Navbar from '@/components/Layouts/Navbar.vue';
import { RouterLink } from 'vue-router';
import FormTask from '@/components/To_do/FormTask.vue';
import type { TaskDTO } from '@/domain/DTOs/Task/TaskDTO';
import { TaskRepository } from '@/infrastructure/Core/Repositories/Task/TaskRepository';
import Spinner from '@/components/Loading/Spinner.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@/domain/Client/Services/Authentication/AuthenticationService';

const activeSpinner: Ref<boolean> = ref(false);

const createTask = async (taskDTO: TaskDTO) => {
    console.log("aqui");
    activeSpinner.value = true;
    const taskRepository = new TaskRepository();
    const reponse = await taskRepository.Create(taskDTO.toFormData());
    // console.log(reponse);
    activeSpinner.value = false;
    Swal.fire({
        icon: 'success',
        title: 'Tarea Creada Exitosamente',
        text: 'Se ha Creado tu tarea de forma exitosa',
    }).then((value) => {
        if (value.dismiss) {
            router.push('/')
        }
        if (value.isConfirmed) {
            router.push('/')
        }
    })
    // router.push('/')


}


const logoutUser = async (dato: boolean) => {
    activeSpinner.value = true;
    const response = await AuthenticationService.logout();


    activeSpinner.value = false;

    return router.push('login');
}

</script>