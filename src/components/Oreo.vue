<script setup>
import { ref } from 'vue'
const id = ref(0)
</script>

<template>
  <div class="header shadow-lg p-3 mb-5 rounded">
    <div class="container logo">
      <div class="row justify-content-center">
        <div class="col-4 logo-img">
          <img src="../../public/img/oreo.svg" alt="Oréo" />
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="data">
      <label for="entry">Entrez le LN ou PN</label>
      <input
        class="form-control form-control-lg"
        id="entry"
        v-model="entry"
        placeholder="ex : FC-202P30KT4P55H2XGXXXXSXXXXAXBXCXXXXDX ou 131F6650"
      />
      <input class="form-control form-control-lg" id="pn" v-model="pn" v-if="seen" />
      <br />
      <div class="input-group mb-3">
        <textarea
          class="form-control form-control-lg"
          placeholder="Vas-y, tapes quelques choses au-dessus ..."
          id="designation"
          v-model="designation"
        ></textarea>
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            data-clipboard-target="#designation"
          >
            Copié
          </button>
        </div>
      </div>

      <input class="form-control form-control" placeholder="" id="brochure" v-model="brochure" />
    </div>
    <div>
      <ul id="lastentry">
        <p>Derniers codes entrés :</p>
        <!-- <li v-for="item in items">
          {{ item }} -->
        </li>
      </ul>
    </div>
  </div>
  <nav class="navbar fixed-bottom navbar-dark bg-dark">
    <a class="navbar-brand" href="#"
      >Conçu avec amour
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-suit-heart-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"
        />
      </svg>
    </a>
  </nav>

  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
    <script src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
    <script src="./js/App.js"></script> -->
</template>

<style scoped></style>
