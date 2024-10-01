<script setup lang="ts">
import Navbar from '@/components/Layouts/Navbar.vue';
import Task from '@/components/To_do/Task.vue';
import { useTaskStore } from '@/stores/Task';
import router from '@/router';
import { RouterLink } from 'vue-router';
import type { TaskDTO } from '@/domain/DTOs/Task/TaskDTO';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { onMounted } from 'vue';
import Loader from '@/components/Loading/Loader.vue';
import Spinner from '@/components/Loading/Spinner.vue';
import { TaskRepository } from '@/infrastructure/Core/Repositories/Task/TaskRepository';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@/domain/Client/Services/Authentication/AuthenticationService';
// import Loader

const editar = (id: number | undefined) => {
  const taskStore = useTaskStore();
  const taskDTO = tasks.value.find(e => e.id == id);
  if (!taskDTO) {
    return;
  }
  taskStore.setDatos(taskDTO);
  localStorage.setItem('update-task', JSON.stringify(taskDTO));
  return router.push('/tarea/editar');
}

const deleteTask = async (id: number | undefined) => {
  const taskDTO = tasks.value.find(e => e.id == id);
  const taskRepository = new TaskRepository();
  const confirm = await Swal.fire({
    icon: 'warning',
    title: 'Eliminar Tarea',
    text: '¿Seguro que desear eliminar esta tarea?',
    showConfirmButton: true,
    showCancelButton: true
  }).then((value) => {
    return value.isConfirmed
  });

  if (taskDTO?.id && confirm) {
    activeSpinner.value = true;
    await taskRepository.Delete(taskDTO?.id);
    const respose = await taskRepository.getByUser();
    tasks.value = respose.data;
    loading.value = false;
    activeSpinner.value = false;
  }
}

// const finallyTask = (id: number) => {
//   console.log('culminar', id);
// }

const logoutUser = async (dato: boolean) => {
  activeSpinner.value = true;

  const response = await AuthenticationService.logout();
  activeSpinner.value = false;

  return router.push('login');
}


const tasks: Ref<TaskDTO[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const activeSpinner: Ref<boolean> = ref(false);

onMounted(async () => {
  loading.value = true;
  const taskRepository = new TaskRepository();
  const respose = await taskRepository.getByUser();
  tasks.value = respose.data;
  loading.value = false;
});

</script>

<template>
  <main class="min-h-screen bg-base-200">
    <Spinner v-if="activeSpinner"></Spinner>

    <Navbar @logout="logoutUser"></Navbar>
    <div class="breadcrumbs mx-5 mt-20 text-lg">
      <ul>
        <li>
          <RouterLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-house"
              viewBox="0 0 16 16">
              <path
                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            Inicio
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="flex justify-end mb-2">
      <RouterLink class="btn btn-neutral me-2" to="/tarea/crear"><i class="bi bi-plus-circle "></i>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
        </svg>
        Crear Tarea
      </RouterLink>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2 p-5">
      <p v-if="!loading && tasks.length === 0">No se han encontraron tareas</p>

      <div v-if="loading" class="col-span-full flex flex-col items-center justify-center h-64">
        <p class="mb-4">Cargando...</p>
        <Loader></Loader>
      </div>
      <Task v-for="(task, index) in tasks"  @update="editar" @delete="deleteTask"
        :key="index" :id="task.id" :created_at="task.created_at ?? ''" :descripcion="task.descripcion"
        :date_expired="task.date_expired" :image="typeof task.image == 'string' ? task.image : '/defaultImage.jpg'" :tags="task.tags" :user="task.user" :title="task.title"
        :tiempoRestante="task.tiempoRestante" :tareaFinalizada="task.finally"></Task>
    </div>
  </main>
</template>
