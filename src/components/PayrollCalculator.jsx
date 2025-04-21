import { useState } from "react"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import PayrollSummary from "./PayrollSummary.jsx"
import { FaCalculator } from "react-icons/fa"
import "../styles/PayrollCalculator.css"

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
    } else if (taxableIncome <= 37500) {
      incomeTax = taxableIncome * 0.2 // Basic rate 20%
    } else if (taxableIncome <= 100870) {
      incomeTax = 37500 * 0.2 + (taxableIncome - 37500) * 0.4 // Higher rate 40%
    } else {
      incomeTax = 37500 * 0.2 + (100870 - 37500) * 0.4 + (taxableIncome - 100870) * 0.45 // Additional rate 45%
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
    <div className="payroll-calculator">
      <div className="calculator-grid">
        <Card className="calculator-card">
          <h3>Payroll Calculator</h3>
          <div className="form-group">
            <label htmlFor="employee-name">Employee</label>
            <input type="text" id="employee-name" value={employee.name} readOnly className="form-input readonly" />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input type="text" id="position" value={employee.position} readOnly className="form-input readonly" />
          </div>

          <div className="form-group">
            <label htmlFor="tax-code">Tax Code</label>
            <input type="text" id="tax-code" value={employee.taxCode} readOnly className="form-input readonly" />
          </div>

          <div className="form-group">
            <label htmlFor="gross-salary">Annual Gross Salary (£)</label>
            <input
              type="number"
              id="gross-salary"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number.parseFloat(e.target.value))}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pension-rate">Pension Contribution (%)</label>
            <input
              type="number"
              id="pension-rate"
              value={pensionRate}
              onChange={(e) => setPensionRate(Number.parseFloat(e.target.value))}
              min="0"
              max="100"
              className="form-input"
            />
          </div>

          <Button onClick={calculatePayroll} className="btn-primary btn-block">
            <FaCalculator /> Calculate Payroll
          </Button>
        </Card>

        {calculated && <PayrollSummary payrollData={payrollData} />}
      </div>
    </div>
  )
}

export default PayrollCalculator
