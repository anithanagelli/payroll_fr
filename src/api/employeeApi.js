//employeeApi.js
const BASE_URL = "http://localhost:8080/api/employee-details";

export const fetchEmployees = async () => {
  // const res = await fetch(BASE_URL/allEmployees);
  const res = await fetch(`${BASE_URL}/allEmployees`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
};

export const addEmployeeApi = async (employee) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to add employee");
  return res.json();
};

export const updateEmployeeApi = async (id, employee) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
};

export const deleteEmployeeApi = async (id) => {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
};

export async function toggleStatusApi(id, status) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}
