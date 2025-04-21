import Card from "./ui/Card.jsx"
import { FaUsers, FaMoneyBillWave, FaPoundSign, FaReceipt } from "react-icons/fa"
import "../styles/DashboardStats.css"

function DashboardStats() {
  return (
    <div className="dashboard-stats">
      <Card className="stat-card">
        <div className="stat-header">
          <h3>Total Employees</h3>
          <FaUsers className="stat-icon" />
        </div>
        <div className="stat-content">
          <p className="stat-value">24</p>
          <p className="stat-change">+2 from last month</p>
        </div>
      </Card>

      <Card className="stat-card">
        <div className="stat-header">
          <h3>Monthly Payroll</h3>
          <FaMoneyBillWave className="stat-icon" />
        </div>
        <div className="stat-content">
          <p className="stat-value">£68,432</p>
          <p className="stat-change">+£4,320 from last month</p>
        </div>
      </Card>

      <Card className="stat-card">
        <div className="stat-header">
          <h3>Tax Contributions</h3>
          <FaPoundSign className="stat-icon" />
        </div>
        <div className="stat-content">
          <p className="stat-value">£12,234</p>
          <p className="stat-change">+£842 from last month</p>
        </div>
      </Card>

      <Card className="stat-card">
        <div className="stat-header">
          <h3>Payslips Generated</h3>
          <FaReceipt className="stat-icon" />
        </div>
        <div className="stat-content">
          <p className="stat-value">24</p>
          <p className="stat-change">+2 from last month</p>
        </div>
      </Card>
    </div>
  )
}

export default DashboardStats
