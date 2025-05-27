"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaMoneyBillWave, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../context/AuthContext.jsx"

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setUserMenuOpen(false) // close user menu when mobile toggled
  }

  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-lg"
        >
          <FaMoneyBillWave className="text-2xl" />
          <span>PayrollPro</span>
        </Link>

        {/* Mobile Icon */}
        <div className="lg:hidden ml-20" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <FaTimes className="text-xl text-gray-600" />
          ) : (
            <FaBars className="text-xl text-gray-600" />
          )}
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col lg:flex-row items-center absolute lg:static bg-white lg:bg-transparent w-full lg:w-auto top-16 left-0 transition-all duration-300 ease-in-out z-40 ${
            mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } lg:translate-x-0 lg:opacity-100`}
        >
          {/* {["Dashboard", "Employees", "Payroll"].map((text, i) => ( */}
           {["Employees", "Payroll"].map((text, i) => (  
            <li key={i} className="w-full text-center lg:w-auto">
              <Link
                to={text === "Dashboard" ? "/" : `/${text.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-4 text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Menu (Desktop Only) */}
        <div className="relative lg:block ">
          <div
            className="text-gray-600 text-2xl cursor-pointer"
            onClick={toggleUserMenu}
          >
            <FaUserCircle />
          </div>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
              <ul className="py-2">
                {/* <li>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                </li> */}
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
