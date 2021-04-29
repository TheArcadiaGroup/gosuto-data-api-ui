import { LOGIN_USER, LOGOUT_USER, SET_USER, RESET_USER } from './types'

export function login(user) {
  return {
    type: LOGIN_USER,
    user
  }
}

export function logout() {
  return {
    type: LOGOUT_USER
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

export function resetUser() {
  return { type: RESET_USER }
}
