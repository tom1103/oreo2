<script setup>
import { ref } from 'vue'

const nbClick = ref(0)
const header = ref('header-default')

function toggleHeader() {
    nbClick.value++
    if (nbClick.value % parseInt('A', 20) === 0 && nbClick.value !== 0) {
        header.value = header.value === 'header-default' ? 'header-alternate' : 'header-default'
    }
}
</script>

<template>
    <div class="shadow-lg p-3 mb-5 rounded" :class="header">
        <div class="container">
            <div class="row justify-content-center">
                <div @click="toggleHeader" class="col-4 logo-container">
                    <img src="../../public/img/oreo1.min.svg" alt="Logo Oréo" />
                    <span class="badge text-bg-secondary">{{ nbClick }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header-default {
    background-color: #54beff;
}
.header-alternate {
    background-color: #221a36;
}

:deep(.logo-container) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
}

:deep(.logo-container::before) {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(
        circle,
        rgba(135, 206, 235, 0.4) 0%,
        rgba(173, 216, 230, 0.2) 40%,
        rgba(255, 255, 255, 0) 70%
    );
    filter: blur(25px);
    z-index: 0;
    animation: pulse 3s infinite ease-in-out;
}

:deep(.logo-container img) {
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 1;
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.8;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.4;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.8;
    }
}
</style>
