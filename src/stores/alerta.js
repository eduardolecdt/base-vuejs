import { defineStore } from 'pinia'

export const useStoreAlerta = defineStore('storeAlerta', {
  state: () => ({
    visivel: false,
    mensagem: '',
    classe: '',
    tempo: ''
  }),
  actions: {
    mostrarAlerta(payload) {
      this.fecharAlerta()
      if (this.tempo) return

      this.visivel = payload.visivel
      this.mensagem = payload.mensagem
      this.classe = payload.classe
      this.tempo = setTimeout(() => this.fecharAlerta(), 7000)
    },
    fecharAlerta() {
      this.visivel = false
      this.mensagem = ''
      this.classe = ''

      clearTimeout(this.tempo)
      this.tempo = ''
    },
    exibirSucessoRequest(body) {
      if (body) this.mostrarAlerta({ visivel: true, mensagem: body, classe: 'positivo' })
      return true
    },
    exibirErroRequest(error) {
      const mensagem = error
      if (mensagem) this.mostrarAlerta({ visivel: true, mensagem: mensagem, classe: 'negativo' })
      else console.log('Erro sem mensagem:', error)
      return false
    }
  }
})
