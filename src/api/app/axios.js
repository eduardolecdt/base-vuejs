import axios from 'axios'

export const api = (method, url, data, token) => {
  const BASE_URL = 'https://api.com'
  const HEADERS = getHeaders(token)
  const config = {}

  config.method = method
  config.url = `${BASE_URL}/${url}`
  config.headers = HEADERS
  config.timeout = 20000
  if (data) config.data = data

  return request(config)
}

function getHeaders(token) {
  const headers = {}
  headers['Content-Type'] = 'application/json'
  if (token) headers['x-access-token'] = token
  return headers
}

function request(config) {
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => resolve(response?.data?.body))
      .catch((error) => reject(error?.response?.data?.body))
  })
}
