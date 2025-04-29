<template>
  <div class="carregando">
    <svg></svg>
  </div>
</template>

<script setup></script>

<style scoped>
.carregando {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 10;
  background-color: var(--cor-preto);
  transition: all 1s;
}
.carregando.ocultar {
  top: 100dvh;
  pointer-events: none;
}
svg {
  width: 100px;
}
svg path {
  fill: none;
  stroke-width: 2;
  stroke-dasharray: 300;
  stroke-dashoffset: 100;
  animation: desenhar 10s linear infinite;
}
.um {
  animation-delay: 0s;
}
.dois {
  animation-delay: 0.3s;
}
@keyframes desenhar {
  0% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 900;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
