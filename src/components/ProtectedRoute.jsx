"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    // You could render a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
