"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddEmployee = ({ onAddEmployee, company, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      employeeId: "",
      address: "",
      postCode: "",
    },
    employment: {
      jobTitle: "",
      department: "",
      startDate: "",
      employmentType: "FULL_TIME",
      workingHours: 40,
    },
    pay: {
      salary: "",
      payFrequency: company?.payPeriod || "MONTHLY",
      bankAccountNumber: "",
      sortCode: "",
    },
    taxNI: {
      taxCode: "1257L",
      niNumber: "",
      niCategory: "A",
      studentLoan: "NONE",
    },
    autoEnrolment: {
      eligible: true,
      pensionScheme: "WORKPLACE_PENSION",
      employeeContribution: 5,
      employerContribution: 3,
    },
  })

  const tabs = [
    { id: "personal", name: "Personal Details", icon: "user" },
    { id: "employment", name: "Employment", icon: "briefcase" },
    { id: "pay", name: "Pay", icon: "currency" },
    { id: "taxNI", name: "Tax & NI", icon: "document" },
    { id: "autoEnrolment", name: "Auto Enrolment", icon: "shield" },
  ]

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddEmployee(formData)
    navigate("/employee-details")
  }

  const getIcon = (iconName) => {
    const icons = {
      user: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      briefcase: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"
          />
        </svg>
      ),
      currency: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      document: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      shield: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    }
    return icons[iconName] || icons.user
  }

  const renderPersonalDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.personalDetails.firstName}
            onChange={(e) => handleInputChange("personalDetails", "firstName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.personalDetails.lastName}
            onChange={(e) => handleInputChange("personalDetails", "lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.personalDetails.email}
            onChange={(e) => handleInputChange("personalDetails", "email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.personalDetails.dateOfBirth}
            onChange={(e) => handleInputChange("personalDetails", "dateOfBirth", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.personalDetails.employeeId}
            onChange={(e) => handleInputChange("personalDetails", "employeeId", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Code</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.personalDetails.postCode}
            onChange={(e) => handleInputChange("personalDetails", "postCode", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          required
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
          value={formData.personalDetails.address}
          onChange={(e) => handleInputChange("personalDetails", "address", e.target.value)}
        />
      </div>
    </div>
  )

  const renderEmployment = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.employment.jobTitle}
            onChange={(e) => handleInputChange("employment", "jobTitle", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.employment.department}
            onChange={(e) => handleInputChange("employment", "department", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.employment.startDate}
            onChange={(e) => handleInputChange("employment", "startDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Type</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.employment.employmentType}
            onChange={(e) => handleInputChange("employment", "employmentType", e.target.value)}
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="TEMPORARY">Temporary</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Working Hours per Week</label>
        <input
          type="number"
          min="1"
          max="60"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
          value={formData.employment.workingHours}
          onChange={(e) => handleInputChange("employment", "workingHours", Number.parseInt(e.target.value))}
        />
      </div>
    </div>
  )

  const renderPay = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Salary (£)</label>
          <input
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.pay.salary}
            onChange={(e) => handleInputChange("pay", "salary", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pay Frequency</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.pay.payFrequency}
            onChange={(e) => handleInputChange("pay", "payFrequency", e.target.value)}
          >
            <option value="WEEKLY">Weekly</option>
            <option value="FORTNIGHTLY">Fortnightly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="QUARTERLY">Quarterly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
          <input
            type="text"
            maxLength="8"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.pay.bankAccountNumber}
            onChange={(e) => handleInputChange("pay", "bankAccountNumber", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort Code</label>
          <input
            type="text"
            maxLength="6"
            placeholder="123456"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.pay.sortCode}
            onChange={(e) => handleInputChange("pay", "sortCode", e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderTaxNI = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax Code</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.taxNI.taxCode}
            onChange={(e) => handleInputChange("taxNI", "taxCode", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">National Insurance Number</label>
          <input
            type="text"
            placeholder="AB123456C"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.taxNI.niNumber}
            onChange={(e) => handleInputChange("taxNI", "niNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">NI Category</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.taxNI.niCategory}
            onChange={(e) => handleInputChange("taxNI", "niCategory", e.target.value)}
          >
            <option value="A">Category A</option>
            <option value="B">Category B</option>
            <option value="C">Category C</option>
            <option value="H">Category H</option>
            <option value="M">Category M</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Loan</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            value={formData.taxNI.studentLoan}
            onChange={(e) => handleInputChange("taxNI", "studentLoan", e.target.value)}
          >
            <option value="NONE">None</option>
            <option value="PLAN_1">Plan 1</option>
            <option value="PLAN_2">Plan 2</option>
            <option value="POSTGRADUATE">Postgraduate</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderAutoEnrolment = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            checked={formData.autoEnrolment.eligible}
            onChange={(e) => handleInputChange("autoEnrolment", "eligible", e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-700">Eligible for Auto Enrolment</span>
        </label>
      </div>

      {formData.autoEnrolment.eligible && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pension Scheme</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
              value={formData.autoEnrolment.pensionScheme}
              onChange={(e) => handleInputChange("autoEnrolment", "pensionScheme", e.target.value)}
            >
              <option value="WORKPLACE_PENSION">Workplace Pension</option>
              <option value="NEST">NEST</option>
              <option value="STAKEHOLDER">Stakeholder Pension</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee Contribution (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                value={formData.autoEnrolment.employeeContribution}
                onChange={(e) =>
                  handleInputChange("autoEnrolment", "employeeContribution", Number.parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employer Contribution (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                value={formData.autoEnrolment.employerContribution}
                onChange={(e) =>
                  handleInputChange("autoEnrolment", "employerContribution", Number.parseFloat(e.target.value))
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalDetails()
      case "employment":
        return renderEmployment()
      case "pay":
        return renderPay()
      case "taxNI":
        return renderTaxNI()
      case "autoEnrolment":
        return renderAutoEnrolment()
      default:
        return renderPersonalDetails()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
              <p className="text-sm text-gray-600">Complete all sections to register a new employee</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/employer-dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </button>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                  } group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full text-left`}
                >
                  <span
                    className={`${
                      activeTab === tab.id ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"
                    } flex-shrink-0 -ml-1 mr-3`}
                  >
                    {getIcon(tab.icon)}
                  </span>
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {tabs.find((tab) => tab.id === activeTab)?.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Please fill in all required information for this section.
                    </p>
                  </div>

                  {renderTabContent()}
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
                        if (currentIndex > 0) {
                          setActiveTab(tabs[currentIndex - 1].id)
                        }
                      }}
                      disabled={activeTab === "personal"}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="space-x-3">
                      {activeTab !== "autoEnrolment" ? (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
                            if (currentIndex < tabs.length - 1) {
                              setActiveTab(tabs[currentIndex + 1].id)
                            }
                          }}
                          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Add Employee
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee
