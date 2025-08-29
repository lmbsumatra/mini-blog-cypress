import { Button } from "@/components/ui/button";
import CustomHeading from "../components/ui/custom/CustomHeading";
import { Link } from "react-router-dom";
import AboutProject from "@/components/ui/AboutProject";

export default function Landing() {
  const buttons = [
    {
      label: "Get Started",
      isPrimary: true,
      path: "/login",
      testId: "landing-btn-1",
    },
    {
      label: "Explore",
      isPrimary: false,
      path: "/preview",
      testId: "landing-btn-2",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <CustomHeading label="Anon Stories" />
        <span className="text-white/90 font-medium text-xl">
          Create. Share. Read.
        </span>
      </div>
      <div className="flex gap-2 text-center justify-center">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            asChild
            variant={"outline"}
            className={`${
              btn.isPrimary
                ? "bg-white text-neutral-900"
                : "bg-neutral-900 text-white"
            }`}
          >
            <Link to={btn.path} data-test-id={btn.testId}>
              {btn.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex justify-center">
        <AboutProject />
      </div>
    </div>
  );
}
