"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import connectDB from "@/lib/connectDB";
import PostModel from "@/models/User";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  // const create = async(formData: FormData) => {
  //     'use server'

  //     await connectDB();

  //     const result = await PostModel.create({
  //       title : formData.get("title"),
  //       body: formData.get("body")
  //     });
  // }

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    router.push("/dashboard");
    try{
      const response = await axios.post('/api/users', {email, password})
      console.log(response);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader className="bg-white">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <Button type="submit" className="w-full "> */}
            <Button type="submit" className="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-95">
              Login
            </Button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}