import { useState } from "react"
import Button from "./ui/Button.jsx"
import "../styles/EmployeeForm.css"

function EmployeeForm({ onAdd }) {
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [salary, setSalary] = useState("")
  const [taxCode, setTaxCode] = useState("1257L")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      name,
      position,
      salary: Number.parseFloat(salary),
      taxCode,
      email,
      department,
    })

    // Reset form
    setName("");
    setPosition("");
    setSalary("");
    setTaxCode("1257L");
    setEmail("");
    setDepartment("");
  }

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="form-select"
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">Human Resources</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="salary">Annual Gross Salary (£)</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="taxCode">Tax Code</label>
        <input
          type="text"
          id="taxCode"
          value={taxCode}
          onChange={(e) => setTaxCode(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <Button type="submit" className="btn-primary btn-block">
        Add Employee
      </Button>
    </form>
  )
}

export default EmployeeForm
