import Card from "./ui/Card.jsx"
import "../styles/RecentActivity.css"

function RecentActivity() {
  const activities = [
    {
      id: 1,
      name: "John Doe",
      action: "added to payroll",
      details: "New employee added with £45,000 annual salary",
      time: "Today",
    },
    {
      id: 2,
      name: "Sarah Davis",
      action: "payslip generated",
      details: "April 2025 payslip processed",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "William Smith",
      action: "salary updated",
      details: "Salary increased from £38,000 to £42,000",
      time: "2 days ago",
    },
    {
      id: 4,
      name: "Monthly payroll",
      action: "processed",
      details: "March 2025 payroll completed for 24 employees",
      time: "28 Mar",
    },
  ]

  return (
    <Card className="recent-activity">
      <div className="card-header">
        <h2>Recent Activity</h2>
        <p>Recent payroll and employee activities</p>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-avatar">
              {activity.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="activity-details">
              <p className="activity-title">
                {activity.name} {activity.action}
              </p>
              <p className="activity-description">{activity.details}</p>
            </div>
            <div className="activity-time">{activity.time}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RecentActivity
