export default [
  {
    path: '/',
    name: 'entrar',
    component: () => import('../components/autenticacao/entrar/Entrar.vue'),
    meta: {
      title: 'Título',
      layout: 'default-layout'
    }
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: () => import('../components/autenticacao/registrar/Registrar.vue'),
    meta: {
      title: 'Título',
      layout: 'default-layout'
    }
  }
]
