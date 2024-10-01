<template>
    <!-- <div class=""> -->
    <div>
        <input class="file-input file-input-bordered w-full mb-2" type="file" multiple @change="handleFileChange" />
        <p>Has seleccionado <strong>{{ previewImages.length }}</strong> fotos</p>
        <div v-if="previewImages.length"
            class="grid grid:cols-1 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-4 lg:gap-6 border-dashed border-2 border-indigo-600 rounded-lg p-2 animate__animated animate__fadeIn">
            <div v-for="(image, index) in previewImages" :key="index"
                class="card bg-base-100 w-50 rounded shadow-lg border animate__animated animate__fadeIn">
                <figure>
                    <img @click="openModal(image)" :src="image" alt="Preview Image"
                        class="object-cover h-40 w-full cursor-pointer" />
                </figure>

                <div class="absolute top-0 right-0 cursor-pointer">
                    <button type="button" class="btn btn-neutral rounded-full me-2 mt-2" @click="removeImage(index)">
                        <!-- <i class="bi bi-trash"></i> -->
                         X
                    </button>
                </div>
            </div>
        </div>
        
    </div>
    <!-- </div> -->
</template>

<script setup lang="ts">
// import { ref, onMounted, onBeforeUnmount } from 'vue';

// import 'animate.css';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
// const emit = defineEmits(['files-selected']);
// const emit = defineEmits(['files-selected']);
const emit = defineEmits<{
    (event: 'files-selected', payload: File[]): void
}>();

const selectedFiles = ref<File[]>([]);
const previewImages = ref<string[]>([]);
const currentImage = ref<string | null>(null);

const handleFileChange = (event: Event) => {

    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files) {
        return;
    }

    
    Array.from(files).forEach(file => {
        selectedFiles.value.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImages.value.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    });

    target.value = '';  // Esto limpia el input para permitir seleccionar los mismos

    emit("files-selected", selectedFiles.value)

}
const removeImage = (index: number) => {
    selectedFiles.value.splice(index, 1);
    previewImages.value.splice(index, 1);
    emit("files-selected", selectedFiles.value)
}

const openModal = (image: string) => {
    currentImage.value = image;
    (document.getElementById('image-modal') as HTMLInputElement).checked = true;
}
const closeModal = () => {
    (document.getElementById('image-modal') as HTMLInputElement).checked = false;
}
const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeModal();
    }
}
onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
});
onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscapeKey);
});
</script>