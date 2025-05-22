//PayrollSummary.jsx
import { useRef } from "react"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import { FaDownload } from "react-icons/fa"
import { generatePayslipPDF } from "../utils/pdfUtils.jsx"

function PayrollSummary({ payrollData }) {
  const { employee, grossSalary, incomeTax, niContributions, pensionContribution, pensionRate, netSalary, paymentDate } = payrollData

  const summaryRef = useRef(null)

  // Calculate weekly values
  const weeklyGross = grossSalary / 52
  const weeklyTax = incomeTax / 52
  const weeklyNI = niContributions / 52
  const weeklyPension = pensionContribution / 52
  const weeklyNet = netSalary / 52

  // Calculate monthly values
  const monthlyGross = grossSalary / 12
  const monthlyTax = incomeTax / 12
  const monthlyNI = niContributions / 12
  const monthlyPension = pensionContribution / 12
  const monthlyNet = netSalary / 12

  const handleDownloadPDF = () => {
    console.log("Download button clicked")
    generatePayslipPDF(payrollData)
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-5">Payroll Summary</h3>
      <div className="mb-6" ref={summaryRef}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Annual Summary Column */}
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <h4 className="p-3 bg-gray-50 border-b text-sm font-semibold">Annual</h4>
            <div className="flex justify-between p-3 border-b">
              <span>Gross Salary:</span>
              <span className="font-semibold">£{grossSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>Income Tax:</span>
              <span className="text-red-500">£{incomeTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>National Insurance:</span>
              <span className="text-red-500">£{niContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>Pension ({pensionRate}%):</span>
              <span className="text-red-500">£{pensionContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 font-semibold">
              <span>Net Salary:</span>
              <span className="text-green-600">£{netSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Monthly Summary Column */}
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <h4 className="p-3 bg-gray-50 border-b text-sm font-semibold">Monthly</h4>
            <div className="flex justify-between p-3 border-b">
              <span>Gross Salary:</span>
              <span className="font-semibold">£{monthlyGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>Income Tax:</span>
              <span className=" text-red-500">£{monthlyTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b">
              <span>National Insurance:</span>
              <span className=" text-red-500">£{monthlyNI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>Pension ({pensionRate}%):</span>
              <span className=" text-red-500">£{monthlyPension.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 font-semibold">
              <span>Net Salary:</span>
              <span className="text-green-600">£{monthlyNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
           {/* Weekly Summary Column */}
           <div className="border border-gray-300 rounded-md overflow-hidden">
            <h4 className="p-3 bg-gray-50 border-b text-sm font-semibold">Weekly</h4>
            <div className="flex justify-between p-3 border-b">
              <span>Gross Salary:</span>
              <span className="font-semibold">£{weeklyGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>Income Tax:</span>
              <span className=" text-red-500">£{weeklyTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b">
              <span>National Insurance:</span>
              <span className=" text-red-500">£{weeklyNI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 border-b ">
              <span>Pension ({pensionRate}%):</span>
              <span className=" text-red-500">£{weeklyPension.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 font-semibold">
              <span>Net Salary:</span>
              <span className="text-green-600">£{weeklyNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-4">
        <Button onClick={handleDownloadPDF} className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2">
          <FaDownload /> Download Payslip PDF
        </Button>
      </div>
    </Card>
  )
}

export default PayrollSummary
