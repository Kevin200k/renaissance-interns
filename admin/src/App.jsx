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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signup" element={<SignupPage />} />
      
      <Route path="/" element={<MainLayout />}>
        <Route path="admin-dashboard" element={<DashboardPage />} />
      </Route>
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
