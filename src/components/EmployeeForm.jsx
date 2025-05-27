import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEmployees } from "../context/EmployeeContext.jsx"
import { FaSpinner } from "react-icons/fa"

function EmployeeForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addEmployee, updateEmployee } = useEmployees()

  const isEditing = !!location.state?.employee
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
    taxCode: ''
  })

  useEffect(() => {
    if (isEditing) {
      const { employee } = location.state
      setFormData({
        id: employee.id,
        name: employee.name || '',
        position: employee.position || '',
        department: employee.department || '',
        salary: employee.salary || '',
        taxCode: employee.taxCode || ''
      })
    }
  }, [location.state])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) || '' : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (isEditing) {
      updateEmployee(formData.id, formData)
    } else {
      addEmployee(formData)
    }

    setTimeout(() => {
      setLoading(false)
      navigate("/employees")
    }, 300) // small delay for smoother UX
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="taxCode"
        value={formData.taxCode}
        onChange={handleChange}
        placeholder="Tax Code"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 w-full"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Saving...
          </>
        ) : (
          isEditing ? "Update Employee" : "Add Employee"
        )}
      </button>
    </form>
  )
}

export default EmployeeForm
