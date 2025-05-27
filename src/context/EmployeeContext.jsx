//EmployeeContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  fetchEmployees,
  addEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
  toggleStatusApi,
} from "../api/employeeApi";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  // Load employees from backend on mount
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();  
        setEmployees(data);
      } catch (error) {
        console.error("Failed to load employees:", error);
      }
    };
    loadEmployees();
  }, []);

  const getEmployee = (id) => {
    return employees.find((emp) => String(emp.id) === String(id));
  };

  const addEmployee = async (employee) => {
    try {
      const newEmployee = await addEmployeeApi(employee);
      setEmployees((prev) => [...prev, newEmployee]);
      return newEmployee;
    } catch (error) {
      console.error("Failed to add employee:", error);
      throw error;
    }
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      const updated = await updateEmployeeApi(id, updatedData);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updated : emp))
      );
      return updated;
    } catch (error) {
      console.error("Failed to update employee:", error);
      throw error;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await deleteEmployeeApi(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Failed to delete employee:", error);
      throw error;
    }
  };

  const toggleEmployeeStatus = async (id) => {
    try {
      const employee = employees.find((e) => e.id === id);
      if (!employee) throw new Error("Employee not found");

      // Toggle status string exactly matching backend expectations
      const newStatus =
        employee.status.toLowerCase() === "active" ? "Inactive" : "Active";

      const updated = await toggleStatusApi(id, newStatus);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updated : emp))
      );
      return updated;
    } catch (error) {
      console.error("Failed to toggle employee status:", error);
      throw error;
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,
        getEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}
