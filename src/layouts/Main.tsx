import Logo from "@/components/ui/Logo";
import { logoutUser } from "@/slices/login";
import { useAppDispatch } from "@/store";
import { FaHome } from "react-icons/fa";
import { FaDoorOpen, FaUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const tabs = [
    { label: "Home", path: "/home", icon: <FaHome size={20} /> },
    { label: "Profile", path: "/profile", icon: <FaUser size={16} /> },
    {
      label: "Logout",
      path: "/",
      icon: <FaDoorOpen size={16} />,
      action: handleLogout,
    },
  ];

  return (
    <div className="bg-neutral-900 h-screen w-screen overflow-hidden flex flex-col gap-4 text-white">
      <nav className="h-fit shadow-md p-4 flex items-center justify-between">
        <Logo logo={"logoOnly"} />
        <div className="flex gap-4 items-center">
          {tabs.map((tab) =>
            tab.action ? (
              <div
                key={tab.label}
                onClick={tab.action}
                className="cursor-pointer hover:bg-neutral-800/20 flex gap-2 items-center py-2 px-4 rounded transition-all duration-300"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            ) : (
              <Link to={tab.path} key={tab.label}>
                <div className="hover:bg-neutral-800/20 flex gap-2 items-center py-2 px-4 rounded transition-all duration-300">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              </Link>
            )
          )}
        </div>
      </nav>
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
