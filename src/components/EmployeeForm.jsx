//EmployeeForm
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEmployees } from "../context/EmployeeContext.jsx"

function EmployeeForm({ onAdd, employee }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { addEmployee, updateEmployee } = useEmployees()

  // Either it's a new employee or an edit, check if there's any state passed
  const [formData, setFormData] = useState(employee || { name: '', position: '', department: '', salary: '', taxCode: '' })

  useEffect(() => {
    if (location.state?.employee) {
      setFormData(location.state.employee) // Pre-fill the form if editing
    }
  }, [location.state])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.id) {
      updateEmployee(formData) // Update existing employee
    } else {
      addEmployee(formData) // Add new employee
    }
    navigate('/employees') // After form submission, navigate back to employees list
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit">{employee ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  )
}

export default EmployeeForm
