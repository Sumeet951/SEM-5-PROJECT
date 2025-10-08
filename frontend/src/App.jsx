import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import LandingPage from './Pages/landingpage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
// import Dashboard from './Pages/Dashboard'
import Subscriptions from './Pages/Subscriptions'
import DashboardPage from './Pages/DashboardPage'
import Analytics from './Pages/AnalyticsPage'
// import DashboardLayout from './components/dashboard/DashboardLayout'

const App = () => {
  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Dashboard/>}></Route> */}
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
     {/* Dashboard Routes (No Auth Required) */}
     {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="analytics" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics (Coming Soon)</h1></div>} />
          <Route path="calendar" element={<div className="p-8"><h1 className="text-2xl font-bold">Calendar (Coming Soon)</h1></div>} />
          <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>} />
        </Route> */}

      <Route path="/dashboard" element={<DashboardPage/>}></Route>
       <Route path="/analytics" element={<Analytics/>}></Route>
 



    </Routes>
    </>
  )
}

export default App