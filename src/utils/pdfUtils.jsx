import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Helper function to format currency
const formatCurrency = (amount) => {
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export const generatePayslipPDF = (payrollData) => {
  const {
    employee,
    grossSalary,
    incomeTax,
    niContributions,
    pensionContribution,
    pensionRate,
    netSalary,
    paymentDate,
  } = payrollData

  // Calculate monthly values
  const monthlyGross = grossSalary / 12
  const monthlyTax = incomeTax / 12
  const monthlyNI = niContributions / 12
  const monthlyPension = pensionContribution / 12
  const monthlyNet = netSalary / 12

  // Create a new PDF document
  const doc = new jsPDF()

  // Add company header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("PAYSLIP", 105, 20, { align: "center" })

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text("PayrollPro Ltd", 105, 30, { align: "center" })
  doc.setFontSize(10)
  doc.text("123 Business Street, London, UK", 105, 35, { align: "center" })
  doc.text("Company Reg: 12345678", 105, 40, { align: "center" })

  // Add horizontal line
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 45, 190, 45)

  // Add employee details
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Employee Details", 20, 55)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Name: ${employee?.name || "N/A"}`, 20, 65)
  doc.text(`Position: ${employee?.position || "Employee"}`, 20, 70)
  doc.text(`Tax Code: ${employee?.taxCode || "N/A"}`, 20, 75)
  doc.text(`Payment Date: ${paymentDate ? formatDate(paymentDate) : "N/A"}`, 20, 80)

  // Monthly payment table
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Monthly Payment Details", 20, 95)

  autoTable(doc, {
    startY: 100,
    head: [["Description", "Amount"]],
    body: [
      ["Gross Salary", formatCurrency(monthlyGross)],
      ["Income Tax", `-${formatCurrency(monthlyTax)}`],
      ["National Insurance", `-${formatCurrency(monthlyNI)}`],
      [`Pension Contribution (${pensionRate}%)`, `-${formatCurrency(monthlyPension)}`],
      ["Net Pay", formatCurrency(monthlyNet)],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 139, 202] },
    // foot: [["Net Pay", formatCurrency(monthlyNet)]],
    // footStyles: { fillColor: [66, 139, 202], fontStyle: "bold" },
  })

  // Annual payment table
  const afterMonthlyTableY = doc.lastAutoTable.finalY + 20

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Annual Payment Details", 20, afterMonthlyTableY)

  autoTable(doc, {
    startY: afterMonthlyTableY + 5,
    head: [["Description", "Amount"]],
    body: [
      ["Gross Salary", formatCurrency(grossSalary)],
      ["Income Tax", `-${formatCurrency(incomeTax)}`],
      ["National Insurance", `-${formatCurrency(niContributions)}`],
      [`Pension Contribution (${pensionRate}%)`, `-${formatCurrency(pensionContribution)}`],
      ["Net Pay", formatCurrency(netSalary)],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 139, 202] },
    // foot: [["Net Pay", formatCurrency(netSalary)]],
    // footStyles: { fillColor: [66, 139, 202], fontStyle: "bold" },
  })

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.text("This payslip was generated automatically by PayrollPro.", 105, 280, { align: "center" })
  doc.text("Please contact HR for any queries regarding this payslip.", 105, 285, { align: "center" })

  // Save the PDF
  const safeName = (employee?.name || "employee").replace(/\s+/g, "-").toLowerCase()
  const fileName = `${safeName}-payslip.pdf`
  doc.save(fileName)
}
