//App.jsx

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import CompanyRegistration from "./components/CompanyRegistration"
import EmployerDashboard from "./components/EmployerDashboard"
import AddEmployee from "./components/AddEmployee"
import EmployeeDetails from "./components/EmployeeDetails"
import PayrollRun from "./components/PayrollRun"
import PayslipView from "./components/PayslipView"
import EmployeeDashboard from "./components/EmployeeDashboard"
import Reports from "./components/Reports"
import MyPayslips from "./components/MyPayslips"

function App() {
  const [user, setUser] = useState(null)
  const [company, setCompany] = useState(null)
  const [employees, setEmployees] = useState([])
  const [payslips, setPayslips] = useState([])

  useEffect(() => {
    // Load data from localStorage
    const savedUser = localStorage.getItem("user")
    const savedCompany = localStorage.getItem("company")
    const savedEmployees = localStorage.getItem("employees")
    const savedPayslips = localStorage.getItem("payslips")

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCompany) setCompany(JSON.parse(savedCompany))
    if (savedEmployees) setEmployees(JSON.parse(savedEmployees))
    if (savedPayslips) setPayslips(JSON.parse(savedPayslips))
  }, [])

  useEffect(() => {
    // Save data to localStorage
    if (user) localStorage.setItem("user", JSON.stringify(user))
    if (company) localStorage.setItem("company", JSON.stringify(company))
    if (employees.length >= 0) localStorage.setItem("employees", JSON.stringify(employees))
    if (payslips.length >= 0) localStorage.setItem("payslips", JSON.stringify(payslips))
  }, [user, company, employees, payslips])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setCompany(null)
    setEmployees([])
    setPayslips([])
    localStorage.clear()
  }

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setEmployees((prev) => [...prev, newEmployee])
  }

  const updateEmployee = (employeeId, updatedData) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === employeeId ? { ...emp, ...updatedData } : emp)))
  }

  const generatePayslip = (payslipData) => {
    const newPayslip = {
      ...payslipData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setPayslips((prev) => [...prev, newPayslip])
    return newPayslip
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Login onLogin={handleLogin} />
              ) : user.type === "employer" && !company ? (
                <Navigate to="/company-registration" />
              ) : user.type === "employer" && company ? (
                <Navigate to="/employer-dashboard" />
              ) : user.type === "employee" ? (
                <Navigate to="/employee-dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/company-registration"
            element={
              user?.type === "employer" && !company ? (
                <CompanyRegistration onRegister={setCompany} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/employer-dashboard"
            element={
              user?.type === "employer" && company ? (
                <EmployerDashboard
                  company={company}
                  employees={employees}
                  payslips={payslips}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/add-employee"
            element={
              user?.type === "employer" ? (
                <AddEmployee onAddEmployee={addEmployee} company={company} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/employee-details"
            element={
              user?.type === "employer" ? (
                <EmployeeDetails employees={employees} onUpdateEmployee={updateEmployee} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/payroll-run"
            element={
              user?.type === "employer" ? (
                <PayrollRun
                  employees={employees}
                  company={company}
                  onGeneratePayslip={generatePayslip}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/payslip/:id"
            element={<PayslipView payslips={payslips} user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/employee-dashboard"
            element={
              user?.type === "employee" ? (
                <EmployeeDashboard
                  user={user}
                  employees={employees}
                  payslips={payslips}
                  onUpdateEmployee={updateEmployee}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/reports"
            element={
              user?.type === "employer" ? (
                <Reports employees={employees} payslips={payslips} company={company} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/my-payslips" element={<MyPayslips payslips={payslips} user={user} onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext.jsx";
// import { EmployeeProvider } from "./context/EmployeeContext.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import Dashboard from "./components/Dashboard.jsx";
// import EmployeesPage from "./components/EmployeesPage.jsx";
// import PayrollPage from "./components/PayrollPage.jsx";
// import ReportsPage from "./components/ReportsPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import Login from "./pages/Login.jsx"
// import EmployeeRegistrationPage from "./pages/EmployeeRegistrationPage.jsx";
// import Navbar from "./components/Navbar.jsx";
// import "./styles/App.css";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <EmployeeProvider>
//           <Routes>
//             <Route path="/login" element={<Login />} />

//             {/* <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <div className="app">
//                     <Navbar />
//                     <main className="main-content">
//                       <Dashboard />
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             /> */}

//             <Route
//               path="/employees"
//               element={
//                 <ProtectedRoute>
//                   <div className="app">
//                     <Navbar />
//                     <main className="main-content">
//                       <EmployeesPage />
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />


//             {/*  Add new employee */}
//             <Route
//               path="/employees/register"
//               element={
//                 <ProtectedRoute>
//                   <div className="app">
//                     <Navbar />
//                     <main className="main-content">
//                       <EmployeeRegistrationPage />
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />

//            <Route
//   path="/employees/edit/:employeeId"
//   element={
//     <ProtectedRoute>
//       <div className="app">
//         <Navbar />
//         <main className="main-content">
//           <EmployeeRegistrationPage />
//         </main>
//       </div>
//     </ProtectedRoute>
//   }
// />


//             <Route
//               path="/payroll"
//               element={
//                 <ProtectedRoute>
//                   <div className="app">
//                     <Navbar />
//                     <main className="main-content">
//                       <PayrollPage />
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/reports"
//               element={
//                 <ProtectedRoute>
//                   <div className="app">
//                     <Navbar />
//                     <main className="main-content">
//                       <ReportsPage />
//                     </main>
//                   </div>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </EmployeeProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

