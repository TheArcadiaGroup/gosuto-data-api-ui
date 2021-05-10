import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import HeaderStats from 'components/Headers/HeaderStats.js'
import FooterAdmin from 'components/Footers/FooterAdmin.js'

// views

import Dashboard from 'views/admin/Dashboard.js'
import Settings from 'views/admin/Settings.js'
import Pricing from 'views/admin/Pricing.js'
import Tables from 'views/admin/Tables'
import Create from 'views/admin/Project/Create'
import Edit from 'views/admin/Project/Edit'

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div
        className="relative md:ml-64 bg-blueGray-100"
        style={{ minHeight: '100vh', position: 'relative' }}
      >
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24 pb-20">
          <Switch>
            <ProtectedRoute path="/admin/dashboard" exact component={Dashboard} />
            <ProtectedRoute path="/admin/settings" exact component={Settings} />
            <ProtectedRoute path="/admin/pricing" exact component={Pricing} />
            <ProtectedRoute path="/admin/projects" exact component={Tables} />
            <ProtectedRoute path="/admin/project/create" exact component={Create} />
            <ProtectedRoute path="/admin/project/edit/:id" exact component={Edit} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
