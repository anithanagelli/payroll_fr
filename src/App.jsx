import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EmployeesPage from "./components/EmployeesPage.jsx";
import PayrollPage from "./components/PayrollPage.jsx";
import ReportsPage from "./components/ReportsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmployeeRegistrationPage from "./pages/EmployeeRegistrationPage.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="app">
                    <Navbar />
                    <main className="main-content">
                      <Dashboard />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <div className="app">
                    <Navbar />
                    <main className="main-content">
                      <EmployeesPage />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />

            {/*  Add new employee */}
            <Route
              path="/employees/register"
              element={
                <ProtectedRoute>
                  <div className="app">
                    <Navbar />
                    <main className="main-content">
                      <EmployeeRegistrationPage />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />

           <Route
  path="/employees/edit/:employeeId"
  element={
    <ProtectedRoute>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <EmployeeRegistrationPage />
        </main>
      </div>
    </ProtectedRoute>
  }
/>


            <Route
              path="/payroll"
              element={
                <ProtectedRoute>
                  <div className="app">
                    <Navbar />
                    <main className="main-content">
                      <PayrollPage />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <div className="app">
                    <Navbar />
                    <main className="main-content">
                      <ReportsPage />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
