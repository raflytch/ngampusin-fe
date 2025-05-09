import React, { JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRegister } from "@/hooks/use-register";
import { Loader2, Eye, EyeOff } from "lucide-react";

const RegisterForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const {
    register,
    isRegistering,
    isRegisterError,
    registerError,
    isRegisterSuccess,
  } = useRegister();

  useEffect(() => {
    if (isRegisterError) {
      setShowErrorDialog(true);
    }
  }, [isRegisterError]);

  useEffect(() => {
    if (isRegisterSuccess) {
      setShowSuccessDialog(true);
    }
  }, [isRegisterSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password, fakultas });
  };

  const handleErrorDialogClose = () => {
    setShowErrorDialog(false);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    navigate("/auth/login");
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="space-y-6 w-full max-w-md">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-500">
              Enter your information to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={handleShowPasswordToggle}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fakultas">Fakultas</Label>
              <Select value={fakultas} onValueChange={setFakultas}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select fakultas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fakultas Ilmu Komputer">
                    Fakultas Ilmu Komputer
                  </SelectItem>
                  <SelectItem value="Fakultas Matematika dan Ilmu Pengetahuan Alam">
                    FMIPA
                  </SelectItem>
                  <SelectItem value="Fakultas Teknik">
                    Fakultas Teknik
                  </SelectItem>
                  <SelectItem value="Fakultas Ekonomi dan Bisnis">
                    Fakultas Ekonomi dan Bisnis
                  </SelectItem>
                  <SelectItem value="Fakultas Ilmu Budaya">
                    Fakultas Ilmu Budaya
                  </SelectItem>
                  <SelectItem value="Fakultas Kesehatan Masyarakat">
                    Fakultas Kesehatan Masyarakat
                  </SelectItem>
                  <SelectItem value="Fakultas Kedokteran">
                    Fakultas Kedokteran
                  </SelectItem>
                  <SelectItem value="Fakultas Kedokteran Gigi">
                    Fakultas Kedokteran Gigi
                  </SelectItem>
                  <SelectItem value="Fakultas Hukum">Fakultas Hukum</SelectItem>
                  <SelectItem value="Fakultas Ilmu Sosial dan Politik">
                    Fakultas Ilmu Sosial dan Politik
                  </SelectItem>
                  <SelectItem value="Fakultas Psikologi">
                    Fakultas Psikologi
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Successful</AlertDialogTitle>
            <AlertDialogDescription>
              You have successfully registered your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleSuccessDialogClose}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Go to Login
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Failed</AlertDialogTitle>
            <AlertDialogDescription>
              {registerError?.message ||
                "An error occurred during registration."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleErrorDialogClose}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RegisterForm;
