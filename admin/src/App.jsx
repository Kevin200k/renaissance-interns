import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import MainLayout from './layouts/MainLayout'
import StudentManagement from './pages/StudentManagement'
import LocationSettings from './pages/LocationSettings'
import FlaggedNotification from './pages/FlaggedNotification'
import StudentProfile from './pages/StudentProfile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="admin-dashboard" element={<DashboardPage />} />
        <Route path="student-management" element={ <StudentManagement /> } />
        <Route path='Location-Settings' element={ <LocationSettings /> }  />
        <Route path='flagged-notification' element={ <FlaggedNotification /> } />
        <Route path='student-management/:id' element={ <StudentProfile /> } />
      </Route>
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
