import { onMounted, onBeforeUnmount } from 'vue'

function clicouFora(alvosEFuncoes) {
  if (!alvosEFuncoes || !alvosEFuncoes.length) return

  const ouvinte = (e) => {
    alvosEFuncoes.forEach(({ alvo, retornoChamada }) => {
      if (alvo && alvo.value && alvo.value.contains) {
        if (e.target !== alvo.value && !alvo.value.contains(e.target)) {
          if (typeof retornoChamada === 'function') {
            retornoChamada()
          }
        }
      }
    })
  }

  onMounted(() => {
    window.addEventListener('click', ouvinte)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', ouvinte)
  })

  return { ouvinte }
}

export default { clicouFora }
