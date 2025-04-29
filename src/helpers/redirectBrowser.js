/* ---- Constants ---- */

const useragent = navigator.userAgent || navigator.vendor || window.opera
const browserDetect = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  instagram: /\bInstagram/i
}

/* ---- Methods ---- */

function isMobile() {
  return new window.RegExp(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(useragent)
}

function isInAppBrowser() {
  if (browserDetect.messenger.test(useragent)) return true
  if (browserDetect.facebook.test(useragent)) return true
  if (browserDetect.instagram.test(useragent)) return true
  if (browserDetect.twitter.test(useragent)) return true
  return false
}

function redirectAndroidInAppBrowsers() {
  if (!isMobile()) return
  if (!isInAppBrowser()) return

  const search = window.location.search || ''
  const site = `site.com${search}`
  const pacote = 'com.android.chrome'
  window.location = `intent://${site}#Intent;scheme=https;package=${pacote};end`
}

export default { redirectAndroidInAppBrowsers }
