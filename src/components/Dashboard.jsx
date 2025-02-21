import React, { useContext, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { GoTasklist } from "react-icons/go";
import LoginContext, { FormContext } from "../context/LoginContext";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {logOut} = useContext(FormContext);

  const handleLogout = () => {
    // Add logout logic here
    logOut()
    .then(()=>{
      console.log('logout')
    })
    console.log("User logged out");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "md:w-16 w-12" : "md:w-64 w-20 px-3"
        } min-h-screen transition-all duration-300 bg-gray-800 pt-5 flex flex-col justify-between`}
      >
       

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
           {/* Toggle Button */}
        <button
          className="flex items-center justify-center p-2 text-white hover:bg-gray-700 rounded-md mb-4"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
        </button>
          <NavLink
            to="add-task"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isActive ? "bg-white text-gray-800" : "text-white hover:bg-gray-700" } ${
                isCollapsed ? "justify-center" : "md:ml-2"}`
            }
          >
            <CiCirclePlus size={24} className="mr-3" />
            {!isCollapsed && "Add Task"}
          </NavLink>

          <NavLink
            to="recorded-task"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isActive ? "bg-white text-gray-800" : "text-white hover:bg-gray-700" } ${
                isCollapsed ? "justify-center" : "md:ml-2"}`
            }
          >
            <GoTasklist size={24} className="mr-3" />
            {!isCollapsed && "Recorded Task"}
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 mb-4 rounded-md transition-all duration-200 text-white hover:bg-red-600"
        >
          <FiLogOut size={24} className="mr-3" />
          {!isCollapsed && "Logout"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
