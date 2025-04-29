import { useState, useEffect } from "react"
import Button from "./ui/Button.jsx"

function EmployeeForm({ onAdd, employee }) {
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [salary, setSalary] = useState("")
  const [taxCode, setTaxCode] = useState("1257L")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")

  useEffect(() => {
    if (employee) {
      setName(employee.name || "")
      setEmail(employee.email || "")
      setPosition(employee.position || "")
      setDepartment(employee.department || "")
      setSalary(employee.salary || "")
      setTaxCode(employee.taxCode || "1257L")
    }
  }, [employee])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...employee,
      name,
      email,
      position,
      department,
      salary: Number.parseFloat(salary),
      taxCode,
    })

    if (!employee) {
      setName("")
      setEmail("")
      setPosition("")
      setDepartment("")
      setSalary("")
      setTaxCode("1257L")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium text-sm">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium text-sm">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="position" className="font-medium text-sm">
          Position
        </label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="department" className="font-medium text-sm">
          Department
        </label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">Human Resources</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="salary" className="font-medium text-sm">
          Annual Gross Salary (£)
        </label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="taxCode" className="font-medium text-sm">
          Tax Code
        </label>
        <input
          type="text"
          id="taxCode"
          value={taxCode}
          onChange={(e) => setTaxCode(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {employee ? "Update Employee" : "Add Employee"}
      </Button>
    </form>
  )
}

export default EmployeeForm
