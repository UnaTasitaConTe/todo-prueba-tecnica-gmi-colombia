<template>
    <div class="progress"></div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.progress {
    width: 211.2px;
    height: 38.7px;
    border-radius: 35.2px;
    color: oklch(var(--bc));
    border: 3.5px solid oklch(var(--n));
    position: relative;
}

.progress::before {
    content: "";
    position: absolute;
    margin: 3.5px;
    inset: 0 100% 0 0;
    border-radius: inherit;
    background: currentColor;
    animation: progress-pf82op 2.4s infinite;
}

@keyframes progress-pf82op {
    100% {
        inset: 0;
    }
}
</style>