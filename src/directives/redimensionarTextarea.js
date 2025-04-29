function ajustarAlturaTextarea(el, alturaMaxima) {
  el.style.height = 'auto'
  const deslocamento = el.offsetHeight - el.clientHeight
  const altura = Math.min(el.scrollHeight + deslocamento, alturaMaxima)
  el.style.height = `${altura}px`
}

export const autoRedimensionarTextArea = {
  mounted(el, binding) {
    const alturaMaxima = binding.value || 1000
    ajustarAlturaTextarea(el, alturaMaxima)
  },
  updated(el, binding) {
    const alturaMaxima = binding.value || 1000
    ajustarAlturaTextarea(el, alturaMaxima)
  }
}
