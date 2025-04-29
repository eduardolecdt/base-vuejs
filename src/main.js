// vue & pinia
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// app & router
import App from './App.vue'
import router from './router'

// css global
import './css/global.css'

// layouts
import DefaultLayout from './layouts/DefaultLayout.vue'
import NavbarLayout from './layouts/NavbarLayout.vue'

// libs
import mitt from 'mitt'
import VueNumberFormat from 'vue-number-format'
import VueTheMask from 'vue-the-mask'

// diretivas personalizadas
import { autoRedimensionarTextArea, limitarCaracteres } from './directives'

// instâncias & configurações
const app = createApp(App)
const emitter = mitt()

const configVueNumberFormat = {
  prefix: '',
  decimal: ',',
  thounsand: '.',
  isInteger: false
}

app.use(router).use(createPinia()).use(VueTheMask).use(VueNumberFormat, configVueNumberFormat).provide('emitter', emitter).directive('redimensionar-textarea', autoRedimensionarTextArea).directive('limitar-caracteres', limitarCaracteres).component('default-layout', DefaultLayout).component('navbar-layout', NavbarLayout).mount('#app')
