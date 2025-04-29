import { defineStore } from 'pinia'

export const useStoreWhatsapp = defineStore('storeWhatsapp', () => {
  const baseLink = 'https://wa.me/'
  const defaultPhoneNumber = '5516992923738'

  const abrirLink = (message = '') => {
    const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
    return `${baseLink}${defaultPhoneNumber}${encodedMessage}`
  }

  return {
    abrirLink
  }
})
