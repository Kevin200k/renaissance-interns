import './index.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import MainLayout from '../src/layouts/MainLayout';
import Analytics from '../src/pages/Analytics';
import Dashboard from './components/Dashboard';
import AttendanceHistory from './pages/AttendanceHistory';
import Notifications from './pages/Notifications';
import ProtectedRoute from './middlewares/ProtectedRoute';
import { AuthProvider } from '../../shared/context/AuthContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<SignupPage />} />
      <Route path='/' element={<MainLayout />}>
        <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='attendance-history' element={<ProtectedRoute><AttendanceHistory /></ProtectedRoute>} />
        <Route path='analytics' element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path='notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
