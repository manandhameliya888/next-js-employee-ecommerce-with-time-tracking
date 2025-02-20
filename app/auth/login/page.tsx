// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/user");
//       const users = await response.json();

//       const user = users.find((user: any) => user.email === email);

//       if (!user) {
//         setError("Email is wrong");
//         return;
//       }

//       if (user.password !== password) {
//         setError("Password is wrong"); 
//         return;
//       }

//       const foundUser = users.find(
//         (user: { email: string; password: string }) =>
//           user.email === email && user.password === password
//       );
  
//       if (foundUser) {
//         localStorage.setItem("userLastName", foundUser.lastName);
//       }

//       router.push("/dashboard");

//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-[400px]">
//         <CardHeader className="bg-white">
//           <CardTitle className="text-2xl text-center">Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email</label>
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Password</label>
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-95">
//               Login
//             </Button>
//             <p className="text-center text-sm">
//               Don't have an account?{" "}
//               <Link href="/auth/signup" className="text-blue-600 hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }










//SESSION STORAGE use karyu che etle ke temporary store kare ene LOCAL STORAGE ma karva mate ani niche no code che 

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();


//   useEffect(() => {
//     const accessToken = sessionStorage.getItem("accessToken");
//     const loginTime = sessionStorage.getItem("loginTime");

//     if (accessToken && loginTime) {
//       const currentTime = new Date().getTime();
//       const sessionDuration = currentTime - parseInt(loginTime);

//       if (sessionDuration < 1 * 60 * 1000) {
//         router.push("/dashboard");
//       } else {
//         sessionStorage.clear();
//       }
//     }
//   }, []);


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/user");
//       const users = await response.json();

//       const user = users.find((user: any) => user.email === email);

//       if (!user) {
//         setError("Email is wrong");
//         return;
//       }

//       if (user.password !== password) {
//         setError("Password is wrong"); 
//         return;
//       }

//       const foundUser = users.find(
//         (user: { email: string; password: string }) =>
//           user.email === email && user.password === password
//       );
  
//       if (foundUser) {
//         localStorage.setItem("userLastName", foundUser.lastName);
//       }


//       sessionStorage.setItem("accessToken", user.id);
//       sessionStorage.setItem("userLastName", user.lastName);
//       sessionStorage.setItem("loginTime", new Date().getTime().toString());


//       router.push("/dashboard");

//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-[400px]">
//         <CardHeader className="bg-white">
//           <CardTitle className="text-2xl text-center">Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email</label>
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Password</label>
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-95">
//               Login
//             </Button>
//             <p className="text-center text-sm">
//               Don't have an account?{" "}
//               <Link href="/auth/signup" className="text-blue-600 hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




//SESSION STORAGE NE LOCAL STORAGE ma convert karu che 

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const loginTime = sessionStorage.getItem("loginTime");

    if (accessToken && loginTime) {
      const currentTime = new Date().getTime();
      const sessionDuration = currentTime - parseInt(loginTime);

      if (sessionDuration < 1 * 60 * 1000) {
        router.push("/dashboard");
      } else {
        sessionStorage.clear();
      }
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user");
      const users = await response.json();

      const user = users.find((user: any) => user.email === email);

      if (!user) {
        setError("Email is wrong");
        return;
      }

      if (user.password !== password) {
        setError("Password is wrong"); 
        return;
      }

      const foundUser = users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );
  
      if (foundUser) {
        localStorage.setItem("userLastName", foundUser.lastName);
      }


      sessionStorage.setItem("accessToken", user.id);
      localStorage.setItem("accessToken", user.id); // Persist login across tab closures
      localStorage.setItem("userLastName", user.lastName);
      localStorage.setItem("loginTime", new Date().getTime().toString());


      router.push("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again later.");
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
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
