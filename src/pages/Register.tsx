import { JSX } from "react";
import AuthBanner from "@/components/auth/AuthBanner";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = (): JSX.Element => {
  return (
    <div className="flex min-h-screen">
      <AuthBanner />
      <RegisterForm />
    </div>
  );
};

export default Register;
