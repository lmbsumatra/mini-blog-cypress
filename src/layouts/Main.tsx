import { Link, Outlet } from "react-router-dom";
import icon from "../assets/icon.svg";
import { FaDoorOpen, FaHome, FaUser } from "react-icons/fa";

export default function Main() {
  const tabs = [
    { label: "Home", path: "/home", icon: <FaHome size={20} /> },
    { label: "Profile", path: "/profile", icon: <FaUser size={16} /> },
    { label: "Logout", path: "/", icon: <FaDoorOpen size={16} /> },
  ];
  return (
    <div className="bg-neutral-900 h-screen w-screen overflow-hidden flex flex-col  gap-4 text-white">
      <nav className="h-fit shadow-md p-4 flex items-center justify-between">
        <img src={icon} className="h-10 w-10" />
        <div className="flex gap-4 items-center">
          {tabs.map((tab) => (
            <Link to={tab.path}>
              <div className="hover:bg-neutral-800/20 flex gap-2 items-center py-2 px-4 rounded transition-all duration-300">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
