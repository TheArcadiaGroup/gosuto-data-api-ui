
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// Utils
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'

import { setUser, logout } from './store/actions/user'


import App from './App'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'


const history = createBrowserHistory()
const store = configureStore(history)

// Check for token to keep user logged in
if (localStorage.jwtTokenWesloop) {
  // Set auth token header auth
  const token = JSON.parse(localStorage.jwtTokenWesloop)
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout())
    // Redirect to login
    window.location.href = './'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
