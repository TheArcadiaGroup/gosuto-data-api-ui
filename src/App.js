import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { attemptGetUser } from './store/thunks/user'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// layouts

import Admin from 'layouts/Admin.js'
import Auth from 'layouts/Auth.js'

// views without layouts

import Landing from 'views/Landing.js'
import Profile from 'views/Profile.js'
import Index from 'views/Index.js'

function MainApp() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
    // eslint-disable-next-line
  }, [])
  return (
    !loading && (
      <BrowserRouter>
        <ReactNotification />
        <Switch>
          {/* add routes with layouts */}
          <Route path="/dashboard" component={Admin} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" exact component={Index} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  )
}

function App() {
  return <MainApp />
}

export default App
