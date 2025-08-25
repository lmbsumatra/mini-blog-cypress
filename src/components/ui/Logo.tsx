import { Link } from "react-router-dom";
import icon from "../../assets/icon.svg";
import CustomHeading from "./custom/CustomHeading";

interface LogoI {
  logo: string;
}
export default function Logo({ logo }: LogoI) {
  switch (logo) {
    case "logoOnly":
      return (
        <Link to="/">
          <img src={icon} className="h-10 w-10" />
        </Link>
      );
    case "logoFull":
      return (
        <Link
          to="/"
          data-test-id="logo-btn"
          className="flex gap-4 items-center w-full justify-center p-4 rounded bg-white/4"
        >
          <img src={icon} className="h-16 w-16" />
          <h1 className="text-6xl font-extrabold">Anon</h1>
        </Link>
      );
    case "textOnly":
      return (
        <Link to="/">
          <CustomHeading label={"Anon Stories"} />
        </Link>
      );
  }
}
