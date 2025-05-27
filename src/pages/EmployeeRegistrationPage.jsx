//EmployeeRegistrationPage
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaUserPlus, FaExclamationTriangle, FaCheck } from "react-icons/fa"
import { useEmployees } from "../context/EmployeeContext.jsx"
import { FaSpinner } from "react-icons/fa";
import Loader from "../components/ui/loader.jsx";


function EmployeeRegistrationPage() {
  const navigate = useNavigate()
  const { addEmployee, getEmployee, updateEmployee } = useEmployees()
  const { employeeId } = useParams()  // Assuming you're passing the employeeId in the URL
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob:"",
    password: "",
    confirmPassword: "",
    position: "",
    department: "",
    salary: "",
    taxCode: "1257L",
    startDate: "",
    employeeId: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  })
  const [errors, setErrors] = useState({})

  const departments = [
    "Development",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Operations",
    "Customer Support",
    "Research & Development",
    "Legal",
    "Executive",
  ]

  useEffect(() => {
  if (employeeId) {
    const employee = getEmployee(employeeId);
    if (employee) {
      setFormData((prev) => ({
        ...prev,
        ...employee,
        // password: "",
        // confirmPassword: "",
      }));
    }
  }
}, [employeeId, getEmployee]);


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear specific field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "dob",
      "password",
      "confirmPassword",
      "position",
      "department",
      "salary",
      "startDate",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Salary validation
    if (formData.salary && isNaN(Number(formData.salary))) {
      newErrors.salary = "Salary must be a number"
    }

    // Phone number validation
    if (formData.phoneNumber && !/^[0-9+\s()-]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  // setError("");
  // setSuccess(false);

  if (!validateForm()) {
    setError("Please correct the errors in the form");
    return;
  }

  setIsLoading(true);
  setError("");

  const employeeData = {
    ...formData,
    name: `${formData.firstName} ${formData.lastName}`,
    salary: Number(formData.salary),
    status: "Active",
  };

  try {
    if (employeeId) {
      await updateEmployee(Number(employeeId), employeeData);
      console.log("Employee updated:", employeeData);
    } else {
      const newEmployee = await addEmployee(employeeData);
      console.log("New employee added:", newEmployee);
    }

    setSuccess(true);

    setTimeout(() => {
       setIsLoading(true)
      navigate("/employees");
    }, 2000);
  } catch (err) {
    console.error("Error saving employee:", err);
    setError("An error occurred while saving the employee. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
       {isLoading && <Loader />}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {employeeId ? "Edit Employee" : "Register New Employee"}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{employeeId ? "Edit the employee details" : "Add a new employee to the payroll system"}</p>
        </div>

        {/* {success ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaCheck className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  {employeeId ? "Employee updated successfully!" : "Employee registration successful!"} Redirecting to employees page...
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : null} */}

        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your existing form code goes here */}
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-blue-800 mb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="Date"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.dob ? "border-red-500" : ""
                    }`}
                  />
                  {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-green-800 mb-2">Employment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                    Position/Job Title*
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.position ? "border-red-500" : ""
                    }`}
                  />
                  {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department*
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.department ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                </div>

                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Annual Salary (£)*
                  </label>
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.salary ? "border-red-500" : ""
                    }`}
                  />
                  {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
                </div>

                <div>
                  <label htmlFor="taxCode" className="block text-sm font-medium text-gray-700">
                    Tax Code*
                  </label>
                  <input
                    type="text"
                    name="taxCode"
                    id="taxCode"
                    value={formData.taxCode}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.startDate ? "border-red-500" : ""
                    }`}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                </div>

                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    // placeholder="Optional - System will generate if empty"
                  />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-purple-800 mb-2">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-yellow-800 mb-2">Account Setup</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password*
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 block p-2  w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">* Required fields</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/employees")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                {/* <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" />  {isLoading ? "Update Employee" : "Register Employee"}
                    </>
                  )}
                </button> */}
                <button
  type="submit"
  disabled={isLoading}
  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
    isLoading ? "opacity-70 cursor-not-allowed" : ""
  }`}
>
  {isLoading ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Processing...
    </>
  ) : (
    <>
      <FaUserPlus className="mr-2" /> {employeeId ? "Update Employee" : "Register Employee"}
    </>
  )}
</button>

              </div>
            </div>
          </form>
        </div>
          {success ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaCheck className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  {employeeId ? "Employee updated successfully!" : "Employee registration successful!"} Redirecting to employees page...
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default EmployeeRegistrationPage
