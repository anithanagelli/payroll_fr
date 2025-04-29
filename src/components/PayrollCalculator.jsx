import { useState } from "react"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import PayrollSummary from "./PayrollSummary.jsx"
import { FaCalculator } from "react-icons/fa"

function PayrollCalculator({ employee }) {
  const [grossSalary, setGrossSalary] = useState(employee.salary)
  const [pensionRate, setPensionRate] = useState(5)
  const [netSalary, setNetSalary] = useState(0)
  const [tax, setTax] = useState(0)
  const [ni, setNi] = useState(0)
  const [pension, setPension] = useState(0)
  const [calculated, setCalculated] = useState(false)

  const calculatePayroll = () => {
    // UK Income Tax Calculation (2025/26)
    let incomeTax = 0
    const taxableIncome = grossSalary - 12570 // Personal allowance

    if (taxableIncome <= 0) {
      incomeTax = 0
    } else if (taxableIncome <= 37700) {
      incomeTax = taxableIncome * 0.2 // Basic rate 20%
    } else if (taxableIncome <= 125140) {
      incomeTax = 37700 * 0.2 + (taxableIncome - 37700) * 0.4 // Higher rate 40%
    } else {
      incomeTax = 37700 * 0.2 + (125140 - 37700) * 0.4 + (taxableIncome - 125140) * 0.45 // Additional rate 45%
    }

    // UK National Insurance (Class 1 Employee Contributions)
    let niContributions = 0
    if (grossSalary > 12570) {
      if (grossSalary <= 50340) {
        niContributions = (grossSalary - 12570) * 0.08 // NI 8%
      } else {
        niContributions = (50340 - 12570) * 0.08 + (grossSalary - 50340) * 0.02 // NI 2%
      }
    }

    // Calculate pension contribution
    const pensionContribution = (grossSalary * pensionRate) / 100

    // Calculate net salary (gross - tax - NI - pension)
    const netPay = grossSalary - incomeTax - niContributions - pensionContribution

    setTax(incomeTax)
    setNi(niContributions)
    setPension(pensionContribution)
    setNetSalary(netPay)
    setCalculated(true)
  }

  const payrollData = {
    employee,
    grossSalary,
    incomeTax: tax,
    niContributions: ni,
    pensionContribution: pension,
    pensionRate,
    netSalary,
    paymentDate: new Date().toISOString(),
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-5 text-xl font-semibold">Payroll Calculator</h3>
          <div className="mb-4">
            <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700">Employee</label>
            <input type="text" id="employee-name" value={employee.name} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
            <input type="text" id="position" value={employee.position} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <label htmlFor="tax-code" className="block text-sm font-medium text-gray-700">Tax Code</label>
            <input type="text" id="tax-code" value={employee.taxCode} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <label htmlFor="gross-salary" className="block text-sm font-medium text-gray-700">Annual Gross Salary (£)</label>
            <input
              type="number"
              id="gross-salary"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number.parseFloat(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pension-rate" className="block text-sm font-medium text-gray-700">Pension Contribution (%)</label>
            <input
              type="number"
              id="pension-rate"
              value={pensionRate}
              onChange={(e) => setPensionRate(Number.parseFloat(e.target.value))}
              min="0"
              max="100"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <Button onClick={calculatePayroll} className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md flex items-center justify-center gap-2">
            <FaCalculator /> Calculate Payroll
          </Button>
        </Card>

        {calculated && <PayrollSummary payrollData={payrollData} />}
      </div>
    </div>
  )
}

export default PayrollCalculator
