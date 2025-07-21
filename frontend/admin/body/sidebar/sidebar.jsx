import {
  Home,
  Users,
  Calendar,
  BookOpen,
  BarChart,
  MessageCircle,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      subItems: [
        "Admin Dashboard",
        "Principal Dashboard",
        "Teacher Dashboard",
        "Receptionist Dashboard",
        "Parent Dashboard",
        "Student Dashboard",
      ],
    },
    {
      name: "Setup",
      icon: Settings,
      subItems: [
        "Departments",
        "Subjects",
        "Classes",
        "Designations",
        "Bus Routes",
        "Exam Types",
        "Fee Categories",
        "Payment Modes",
      ],
    },
    {
      name: "Students",
      icon: Users,
      subItems: [
        "Add Student",
        "Admission Form",
        "Student List",
        "Class/Section Allocation",
      ],
    },
    {
      name: "Teachers",
      icon: Users,
      subItems: ["Teacher List", "Assign Subject & Class"],
    },
    {
      name: "Attendance",
      icon: Calendar,
      subItems: ["Student Attendance", "Teacher Attendance"],
    },
    {
      name: "Fees",
      icon: BarChart,
      subItems: ["Fee Structure", "Collect Fee", "Fee Due List"],
    },
    {
      name: "Examinations",
      icon: BookOpen,
      subItems: ["Create Exam", "Enter Marks", "Report Cards"],
    },
    {
      name: "Timetable",
      icon: Calendar,
      subItems: ["Class Timetable", "Teacher Timetable"],
    },
    { name: "Homework", icon: BookOpen },
    {
      name: "Library",
      icon: BookOpen,
      subItems: ["Book List", "Issue/Return"],
    },
    { name: "Notices / Announcements", icon: MessageCircle },
    {
      name: "Reports",
      icon: BarChart,
      subItems: ["Attendance Report", "Fee Report"],
    },
    { name: "Settings", icon: Settings },
    { name: "Logout", icon: LogOut },
  ];

  const roleAccess = {
    admin: [
      "Dashboard",
      "Setup",
      "Students",
      "Teachers",
      "Fees",
      "Reports",
      "Settings",
      "Logout",
    ],
    principal: ["Dashboard", "Timetable", "Reports", "Logout"],
    teacher: [
      "Dashboard",
      "Attendance",
      "Homework",
      "Library",
      "Reports",
      "Logout",
    ],
    receptionist: ["Dashboard", "Students", "Attendance", "Fees", "Logout"],
    parent: ["Dashboard", "Notices / Announcements", "Reports", "Logout"],
    student: ["Dashboard", "Homework", "Library", "Timetable", "Logout"],
  };

  const subItemRoutes = {
    "Admin Dashboard": "/dash",
    "Principal Dashboard": "/principaldash",
    "Teacher Dashboard": "/teacherdash",
    "Student Dashboard": "/studentdash",
    "Receptionist Dashboard": "/receptionistdash",
    "Parent Dashboard": "/parentdash",
    "Add Student": "/add-student",
    "Admission Form": "/admission-list",
    "Student List": "/student-list",
    "Class/Section Allocation": "/class-allocation",
    "Teacher List": "/teachers/list",
    "Assign Subject & Class": "/teachers/assign",
    "Student Attendance": "/attendance/student",
    "Teacher Attendance": "/attendance/teacher",
    "Fee Structure": "/fees/structure",
    "Collect Fee": "/fees/collect",
    "Fee Due List": "/fees/due",
    "Create Exam": "/exams/create",
    "Enter Marks": "/exams/marks",
    "Report Cards": "/exams/report-cards",
    "Class Timetable": "/timetable/class",
    "Teacher Timetable": "/timetable/teacher",
    "Book List": "/library/books",
    "Issue/Return": "/library/issue-return",
    "Attendance Report": "/reports/attendance",
    "Fee Report": "/reports/fee",
    "Departments": "/setup/departments",
    "Subjects": "/setup/subjects",
    "Classes": "/setup/classes",
    "Designations": "/setup/designations",
    "Bus Routes": "/setup/routes",
    "Exam Types": "/setup/exam-types",
    "Fee Categories": "/setup/fee-categories",
    "Payment Modes": "/setup/payment-modes",
  };

  const itemRoutes = {
    Homework: "/homework",
    "Notices / Announcements": "/notices",
    Settings: "/settings",
    Logout: "/logout",
  };

  const filteredMenuItems = menuItems
    .filter((item) => roleAccess[role]?.includes(item.name))
    .map((item) => {
      if (item.subItems) {
        // Special case: only show their own dashboard
        if (item.name === "Dashboard") {
          const dashName = `${role.charAt(0).toUpperCase()}${role.slice(1)} Dashboard`;
          return {
            ...item,
            subItems: item.subItems.filter((sub) => sub === dashName),
          };
        }

        // Filter only those subItems which have route
        return {
          ...item,
          subItems: item.subItems.filter((sub) => subItemRoutes[sub]),
        };
      }
      return item;
    });

  const handleItemClick = (itemName) => {
    setActiveDropdown((prev) => (prev === itemName ? null : itemName));
  };

  const handleLinkClick = () => {
    if (isMobile) toggleSidebar();
  };

  return (
    <>
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen || !isMobile ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed top-11 h-screen left-0 z-40 w-64 bg-white text-gray-800 shadow-lg overflow-y-auto hide-scrollbar"
      >
        <div className="flex flex-col items-center py-6 px-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="bg-blue-100 rounded-full p-3 shadow-md">
            <Users className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mt-3 text-lg font-bold">{user?.name || "Welcome"}</h2>
          <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
        </div>

        <div className="px-2 pt-4 pb-8">
          <ul className="space-y-4">
            {filteredMenuItems.map((item, index) => (
              <li key={index} className="flex flex-col">
                <div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    if (item.name === "Logout") {
                      localStorage.clear();
                      navigate("/");
                      return;
                    }

                    if (item.subItems) {
                      handleItemClick(item.name);
                    } else {
                      const route = itemRoutes[item.name];
                      if (route) {
                        navigate(route);
                        handleLinkClick();
                      }
                    }
                  }}
                >
                  <item.icon className="w-6 h-6 text-blue-600" />
                  <span>{item.name}</span>
                  {item.subItems && (
                    <motion.div
                      animate={{
                        rotate: activeDropdown === item.name ? 180 : 0,
                      }}
                      className="ml-auto"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {item.subItems && activeDropdown === item.name && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-2 space-y-2 overflow-hidden"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.li
                          key={subIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-gray-300 cursor-pointer"
                          onClick={() => {
                            const route = subItemRoutes[subItem];
                            if (route) {
                              navigate(route);
                              handleLinkClick();
                            }
                          }}
                        >
                          {subItem}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
