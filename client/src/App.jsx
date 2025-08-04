import './index.css';
import { useState } from 'react'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import SignupPage from './pages/SignupPage'
import MainLayout from '../src/layouts/MainLayout';
import Analytics from '../src/pages/Analytics'
import Dashboard from './components/Dashboard';
import AttendanceHistory from './pages/AttendanceHistory';
import Notifications from './pages/Notifications';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={ <SignupPage /> } />
      <Route path='/' element={ <MainLayout /> } >
        <Route path='dashboard' element={ <Dashboard /> } />
        <Route path='attendance-history' element={ <AttendanceHistory /> } />
        <Route path='analytics' element={ <Analytics /> } />
        <Route path='notifications' element={ <Notifications /> } />
      </Route>
    </>
  )
)

const App = () => {
  return <RouterProvider router={ router } />
}

export default App
