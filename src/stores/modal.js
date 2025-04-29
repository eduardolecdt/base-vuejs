import { defineStore } from 'pinia'

export const useStoreModal = defineStore('storeModal', {
  state: () => ({
    modal: {},
    dadosModal: {},
    nomeModal: '',
    modals: ''
  }),
  actions: {
    abrirModal(nome, icone, titulo) {
      this.modal[nome] = true
      this.dadosModal[nome] = {
        icone,
        titulo
      }
    },
    abrirModalEdicao(nome, icone, titulo, id) {
      this.modal[nome] = true
      this.dadosModal[nome] = {
        icone,
        titulo,
        id
      }
    },
    fecharModal(nome) {
      this.modal[nome] = false
      this.dadosModal[nome] = {}
    },
    modalAberto(nome) {
      return this.modal[nome] || false
    },
    dadosDoModal(nome) {
      return this.dadosModal[nome] || {}
    }
  }
})
