import { Outlet } from "react-router-dom";
export default function Main() {
  return (
    <div className="bg-neutral-900 h-screen w-screen overflow-hidden flex flex-col items-center justify-center gap-4 text-white">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
