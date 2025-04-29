import { api } from './axios'

export default {
  entrar(payload) {
    const method = 'POST'
    const url = 'autenticacao/entrar'
    const dados = payload

    return api(method, url, dados)
  },

  registrar(payload) {
    const method = 'POST'
    const url = `autenticacao/registrar`
    const data = payload

    return api(method, url, data)
  }
}
