<script setup>
import { ref, watch } from 'vue'
import Logo from './LogoOreo.vue'
import Footer from './FooterView.vue'
import { storageAvailable } from '@/utils/storage'
import { debounce } from '@/utils/debounce'

// Constants
const API_URL = import.meta.env.VITE_API_URL
const MAX_HISTORY = 5

// Initialize items from localStorage if available
let savedItems = []
try {
    const saved = localStorage.getItem('lastEntries')
    if (saved) {
        savedItems = JSON.parse(saved)
    }
} catch (e) {
    console.warn('Failed to load from localStorage:', e)
}

// Reactive references
const entry = ref('')
const pn = ref('')
const data = ref({ payload: '' })
const seen = ref(false)
const items = ref(savedItems)
const copier = ref('Copier')
const loading = ref(false)

// Add to history function
function addToHistory(entry) {
    // Check if localStorage is available
    if (!storageAvailable('localStorage')) {
        console.warn('Local storage is not available.')
        return
    }

    // Update the reactive reference if entry is not already in the list
    if (!items.value.includes(entry)) {
        items.value = [entry, ...items.value.slice(0, MAX_HISTORY - 1)]

        try {
            // Save updated list to localStorage
            localStorage.setItem('lastEntries', JSON.stringify(items.value))
        } catch (e) {
            console.warn('Failed to save to localStorage:', e)
        }
    }
}

// Improved clipboard function
function updateClipboard(newClip) {
    if (!newClip) return

    navigator.clipboard
        .writeText(newClip)
        .then(() => {
            copier.value = 'Copié !'
            setTimeout(() => {
                copier.value = 'Copier'
            }, 2000)
        })
        .catch(() => {
            copier.value = 'Erreur !'
        })
}

// Debounced API call
const debouncedFetch = debounce(async (searchValue) => {
    try {
        const url = `${API_URL}${encodeURIComponent(searchValue)}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const result = await response.json()
        data.value = result

        if (result.payload) {
            addToHistory(searchValue)
        }
    } catch (error) {
        console.error('Error:', error)
        data.value = {
            payload: '❌ Une erreur est survenue (surement entre le clavier et la chaise)',
        }
    } finally {
        loading.value = false
    }
}, 500)

// Watcher for entry changes
watch(
    entry,
    (newVal) => {
        if (!newVal) {
            debouncedFetch.cancel()
            data.value = { payload: '' }
            loading.value = false
            return
        }

        if (newVal.length < 8) {
            debouncedFetch.cancel()
            data.value = { payload: 'Il manque des caractères ...' }
            loading.value = false
            return
        }

        // Normalize entry: remove spaces and uppercase
        const normalized = newVal.replace(/\s/g, '').toUpperCase()
        if (normalized !== newVal) {
            entry.value = normalized
            return
        }

        loading.value = true
        data.value = { payload: '⌛ Je pense ...' }

        debouncedFetch(normalized)
    },
    { immediate: true },
)
</script>

<template>
    <Logo></Logo>

    <div class="container">
        <div class="data">
            <div class="form-floating">
                <input
                    class="form-control form-control-lg"
                    id="entry"
                    v-model="entry"
                    placeholder="ex : FC-202P30KT4P55H2XGXXXXSXXXXAXBXCXXXXDX ou 131F6650"
                />
                <label for="entry">Entrez le LN ou PN</label>
                <input v-if="seen" class="form-control form-control-lg mt-2" id="pn" v-model="pn" />
            </div>

            <div class="input-group mt-3 form-floating">
                <textarea
                    class="form-control form-control-lg"
                    placeholder="Vas-y, tapes quelques choses au-dessus ..."
                    id="designation"
                    v-model="data.payload"
                    readonly
                    style="height: 4.5em"
                ></textarea>
                <label for="designation">Désignation</label>
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
                    v-for="item in items"
                    :key="item"
                    class="list-group-item list-group-item-action"
                    @click.prevent="entry = item"
                >
                    {{ item }}
                </a>
            </div>
        </div>
    </div>

    <Footer></Footer>
</template>

<style scoped></style>
