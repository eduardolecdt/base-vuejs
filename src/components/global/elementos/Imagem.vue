<template>
  <div class="imagem" :class="{ carregar: loading }" @click="abrirInputFile">
    <label>{{ label }}</label>
    <div class="previa" :style="backgroundStyle">
      <span></span>
      <Svgs v-if="!backgroundUrl" nome="arquivo" />
    </div>
    <div class="texto">
      <h3>{{ nomeArquivo || 'Subir Imagem' }}</h3>
      <p>{{ tamanho }}</p>
    </div>
    <input type="file" accept=".jpg,.jpeg,.png" hidden ref="inputFile" @change="selecionarImagem" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Svgs from '@svgs'
import ApiUpload from '@/api/upload/api-upload.js'

const props = defineProps({
  url: { type: String, default: '' },
  imagemPreenchida: { type: String, default: '' },
  label: { type: String, default: '' },
  tamanho: { type: String, default: '' }
})

const emit = defineEmits(['upload', 'update:url'])

const inputFile = ref(null)
const nomeArquivo = ref('')
const loading = ref(false)
const imagemLocal = ref(props.url || props.imagemPreenchida) // Estado local da imagem

// Atualiza a imagem local quando a prop `url` mudar externamente
watch(
  () => props.url,
  (novoValor) => {
    if (novoValor) imagemLocal.value = novoValor
  }
)

const backgroundUrl = computed(() => imagemLocal.value || props.imagemPreenchida)
const backgroundStyle = computed(() => (backgroundUrl.value ? `background-image: url('${backgroundUrl.value}')` : ''))

function abrirInputFile() {
  inputFile.value.click()
}

function selecionarImagem(evento) {
  const arquivoSelecionado = evento.target.files[0]
  if (!arquivoSelecionado) return
  loading.value = true

  const payload = {
    arquivo: arquivoSelecionado,
    maxWidth: 300
  }

  ApiUpload.uploadImagem(payload)
    .then((resp) => {
      loading.value = false
      imagemLocal.value = resp?.url // Atualiza a imagem localmente
      nomeArquivo.value = resp?.nome
      emit('update:url', resp?.url) // Atualiza a `url` no componente pai
      emit('upload', resp?.url)
      inputFile.value.value = '' // Reseta o input para permitir reenvio do mesmo arquivo
    })
    .catch(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.imagem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 35px 15px 15px 15px;
  border: 1px dashed #ffffff;
  cursor: pointer;
  transition: all 0.3s;
}
.imagem:hover {
  border: 1px dashed #ffffff;
}
.imagem label {
  font-family: var(--fonte);
  font-size: var(--f0);
  color: #ffffff;
  position: absolute;
  top: 13px;
  left: 15px;
  pointer-events: none;
}
.previa {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #ffffff;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.previa svg {
  width: 25px;
  min-width: 25px;
  fill: #ffffff;
  position: absolute;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s;
}
.imagem.carregar .previa {
  background-image: none !important;
}
.imagem.carregar .previa svg {
  opacity: 0;
  visibility: hidden;
}
.imagem.carregar .previa span {
  opacity: 1;
  visibility: visible;
}
.previa span {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  animation: girando 1s linear infinite;
  position: absolute;
  opacity: 0;
  visibility: hidden;
}
.texto {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 0 15px;
}
.texto h3 {
  font-family: var(--fonte);
  font-size: var(--f2);
  color: #ffffff;
}
.texto p {
  font-family: var(--fonte);
  font-size: var(--f2);
  color: #ffffff;
  margin: 5px 0 0 0;
}
</style>
