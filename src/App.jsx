import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard.jsx"
import EmployeesPage from "./components/EmployeesPage.jsx"
import PayrollPage from "./components/PayrollPage.jsx"
import ReportsPage from "./components/ReportsPage.jsx"
import Navbar from "./components/Navbar.jsx"
import "./styles/App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
