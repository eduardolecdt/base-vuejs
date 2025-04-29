<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" v-if="props.nome === 'icone-um'"></svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" v-else-if="props.nome === 'icone-dois'"></svg>
</template>

<script setup>
const props = defineProps({
  nome: String
})
</script>
