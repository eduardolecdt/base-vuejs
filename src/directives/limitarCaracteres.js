export const limitarCaracteres = {
  mounted(el, binding) {
    el.addEventListener('input', function () {
      const texto = el.value
      const maxLength = binding.value - 1
      const textoLimitado = texto.substring(0, maxLength)

      el.value = textoLimitado
    })
  },

  updated(el, binding) {
    const texto = el.value
    const maxLength = binding.value - 1
    const textoLimitado = texto.substring(0, maxLength)

    el.value = textoLimitado
  }
}
