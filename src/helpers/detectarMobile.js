function detectarDispositivoMobile() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true
  else return false
}

export default {
  detectarDispositivoMobile
}
