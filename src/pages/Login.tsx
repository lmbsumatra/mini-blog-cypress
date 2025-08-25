import CustomHeading from "@/components/ui/custom/CustomHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { loginCredentials } from "@/types/login";
import { type loginCredsI } from "@/types/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store";
import { login } from "@/slices/login";
import CErrorText from "@/components/ui/custom/CErrorText";
import Logo from "@/components/ui/Logo";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginCredsI>({
    mode: "onChange",
    resolver: zodResolver(loginCredentials),
  });

  const dispatch = useAppDispatch();
  const logindata = useAppSelector((state) => state.login);

  const navigate = useNavigate();

  const handleLogin = (data: loginCredsI) => {
    dispatch(login(data));
    console.log("yey", logindata);
    navigate("/home");
  };

  return (
    <div className="flex flex-col gap-4">
      <Logo logo={"logoFull"} />
      <CustomHeading label={"Log in"} />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="username@123"
            {...register("username")}
            data-test-id="login-input-username"
          />
          {errors.username?.message && (
            <CErrorText message={errors.username.message} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={`${showPassword === true ? "text" : "password"}`}
              placeholder="password@123"
              {...register("password")}
              data-test-id="login-input-password"
            />
            {errors.password?.message && (
              <CErrorText message={errors.password.message} />
            )}
            <Button
              variant="link"
              className="absolute top-0 right-0 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword === true ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          variant={"outline"}
          className="text-neutral-900"
          data-test-id="login-button"
        >
          Log in
        </Button>
      </form>
      <div className="flex flex-col gap-1">
        <Link to="/forgot-password" className="underline" data-test-id="login-forgot-password-link"> 
          Forgot password?
        </Link>
        <Link to="/signup" className="underline" data-test-id="login-signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}
