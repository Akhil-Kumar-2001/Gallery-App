import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from './Pages/user/Home'
import Signup from './Pages/user/Signup'
import Login from './Pages/user/SignIn'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/ProtectedRoute'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import ForgotPassword from './Pages/user/ForgotPassword'
import ResetPassword from './Pages/user/ResetPassword'
import Verification from './Pages/user/VerifyOtp'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={
            <ErrorBoundary>
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            </ErrorBoundary>
          } />
        </Route >
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-cache/:email" element={<Verification />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
