<script setup>
import { ref, watch } from 'vue'
import Logo from './LogoOreo.vue'
import Footer from './FooterView.vue'
import { storageAvailable } from '@/utils/storage'
import { debounce } from '@/utils/debounce'

const API_URL = import.meta.env.VITE_API_URL || 'https://4qxrkjukz3.execute-api.eu-west-1.amazonaws.com/api/products/'
const MAX_HISTORY = 5
const IS_STORAGE_AVAILABLE = storageAvailable('localStorage')

let savedItems = []
if (IS_STORAGE_AVAILABLE) {
    try {
        const saved = localStorage.getItem('lastEntries')
        if (saved) {
            savedItems = JSON.parse(saved)
        }
    } catch (e) {
        console.warn('Failed to load from localStorage:', e)
    }
}

const entry = ref('')
const pn = ref('')
const data = ref({ payload: '' })
const seen = ref(false)
const items = ref(savedItems)
const copier = ref('Copier')
const loading = ref(false)

function addToHistory(entry) {
    if (!IS_STORAGE_AVAILABLE) {
        console.warn('Local storage is not available.')
        return
    }

    if (!items.value.includes(entry)) {
        items.value = [entry, ...items.value.slice(0, MAX_HISTORY - 1)]

        try {
            localStorage.setItem('lastEntries', JSON.stringify(items.value))
        } catch (e) {
            console.warn('Failed to save to localStorage:', e)
        }
    }
}

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

const debouncedFetch = debounce(async (searchValue) => {
    try {
        const url = `${API_URL}${encodeURIComponent(searchValue)}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const result = await response.json()
        if (result.result && result.result.designation) {
            data.value = { payload: result.result.designation }
            addToHistory(searchValue)
        } else {
            data.value = { payload: '❌ Produit non trouvé' }
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
