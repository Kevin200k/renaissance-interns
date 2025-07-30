import './index.css';
import { useState } from 'react'
import SignupPage from './pages/SignupPage'
import UserSidebar from './components/UserSidebar'
import MainLayout from './layouts/MainLayout'
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
      {/* <SignupPage /> */}
      {/* <UserSidebar /> */}
       <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  )
}

export default App
