import React, { JSX, useState } from "react";
import { Link } from "react-router-dom";
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

const RegisterForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fakultas, setFakultas] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
      <div className="space-y-6 w-full max-w-md">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your information to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
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
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fakultas">Fakultas</Label>
            <Select value={fakultas} onValueChange={setFakultas}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select fakultas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fmipa">FMIPA</SelectItem>
                <SelectItem value="ft">Fakultas Teknik</SelectItem>
                <SelectItem value="feb">Fakultas Ekonomi dan Bisnis</SelectItem>
                <SelectItem value="fib">Fakultas Ilmu Budaya</SelectItem>
                <SelectItem value="fkm">
                  Fakultas Kesehatan Masyarakat
                </SelectItem>
                <SelectItem value="fk">Fakultas Kedokteran</SelectItem>
                <SelectItem value="fkg">Fakultas Kedokteran Gigi</SelectItem>
                <SelectItem value="fh">Fakultas Hukum</SelectItem>
                <SelectItem value="fisip">
                  Fakultas Ilmu Sosial dan Politik
                </SelectItem>
                <SelectItem value="fpsi">Fakultas Psikologi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-6">
            Sign Up
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
  );
};

export default RegisterForm;
