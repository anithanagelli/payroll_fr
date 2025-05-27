import { useState } from "react";
import Card from "./ui/Card.jsx";
import PayrollCalculator from "./PayrollCalculator.jsx";
import { useEmployees } from "../context/EmployeeContext.jsx";

function PayrollPage() {
  const { employees } = useEmployees(); // Using context instead of localStorage
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Payroll</h1>
          <p className="text-gray-600">Process and manage your company's payroll</p>
        </div>
      </div>

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
              const id = Number.parseInt(e.target.value);
              const employee = employees.find((emp) => emp.id === id);
              setSelectedEmployee(employee);
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
  );
}

export default PayrollPage;
