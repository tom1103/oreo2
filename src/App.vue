<script setup>
import { ref, onMounted } from 'vue'
import Oreo from './components/OreoView.vue'
import SnowEffect from './components/SnowEffect.vue'
import { isWinter } from '@/utils/winter.js'

const showSnow = ref(false)

onMounted(() => {
    if (isWinter(new Date())) {
        showSnow.value = true
    }
})
</script>

<template>
    <SnowEffect v-if="showSnow" />
    <Oreo />
</template>
