import { useState } from "react"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import PayrollCalculator from "./PayrollCalculator.jsx"
import { FaPlay, FaCalendarAlt } from "react-icons/fa"
import "../styles/PayrollPage.css"

function PayrollPage() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", position: "Software Engineer", salary: 45000, taxCode: "1257L", status: "Active" },
    { id: 2, name: "Sarah Davis", position: "Marketing Manager", salary: 52000, taxCode: "1257L", status: "Active" },
    { id: 3, name: "William Smith", position: "Product Designer", salary: 42000, taxCode: "1257L", status: "Active" },
    { id: 4, name: "Emma Johnson", position: "HR Specialist", salary: 38000, taxCode: "1257L", status: "Active" },
    {
      id: 5,
      name: "Michael Brown",
      position: "Sales Representative",
      salary: 36000,
      taxCode: "1257L",
      status: "Active",
    },
  ])

  const [selectedEmployee, setSelectedEmployee] = useState(null)

  return (
    <div className="payroll-page">
      <div className="page-header">
        <div>
          <h1>Payroll</h1>
          <p>Process and manage your company's payroll</p>
        </div>
        <div className="header-actions">
          <Button className="btn-primary">
            <FaPlay /> Run Payroll
          </Button>
          <Button className="btn-outline">
            <FaCalendarAlt /> Schedule
          </Button>
        </div>
      </div>

      <div className="payroll-stats">
        <Card className="payroll-stat-card">
          <h3>Next Payroll</h3>
          <p className="stat-subtitle">April 2025</p>
          <div className="stat-value">28 April 2025</div>
          <p className="stat-description">11 days remaining</p>
          <Button className="btn-primary btn-sm btn-block mt-4">
            <FaPlay /> Process Now
          </Button>
        </Card>

        <Card className="payroll-stat-card">
          <h3>Estimated Total</h3>
          <p className="stat-subtitle">Based on current employees</p>
          <div className="stat-value">£68,432</div>
          <p className="stat-description">Gross amount</p>
          <div className="stat-value-secondary">£52,345</div>
          <p className="stat-description">Net amount</p>
        </Card>

        <Card className="payroll-stat-card">
          <h3>Tax & NI</h3>
          <p className="stat-subtitle">Estimated contributions</p>
          <div className="stat-value">£12,234</div>
          <p className="stat-description">Income Tax</p>
          <div className="stat-value-secondary">£3,853</div>
          <p className="stat-description">National Insurance</p>
        </Card>
      </div>

      <div className="payroll-section">
        <h2>Process Individual Payroll</h2>
        <p>Select an employee to calculate and process their payroll</p>

        <div className="employee-selector">
          <label htmlFor="employee-select">Select Employee:</label>
          <select
            id="employee-select"
            className="form-select"
            value={selectedEmployee ? selectedEmployee.id : ""}
            onChange={(e) => {
              const id = Number.parseInt(e.target.value)
              const employee = employees.find((emp) => emp.id === id)
              setSelectedEmployee(employee)
            }}
          >
            <option value="">-- Select an employee --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} - {employee.position}
              </option>
            ))}
          </select>
        </div>

        {selectedEmployee && <PayrollCalculator employee={selectedEmployee} />}
      </div>
    </div>
  )
}

export default PayrollPage
