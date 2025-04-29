export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/erro'
  },
  {
    path: '/erro',
    name: 'erro',
    component: () => import('../components/app/erro/Erro.vue'),
    meta: {
      title: 'Essa página não existe...',
      layout: 'default-layout'
    }
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('../components/app/inicio/Inicio.vue'),
    meta: {
      logged: true,
      title: 'Início',
      layout: 'navbar-layout'
    }
  }
]
