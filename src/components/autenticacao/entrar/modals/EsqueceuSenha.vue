<template>
  <Modal nome="esqueceuSenha">
    <Campo tipo="email" placeholder="email@email.com" completar="email" label="E-mail da sua conta" />
    <BotaoPrincipal nome="Recuperar Senha" />
  </Modal>
</template>

<script setup>
import Modal from '@components/global/modal/Modal.vue'
import BotaoPrincipal from '@components/global/elementos/BotaoPrincipal.vue'
import Campo from '@components/global/elementos/Campo.vue'
</script>

<style scoped></style>
