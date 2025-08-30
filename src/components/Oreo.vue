<script setup>
import { computed, ref, watchEffect } from 'vue'
import Logo from './Logo.vue'
import Footer from './Footer.vue'

// Constants
const API_URL = 'https://8rkbcyrzde.execute-api.eu-west-1.amazonaws.com/api/'
const MAX_HISTORY = 5

// Reactive references
const entry = ref('')
const pn = ref('')
const data = ref({ payload: '' })
const seen = ref(false)
const items = ref([])
const copier = ref('Copier')
const updateClass = computed(() => ({
    'spinner-border' : data.value.payload === 'Je pense ...',
}))

// Add to history function
function addToHistory(entry) {
  if (!items.value.includes(entry)) {
    items.value = [entry, ...items.value.slice(0, MAX_HISTORY - 1)]
  }
}

// Improved clipboard function
function updateClipboard(newClip) {
  if (!newClip) return
  
  navigator.clipboard.writeText(newClip)
    .then(() => {
      copier.value = 'Copié !'
      setTimeout(() => { copier.value = 'Copier' }, 2000)
    })
    .catch(() => {
      copier.value = 'Erreur !'
    })
}

// Optimized watchEffect
watchEffect(async () => {
  if (!entry.value) {
    data.value = { payload: '' }
    return
  }

  if (entry.value.length < 8) {
    data.value = { payload: 'Il manque des caractères ...' }
    return
  }

  entry.value = entry.value.toUpperCase()
  
  try {
    const url = `${API_URL}${entry.value}`
    data.value = { payload: 'Je pense ...' }
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    const result = await response.json()
    data.value = result
    
    if (result.payload) {
      addToHistory(entry.value)
    }
  } catch (error) {
    console.error('Error:', error)
    data.value = { payload: 'Une erreur est survenue' }
  }
})
</script>

<template>
  <Logo></Logo>

  <div class="container">
    <div class="data">
      <label for="entry" class="form-label">Entrez le LN ou PN</label>
      <input 
        class="form-control form-control-lg" 
        id="entry" 
        v-model="entry"
        placeholder="ex : FC-202P30KT4P55H2XGXXXXSXXXXAXBXCXXXXDX ou 131F6650" 
      />
      
      <input 
        v-if="seen" 
        class="form-control form-control-lg mt-2" 
        id="pn" 
        v-model="pn" 
      />

      <div class="input-group mt-3">
        <textarea 
          class="form-control form-control-lg"
          placeholder="Vas-y, tapes quelques choses au-dessus ..."
          id="designation" 
          v-model="data.payload"
          readonly
        >
        <div :class="updateClass"></div>
      </textarea>
        <button 
          v-if="data.payload" 
          class="btn btn-outline-secondary" 
          type="button" 
          @click="updateClipboard(data.payload)"
        >
          {{ copier }}
        </button>
      </div>
    </div>

    <div v-if="items.length" class="mt-4">
      <h5>Derniers codes entrés :</h5>
      <div class="list-group">
        <a
          href="#" 
          v-for="(item, index) in items" 
          :key="index"
          class="list-group-item list-group-item-action"
        >
          {{ item }}
        </a>
      </div>
    </div>
  </div>

<Footer></Footer>
</template>

<style scoped></style>
