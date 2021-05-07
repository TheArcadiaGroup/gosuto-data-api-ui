import { push } from 'connected-react-router'
import { login, logout } from '../actions/user'
import setAuthToken from '../../utils/setAuthToken'

import {
  postRegister,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword
} from '../../api/index'
import jwt_decode from 'jwt-decode'

export const attemptLogin = (user) => async (dispatch) => {
  await postLogin(user)
    .then((res) => {
      const { user, token } = res.data
      localStorage.setItem('jwtTokenGosutu', JSON.stringify(token))
      // Set token to Auth header
      setAuthToken(token)
      ///const decoded = jwt_decode(token)
      dispatch(login(user))
      dispatch(push('/'))
      return res.data
    })
    .catch(dispatch(push('/login')))
}

export const attemptSocialLogin = (token) => async (dispatch) => {
  localStorage.setItem('jwtTokenGosutu', JSON.stringify(token))
  setAuthToken(token)
  const decoded = jwt_decode(token)
  dispatch(login(decoded.user))
}

export const attemptSendResetPasswordLink = (email) => async (dispatch) => {
  await sendResetPasswordLink(email).catch(dispatch(push('/login/forgot')))
}

export const attemptResetPassword = (password, token) => async (dispatch) => {
  await resetPassword(password, token)
    .then(() => {
      dispatch(push('/login'))
    })
    .catch(dispatch(push(`/login/reset/${token}`)))
}

export const attemptLogout = () => async (dispatch) =>
  await postLogout()
    .then(() => {
      localStorage.removeItem('jwtTokenGosutu')
      // Remove auth header for future requests
      setAuthToken(false)
      dispatch(logout())
      dispatch(push('/login'))
    })
    .catch(dispatch(push('/login')))

export const attemptRegister = (newUser) => async (dispatch) => {
  await postRegister(newUser).catch(dispatch(push('/register')))
}

export const attemptGetConfirmation = (token) => async (dispatch) =>
  await getConfirmation(token).then(() => {
    dispatch(push('/login'))
  })

export const attemptResendConfirmation = (email) => async (dispatch) =>
  await resendConfirmation(email).catch(dispatch(push('/register')))

export const attemptResetRegister = (email) => async (dispatch) => {
  await resetRegister(email).catch(dispatch(push('/register')))
}
