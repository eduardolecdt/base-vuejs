<template>
  <Alerta />
  <Internet />
  <div class="views">
    <component :is="layout" />
  </div>
</template>

<script setup>
import { computed, inject, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStoreAlerta } from '@stores'
import { helperRedirectBrowser } from '@helpers'
import Alerta from '@components/global/alerta/Alerta.vue'
import Internet from '@components/global/alerta/Internet.vue'

const { currentRoute } = useRouter()

const emitter = inject('emitter')
const storeAlerta = useStoreAlerta()

const layout = computed(() => {
  if (!currentRoute?.value?.name) return
  return currentRoute?.value.meta.layout || 'default-layout'
})

function mostrarAlerta(payload) {
  const dados = {
    visivel: true,
    mensagem: payload.mensagem,
    classe: payload.tipo
  }
  storeAlerta.mostrarAlerta(dados)
}

function redirecionarBrowser() {
  helperRedirectBrowser.redirectAndroidInAppBrowsers()
}

onMounted(() => {
  emitter.on('mostrarAlerta', (payload) => mostrarAlerta(payload))
})

onBeforeMount(() => {
  redirecionarBrowser()
})
</script>
