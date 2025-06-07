"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PayrollRun = ({ employees, company, onGeneratePayslip, onLogout }) => {
  const navigate = useNavigate()
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [payrollData, setPayrollData] = useState({
    payDate: new Date().toISOString().split("T")[0],
    periodEnd: new Date().toISOString().split("T")[0],
  })
  const [generatedPayslips, setGeneratedPayslips] = useState([])

  const calculatePayslip = (employee) => {
    const annualSalary = Number.parseFloat(employee.pay?.salary || 0)
    let grossPay = 0

    // Calculate gross pay based on pay period
    switch (company.payPeriod) {
      case "WEEKLY":
        grossPay = annualSalary / 52
        break
      case "FORTNIGHTLY":
        grossPay = annualSalary / 26
        break
      case "MONTHLY":
        grossPay = annualSalary / 12
        break
      case "QUARTERLY":
        grossPay = annualSalary / 4
        break
      default:
        grossPay = annualSalary / 12
    }

    // Personal allowance (2024-25 tax year)
    const personalAllowance = 12570
    const personalAllowancePeriod =
      personalAllowance /
      (company.payPeriod === "WEEKLY"
        ? 52
        : company.payPeriod === "FORTNIGHTLY"
          ? 26
          : company.payPeriod === "MONTHLY"
            ? 12
            : 4)

    // Calculate taxable income
    const taxableIncome = Math.max(0, grossPay - personalAllowancePeriod)

    // Income tax calculation (basic rate 20%)
    const incomeTax = taxableIncome * 0.2

    // National Insurance calculation (12% on earnings above £242 per week / £1048 per month)
    const niThreshold =
      company.payPeriod === "WEEKLY"
        ? 242
        : company.payPeriod === "FORTNIGHTLY"
          ? 484
          : company.payPeriod === "MONTHLY"
            ? 1048
            : 3144
    const nationalInsurance = Math.max(0, (grossPay - niThreshold) * 0.12)

    // Employer's National Insurance (13.8% on earnings above threshold)
    const employersNI = Math.max(0, (grossPay - niThreshold) * 0.138)

    const deductionsTotal = incomeTax + nationalInsurance
    const takeHomePay = grossPay - deductionsTotal

    return {
      firstName: employee.personalDetails.firstName,
      lastName: employee.personalDetails.lastName,
      address: employee.personalDetails.address,
      postCode: employee.personalDetails.postCode,
      employeeId: employee.personalDetails.employeeId,
      region: company.region,
      taxYear: company.taxYear,
      taxCode: employee.taxNI?.taxCode || "1257L",
      NI_Number: employee.taxNI?.niNumber || "",
      payPeriod: company.payPeriod,
      payDate: payrollData.payDate,
      periodEnd: payrollData.periodEnd,
      grossPayTotal: grossPay.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      personalAllowance: personalAllowancePeriod.toFixed(2),
      incomeTaxTotal: incomeTax.toFixed(2),
      nationalInsurance: nationalInsurance.toFixed(2),
      employersNationalInsurance: employersNI.toFixed(2),
      deductionsTotal: deductionsTotal.toFixed(2),
      takeHomePayTotal: takeHomePay.toFixed(2),
      paySlipReference: `PAY-${employee.personalDetails.employeeId}-${Date.now()}`,
    }
  }

  const handleEmployeeSelection = (employeeId) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId],
    )
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(employees.map((emp) => emp.id))
    }
  }

  const handleGeneratePayslips = () => {
    const payslips = selectedEmployees.map((employeeId) => {
      const employee = employees.find((emp) => emp.id === employeeId)
      const payslipData = calculatePayslip(employee)
      return onGeneratePayslip(payslipData)
    })
    setGeneratedPayslips(payslips)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payroll Run</h1>
              <p className="text-sm text-gray-600">Generate payslips for selected employees</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/employer-dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </button>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {employees.length === 0 ? (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No employees</h3>
              <p className="mt-1 text-sm text-gray-500">Add employees first to run payroll.</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/add-employee")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Employee
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Payroll Settings */}
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Payroll Settings</h3>
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                        value={payrollData.payDate}
                        onChange={(e) => setPayrollData((prev) => ({ ...prev, payDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Period End Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                        value={payrollData.periodEnd}
                        onChange={(e) => setPayrollData((prev) => ({ ...prev, periodEnd: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Selection */}
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Select Employees</h3>
                    <button onClick={handleSelectAll} className="text-sm text-indigo-600 hover:text-indigo-500">
                      {selectedEmployees.length === employees.length ? "Deselect All" : "Select All"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {employees.map((employee) => (
                      <div key={employee.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => handleEmployeeSelection(employee.id)}
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {employee.personalDetails.firstName} {employee.personalDetails.lastName}
                              </p>
                              <p className="text-sm text-gray-500">
                                ID: {employee.personalDetails.employeeId} | Salary: £{employee.pay?.salary || 0}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                £{calculatePayslip(employee).grossPayTotal}
                              </p>
                              <p className="text-sm text-gray-500">Gross Pay</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedEmployees.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">{selectedEmployees.length} employee(s) selected</p>
                          <p className="text-lg font-medium text-gray-900">
                            Total: £
                            {selectedEmployees
                              .reduce((total, empId) => {
                                const employee = employees.find((emp) => emp.id === empId)
                                return total + Number.parseFloat(calculatePayslip(employee).grossPayTotal)
                              }, 0)
                              .toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={handleGeneratePayslips}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium"
                        >
                          Generate Payslips
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Generated Payslips */}
              {generatedPayslips.length > 0 && (
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Generated Payslips</h3>
                    <div className="space-y-3">
                      {generatedPayslips.map((payslip) => (
                        <div
                          key={payslip.id}
                          className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {payslip.firstName} {payslip.lastName}
                            </p>
                            <p className="text-sm text-gray-500">Reference: {payslip.paySlipReference}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">£{payslip.takeHomePayTotal}</p>
                            <button
                              onClick={() => navigate(`/payslip/${payslip.id}`)}
                              className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                              View Payslip
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PayrollRun
