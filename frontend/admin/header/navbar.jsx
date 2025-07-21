import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="w-full px-4 py-3 bg-blue-600 shadow-md flex items-center justify-between fixed top-0 left-0 z-50">
      <h1 className="text-xl font-bold text-white">School ERP</h1>
      <button
        className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
        onClick={toggleSidebar}
      >
        <Menu size={28} className="text-white transition-all duration-300" />
      </button>
    </nav>
  );
};

export default Navbar;
