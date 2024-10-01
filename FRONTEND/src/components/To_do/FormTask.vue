<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2">
                <div class="mb-2">
                    <label class="label">Fecha Creación *</label>
                    <input type="date" v-model="formulario.created_at" class="input w-full input-bordered"
                        :disabled="true">
                    <p v-if="errors.created_at.error"> {{ errors.created_at.messages }}</p>
                </div>
                <div class="mb-2">
                    <label class="label">Fecha Fin </label>
                    <input type="date" v-model="formulario.date_expired" class="input w-full input-bordered">
                    <p v-if="errors.date_expired.error" class="text-error mx-2"> {{ errors.date_expired.messages
                        }}
                    </p>
                </div>

            </div>
            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 mb-2">
                <div class="">
                    <label class="label">Titulo *</label>
                    <input type="text" v-model="formulario.title" placeholder="Titulo Tarea"
                        class="input w-full input-bordered">
                    <p v-if="errors.title.error" class="text-error mx-2"> {{ errors.title.messages }}</p>

                </div>
                <div class="">
                    <label class="label">Observación *</label>
                    <textarea v-model="formulario.descripcion" class="textarea textarea-bordered w-full"
                        placeholder="Descripcion de la tarea"></textarea>
                    <p v-if="errors.descripcion.error" class="text-error mx-2"> {{ errors.descripcion.messages }}</p>

                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2">
                <div>
                    <label class="label">Tags *</label>
                    <p v-if="errors.tags.error" class="text-error mx-2"> {{ errors.tags.messages }}</p>

                    <div class="join w-full">
                        <input class="input input-bordered join-item w-full" v-model="tag" placeholder="Tag" />
                        <button class="btn join-item rounded-r-full" type="button" @click="addTask">Agregar</button>
                    </div>
                    <div class="badge badge-neutral mt-2" v-if="formulario.tags.length == 0">Ejemplo</div>
                    <div class="badge badge-neutral mt-2 me-2" v-for="(tag, index) in formulario.tags" :key="tag">{{ tag
                        }}
                        <button class="mx-1 rounded-full text-error" @click="deleteTask(index)" type="button">X</button>
                    </div>
                </div>

                <div class="">
                    <label class="label">
                        <span class="block text-md">Fotos Observación *</span>
                    </label>
                    <p v-if="errors.image.error" class="text-error mx-2"> {{ errors.image.messages }}</p>

                    <ImageUploader @files-selected="handleFilesSelected" />
                </div>
            </div>

            <div class="mt-10 flex items-center justify-end gap-x-6 mx-1">
                <RouterLink to="/" class="btn btn-neutral mx-2">x Cancelar</RouterLink>
                <button class="btn btn-success">{{ isEditing ? 'Guardar Cambios' : '+ Crear'
                    }}</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import ImageUploader from '@/components/Images/ImageUploader.vue';
import Swal from 'sweetalert2';
import { TaskDTO } from '@/domain/DTOs/Task/TaskDTO';
import { ref, computed } from 'vue';
import type { Ref, PropType } from 'vue';
import * as yup from 'yup';

const props = defineProps<{
    taskToEdit?: TaskDTO | null;
}>();

const emits = defineEmits<{
    (event: 'create', payload: TaskDTO): void
    (event: 'update', payload: TaskDTO): void
}>();

const tag: Ref<string> = ref('');
const tasks: Ref<string[]> = ref([]);

const formulario = ref(props.taskToEdit ? { ...props.taskToEdit } : new TaskDTO(null));
const isEditing = computed(() => !!props.taskToEdit);

const taskSchema = yup.object().shape({
    created_at: yup
        .string()
        .nullable() // Permite que sea `null` o un string
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Debe ser una fecha en formato YYYY-MM-DD') // Opcional: validación de formato
        .required('La fecha de creación es obligatoria'),
    descripcion: yup
        .string()
        .required('La descripción es obligatoria')
        .min(10, 'La descripción debe tener al menos 10 caracteres'),
    date_expired: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Debe ser una fecha en formato YYYY-MM-DD')
        .test(
            'is-greater',
            'La fecha de expiración no puede ser anterior a la fecha de creación',
            function (value) {
                const { created_at } = this.parent; // Accede a `created_at`
                if (created_at && value) {
                    const createdAtDate = new Date(created_at);
                    const expirationDate = new Date(value);
                    return expirationDate >= createdAtDate; // Valida que `date_expired` sea mayor o igual a `created_at`
                }
                return true; // Si alguna de las fechas es `null` o inválida, pasa la validación (esto ya lo validan otras reglas)
            }
        ),
    image: yup
        .mixed()
        .test('fileType', 'El archivo debe ser una imagen', (value) =>
            value === null || typeof value === 'string' || (value && value instanceof File)
        ) // Permite que sea una cadena o un archivo `File`
        .required('La imagen es obligatoria'),
    tags: yup
        .array()
        .of(yup.string().required('Cada etiqueta debe ser un string'))
        .required('Las etiquetas son obligatorias')
        .min(1, 'Debe haber al menos una etiqueta'),
    title: yup
        .string()
        .required('El título es obligatorio')
        .max(100, 'El título no debe tener más de 100 caracteres'),
    // user: yup
    //     .string()
    //     .required('El usuario es obligatorio')
    //     .email('Debe ser un email válido') // Si se espera un email en la propiedad `user`
});

const errors = ref({
    created_at: {
        error: false,
        messages: ''
    },
    descripcion: {
        error: false,
        messages: ''
    },
    date_expired: {
        error: false,
        messages: ''
    },
    image: {
        error: false,
        messages: ''
    },
    tags: {
        error: false,
        messages: ''
    },
    title: {
        error: false,
        messages: ''
    },
    // user: {
    //     error: false,
    //     messages: ''
    // }
});


const addTask = () => {
    if (!formulario.value.tags.includes(tag.value) && tag.value != '') {
        formulario.value.tags.push(tag.value);
        // console.log(formulario.value.tags);
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Rellene el Campo De Tag',
            text: 'Para agregar un Tag no debe ser repetido o estar el campo en blanco',
        });
    }
};

const deleteTask = (index: number) => {
    formulario.value.tags.splice(index, 1);
}

const handleFilesSelected = (files: File[]) => {
    formulario.value.image = files[0];
};

const handleSubmit = async () => {

    try {
        await taskSchema.validate(formulario.value, { abortEarly: false });
        // Si pasa la validación, resetea los errores
        for (const key in errors.value) {
            errors.value[key as keyof typeof errors.value] = { error: false, messages: '' };
        }

        const taskDTO = new TaskDTO(formulario.value);

        if (isEditing.value) {
            emits('update', taskDTO);
            return
        } else {
            emits('create', taskDTO);
            return
        }

    } catch (validationError) {

        if (validationError instanceof yup.ValidationError) {
            // Resetea los errores
            for (const key in errors.value) {
                errors.value[key as keyof typeof errors.value] = { error: false, messages: '' };
            }

            // Llena los errores con la información obtenida de `validationError`
            validationError.inner.forEach((err) => {
                if (err.path && errors.value[err.path as keyof typeof errors.value]) {
                    // validacion.
                    errors.value[err.path as keyof typeof errors.value] = {
                        error: true,
                        messages: err.message
                    };
                }
            });
        }
    }

};
</script>
