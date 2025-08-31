<script setup>
import { ref } from 'vue'

const nbClick = ref(0)

</script>

<template>
 <div class="header shadow-lg p-3 mb-5 rounded">
    <div class="container logo">
      <div class="row justify-content-center">
        <div @click="nbClick++" class="col-4 logo-img">
          <img src="../../img/oreo1.svg" alt="Oréo" />
          <span class="badge text-bg-secondary">{{nbClick}}</span>
        </div>
    </div>
    </div>
</div>
</template>