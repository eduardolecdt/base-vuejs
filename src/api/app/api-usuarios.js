import { api } from '../../api/app/axios'
import { helperToken } from '@helpers'

const idUsuario = helperToken.idUsuario()
const token = helperToken.receberToken()

export default {
  receberPorEmail(email) {
    if (!idUsuario) return

    const method = 'GET'
    const url = `usuarios/email/${email}`

    return api(method, url, null, token)
  },

  receberPerfilUsuario() {
    if (!idUsuario) return

    const method = 'GET'
    const url = `perfil/${idUsuario}`

    return api(method, url, null, token)
  },

  alterarDados(payload) {
    if (!idUsuario) return

    const method = 'PUT'
    const url = `perfil/${idUsuario}`

    return api(method, url, payload, token)
  },

  alterarSenha(payload) {
    if (!idUsuario) return

    const method = 'PATCH'
    const url = `perfil/senha/alterar/${idUsuario}`

    return api(method, url, payload, token)
  }
}
