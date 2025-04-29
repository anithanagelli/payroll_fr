import { useState, useEffect } from "react"
import { FaPlus, FaSearch, FaEdit, FaTrash, FaDownload } from "react-icons/fa"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import Modal from "./ui/Modal.jsx"
import EmployeeForm from "./EmployeeForm.jsx"

function EmployeesPage() {
  const getInitialEmployees = () => {
    const stored = localStorage.getItem("employees")
    return stored
      ? JSON.parse(stored)
      : [
          { id: 1, name: "John Doe", position: "Software Engineer", salary: 45000, taxCode: "1257L", status: "Active", email: "john@gmail.com", department: "Engineering" },
          { id: 2, name: "Sarah Davis", position: "Marketing Manager", salary: 52000, taxCode: "1257L", status: "Active", email: "sarah@gmail.com", department: "Engineering" },
          { id: 3, name: "William Smith", position: "Product Designer", salary: 42000, taxCode: "1257L", status: "Active", email: "william@gmail.com", department: "Engineering" },
          { id: 4, name: "Emma Johnson", position: "HR Specialist", salary: 38000, taxCode: "1257L", status: "Active", email: "emma@gmail.com", department: "Engineering"},
          { id: 5, name: "Michael Brown", position: "Sales Representative", salary: 36000, taxCode: "1257L", status: "Active", email: "michael@gmail.com", department: "Engineering" }
        ]
  }

  const [employees, setEmployees] = useState(getInitialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees))
  }, [employees])

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleEditEmployee = (employee) => {
    const updatedEmployees = employees.map((e) =>
      e.id === employee.id ? { ...e, ...employee } : e
    )
    setEmployees(updatedEmployees)
    setIsModalOpen(false)
  }

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id)
    setEmployees(updatedEmployees)
  }

  const handleStatusChange = (id) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, status: employee.status === "Active" ? "Inactive" : "Active" } : employee
    )
    setEmployees(updatedEmployees)
  }

  const openEditModal = (employee) => {
    setCurrentEmployee(employee)
    setIsModalOpen(true)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-gray-500">Manage your employee information and payroll details</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center gap-2"
          >
            <FaPlus /> Add Employee
          </Button>
          <Button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded inline-flex items-center gap-2">
            <FaDownload /> Export
          </Button>
        </div>
      </div>

      {/* Employee Card */}
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
                <th className="px-4 py-2 text-left">Salary</th>
                <th className="px-4 py-2 text-left">Tax Code</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-20 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.position}</td>
                  <td className="px-4 py-2">£{employee.salary.toLocaleString()}</td>
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
                      <button
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
                        onClick={() => openEditModal(employee)}
                      >
                        <FaEdit />
                      </button>
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setCurrentEmployee(null)
        }}
        title={currentEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <EmployeeForm
          onAdd={currentEmployee ? handleEditEmployee : handleAddEmployee}
          employee={currentEmployee}
        />
      </Modal>
    </div>
  )
}

export default EmployeesPage
