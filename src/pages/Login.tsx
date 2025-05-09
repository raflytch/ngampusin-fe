import { JSX } from "react";
import AuthBanner from "@/components/auth/AuthBanner";
import LoginForm from "@/components/auth/LoginForm";

const Login = (): JSX.Element => {
  return (
    <div className="flex min-h-screen">
      <AuthBanner />
      <LoginForm />
    </div>
  );
};

export default Login;
