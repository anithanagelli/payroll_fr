"use client"

import { useState } from "react"

const CompanyRegistration = ({ onRegister, onLogout }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    taxYear: "2024-25",
    payPeriod: "MONTHLY",
    region: "ENGLAND",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(formData)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">Company Registration</h2>
            <button onClick={onLogout} className="text-sm text-gray-500 hover:text-gray-700 underline">
              Logout
            </button>
          </div>
          <p className="text-center text-sm text-gray-600">Register your company for UK payroll management</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="taxYear" className="block text-sm font-medium text-gray-700">
                Tax Year
              </label>
              <select
                id="taxYear"
                name="taxYear"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.taxYear}
                onChange={handleChange}
              >
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
              </select>
            </div>

            <div>
              <label htmlFor="payPeriod" className="block text-sm font-medium text-gray-700">
                Pay Period
              </label>
              <select
                id="payPeriod"
                name="payPeriod"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.payPeriod}
                onChange={handleChange}
              >
                <option value="WEEKLY">Weekly</option>
                <option value="FORTNIGHTLY">Fortnightly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
              </select>
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Tax Region
              </label>
              <select
                id="region"
                name="region"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="ENGLAND">England</option>
                <option value="SCOTLAND">Scotland</option>
                <option value="WALES">Wales</option>
                <option value="NORTHERN_IRELAND">Northern Ireland</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyRegistration
