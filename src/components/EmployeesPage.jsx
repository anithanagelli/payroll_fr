//EmployeesPage.jsx
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import Loader from "./ui/loader.jsx";
import Modal from "./ui/Modal.jsx"
import EmployeeForm from "./EmployeeForm.jsx"
import EmployeeRegistrationPage from "../pages/EmployeeRegistrationPage.jsx"
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaDownload,
  FaUserPlus
} from "react-icons/fa"
import { useEmployees } from "../context/EmployeeContext.jsx"

function EmployeesPage() {
  const navigate = useNavigate()
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleEmployeeStatus
  } = useEmployees()

  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null)

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
      name: employee.name || `${employee.firstName} ${employee.lastName}`,
      status: "Active",
    }
    addEmployee(newEmployee)
    setIsModalOpen(false)
  }

  const handleEditEmployee = (updatedEmployee) => {
    updateEmployee(updatedEmployee.id, updatedEmployee)
    setCurrentEmployee(null)
    setIsModalOpen(false)
  }

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id)
    }
  }

  const handleStatusChange = (id) => {
    toggleEmployeeStatus(id)
  }

  const openEditModal = (employee) => {
    navigate("/employees/register", { state: { employee } })
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
       {loading && <Loader />}
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
          <p className="text-gray-500">Manage your employee information and payroll details</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => navigate("/employees/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center gap-2"
          >
            <FaUserPlus />
            Register New Employee
          </Button>
          {/* <Button
            onClick={() => {
              setCurrentEmployee(null)
              setIsModalOpen(true)
            }}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded inline-flex items-center gap-2"
          >
            <FaPlus />
            Quick Add
          </Button> */}
        </div>
      </div>

      {/* Card */}
      <Card className="mt-6 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Employee Directory</h2>
          <p className="text-sm text-gray-500">View and manage all employees in your organization</p>
          <div className="mt-4 max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Salary</th>
                <th className="px-4 py-2 text-left">Tax Code</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-20 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.position}</td>
                    <td className="px-4 py-2">{employee.department}</td>
                    <td className="px-4 py-2">£{employee.salary?.toLocaleString()}</td>
                    <td className="px-4 py-2">{employee.taxCode}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 items-center">
                        <Link
  to={`/employees/edit/${employee.id}`}
  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
>
  <FaEdit />
</Link>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="ml-4 text-sm text-blue-600 hover:underline"
                          onClick={() => handleStatusChange(employee.id)}
                        >
                          {employee.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default EmployeesPage
