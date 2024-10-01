<template>
    <div class="card bg-base-100 w-50 shadow-lg m-0 p-0">
        <div class="absolute top-0 right-0 cursor-pointer">
            <details class="dropdown dropdown-end ">
                <summary class="btn btn-neutral me-2 rounded-full mt-1">
                    <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 512 512">
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
                </summary>
                <ul class="menu dropdown-content bg-base-200  rounded-box me-2 z-[1] w-52 p-2 shadow">
                    <li>
                        <a @click="pushEdit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            Editar</a>
                    </li>
                    <li>
                        <label :for="idModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg>
                            Detalles</label>
                    </li>
                    <!-- <li>
                        <a @click="pushFinally">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                    d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                            </svg>
                            Culminar</a>
                    </li> -->
                    <li>
                        <a @click="pushDelete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-archive" viewBox="0 0 16 16">
                                <path
                                    d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                            </svg>
                            Eliminar</a>
                    </li>
                </ul>
            </details>
        </div>
        <picture>
            <img class="" :src="typeof image == 'string' ? image : '/defaultImage.jpg'"
                @error="handleImageError" style="height: 200px; width: 100%;"/>
            <!-- <img v-if="image" :src="currentImage || defaultImage" ref="imagen"
                    style="width: 300px; height: 200px; object-fit: cover" @click="openModal(true)"
                    @error="imageLoadError"> -->
            <!-- thumbnails en filas -->
        </picture>
        <div class="card-body ">
            <!-- <div class="divider"></div> -->
            <p class="card-title">{{ title }}</p>
            <div>
                <span v-for="tag in tags"
                    class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {{ tag }}
                </span>
                {{ tiempoRestante }}
            </div>
        </div>
        <div class="card-actions p-2">

        </div>


        <input type="checkbox" :id="idModal" class="modal-toggle" />
        <div class="modal" role="dialog">
            <div class="modal-box w-11/12 max-w-5xl mx-auto">
                <h3 class="text-lg font-bold">{{ title }}</h3>
                <span class="bg-blue-100 text-blue-800 
                text-xs font-medium me-2 px-2.5 py-0.5 
                rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {{ tareaFinalizada ? 'Finalizada' : 'No Finalizada' }}
                </span>
                <p class="py-4">Fechas Creacion <b> {{ created_at }}</b></p>
                <p class="py-4">Fechas Finalizacion <b>{{ date_expired ?? 'Sin fecha de Culminación' }}</b></p>
                <p class="py-4">{{ descripcion }}</p>
                <p class="py-4"> Tiempo Restante: <b> {{ tiempoRestante }}</b></p>
                <img v-if="typeof image == 'string'" :src="image" :alt="title" @error="handleImageError" height="200"
                    width="auto">

                <div class="modal-action">
                    <label :for="idModal" class="btn">Cerrar!</label>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { v4 as uuid } from 'uuid';

const idModal = ref(uuid());

const emit = defineEmits<{
    (event: 'update', payload: number|undefined): void;
    (event: 'delete', payload: number|undefined): void;
    // (event: 'detail', payload: number): void;
    // (event: 'finnally', payload: number): void;
}>();

const isModalOpen = ref(false);
const imagen: Ref<HTMLImageElement | null> = ref(null);


const props = defineProps<{
    // Título de la tarea
    id?: number;

    title: string;
    // Descripción detallada de la tarea
    descripcion: string;
    // Fecha de creación de la tarea, puede ser nula si aún no se ha establecido
    created_at: string;
    // Usuario asociado a la tarea (puede ser el creador o el asignado)
    user: string;
    // Etiquetas asociadas para categorizar la tarea
    tags: string[];
    // Imagen relacionada con la tarea, se almacena como un archivo
    image: string;
    // Fecha de vencimiento de la tarea
    date_expired?: string;

    tiempoRestante: string;
    tareaFinalizada: boolean;
}>();


// function imageLoadError(event: Event) {
//     if (imagen.value) imagen.value.src = defaultImage;
// }
// function setCurrentImage(imageUrl: string) {
//     currentImage.value = imageUrl;
// }

// Actualizar la imagen principal cuando se reciben nuevas props

const pushEdit = () => emit("update", props.id);
const pushDelete = () => emit("delete", props.id);
// const pushDetail = () => emit("detail", props.id);
// const pushFinally = () => emit("finnally", props.id);

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;

    if (target) {
        target.src = '/defaultImage.jpg'; // Establecer la imagen por defecto al ocurrir un error
    }
}

</script>

<style scoped>
/* Estilo para las miniaturas (thumbnails) */
.thumbnails-container {
    display: flex;
    justify-content: flex-start;
}

.thumbnail-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.2s ease-in-out;
}

.thumbnail-image:hover {
    transform: scale(1.1);
}

.preview {
    object-fit: cover;
    border-radius: 2ch;
    width: 100%;
}
</style>