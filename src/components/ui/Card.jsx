//Card.jsx
function Card({ children, className = "" }) {
  const baseClasses = "bg-white rounded-lg shadow overflow-hidden"
  return <div className={`${baseClasses} ${className}`}>{children}</div>
}

export default Card
