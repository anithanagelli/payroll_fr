//PayrollPage.jsx
import { useState, useEffect } from "react"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import PayrollCalculator from "./PayrollCalculator.jsx"
import { FaPlay, FaCalendarAlt } from "react-icons/fa"

function PayrollPage() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Load employees from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("employees")
    if (stored) {
      setEmployees(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Payroll</h1>
          <p className="text-gray-600">Process and manage your company's payroll</p>
        </div>
        {/* <div className="flex gap-4">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <FaPlay /> Run Payroll
          </Button>
          <Button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            <FaCalendarAlt /> Schedule
          </Button>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-3 mb-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Next Payroll</h3>
          <p className="text-sm text-gray-500 mb-2">April 2025</p>
          <div className="text-2xl font-semibold mb-2">28 April 2025</div>
          <p className="text-sm text-gray-500">11 days remaining</p>
          <Button className="bg-blue-600 text-white text-sm w-full py-2 mt-4 flex items-center justify-center gap-2">
            <FaPlay /> Process Now
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Estimated Total</h3>
          <p className="text-sm text-gray-500 mb-2">Based on current employees</p>
          <div className="text-2xl font-semibold mb-2">£68,432</div>
          <p className="text-sm text-gray-500">Gross amount</p>
          <div className="text-2xl font-semibold mb-2">£52,345</div>
          <p className="text-sm text-gray-500">Net amount</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Tax & NI</h3>
          <p className="text-sm text-gray-500 mb-2">Estimated contributions</p>
          <div className="text-2xl font-semibold mb-2">£12,234</div>
          <p className="text-sm text-gray-500">Income Tax</p>
          <div className="text-2xl font-semibold mb-2">£3,853</div>
          <p className="text-sm text-gray-500">National Insurance</p>
        </Card>
      </div> */}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Process Individual Payroll</h2>
        <p className="text-gray-600 mb-6">Select an employee to calculate and process their payroll</p>

        <div className="mb-6 max-w-md">
          <label htmlFor="employee-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Employee:
          </label>
          <select
            id="employee-select"
            className="form-select block w-full p-2 border border-gray-300 rounded-md"
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
