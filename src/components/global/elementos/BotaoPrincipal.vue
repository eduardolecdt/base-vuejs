<template>
  <button class="salvar" :disabled="carregandoBotao">
    {{ nome }}
    <span></span>
  </button>
</template>

<script setup>
const props = defineProps({
  nome: {
    type: String,
    required: true
  },
  carregandoBotao: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
button.salvar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fonte);
  font-size: var(--f2);
  color: #ffffff;
  background-color: #ffffff;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s;
}
button.salvar.menor {
  padding: 15px;
}
button.salvar:hover {
  background-color: #ffffff;
}
button.salvar:disabled {
  color: transparent;
}
button.salvar:disabled span {
  opacity: 1;
  visibility: visible;
}
button.salvar span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  position: absolute;
  opacity: 0;
  visibility: hidden;
  animation: girando 0.5s linear infinite;
  pointer-events: none;
  transition: all 0.3s;
}
</style>
