import { Link } from "react-router-dom"
import Card from "./ui/Card.jsx"
import { FaUsers, FaMoneyBillWave, FaFileAlt, FaCog } from "react-icons/fa"
import DashboardStats from "./DashboardStats.jsx"
import RecentActivity from "./RecentActivity.jsx"
import "../styles/Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your payroll management system</p>
        <div className="dashboard-actions">
          <Link to="/payroll" className="btn btn-primary">
            <FaMoneyBillWave /> Run Payroll
          </Link>
          <Link to="/employees/add" className="btn btn-outline">
            <FaUsers /> Add Employee
          </Link>
        </div>
      </div>

      <DashboardStats />

      <div className="dashboard-cards">
        <Link to="/employees" className="dashboard-card-link">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Employees</h3>
              <FaUsers className="card-icon" />
            </div>
            <div className="card-content">
              <p className="card-title">Manage</p>
              <p className="card-description">Add, edit, and manage employee information</p>
            </div>
          </Card>
        </Link>

        <Link to="/payroll" className="dashboard-card-link">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Payroll</h3>
              <FaMoneyBillWave className="card-icon" />
            </div>
            <div className="card-content">
              <p className="card-title">Process</p>
              <p className="card-description">Calculate and process employee payroll</p>
            </div>
          </Card>
        </Link>

        <Link to="/reports" className="dashboard-card-link">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Reports</h3>
              <FaFileAlt className="card-icon" />
            </div>
            <div className="card-content">
              <p className="card-title">Generate</p>
              <p className="card-description">Create and download payroll reports</p>
            </div>
          </Card>
        </Link>

        <Link to="/settings" className="dashboard-card-link">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Settings</h3>
              <FaCog className="card-icon" />
            </div>
            <div className="card-content">
              <p className="card-title">Configure</p>
              <p className="card-description">Manage company and payroll settings</p>
            </div>
          </Card>
        </Link>
      </div>

      <RecentActivity />
    </div>
  )
}

export default Dashboard
