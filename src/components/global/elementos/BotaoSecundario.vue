<template>
  <button class="secundario" :class="cor" :style="{ width: tamanho === 'inteiro' ? '100%' : 'calc(50% - 5px)' }" :disabled="carregandoBotao">
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
  cor: {
    type: String,
    required: true
  },
  tamanho: {
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
button.secundario {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fonte);
  font-size: var(--f1);
  color: #ffffff;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s;
}
button.secundario.verde {
  background-color: #1da121;
}
button.secundario.cinza {
  background-color: #1f2125;
}
button.secundario.vermelho {
  background-color: #e03e26;
}
button.secundario.azul {
  background-color: #2f5ff0;
}
button.secundario.verde:hover {
  background-color: #0d510f;
}
button.secundario.cinza:hover {
  background-color: #101216;
}
button.secundario.vermelho:hover {
  background-color: #742013;
}
button.secundario.azul:hover {
  background-color: #1c3786;
}
button.secundario:disabled {
  color: transparent;
}
button.secundario:disabled span {
  opacity: 1;
  visibility: visible;
}
button.secundario span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  position: absolute;
  opacity: 0;
  visibility: hidden;
  animation: girando 1s linear infinite;
  pointer-events: none;
  transition: all 0.3s;
}
</style>
