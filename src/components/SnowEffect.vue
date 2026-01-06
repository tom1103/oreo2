<template>
    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
</template>

<script setup>
import { ref } from 'vue'

const particlesLoaded = (container) => {
    console.log('Particles container loaded', container)
}

const options = ref({
    background: {
        color: {
            value: 'transparent',
        },
    },
    fpsLimit: 60,
    particles: {
        color: {
            value: '#ffffff',
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: false,
        },
        move: {
            direction: 'bottom',
            enable: true,
            outModes: {
                default: 'out',
            },
            random: false,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,
})
</script>

<style scoped>
#tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1031;
    pointer-events: none;
}
</style>
