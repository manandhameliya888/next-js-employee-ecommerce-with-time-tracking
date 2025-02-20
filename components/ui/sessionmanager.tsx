//SESSION STORAGE mate aa code use karvano

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function SessionManager() {
//   const router = useRouter();

//   useEffect(() => {
//     const checkSession = () => {
//       const accessToken = sessionStorage.getItem("accessToken");
//       const loginTime = sessionStorage.getItem("loginTime");

//       if (!accessToken || !loginTime) {
//         router.push("/auth/login");
//         return;
//       }

//       const currentTime = new Date().getTime();
//       const storedTime = parseInt(loginTime, 10);
//       const sessionDuration = (currentTime - storedTime) / 1000 / 60; // minute formate ma che

//       if (sessionDuration >= 1) {   //atli minutes karta vadhare hoy to execute thai jai 
//         sessionStorage.removeItem("accessToken");
//         sessionStorage.removeItem("loginTime");
//         router.push("/auth/login");
//       }
//     };

//     // Check session every second
//     const interval = setInterval(checkSession, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return null; // This component only runs session checks
// }



//LOCAL STORAGE mate aa code use karvano

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionManager() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const accessToken = localStorage.getItem("accessToken");
      const loginTime = localStorage.getItem("loginTime");

      if (!accessToken || !loginTime) {
        router.push("/auth/login");
        return;
      }

      const currentTime = new Date().getTime();
      const storedTime = parseInt(loginTime, 10);
      const sessionDuration = (currentTime - storedTime) / 1000 / 60; // in minutes

      if (sessionDuration >= 1) {  // Session expiry time (e.g., 60 mins)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginTime");
        router.push("/auth/login");
      }
    };

    checkSession(); // Run on mount
    const interval = setInterval(checkSession, 1000); // Run every second

    return () => clearInterval(interval);
  }, []);

  return null;
}
