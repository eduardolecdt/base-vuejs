<template>
  <div class="campo">
    <label>{{ label }}</label>
    <input v-if="mascara" :type="mostrarSenha ? 'text' : tipo" :placeholder="placeholder" v-mask="mascara" :autocomplete="completar" spellCheck="false" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <input v-else :type="mostrarSenha ? 'text' : tipo" :placeholder="placeholder" :autocomplete="completar" spellCheck="false" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />

    <Svgs v-if="tipo === 'password'" nome="visualizar" @click="toggleSenha" :class="{ ativo: mostrarSenha }" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Svgs from '@svgs'

const props = defineProps({
  completar: { type: String, default: '' },
  tipo: { type: String, default: 'text' },
  mascara: { type: String, default: '' },
  placeholder: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const mostrarSenha = ref(false)

const toggleSenha = () => {
  mostrarSenha.value = !mostrarSenha.value
}
</script>

<style scoped>
.campo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}
.campo svg {
  position: absolute;
  width: 15px;
  min-width: 15px;
  fill: #ffffff;
  right: 15px;
}
.campo svg.ativo {
  fill: #ffffff;
}
.campo label {
  font-family: var(--bold);
  font-size: var(--f0);
  color: #ffffff;
  position: absolute;
  top: 13px;
  left: 15px;
  pointer-events: none;
}
.campo input {
  font-family: var(--fonte);
  font-size: var(--f2);
  color: #ffffff;
  border-radius: 8px;
  padding: 30px 15px 13px 15px;
  background-color: #ffffff;
  width: 100%;
  transition: all 0.3s;
}
.campo input::placeholder {
  color: #ffffff;
}
.campo input:focus {
  background-color: #ffffff;
}
</style>
