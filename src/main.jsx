import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
// import { EmployeeProvider } from "./context/EmployeeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <EmployeeProvider>
      <App />
    </EmployeeProvider> */}
    <App/>
  </React.StrictMode>
);
