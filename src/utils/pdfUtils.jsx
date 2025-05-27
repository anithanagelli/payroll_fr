//pdfUtils.jsx
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
    employee = {}, // Set default empty object in case employee is undefined
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

  // Calculate weekly values
  const weeklyGross = grossSalary / 52
  const weeklyTax = incomeTax / 52
  const weeklyNI = niContributions / 52
  const weeklyPension = pensionContribution / 52
  const weeklyNet = netSalary / 52

  // Create a new PDF document
  const doc = new jsPDF()

  // Add company header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("PAYSLIP", 105, 20, { align: "center" })

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text("Middleware Talents Pvt Ltd", 105, 30, { align: "center" })
  doc.setFontSize(10)
  doc.text("200, Brrok Drive, Green park, Reading, RG2 6UB, UK", 105, 35, { align: "center" })
  doc.text("Company Reg: 0800 060 8702", 105, 40, { align: "center" })

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

  // weekly payment table
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Weekly Payment Details", 20, 95)

  autoTable(doc, {
    startY: 100, // Start Y position for weekly table
    head: [["Description", "Amount"]],
    body: [
      ["Gross Salary", formatCurrency(weeklyGross)],
      ["Income Tax", `${formatCurrency(weeklyTax)}`],
      ["National Insurance", `${formatCurrency(weeklyNI)}`],
      [`Pension Contribution (${pensionRate}%)`, `${formatCurrency(weeklyPension)}`],
      ["Net Pay", formatCurrency(weeklyNet)],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 139, 202] },
  })

  // Adjust Y position after weekly table
  const afterWeeklyTableY = doc.lastAutoTable.finalY + 10

  // Monthly payment table
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Monthly Payment Details", 20, afterWeeklyTableY)

  autoTable(doc, {
    startY: afterWeeklyTableY + 5, // Start Y position for monthly table
    head: [["Description", "Amount"]],
    body: [
      ["Gross Salary", formatCurrency(monthlyGross)],
      ["Income Tax", `${formatCurrency(monthlyTax)}`],
      ["National Insurance", `${formatCurrency(monthlyNI)}`],
      [`Pension Contribution (${pensionRate}%)`, `${formatCurrency(monthlyPension)}`],
      ["Net Pay", formatCurrency(monthlyNet)],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 139, 202] },
  })

  // Adjust Y position after monthly table
  const afterMonthlyTableY = doc.lastAutoTable.finalY + 10

  // Annual payment table
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Annual Payment Details", 20, afterMonthlyTableY)

  autoTable(doc, {
    startY: afterMonthlyTableY + 5, // Start Y position for annual table
    head: [["Description", "Amount"]],
    body: [
      ["Gross Salary", formatCurrency(grossSalary)],
      ["Income Tax", `${formatCurrency(incomeTax)}`],
      ["National Insurance", `${formatCurrency(niContributions)}`],
      [`Pension Contribution (${pensionRate}%)`, `${formatCurrency(pensionContribution)}`],
      ["Net Pay", formatCurrency(netSalary)],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 139, 202] },
  })

  // Adjust Y position for footer
  const afterAnnualTableY = doc.lastAutoTable.finalY + 10

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.text("This payslip was generated automatically by PayrollPro.", 105, afterAnnualTableY + 10, { align: "center" })
  doc.text("Please contact HR for any queries regarding this payslip.", 105, afterAnnualTableY + 15, { align: "center" })

  // Save the PDF
  const safeName = (employee?.name || "employee").replace(/\s+/g, "-").toLowerCase()
  const fileName = `${safeName}-payslip.pdf`
  doc.save(fileName)
}
