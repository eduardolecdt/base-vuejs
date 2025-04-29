<template>
  <section class="modal" :class="{ mostrar: modalAberto }" ref="scrollModal">
    <div class="background"></div>
    <div class="conteudo">
      <div class="titulo">
        <Svgs :nome="dadosModal.icone" />
        <h3>{{ dadosModal.titulo }}</h3>
        <button class="fechar" @click="fecharModal(props.nome)">
          <Svgs nome="x" />
        </button>
      </div>
      <div class="dados">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStoreModal } from '@stores'
import { computed, ref, watch, onMounted, onUnmounted, inject } from 'vue'
import Svgs from '@svgs'

const props = defineProps({
  nome: {
    type: String,
    required: true
  }
})

const emitter = inject('emitter')
const storeModal = useStoreModal()
const modalAberto = computed(() => storeModal.modalAberto(props.nome))
const dadosModal = computed(() => storeModal.dadosDoModal(props.nome))

const scrollModal = ref(null)

const resetarScroll = () => {
  if (scrollModal.value) {
    scrollModal.value.scrollTop = 0
  }
}

function fecharModal() {
  storeModal.fecharModal(props.nome)
  emitter.emit('limparCampos')
}

function abrirModal() {
  emitter.emit('carregarCampos')
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && modalAberto.value) {
    fecharModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

watch(modalAberto, (novoValor) => {
  if (novoValor) {
    abrirModal()
    resetarScroll()
  }
})
</script>

<style scoped>
section.modal {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  max-height: 100dvh;
  z-index: 11;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  overflow-y: scroll;
  scrollbar-width: none;
}
section.modal::-webkit-scrollbar {
  display: none;
}
section.modal.mostrar {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
section.modal.mostrar .background {
  opacity: 1;
  visibility: visible;
}
section.modal.mostrar button.fechar {
  top: 40px;
  transform: rotate(0deg);
}
section.modal.mostrar .conteudo {
  transform: translate(0px, 0px);
}
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 11;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;
}
button.fechar {
  border-radius: 50%;
  background-color: transparent;
  transform: rotate(15deg);
  margin-left: auto;
  z-index: 13;
  transition: all 0.6s;
}
button.fechar:hover svg {
  fill: #ffffff;
}
button.fechar svg {
  width: 20px;
  min-width: 20px;
  fill: #ffffff;
  margin: 0;
  transition: all 0.3s;
}
.conteudo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  border: 2px solid #ffffff;
  transform: translate(0px, -300px);
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  margin: 40px 0 40px 0;
  position: relative;
  transition: all 0.6s;
  z-index: 12;
}
.titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
}
.titulo svg {
  width: 20px;
  min-width: 20px;
  max-height: 20px;
  fill: #ffffff;
  margin: 0 10px 0 0;
}
.titulo h3 {
  font-family: var(--fonte);
  font-size: var(--f2);
  color: #ffffff;
}
.dados {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
}
section.modal.mostrar .dados {
  opacity: 1;
  visibility: visible;
  animation: aparecendo 0.6s linear;
}
@keyframes aparecendo {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  50% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
@media screen and (max-width: 1024px) {
  .conteudo {
    margin: 0;
    border-radius: 0;
  }
  .titulo {
    padding: 20px;
  }
  .dados {
    padding: 20px;
  }
}
</style>
