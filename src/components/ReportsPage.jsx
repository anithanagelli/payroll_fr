import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import { FaFileAlt, FaChartBar, FaChartPie, FaDownload } from "react-icons/fa"
import "../styles/ReportsPage.css"

function ReportsPage() {
  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Generate and download payroll reports</p>
        </div>
      </div>

      <div className="reports-tabs">
        <div className="tabs-header">
          <button className="tab-button active">Payroll Reports</button>
          <button className="tab-button">Tax Reports</button>
          <button className="tab-button">Employee Reports</button>
        </div>

        <div className="tab-content">
          <div className="reports-grid">
            <Card className="report-card">
              <div className="report-header">
                <h3>
                  <FaFileAlt className="report-icon" />
                  Monthly Payroll Summary
                </h3>
              </div>
              <div className="report-content">
                <p>
                  Summary of all payroll transactions for the selected month, including gross pay, deductions, and net pay.
                </p>
                <Button className="btn-outline btn-block">
                  <FaDownload /> Generate Report
                </Button>
              </div>
            </Card>

            <Card className="report-card">
              <div className="report-header">
                <h3>
                  <FaFileAlt className="report-icon" />
                  Payslips Bundle
                </h3>
              </div>
              <div className="report-content">
                <p>Generate and download all employee payslips for the selected pay period in a single PDF file.</p>
                <Button className="btn-outline btn-block">
                  <FaDownload /> Generate Report
                </Button>
              </div>
            </Card>

            <Card className="report-card">
              <div className="report-header">
                <h3>
                  <FaChartBar className="report-icon" />
                  Payroll Analysis
                </h3>
              </div>
              <div className="report-content">
                <p>Detailed analysis of payroll costs, including breakdowns by department and trends over time.</p>
                <Button className="btn-outline btn-block">
                  <FaDownload /> Generate Report
                </Button>
              </div>
            </Card>

            <Card className="report-card">
              <div className="report-header">
                <h3>
                  <FaChartPie className="report-icon" />
                  Tax Distribution
                </h3>
              </div>
              <div className="report-content">
                <p>Visual breakdown of tax contributions by type and employee salary bands.</p>
                <Button className="btn-outline btn-block">
                  <FaDownload /> Generate Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
