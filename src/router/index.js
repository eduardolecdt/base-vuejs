import { createRouter, createWebHistory } from 'vue-router'
import { helperToken, helperServiceWorker } from '@helpers'
import app from './app.js'
import autenticacao from './autenticacao.js'

const routes = [...autenticacao, ...app]

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Site'
})

router.beforeEach((to, _from, next) => {
  if (to.meta.logged) {
    if (!helperToken.detectarTokenOk()) router.push('/')
  }

  helperServiceWorker.ativar()
  next()
})

export default router
