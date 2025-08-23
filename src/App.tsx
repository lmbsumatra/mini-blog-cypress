import { Suspense } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const router = useRoutes(routes);
  return (
    <Suspense
      fallback={
        <div className="bg-neutral-900 h-screen w-screen overflow-hidden flex flex-col items-center justify-center gap-4 text-white">
          Loading...
        </div>
      }
    >
      {router}
    </Suspense>
  );
}

export default App;
