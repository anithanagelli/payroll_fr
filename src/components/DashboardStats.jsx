import Card from "./ui/Card.jsx"
import { FaUsers, FaMoneyBillWave, FaPoundSign, FaReceipt } from "react-icons/fa"

function DashboardStats() {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
          <FaUsers className="text-gray-400 text-base" />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-1">24</p>
          <p className="text-xs text-gray-500">+2 from last month</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Monthly Payroll</h3>
          <FaMoneyBillWave className="text-gray-400 text-base" />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-1">£68,432</p>
          <p className="text-xs text-gray-500">+£4,320 from last month</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Tax Contributions</h3>
          <FaPoundSign className="text-gray-400 text-base" />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-1">£12,234</p>
          <p className="text-xs text-gray-500">+£842 from last month</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Payslips Generated</h3>
          <FaReceipt className="text-gray-400 text-base" />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-1">24</p>
          <p className="text-xs text-gray-500">+2 from last month</p>
        </div>
      </Card>
    </div>
  )
}

export default DashboardStats
