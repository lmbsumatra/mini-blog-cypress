import CustomHeading from "@/components/ui/custom/CustomHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <CustomHeading label={"Log in"} />
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" placeholder="username@123" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={`${showPassword === true ? "text" : "password"}`}
            placeholder="password@123"
          />
          <Button
            variant="link"
            className="absolute top-0 right-0 text-white cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword === true ? <FaEye /> : <FaEyeSlash />}
          </Button>
        </div>
      </div>
      <Button asChild variant={"outline"} className="text-neutral-900">
        <Link to="/home">Login</Link>
      </Button>
      <div className="flex flex-col gap-1">
        <Link to="/forgot-password" className="underline">
          Forgot password?
        </Link>
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
