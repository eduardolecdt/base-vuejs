import { readFileSync } from 'fs'
import { resolve } from 'path'

function json() {
  const file = resolve('./public/', 'site.webmanifest')
  const data = readFileSync(file)
  return JSON.parse(data)
}

export { json }
