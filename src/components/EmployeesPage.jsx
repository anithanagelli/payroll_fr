import { useState } from "react"
import { Link } from "react-router-dom"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import Modal from "./ui/Modal.jsx"
import EmployeeForm from "./EmployeeForm.jsx"
import { FaPlus, FaSearch, FaEdit, FaTrash, FaDownload } from "react-icons/fa"
import "../styles/EmployeesPage.css"

function EmployeesPage() {
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

  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employees.length + 1,
      status: "Active",
    }
    setEmployees([...employees, newEmployee])
    setIsModalOpen(false)
  }

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage your employee information and payroll details</p>
        </div>
        <div className="header-actions">
          <Button onClick={() => setIsModalOpen(true)} className="btn-primary">
            <FaPlus /> Add Employee
          </Button>
          <Button className="btn-outline">
            <FaDownload /> Export
          </Button>
        </div>
      </div>

      <Card className="employees-card">
        <div className="card-header">
          <h2>Employee Directory</h2>
          <p>View and manage all employees in your organization</p>
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
        <div className="employees-table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Tax Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>£{employee.salary.toLocaleString()}</td>
                  <td>{employee.taxCode}</td>
                  <td>
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>{employee.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/employees/${employee.id}`} className="btn-icon">
                        <FaEdit />
                      </Link>
                      <button className="btn-icon">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
        <EmployeeForm onAdd={handleAddEmployee} />
      </Modal>
    </div>
  )
}

export default EmployeesPage
