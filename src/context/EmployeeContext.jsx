// EmployeeContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      const defaultEmployees = [
        {
          id: 1,
          name: "John Doe",
          position: "Software Engineer",
          salary: 45000,
          taxCode: "1257L",
          status: "Active",
          department: "Engineering",
        },
        {
          id: 2,
          name: "Sarah Davis",
          position: "Marketing Manager",
          salary: 52000,
          taxCode: "1257L",
          status: "Active",
          department: "Marketing",
        },
        {
          id: 3,
          name: "William Smith",
          position: "Product Designer",
          salary: 42000,
          taxCode: "1257L",
          status: "Active",
          department: "Design",
        },
        {
          id: 4,
          name: "Emma Johnson",
          position: "HR Specialist",
          salary: 38000,
          taxCode: "1257L",
          status: "Active",
          department: "HR",
        },
        {
          id: 5,
          name: "Michael Brown",
          position: "Sales Representative",
          salary: 36000,
          taxCode: "1257L",
          status: "Active",
          department: "Sales",
        },
      ];
      setEmployees(defaultEmployees);
      localStorage.setItem("employees", JSON.stringify(defaultEmployees));
    }
  }, []);

  const getEmployee = (id) => {
    return employees.find((emp) => String(emp.id) === String(id));
  };

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
      status: "Active",
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, ...updatedData } : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const toggleEmployeeStatus = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              status: employee.status === "Active" ? "Inactive" : "Active",
            }
          : employee
      )
    );
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
