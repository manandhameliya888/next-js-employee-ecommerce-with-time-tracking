"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store error messages
  const [isValid, setIsValid] = useState(false); // Track if password is valid
  const router = useRouter();

  const validatePassword = (password: string) => {
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?/~`]/;
    const lengthValid = password.length >= 6 && password.length <= 8;
    const hasSpecialChar = specialCharRegex.test(password);
    return lengthValid && hasSpecialChar;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      if (!validatePassword(value)) {
        setError("Password must be 6 to 8 characters long and include at least one special character.");
        setIsValid(false);
      } else {
        setError(""); // Clear error when password is valid
        setIsValid(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (!isValid) {
      setError("Password must be 6 to 8 characters long and include at least one special character.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data && data.lastName) {
        localStorage.setItem("userLastName", data.lastName);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      router.push("/dashboard"); // Redirect ONLY when everything is valid
    } catch (error) {
      console.error("Signup error:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader className="bg-white">
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {error.includes("Password") && (
                <p className="text-red-500 text-xs">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-95">
              Sign Up
            </Button>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
