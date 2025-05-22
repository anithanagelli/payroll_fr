//RecentActivity.jsx
import Card from "./ui/Card.jsx"

function RecentActivity() {
  const activities = [
    {
      id: 1,
      name: "Anitha Nagelli",
      action: "added to payroll",
      details: "New employee added with £45,000 annual salary",
      time: "Today",
    },
    {
      id: 2,
      name: "Swapna Damala",
      action: "payslip generated",
      details: "April 2025 payslip processed",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "Mounika CH",
      action: "salary updated",
      details: "Salary increased from £38,000 to £42,000",
      time: "2 days ago",
    },
    {
      id: 4,
      name: "Krupa Sekhar",
      action: "Monthly payroll processed",
      details: "March 2025 payroll completed for 24 employees",
      time: "28 Mar",
    },
    {
      id: 5,
      name: "Arun Nagelli",
      action: "payslip generated",
      details: "April 2025 payslip processed",
      time: "Today",
    }
  ]

  return (
    <Card className="mt-4">
      <div className="mb-4 flex justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <p className="text-sm text-gray-600">Recent payroll and employee activities</p>
      </div>
      <div className="flex flex-col gap-5 p-5 pt-0">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 shrink-0">
              {activity.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">{activity.name} {activity.action}</p>
              <p className="text-sm text-gray-500">{activity.details}</p>
            </div>
            <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RecentActivity
