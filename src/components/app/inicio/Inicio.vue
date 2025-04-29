<template>
  <div id="tela">
    <SectionInicio />
  </div>
</template>

<script setup>
import SectionInicio from './partials/SectionInicio.vue'
</script>

<style scoped>
#tela {
  animation: fadeIn 0.3s linear;
  padding: 0 0 0 260px;
}
@media screen and (max-width: 1000px) {
  #tela {
    padding: 0;
  }
}
</style>
