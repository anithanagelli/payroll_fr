import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-lg"
        >
          <FaMoneyBillWave className="text-2xl" />
          <span>PayrollPro</span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <FaTimes className="text-xl text-gray-600" />
          ) : (
            <FaBars className="text-xl text-gray-600" />
          )}
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col lg:flex-row items-center lg:items-center justify-center absolute lg:static bg-white lg:bg-transparent w-full lg:w-auto top-16 left-0 transition-transform duration-300 ease-in-out ${
            mobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } lg:translate-x-0 lg:opacity-100`}
        >
          <li className="nav-item border-b lg:border-none w-full text-center lg:w-auto lg:text-left border-b lg:border-none">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item border-b lg:border-none w-full text-center lg:w-auto lg:text-left border-b lg:border-none">
            <Link
              to="/employees"
              className="block py-2 px-4 text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
              
              onClick={() => setMobileMenuOpen(false)}
            >
              Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/payroll"
              className="block py-2 px-4 text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Payroll
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;