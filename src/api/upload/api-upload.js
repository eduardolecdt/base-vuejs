import { helperToken } from '@helpers'
import { api } from './axios'

const token = helperToken.receberToken()

export default {
  uploadImagem(payload) {
    const method = 'POST'
    const url = 'storage/imagem'
    const dados = payload

    return api(method, url, dados, token)
  }
}
