//ReportsPage.jsx
import Card from "./ui/Card.jsx"
import Button from "./ui/Button.jsx"
import { FaFileAlt, FaChartBar, FaChartPie, FaDownload } from "react-icons/fa"

function ReportsPage() {
  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-gray-500">Generate and download payroll reports</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex border-b mb-6 overflow-x-auto">
          <button className="py-3 px-4 text-gray-600 font-medium border-b-2 border-transparent focus:outline-none active:text-blue-600 active:border-blue-600">
            Payroll Reports
          </button>
          <button className="py-3 px-4 text-gray-600 font-medium border-b-2 border-transparent focus:outline-none hover:text-blue-600 hover:border-blue-600">
            Tax Reports
          </button>
          <button className="py-3 px-4 text-gray-600 font-medium border-b-2 border-transparent focus:outline-none hover:text-blue-600 hover:border-blue-600">
            Employee Reports
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="h-full">
            <div className="p-4 border-b">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaFileAlt className="text-gray-600" />
                Monthly Payroll Summary
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Summary of all payroll transactions for the selected month, including gross pay, deductions, and net pay.
              </p>
              <Button className="w-full bg-transparent text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 flex items-center gap-2">
                <FaDownload /> Generate Report
              </Button>
            </div>
          </Card>

          <Card className="h-full">
            <div className="p-4 border-b">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaFileAlt className="text-gray-600" />
                Payslips Bundle
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Generate and download all employee payslips for the selected pay period in a single PDF file.
              </p>
              <Button className="w-full bg-transparent text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 flex items-center gap-2">
                <FaDownload /> Generate Report
              </Button>
            </div>
          </Card>

          <Card className="h-full">
            <div className="p-4 border-b">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaChartBar className="text-gray-600" />
                Payroll Analysis
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Detailed analysis of payroll costs, including breakdowns by department and trends over time.
              </p>
              <Button className="w-full bg-transparent text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 flex items-center gap-2">
                <FaDownload /> Generate Report
              </Button>
            </div>
          </Card>

          <Card className="h-full">
            <div className="p-4 border-b">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaChartPie className="text-gray-600" />
                Tax Distribution
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Visual breakdown of tax contributions by type and employee salary bands.
              </p>
              <Button className="w-full bg-transparent text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 flex items-center gap-2">
                <FaDownload /> Generate Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
