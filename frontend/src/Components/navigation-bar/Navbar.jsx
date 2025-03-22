import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, CircleUserRoundIcon, MessageSquare } from "lucide-react";
import wisestartLogo from "@/Photos/orange1.jpg";
import Notifications from "@/Components/Notifications/Notifications";
import { getFromBackend, patchToBackend } from "@/store/fetchdata";
import { baseUrl } from "@/urls";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const notificationsRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const response = await getFromBackend(`${baseUrl}/api/notif/view`);
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="flex items-center space-x-4">
            <div className="rounded-full p-2">
              <img
                src={wisestartLogo}
                alt="WiseStart"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">WiseStart</h1>
          </NavLink>
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex items-center space-x-4">
              {[  
                { path: "/community-forum", label: "Community Forum" },
                { path: "/pitch-deck", label: "Pitch Deck" },
                { path: "/govt-schemes", label: "Govt Schemes" },
                { path: "/chatbot", label: "Chatbot" }
              ].map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                        isActive
                          ? "bg-yellow-600 text-white"
                          : "text-yellow-200 hover:bg-yellow-500 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Notifications Icon */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full text-yellow-200 hover:text-white focus:outline-none"
                aria-label="View notifications"
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <Notifications
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* Profile Icon */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                  isActive
                    ? "bg-yellow-600 text-white"
                    : "text-yellow-200 hover:bg-yellow-500 hover:text-white"
                }`
              }
            >
              <CircleUserRoundIcon className="w-8 h-8" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
