import { Link } from "react-router-dom"
import Card from "./ui/Card.jsx"
import { FaUsers, FaMoneyBillWave, FaFileAlt, FaCog } from "react-icons/fa"
import DashboardStats from "./DashboardStats.jsx"
import RecentActivity from "./RecentActivity.jsx"

// Define the card content data to avoid repeating code
const cardData = [
  {
    to: "/employees",
    title: "Employees",
    icon: <FaUsers className="text-gray-500 text-xl"/>,
    heading: "Manage",
    description: "Add, edit, and manage employee information"
  },
  {
    to: "/payroll",
    title: "Payroll",
    icon: <FaMoneyBillWave className="text-gray-500 text-xl"/>,
    heading: "Process",
    description: "Calculate and process employee payroll"
  },
  {
    to: "/reports",
    title: "Reports",
    icon: <FaFileAlt className="text-gray-500 text-xl"/>,
    heading: "Generate",
    description: "Create and download payroll reports"
  },
  {
    to: "/settings",
    title: "Settings",
    icon: <FaCog className="text-gray-500 text-xl" />,
    heading: "Configure",
    description: "Manage company and payroll settings"
  }
]

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your payroll management system</p>
        <div className="flex gap-2 mt-4 flex-wrap md:flex-nowrap">
          <Link to="/payroll" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            <FaMoneyBillWave /> Run Payroll
          </Link>
          <Link to="/employees" className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
            <FaUsers /> Add Employee
          </Link>
        </div>
      </div>

      <DashboardStats />

      {/* Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {cardData.map(({ to, title, icon, heading, description }) => (
          <Link to={to} key={title} className="no-underline text-inherit">
            <Card className="h-full transition-transform hover:-translate-y-1 hover:shadow-md p-5">
              <div className="flex justify-between items-center border-b pb-2 mb-3 border-gray-200">
                <h3 className="text-lg font-semibold">{title}</h3>
                {icon}
              </div>
              <div>
                <p className="text-base font-semibold mb-1">{heading}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <RecentActivity />
    </div>
  )
}

export default Dashboard
