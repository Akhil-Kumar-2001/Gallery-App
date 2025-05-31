import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/userAuthStore'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/signin" replace />
}

export default PrivateRoute
