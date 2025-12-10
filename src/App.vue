<script setup>
import { ref, onMounted } from 'vue'
import Oreo from './components/OreoView.vue'
import SnowEffect from './components/SnowEffect.vue'

const showSnow = ref(false)

onMounted(() => {
    const today = new Date()
    const month = today.getMonth() + 1 // getMonth() is zero-based
    const day = today.getDate()

    // Christmas period: from December 15 to February 15
    const isWinter = (month === 12 && day >= 15) || month === 1 || (month === 2 && day <= 15)

    if (isWinter) {
        showSnow.value = true
    }
})
</script>

<template>
    <SnowEffect v-if="showSnow" />
    <Oreo />
</template>
