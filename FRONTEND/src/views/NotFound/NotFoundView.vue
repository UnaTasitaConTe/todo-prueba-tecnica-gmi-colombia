<template>
    <main class="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">404</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página no encontrada</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no pudimos encontrar la página que estás
                buscando.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <RouterLink to="/"
                    class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
                    Regresar al inicio
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>