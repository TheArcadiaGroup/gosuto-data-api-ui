import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
// components

import Navbar from 'components/Navbars/AuthNavbar.js'
import FooterSmall from 'components/Footers/FooterSmall.js'

// views

import Login from 'views/auth/Login.js'
import Register from 'views/auth/Register.js'
import ConfirmPage from 'views/auth/ConfirmPage'

import LoginForgot from 'views/auth/LoginForgot'
import LoginResetPassword from 'views/auth/LoginResetPassword'
import Logout from 'views/auth/Logout'

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                'url(' + require('assets/img/register_bg_2.png').default + ')'
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/account/confirm/:token" exact component={ConfirmPage} />
            <Route path="/auth/login/forgot/" exact component={LoginForgot} />
            <Route path="/auth/login/reset/:token" component={LoginResetPassword} />
            <ProtectedRoute path="/auth/logout" exact component={Logout} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  )
}
