//Button.jsx
function Button({ children, type = "button", className = "", onClick, disabled = false }) {
  const baseStyles = `
    inline-flex items-center justify-center
    px-4 py-2 rounded-md font-medium text-sm
    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
