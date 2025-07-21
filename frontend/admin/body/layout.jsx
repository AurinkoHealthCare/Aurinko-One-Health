import { useState, useEffect } from "react";
import Navbar from "../header/navbar"
import Sidebar from "./sidebar/sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <Navbar toggleSidebar={toggleSidebar} /> */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="pt-6 lg:pt-6 px-4 lg:pl-64 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;