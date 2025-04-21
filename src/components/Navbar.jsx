import { useState } from "react"
import { Link } from "react-router-dom"
import { FaMoneyBillWave, FaBars, FaTimes, FaUserCircle } from "react-icons/fa"
import "../styles/Navbar.css"

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaMoneyBillWave className="logo-icon" />
          <span className="logo-text">PayrollPro</span>
        </Link>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/employees" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/payroll" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Payroll
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/reports" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Reports
            </Link>
          </li> */}
        </ul>

        {/* <div className="user-menu-container">
          <div className="user-avatar" onClick={toggleUserMenu}>
            <FaUserCircle />
          </div>
          {userMenuOpen && (
            <div className="user-dropdown">
              <div className="user-info">
                <p className="user-name">Admin User</p>
                <p className="user-email">admin@company.com</p>
              </div>
              <ul className="user-menu">
                <li className="user-menu-item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="user-menu-item">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="user-menu-item">
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar
