<template>
  <div v-if="!online" class="internet">
    <svg viewBox="0 0 24 24" class="wifi-icon">
      <!-- Primeiro arco -->
      <path class="line line1" d="M2.5 8c6-6 16-6 21 0" />
      <!-- Segundo arco -->
      <path class="line line2" d="M6 12c4-4 10-4 14 0" />
      <!-- Terceiro arco -->
      <path class="line line3" d="M9.5 16c2-2 6-2 7 0" />
    </svg>
    <h3>Sem conexão</h3>
    <p>Verifique sua conexão com a internet e tente novamente.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const online = ref(navigator.onLine)

onMounted(() => {
  const updateOnlineStatus = () => {
    online.value = navigator.onLine
  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })
})
</script>

<style scoped>
.internet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 100dvh;
  background-color: #000000d6;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 0 50px 0;
}

.wifi-icon {
  width: 60px;
  fill: none;
  stroke: var(--cor-branco-fixo);
  stroke-width: 2;
  stroke-linecap: round;
  animation: fadeIn 1s ease-in-out forwards;
}

.line {
  opacity: 0;
  animation: draw 2s infinite ease-in-out;
}

.line1 {
  animation-delay: 0s;
}

.line2 {
  animation-delay: 0.3s;
}

.line3 {
  animation-delay: 0.6s;
}

circle {
  fill: var(--cor-branco-fixo);
}

@keyframes draw {
  0% {
    stroke-dasharray: 0 100;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 50 100;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 0 100;
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
h3 {
  font-family: var(--bold);
  font-size: var(--f3);
  color: var(--cor-branco-fixo);
  margin: 20px 0 10px 0;
}
p {
  font-family: var(--regular);
  font-size: var(--f2);
  color: var(--cor-branco-fixo);
}
@media screen and (max-width: 1000px) {
  p {
    max-width: 240px;
    line-height: 1.5;
  }
}
</style>
