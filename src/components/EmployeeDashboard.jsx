"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const EmployeeDashboard = ({ user, employees, payslips, onUpdateEmployee, onLogout }) => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  // Find employee by email (since employee login uses email)
  const employee = employees.find((emp) => emp.personalDetails.email === user.email)
  const employeePayslips = employee
    ? payslips.filter((slip) => slip.employeeId === employee.personalDetails.employeeId)
    : []

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Employee profile not found</h2>
          <p className="mt-2 text-gray-600">Please contact your employer to set up your profile.</p>
          <button onClick={onLogout} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    setEditData(employee.personalDetails)
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdateEmployee(employee.id, { personalDetails: editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.personalDetails.firstName} {employee.personalDetails.lastName}
              </h1>
              <p className="text-sm text-gray-600">Employee Dashboard</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">First Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            value={editData.firstName || ""}
                            onChange={(e) => setEditData((prev) => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Last Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            value={editData.lastName || ""}
                            onChange={(e) => setEditData((prev) => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            value={editData.email || ""}
                            onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Post Code</label>
                          <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                            value={editData.postCode || ""}
                            onChange={(e) => setEditData((prev) => ({ ...prev, postCode: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                          value={editData.address || ""}
                          onChange={(e) => setEditData((prev) => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">First Name</label>
                        <p className="mt-1 text-sm text-gray-900">{employee.personalDetails.firstName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Last Name</label>
                        <p className="mt-1 text-sm text-gray-900">{employee.personalDetails.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{employee.personalDetails.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Employee ID</label>
                        <p className="mt-1 text-sm text-gray-900">{employee.personalDetails.employeeId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(employee.personalDetails.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Post Code</label>
                        <p className="mt-1 text-sm text-gray-900">{employee.personalDetails.postCode}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-500">Address</label>
                        <p className="mt-1 text-sm text-gray-900">{employee.personalDetails.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Employment Details (Read-only for employee) */}
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Employment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Job Title</label>
                      <p className="mt-1 text-sm text-gray-900">{employee.employment?.jobTitle || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Department</label>
                      <p className="mt-1 text-sm text-gray-900">{employee.employment?.department || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Start Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employee.employment?.startDate
                          ? new Date(employee.employment.startDate).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Employment Type</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {employee.employment?.employmentType || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Working Hours</label>
                      <p className="mt-1 text-sm text-gray-900">{employee.employment?.workingHours || 0} hours/week</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Annual Salary</label>
                      <p className="mt-1 text-sm text-gray-900">£{employee.pay?.salary || 0}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Employment details can only be modified by your employer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Payslips</span>
                      <span className="text-sm font-medium text-gray-900">{employeePayslips.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">YTD Gross Pay</span>
                      <span className="text-sm font-medium text-gray-900">
                        £
                        {employeePayslips
                          .reduce((sum, slip) => sum + Number.parseFloat(slip.grossPayTotal || 0), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">YTD Tax Paid</span>
                      <span className="text-sm font-medium text-gray-900">
                        £
                        {employeePayslips
                          .reduce((sum, slip) => sum + Number.parseFloat(slip.incomeTaxTotal || 0), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">YTD NI Paid</span>
                      <span className="text-sm font-medium text-gray-900">
                        £
                        {employeePayslips
                          .reduce((sum, slip) => sum + Number.parseFloat(slip.nationalInsurance || 0), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Tax Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tax Code</span>
                      <span className="text-sm font-medium text-gray-900">{employee.taxNI?.taxCode || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">NI Number</span>
                      <span className="text-sm font-medium text-gray-900">{employee.taxNI?.niNumber || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">NI Category</span>
                      <span className="text-sm font-medium text-gray-900">
                        {employee.taxNI?.niCategory || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payslips Section */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">My Payslips</h3>
                {employeePayslips.length === 0 ? (
                  <p className="text-sm text-gray-500">No payslips available yet.</p>
                ) : (
                  <div className="space-y-4">
                    {employeePayslips.map((payslip) => (
                      <div key={payslip.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">
                              Pay Period: {new Date(payslip.payDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">Reference: {payslip.paySlipReference}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">£{payslip.takeHomePayTotal}</p>
                            <div className="space-x-2">
                              <button
                                onClick={() => navigate(`/payslip/${payslip.id}`)}
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  // Download functionality
                                  const element = document.createElement("a")
                                  const file = new Blob([JSON.stringify(payslip, null, 2)], { type: "text/plain" })
                                  element.href = URL.createObjectURL(file)
                                  element.download = `payslip-${payslip.paySlipReference}.txt`
                                  document.body.appendChild(element)
                                  element.click()
                                  document.body.removeChild(element)
                                }}
                                className="text-sm text-green-600 hover:text-green-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Gross: </span>
                            <span className="font-medium">£{payslip.grossPayTotal}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Tax: </span>
                            <span className="font-medium">£{payslip.incomeTaxTotal}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">NI: </span>
                            <span className="font-medium">£{payslip.nationalInsurance}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
