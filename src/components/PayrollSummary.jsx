import { useRef } from "react"
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import { FaDownload } from "react-icons/fa"
import { generatePayslipPDF } from "../utils/pdfUtils.jsx"
import "../styles/PayrollSummary.css"

function PayrollSummary({ payrollData }) {
  const { employee, grossSalary, incomeTax, niContributions, pensionContribution, pensionRate, netSalary , paymentDate} = payrollData

  const summaryRef = useRef(null)

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
    <Card className="payroll-summary">
      <h3>Payroll Summary</h3>
      <div className="summary-container" ref={summaryRef}>
        <div className="summary-grid">
          <div className="summary-column">
            <h4>Annual</h4>
            <div className="summary-item">
              <span>Gross Salary:</span>
              <span className="value">
                £{grossSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item deduction">
              <span>Income Tax:</span>
              <span className="value">
                -£{incomeTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item deduction">
              <span>National Insurance:</span>
              <span className="value">
                -£{niContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item deduction">
              <span>Pension ({pensionRate}%):</span>
              <span className="value">
                -£
                {pensionContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item total">
              <span>Net Salary:</span>
              <span className="value">
                £{netSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="summary-column">
            <h4>Monthly</h4>
            <div className="summary-item">
              <span>Gross Salary:</span>
              <span className="value">
                £{monthlyGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item deduction">
              <span>Income Tax:</span>
              <span className="value">
                -£{monthlyTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item deduction">
              <span>National Insurance:</span>
              <span className="value">
                -£{monthlyNI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item deduction">
              <span>Pension ({pensionRate}%):</span>
              <span className="value">
                -£{monthlyPension.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-item total">
              <span>Net Salary:</span>
              <span className="value">
                £{monthlyNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="summary-actions">
        <Button onClick={handleDownloadPDF} className="btn-primary">
  <FaDownload /> Download Payslip PDF
</Button>
      </div>
    </Card>
  )
}

export default PayrollSummary
