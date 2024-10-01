<template>
    <form class="card-body" @submit.prevent="onSubmit">
        <div class="form-control">
            <label class="label">
                <span class="label-text">Correo Electrónico *</span>
            </label>
            <input type="text" v-model="formulario.email" placeholder="tucorreoelectronico@gmail.com"
                class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Contraseña *</span>
            </label>
            <input type="password" v-model="formulario.password" placeholder="***********"
                class="input input-bordered" />
        </div>
        <div class="form-control mt-6">
            <button class="btn btn-primary">Iniciar Sesión</button>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LoginDTO } from '@/domain/DTOs/Authentication/LoginDTO';
import Swal from 'sweetalert2';
import * as yup from 'yup';

// Instancia reactiva de LoginDTO
const formulario = ref(new LoginDTO(null));

// Esquema de validación de yup
const loginSchema = yup.object().shape({
    email: yup.string().email('Debe ser un email válido').required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
});

// Definición de emisiones
const emit = defineEmits<{
    (event: 'callback', payload: LoginDTO): void;
}>();

// Método para manejar el envío del formulario
const onSubmit = async () => {
    try {
        // Intentar validar el formulario
        const validData = await loginSchema.validate(formulario.value, { abortEarly: false }) as LoginDTO;

        // Si la validación es exitosa, emitir el evento 'callback'
        emit('callback', validData);
    } catch (e) {
        if (e instanceof yup.ValidationError) {
            // Mostrar mensajes de error en una alerta
            Swal.fire({
                icon: 'info',
                title: 'Datos Erróneos',
                text: e.errors.join(', '),
                showCancelButton: false,
            });
        }
    }
}
</script>
