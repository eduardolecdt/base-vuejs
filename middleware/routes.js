export default defineNuxtRouteMiddleware((to) => {
  if (to.matched.length === 0) {
    return navigateTo({ name: 'erro' })
  }
})
