"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in on initial load
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const storedUser = localStorage.getItem("user")

    if (isAuthenticated && storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    navigate("/login")
  }

  // Check if credentials match any stored user
  const checkCredentials = (email, password) => {
    // Check admin credentials (hardcoded for demo)
    if (email === "admin@company.com" && password === "password") {
      return {
        name: "Admin User",
        email: "admin@company.com",
        role: "admin",
      }
    }

    // Check employee credentials from localStorage
    const userCredentials = localStorage.getItem("userCredentials")
    if (userCredentials) {
      const credentials = JSON.parse(userCredentials)
      const matchedUser = credentials.find((cred) => cred.email === email && cred.password === password)

      if (matchedUser) {
        // Get full employee details
        const employees = JSON.parse(localStorage.getItem("employees") || "[]")
        const employee = employees.find((emp) => emp.email === email)

        if (employee) {
          return {
            name: employee.firstName + " " + employee.lastName,
            email: employee.email,
            role: "employee",
            employeeId: employee.id,
          }
        }
      }
    }

    return null
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkCredentials }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
