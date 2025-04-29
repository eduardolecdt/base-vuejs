<template>
  <div id="alerta" :class="{ [classe]: true, mostrar: visivel }" @click="storeAlerta.fecharAlerta()">
    <div class="icone">
      <Svgs :nome="icone" />
    </div>
    <p>{{ mensagem }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useStoreAlerta } from '@stores'
import Svgs from '@svgs'

const storeAlerta = useStoreAlerta()
const { classe, visivel, mensagem } = storeToRefs(storeAlerta)

const icone = computed(() => {
  if (classe.value === 'positivo') return 'check'
  if (classe.value === 'negativo') return 'atencao'
  if (classe.value === 'upgrade') return 'estrela'
})
</script>

<style scoped>
div#alerta {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 10000;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 5px 15px 5px 5px;
  border-radius: 8px;
  cursor: pointer;
  transform: translate(-50%, 0);
}

div#alerta.mostrar {
  display: flex;
  transform: translate(-50%, 0);
  animation: mostrarAlerta 0.3s ease-out;
}

@keyframes mostrarAlerta {
  0% {
    opacity: 0;
    transform: translate(-50%, -100px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #ffffff;
  margin: 0 10px 0 0;
}

svg {
  width: 20px;
  min-width: 20px;
  fill: #ffffff;
}

div#alerta.upgrade svg {
  fill: #fa7c15;
}

div#alerta.positivo svg {
  fill: #12a865;
}

div#alerta.negativo svg {
  fill: #f41d1d;
}

p {
  font-family: var(--fonte);
  font-size: var(--f2);
  color: #ffffff;
  line-height: 1.5;
  width: 100%;
}

div#alerta.upgrade {
  background-color: #fa7c15;
}

div#alerta.positivo {
  background-color: #12a865;
}

div#alerta.negativo {
  background-color: #f41d1d;
}

@media screen and (max-width: 1024px) {
  div#alerta {
    max-width: calc(100% - 40px);
  }
}
</style>
