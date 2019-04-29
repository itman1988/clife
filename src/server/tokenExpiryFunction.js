import { removeToken } from 'utils/auth'

export function tokenExpiry () {
  sessionStorage.clear()
  removeToken()
}
