import cookie from 'js-cookie'

const key = 'enc_auth_token'
export function getToken(){
  return get(key)
}

export function setToken(val) {
  return set(key, val)
}

export function removeToken() {
  return remove(key)
}

export function get(key) {
  return cookie.get(key)
}

export function set(key, val) {
  return cookie.set(key, val)
}

export function remove(key) {
  return cookie.remove(key)
}

