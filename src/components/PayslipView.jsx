"use client"

import { useParams, useNavigate } from "react-router-dom"

const PayslipView = ({ payslips, user, onLogout }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const payslip = payslips.find((p) => p.id === id)

  if (!payslip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Payslip not found</h2>
          <button
            onClick={() => navigate(user?.type === "employer" ? "/employer-dashboard" : "/employee-dashboard")}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    const element = document.getElementById("payslip-content")

    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payslip - ${payslip.paySlipReference}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.4;
              color: #333;
            }
            .payslip-container {
              max-width: 800px;
              margin: 0 auto;
              border: 2px solid #000;
              padding: 20px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #000;
              padding-bottom: 20px;
            }
            .company-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .payslip-title {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .section { 
              margin-bottom: 20px; 
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 20px;
            }
            .detail-item {
              margin-bottom: 8px;
            }
            .detail-label {
              font-weight: bold;
              display: inline-block;
              width: 150px;
            }
            .pay-breakdown {
              border: 1px solid #000;
              margin: 20px 0;
            }
            .pay-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 15px;
              border-bottom: 1px solid #ccc;
            }
            .pay-row:last-child {
              border-bottom: none;
            }
            .pay-section-header {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .total-row {
              background-color: #e8f5e8;
              font-weight: bold;
              border-top: 2px solid #000;
            }
            .net-pay {
              background-color: #d4edda;
              font-size: 18px;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #ccc;
              padding-top: 15px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="payslip-container">
            <div class="header">
              <div class="company-name">UK PAYROLL SYSTEM</div>
              <div class="payslip-title">PAYSLIP</div>
              <div>Pay Period: ${payslip.payPeriod} | Tax Year: ${payslip.taxYear}</div>
            </div>

            <div class="details-grid">
              <div>
                <div class="section-title">Employee Details</div>
                <div class="detail-item">
                  <span class="detail-label">Name:</span> ${payslip.firstName} ${payslip.lastName}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Employee ID:</span> ${payslip.employeeId}
                </div>
                <div class="detail-item">
                  <span class="detail-label">NI Number:</span> ${payslip.NI_Number}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Tax Code:</span> ${payslip.taxCode}
                </div>
              </div>

              <div>
                <div class="section-title">Pay Details</div>
                <div class="detail-item">
                  <span class="detail-label">Pay Date:</span> ${new Date(payslip.payDate).toLocaleDateString("en-GB")}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Period End:</span> ${new Date(payslip.periodEnd).toLocaleDateString("en-GB")}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Pay Reference:</span> ${payslip.paySlipReference}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Region:</span> ${payslip.region}
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Address</div>
              <div>${payslip.address}</div>
              <div>${payslip.postCode}</div>
            </div>

            <div class="pay-breakdown">
              <div class="pay-row pay-section-header">
                <span>EARNINGS</span>
                <span>AMOUNT (£)</span>
              </div>
              <div class="pay-row">
                <span>Gross Pay</span>
                <span>${payslip.grossPayTotal}</span>
              </div>

              <div class="pay-row pay-section-header">
                <span>DEDUCTIONS</span>
                <span>AMOUNT (£)</span>
              </div>
              <div class="pay-row">
                <span>Personal Allowance</span>
                <span>${payslip.personalAllowance}</span>
              </div>
              <div class="pay-row">
                <span>Taxable Income</span>
                <span>${payslip.taxableIncome}</span>
              </div>
              <div class="pay-row">
                <span>Income Tax</span>
                <span>${payslip.incomeTaxTotal}</span>
              </div>
              <div class="pay-row">
                <span>National Insurance</span>
                <span>${payslip.nationalInsurance}</span>
              </div>
              <div class="pay-row total-row">
                <span>Total Deductions</span>
                <span>${payslip.deductionsTotal}</span>
              </div>

              <div class="pay-row net-pay">
                <span>NET PAY (TAKE HOME)</span>
                <span>£${payslip.takeHomePayTotal}</span>
              </div>

              <div class="pay-row pay-section-header">
                <span>EMPLOYER COSTS</span>
                <span>AMOUNT (£)</span>
              </div>
              <div class="pay-row">
                <span>Employer's National Insurance</span>
                <span>${payslip.employersNationalInsurance}</span>
              </div>
            </div>

            <div class="footer">
              <p>This payslip is generated electronically and is valid without signature.</p>
              <p>Generated on: ${new Date().toLocaleDateString("en-GB")}</p>
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payslip</h1>
              <p className="text-sm text-gray-600">Reference: {payslip.paySlipReference}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Download PDF
              </button>
              <button
                onClick={() => navigate(user?.type === "employer" ? "/employer-dashboard" : "/employee-dashboard")}
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

      {/* Payslip Content */}
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div id="payslip-content" className="p-8">
            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-gray-900 pb-6">
              <h2 className="text-3xl font-bold text-gray-900">UK PAYROLL SYSTEM</h2>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">PAYSLIP</h3>
              <p className="text-gray-600 mt-2">
                Pay Period: {payslip.payPeriod} | Tax Year: {payslip.taxYear}
              </p>
            </div>

            {/* Employee Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                  Employee Details
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium w-32 inline-block">Name:</span> {payslip.firstName} {payslip.lastName}
                  </p>
                  <p>
                    <span className="font-medium w-32 inline-block">Employee ID:</span> {payslip.employeeId}
                  </p>
                  <p>
                    <span className="font-medium w-32 inline-block">NI Number:</span> {payslip.NI_Number}
                  </p>
                  <p>
                    <span className="font-medium w-32 inline-block">Tax Code:</span> {payslip.taxCode}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">Pay Details</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium w-32 inline-block">Pay Date:</span>{" "}
                    {new Date(payslip.payDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <span className="font-medium w-32 inline-block">Period End:</span>{" "}
                    {new Date(payslip.periodEnd).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <span className="font-medium w-32 inline-block">Pay Reference:</span> {payslip.paySlipReference}
                  </p>
                  <p>
                    <span className="font-medium w-32 inline-block">Region:</span> {payslip.region}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">Address</h3>
              <p>{payslip.address}</p>
              <p>{payslip.postCode}</p>
            </div>

            {/* Pay Breakdown */}
            <div className="border-2 border-gray-900">
              {/* Earnings */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                <div className="flex justify-between font-bold">
                  <span>EARNINGS</span>
                  <span>AMOUNT (£)</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-300">
                <div className="flex justify-between">
                  <span>Gross Pay</span>
                  <span className="font-medium">{payslip.grossPayTotal}</span>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                <div className="flex justify-between font-bold">
                  <span>DEDUCTIONS</span>
                  <span>AMOUNT (£)</span>
                </div>
              </div>
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex justify-between">
                  <span>Personal Allowance</span>
                  <span className="font-medium">{payslip.personalAllowance}</span>
                </div>
              </div>
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex justify-between">
                  <span>Taxable Income</span>
                  <span className="font-medium">{payslip.taxableIncome}</span>
                </div>
              </div>
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex justify-between">
                  <span>Income Tax</span>
                  <span className="font-medium">{payslip.incomeTaxTotal}</span>
                </div>
              </div>
              <div className="px-4 py-2 border-b border-gray-300">
                <div className="flex justify-between">
                  <span>National Insurance</span>
                  <span className="font-medium">{payslip.nationalInsurance}</span>
                </div>
              </div>
              <div className="bg-green-50 px-4 py-3 border-b-2 border-gray-900">
                <div className="flex justify-between font-bold">
                  <span>Total Deductions</span>
                  <span>{payslip.deductionsTotal}</span>
                </div>
              </div>

              {/* Net Pay */}
              <div className="bg-green-100 px-4 py-4 border-b border-gray-300">
                <div className="flex justify-between text-lg font-bold text-green-800">
                  <span>NET PAY (TAKE HOME)</span>
                  <span>£{payslip.takeHomePayTotal}</span>
                </div>
              </div>

              {/* Employer Costs */}
              <div className="bg-blue-50 px-4 py-3 border-b border-gray-300">
                <div className="flex justify-between font-bold">
                  <span>EMPLOYER COSTS</span>
                  <span>AMOUNT (£)</span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex justify-between">
                  <span>Employer's National Insurance</span>
                  <span className="font-medium">{payslip.employersNationalInsurance}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-500">
              <p>This payslip is generated electronically and is valid without signature.</p>
              <p>Generated on: {new Date().toLocaleDateString("en-GB")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayslipView
