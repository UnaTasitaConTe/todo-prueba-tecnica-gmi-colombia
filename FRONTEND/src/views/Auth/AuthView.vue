<template>
    <div class="hero bg-base-200 min-h-screen">
        <Spinner v-if="spinnerActive"></Spinner>
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">SISTEMA TO DO!</h1>
                <p class="py-6">
                    Organiza tus tareas de manera eficiente y mantén el control de tus actividades diarias.
                    Podrás crear, administrar y
                    priorizar tus pendientes para maximizar tu productividad y lograr todos tus objetivos de manera
                    sencilla y efectiva.
                </p>
            </div>
            <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <FormularioLogin @callback="login"></FormularioLogin>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FormularioLogin from '@/components/Authentication/FormularioLogin.vue';
import Spinner from '@/components/Loading/Spinner.vue';
import { AuthenticationService } from '@/domain/Client/Services/Authentication/AuthenticationService';
import type { LoginDTO } from '@/domain/DTOs/Authentication/LoginDTO';
import router from '@/router';
import Swal from 'sweetalert2';
import type { Ref } from 'vue';
import { ref } from 'vue';
const spinnerActive: Ref<boolean> = ref(false);
const login = async (LoginDTO: LoginDTO) => {
    // console.log(LoginDTO);
    spinnerActive.value = true;
    const response = await AuthenticationService.login(LoginDTO);
    // console.log(response);
    
    if (response) {
        return router.push('/');
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Crendenciales Incorrectas',
            text: 'Vuelva a diligenciar sus contraseña o Correo'
        })
    }
    spinnerActive.value = false;
}


</script>