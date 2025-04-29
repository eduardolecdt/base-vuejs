/* ---- Imports ---- */

import axios from 'axios'
import * as browserDetection from '@braintree/browser-detection'

/* ---- Constants ---- */

const LOCALSTORAGE_SW_ESTADO = 'app-sw-estado'
const LOCALSTORAGE_SW_BUILD = 'app-sw-build'
const INSTALANDO = 'instalando'
const INSTALADO = 'instalado'

/* ---- Methods ---- */

/**
 * ATIVAR
 * Ativa o service worker no browser do user.
 */
function ativar() {
  if (window.location.hostname.includes('localhost')) return
  detectarAtualizacaoIOS()
  detectarInstalacaoAnteriorEmAndamento()

  if ('serviceWorker' in navigator) {
    /**
     * Registra o service worker `sw.js` buildado pelo `vite-plugin-pwa`.
     */
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      /**
       * Evento disparado quando o service worker encontra atualização.
       * A checagem de atualização é feita pelo browser através
       * de hashes gerado pelo build.
       */
      registration.addEventListener('updatefound', serviceWorkerInstalando)

      /**
       * Checagem pra detectar se há service worker aguardando pra ser ativado
       * Esse cenário pode ocorrer quando o user, por N motivos, clica no f5
       * fecha e abre a aba, ou fecha e abre o browser, se naquele momento específico
       * houver um service worker aguardando pra ser ativado, o user vai ter um feedback
       * visual informando que o app vai ser atualizado.
       *
       * Essa checagem também previne de forçar update quando há service
       * worker aguardando pra ser ativado.
       * Se forçar update com um service worker aguardando, isso buga o fluxo do browser
       * e interrompe a instalação no firefox por exemplo.
       */
      if (registration.waiting) serviceWorkerAguardando()
      /**
       * Caso não haja nenhum service worker aguardando, força checagem de update.
       * Essa checagem é feita pelo browser através de hashes gerado pelo build.
       */ else registration.update()
    })

    /**
     * Responsável por avisar quando há a troca entre o novo service worker e o antigo.
     * Quando o novo service worker é ativado, esse evento é disparado.
     */
    navigator.serviceWorker.addEventListener('controllerchange', serviceWorkerAtivado)
  }
}

/**
 * ENVIAR EVENTO SERVICE WORKER UPDATE
 * Responsável por enviar evento customizado de atualização pra diferentes partes
 * do sistema, se necessário.
 */
function enviarEventoServiceWorkerUpdate() {
  /**
   * verifica se é a primeira ativação do service worker no browser do user
   * pra evitar disparar evento que mostra o aviso de atualização.
   */
  const primeiraAtivacao = verificarPrimeiraAtivacao()
  if (primeiraAtivacao) return

  // aviso de "atualizando app" desativado
  // essa desativação não impacta a atualização do service worker
  // o aviso é apenas um feedback visual
  // retrabalhar o fluxo do aviso nos próximos updates após
  // o lançamento do novo financeiro
  // document.dispatchEvent(new CustomEvent('serviceWorkerUpdateEvent'))
}

/**
 * SERVICE WORKER INSTALANDO
 * Gerencia lógica de quando o service worker encontra uma atualização.
 */
async function serviceWorkerInstalando() {
  localStorage.setItem(LOCALSTORAGE_SW_ESTADO, INSTALANDO)
  await enviarEventoServiceWorkerUpdate()
}

/**
 * SERVICE WORKER AGUARDANDO
 * Gerencia lógica de quando o service worker está aguardando para ser ativado.
 */
async function serviceWorkerAguardando() {
  await enviarEventoServiceWorkerUpdate()
}

/**
 * SERVICE WORKER ATIVADO
 * Gerencia lógica de quando o service worker é ativado.
 */
function serviceWorkerAtivado() {
  localStorage.setItem(LOCALSTORAGE_SW_ESTADO, INSTALADO)
  setTimeout(() => window.location.reload(), 1000)
}

/**
 * VERIFICAR PRIMEIRA ATIVAÇÃO
 * Verifica se é a primeira ativação do service worker no browser do user.
 * Essa checagem é feita consultando o service worker que está
 * ativo no browser, caso haja algum.
 */
function verificarPrimeiraAtivacao() {
  const estado = localStorage.getItem(LOCALSTORAGE_SW_ESTADO)
  return estado === null
}

/**
 * DETECTAR INSTALAÇÃO ANTERIOR EM ANDAMENTO
 * Responsável por detectar o estado da instalação do app via localstorage
 * pra cobrir esses cenários:
 * - Usuário recarregou a página
 * - Usuário fechou e abriu uma nova aba
 * - Usuário fechou e abriu o browser
 * - Usuário fechou e abriu o app
 * Esse usuário ainda vai ter o feedback visual do aviso de que há uma atualização
 * em andamento.
 * Quando o user fecha e abre (app/browser/aba) o browser consegue continuar
 * a instalação, porém ele não dispara mais o evento `updatefound`, pq ele já foi
 * disparado no browser e o service worker fica no estado `installing`, mesmo com
 * o user fechando e abrindo (app/browser/aba).
 */
async function detectarInstalacaoAnteriorEmAndamento() {
  const estado = localStorage.getItem(LOCALSTORAGE_SW_ESTADO)
  if (estado === INSTALANDO) await enviarEventoServiceWorkerUpdate()
}

/**
 * DETECTAR ATUALIZAÇÃO IOS
 * Função pra detectar atualização no IOS devido ao comportamento/fluxo
 * diferente que devices iOS possuem atualmente
 */
async function detectarAtualizacaoIOS() {
  if (!browserDetection.isIosSafari()) return

  try {
    const response = await axios.get('/app.json', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

    const dados = response.data
    if (!dados?.build) return

    const buildNovo = dados.build
    const buildAnterior = localStorage.getItem(LOCALSTORAGE_SW_BUILD)

    if (buildAnterior !== buildNovo) {
      serviceWorkerInstalando()
      localStorage.setItem(LOCALSTORAGE_SW_BUILD, buildNovo)

      // Aguarde 1 segundo antes de recarregar a página
      setTimeout(() => window.location.reload(), 1000)
    }
  } catch (error) {
    console.error('Erro ao verificar atualização:', error)
  }
}

export default {
  ativar
}
