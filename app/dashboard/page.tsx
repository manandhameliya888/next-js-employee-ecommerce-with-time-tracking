"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import Clock from "../clock/page";
import { useAttendance } from "@/lib/AttendanceContext";
import data from "../../data/data.json"

interface TimeLog {
  clockIn: Date;
  clockOut: Date | null;
}

export default function DashboardPage() {
  const { dayLogs, setDayLogs, isClockedIn, setIsClockedIn } = useAttendance();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  const WORK_START_HOUR = 9;
  const WORK_END_HOUR = 19;

  //clock mate che 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
    



  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginTime = localStorage.getItem("loginTime");
  
    if (!accessToken || !loginTime) {
      router.push("/auth/login");
      return;
    }
  
    const currentTime = new Date().getTime();
    const sessionDuration = (currentTime - parseInt(loginTime, 10)) / 1000 / 60;
  
    if (sessionDuration >= 60) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginTime");
      router.push("/auth/login");
    }
  }, []);
  



  //session time check karva mate che
  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   const loginTime = sessionStorage.getItem("loginTime");

  //   if (!accessToken || !loginTime) {
  //     sessionStorage.clear();
  //     router.push("/auth/login"); // Redirect to login if no session
  //     return;
  //   }

  //   const currentTime = new Date().getTime();
  //   const sessionDuration = currentTime - parseInt(loginTime);

  //   if (sessionDuration > 1 * 60 * 1000) {
  //     sessionStorage.clear();
  //     router.push("/auth/login"); // Session expired
  //   } else {
  //     setUserLastName(sessionStorage.getItem("userLastName"));
  //   }
  // }, []);


  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const calculateTimeDifference = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  const calculateLateTime = (clockIn: Date) => {
    const workStart = new Date(clockIn);
    workStart.setHours(WORK_START_HOUR, 0, 0, 0);
    
    if (clockIn > workStart) {
      const { hours, minutes } = calculateTimeDifference(workStart, clockIn);
      return `${hours}h ${minutes}m`;
    }
    return "-";
  };

  const calculateEarlyTime = (clockIn: Date) => {
    const workStart = new Date(clockIn);
    workStart.setHours(WORK_START_HOUR, 0, 0, 0);
    
    if (clockIn < workStart) {
      const { hours, minutes } = calculateTimeDifference(clockIn, workStart);
      return `${hours}h ${minutes}m`;
    }
    return "-";
  };

  const calculateLateLeave = (clockOut: Date) => {
    const workEnd = new Date(clockOut);
    workEnd.setHours(WORK_END_HOUR, 0, 0, 0);
    
    if (clockOut > workEnd) {
      const { hours, minutes } = calculateTimeDifference(workEnd, clockOut);
      return `${hours}h ${minutes}m`;
    }
    return "-";
  };

  const calculateEarlyLeave = (clockOut: Date) => {
    const workEnd = new Date(clockOut);
    workEnd.setHours(WORK_END_HOUR, 0, 0, 0);
    
    if (clockOut < workEnd) {
      const { hours, minutes } = calculateTimeDifference(clockOut, workEnd);
      return `${hours}h ${minutes}m`;
    }
    return "-";
  };

  const calculateTotalHours = (timeLogs: TimeLog[]) => {
    let totalMilliseconds = 0;
    
    timeLogs.forEach(log => {
      if (log.clockOut) {
        totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
      }
    });
    
    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleClockInOut = () => {
    const currentDate = new Date().toLocaleDateString();
    
    if (!isClockedIn) {
      // Clock In
      const newTimeLog: TimeLog = {
        clockIn: new Date(),
        clockOut: null
      };
      
      setDayLogs(prevLogs => {
        const existingDayLog = prevLogs.find(log => log.date === currentDate);
        
        if (existingDayLog) {
          return prevLogs.map(log => 
            log.date === currentDate
              ? { ...log, timeLogs: [...log.timeLogs, newTimeLog] }
              : log
          );
        } else {
          return [...prevLogs, {
            date: currentDate,
            timeLogs: [newTimeLog],
            isExpanded: false
          }];
        }
      });
    } else {
      // Clock Out
      setDayLogs(prevLogs => 
        prevLogs.map(dayLog => {
          if (dayLog.date === currentDate) {
            const updatedTimeLogs = dayLog.timeLogs.map((log, index) => {
              if (index === dayLog.timeLogs.length - 1) {
                return { ...log, clockOut: new Date() };
              }
              return log;
            });
            return { ...dayLog, timeLogs: updatedTimeLogs };
          }
          return dayLog;
        })
      );
    }
    
    setIsClockedIn(!isClockedIn);
  };

  const toggleDayExpansion = (date: string) => {
    setDayLogs(prevLogs =>
      prevLogs.map(log =>
        log.date === date
          ? { ...log, isExpanded: !log.isExpanded }
          : log
      )
    );
  };

  // type user = {
  //   firstName: string;
  //   lastName: string
  // };

  // const [newData,setNewData] = useState<user[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/user");
  //       const result = await response.json();
  //       setNewData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // },[]);

  const [userLastName, setUserLastName] = useState<string | null>(null);

  useEffect(() => {
    const lastName = localStorage.getItem("userLastName");
    setUserLastName(lastName);
  }, []);


  return (
    <div className="p-8 h-screen">
      <div className="grid gap-8">
        <Card>
          <CardContent className="flex justify-between">
            <div className="mt-10">
              <p className="flex text-4xl font-semibold leading-none text-gray-700 tracking-tight">
                {/* <span className="text-violet-600">Hi</span>, Bhikadiya */}
                <span className="text-violet-600">Hi</span>,
                {userLastName ? (
                  <span className="ml-2">{userLastName}</span>
                ) : (
                  <span className="text-gray-400">Loading...</span>
                )}
              </p>
              <p className="py-3">Working hours: 9:00 AM to 7:00 PM</p>
              <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aspernatur distinctio repellat eius tempora. Magnam doloribus facere quia animi alias, provident, modi suscipit distinctio earum vel, culpa minima nemo officia.</p>
            </div>
            <Clock />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-700">
              Attendance Log
              <Button
                onClick={handleClockInOut}
                className="bg-white text-violet-600 border-solid border-violet-600 shadow-xl rounded-3xl relative z-0 scale-100 transition-all duration-300 hover:text-white hover:bg-violet-600 hover:scale-100"
                variant={isClockedIn ? "destructive" : "default"}
              >
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Late Time</TableHead>
                  <TableHead>Early Time</TableHead>
                  <TableHead>Late Leave</TableHead>
                  <TableHead>Early Leave</TableHead>
                  <TableHead>Total Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayLogs.map((dayLog) => (
                  <>
                    <TableRow key={dayLog.date} className="cursor-pointer hover:bg-gray-50" onClick={() => toggleDayExpansion(dayLog.date)}>
                      <TableCell>
                        {dayLog.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </TableCell>
                      <TableCell>{dayLog.date}</TableCell>
                      <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
                      <TableCell>
                        {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut 
                          ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
                          : "-"}
                      </TableCell>
                      <TableCell>{calculateLateTime(dayLog.timeLogs[0].clockIn)}</TableCell>
                      <TableCell>{calculateEarlyTime(dayLog.timeLogs[0].clockIn)}</TableCell>
                      <TableCell>
                        {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
                          ? calculateLateLeave(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
                          ? calculateEarlyLeave(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
                          : "-"}
                      </TableCell>
                      <TableCell>{calculateTotalHours(dayLog.timeLogs)}</TableCell>
                    </TableRow>
                    {dayLog.isExpanded && dayLog.timeLogs.map((timeLog, index) => (
                      <TableRow key={`${dayLog.date}-${index}`} className="bg-gray-50">
                        <TableCell></TableCell>
                        <TableCell>Session {index + 1}</TableCell>
                        <TableCell>{formatTime(timeLog.clockIn)}</TableCell>
                        <TableCell>{timeLog.clockOut ? formatTime(timeLog.clockOut) : "-"}</TableCell>
                        <TableCell colSpan={5}></TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}











// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import Clock from "../clock/page";
// import { useAttendance } from "@/lib/AttendanceContext";

// const WORK_START_HOUR = 9;
// const WORK_END_HOUR = 19;

// export default function DashboardPage() {
//   const { dayLogs, setDayLogs, isClockedIn, setIsClockedIn } = useAttendance();
//   const router = useRouter();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [userLastName, setUserLastName] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const lastName = localStorage.getItem("userLastName");

//     setUserId(userId);
//     setUserLastName(lastName);
//   }, []);

//   const formatTime = (date: Date) => {
//     return new Intl.DateTimeFormat("en-US", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   const handleClockInOut = () => {
//     const currentDate = new Date().toLocaleDateString();
    
//     if (!isClockedIn) {
//       const newTimeLog = {
//         clockIn: new Date(),
//         clockOut: null
//       };

//       // Update the dayLogs for this specific user
//       setDayLogs(prevLogs => {
//         const existingDayLog = prevLogs.find(log => log.userId === userId && log.date === currentDate);

//         if (existingDayLog) {
//           return prevLogs.map(log =>
//             log.userId === userId && log.date === currentDate
//               ? { ...log, timeLogs: [...log.timeLogs, newTimeLog] }
//               : log
//           );
//         } else {
//           return [
//             ...prevLogs,
//             {
//               userId,
//               date: currentDate,
//               timeLogs: [newTimeLog],
//               isExpanded: false
//             }
//           ];
//         }
//       });
//     } else {
//       // Clock Out
//       setDayLogs(prevLogs =>
//         prevLogs.map(dayLog => {
//           if (dayLog.userId === userId && dayLog.date === currentDate) {
//             const updatedTimeLogs = dayLog.timeLogs.map((log, index) => {
//               if (index === dayLog.timeLogs.length - 1) {
//                 return { ...log, clockOut: new Date() };
//               }
//               return log;
//             });
//             return { ...dayLog, timeLogs: updatedTimeLogs };
//           }
//           return dayLog;
//         })
//       );
//     }

//     setIsClockedIn(!isClockedIn);
//   };

//   return (
//     <div className="p-8 h-screen">
//       <div className="grid gap-8">
//         <Card>
//           <CardContent className="flex justify-between">
//             <div className="mt-10">
//               <p className="flex text-4xl font-semibold leading-none text-gray-700 tracking-tight">
//                 <span className="text-violet-600">Hi</span>,
//                 {userLastName ? (
//                   <span className="ml-2">{userLastName}</span>
//                 ) : (
//                   <span className="text-gray-400">Loading...</span>
//                 )}
//               </p>
//               <p className="py-3">Working hours: 9:00 AM to 7:00 PM</p>
//               <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//             </div>
//             <Clock />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between text-gray-700">
//               Attendance Log
//               <Button
//                 onClick={handleClockInOut}
//                 className="bg-white text-violet-600 border-solid border-violet-600 shadow-xl rounded-3xl relative z-0 scale-100 transition-all duration-300 hover:text-white hover:bg-violet-600 hover:scale-100"
//                 variant={isClockedIn ? "destructive" : "default"}
//               >
//                 {isClockedIn ? "Clock Out" : "Clock In"}
//               </Button>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="mt-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead></TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Total Hours</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {dayLogs
//                   .filter(dayLog => dayLog.userId === userId)
//                   .map((dayLog) => (
//                     <TableRow key={dayLog.date} className="cursor-pointer">
//                       <TableCell>
//                         {dayLog.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                       </TableCell>
//                       <TableCell>{dayLog.date}</TableCell>
//                       <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut) : "-"}
//                       </TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs.reduce((total, log) => {
//                           if (log.clockOut) {
//                             return total + (log.clockOut.getTime() - log.clockIn.getTime());
//                           }
//                           return total;
//                         }, 0) / (1000 * 60 * 60)} hours
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import Clock from "../clock/page";
// import { useAttendance } from "@/lib/AttendanceContext";

// // Define the type for TimeLog and DayLog
// interface TimeLog {
//   clockIn: Date;
//   clockOut: Date | null;
// }

// interface DayLog {
//   userId: string;
//   date: string;
//   timeLogs: TimeLog[];
//   isExpanded: boolean;
// }

// const WORK_START_HOUR = 9;
// const WORK_END_HOUR = 19;

// export default function DashboardPage() {
//   const { dayLogs, setDayLogs, isClockedIn, setIsClockedIn } = useAttendance();
//   const router = useRouter();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [userLastName, setUserLastName] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const userIdFromStorage = localStorage.getItem("userId");
//     const lastName = localStorage.getItem("userLastName");

//     if (userIdFromStorage) {
//       setUserId(userIdFromStorage);
//     } else {
//       // Handle error if userId is not in localStorage
//       console.error("User ID not found in localStorage.");
//     }
//     setUserLastName(lastName);
//   }, []);

//   const formatTime = (date: Date) => {
//     return new Intl.DateTimeFormat("en-US", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   const handleClockInOut = () => {
//     const currentDate = new Date().toLocaleDateString();

//     if (!userId) {
//       console.error("User ID is missing.");
//       return;
//     }

//     if (!isClockedIn) {
//       const newTimeLog = {
//         clockIn: new Date(),
//         clockOut: null
//       };

//       // Update the dayLogs for this specific user
//       setDayLogs((prevLogs) => {
//         const existingDayLog = prevLogs.find(
//           (log) => log.userId === userId && log.date === currentDate
//         );

//         if (existingDayLog) {
//           return prevLogs.map((log) =>
//             log.userId === userId && log.date === currentDate
//               ? { ...log, timeLogs: [...log.timeLogs, newTimeLog] }
//               : log
//           );
//         } else {
//           return [
//             ...prevLogs,
//             {
//               userId: userId,
//               date: currentDate,
//               timeLogs: [newTimeLog],
//               isExpanded: false
//             }
//           ];
//         }
//       });
//     } else {
//       // Clock Out
//       setDayLogs((prevLogs) =>
//         prevLogs.map((dayLog) => {
//           if (dayLog.userId === userId && dayLog.date === currentDate) {
//             const updatedTimeLogs = dayLog.timeLogs.map((log, index) => {
//               if (index === dayLog.timeLogs.length - 1 && log.clockOut === null) {
//                 return { ...log, clockOut: new Date() };
//               }
//               return log;
//             });
//             return { ...dayLog, timeLogs: updatedTimeLogs };
//           }
//           return dayLog;
//         })
//       );
//     }

//     setIsClockedIn(!isClockedIn);
//   };

//   return (
//     <div className="p-8 h-screen">
//       <div className="grid gap-8">
//         <Card>
//           <CardContent className="flex justify-between">
//             <div className="mt-10">
//               <p className="flex text-4xl font-semibold leading-none text-gray-700 tracking-tight">
//                 <span className="text-violet-600">Hi</span>,
//                 {userLastName ? (
//                   <span className="ml-2">{userLastName}</span>
//                 ) : (
//                   <span className="text-gray-400">Loading...</span>
//                 )}
//               </p>
//               <p className="py-3">Working hours: 9:00 AM to 7:00 PM</p>
//               <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//             </div>
//             <Clock />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between text-gray-700">
//               Attendance Log
//               <Button
//                 onClick={handleClockInOut}
//                 className="bg-white text-violet-600 border-solid border-violet-600 shadow-xl rounded-3xl relative z-0 scale-100 transition-all duration-300 hover:text-white hover:bg-violet-600 hover:scale-100"
//                 variant={isClockedIn ? "destructive" : "default"}
//               >
//                 {isClockedIn ? "Clock Out" : "Clock In"}
//               </Button>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="mt-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead></TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Total Hours</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {dayLogs
//                   .filter((dayLog) => dayLog.userId === userId)
//                   .map((dayLog) => (
//                     <TableRow key={dayLog.date} className="cursor-pointer">
//                       <TableCell>
//                         {dayLog.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                       </TableCell>
//                       <TableCell>{dayLog.date}</TableCell>
//                       <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
//                           ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut)
//                           : "-"}
//                       </TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs.reduce((total, log) => {
//                           if (log.clockOut) {
//                             return total + (log.clockOut.getTime() - log.clockIn.getTime());
//                           }
//                           return total;
//                         }, 0) / (1000 * 60 * 60)} hours
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }










// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import Clock from "../clock/page";
// import { useAttendance } from "@/lib/AttendanceContext";

// // Define the type for TimeLog and DayLog
// // interface TimeLog {
// //   clockIn: Date;
// //   clockOut: Date | null; // Explicitly allow clockOut to be null
// // }

// // interface DayLog {
// //   userId: string;
// //   date: string;
// //   timeLogs: TimeLog[];
// //   isExpanded: boolean;
// // }

// const WORK_START_HOUR = 9;
// const WORK_END_HOUR = 19;

// export default function DashboardPage() {
//   const { dayLogs, setDayLogs, isClockedIn, setIsClockedIn } = useAttendance();
//   const router = useRouter();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [userLastName, setUserLastName] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const userIdFromStorage = localStorage.getItem("userId");
//     const lastName = localStorage.getItem("userLastName");

//     if (userIdFromStorage) {
//       setUserId(userIdFromStorage);
//     } else {
//       // Handle error if userId is not in localStorage
//       console.error("User ID not found in localStorage.");
//     }
//     setUserLastName(lastName);
//   }, []);

//   const formatTime = (date: Date) => {
//     return new Intl.DateTimeFormat("en-US", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   const handleClockInOut = () => {
//     const currentDate = new Date().toLocaleDateString();

//     if (!userId) {
//       console.error("User ID is missing.");
//       return;
//     }

//     if (!isClockedIn) {
//       const newTimeLog = {
//         clockIn: new Date(),
//         clockOut: null // Set clockOut to null when clocking in
//       };

//       // Update the dayLogs for this specific user
//       setDayLogs((prevLogs) => {
//         const existingDayLog = prevLogs.find(
//           (log) => log.userId === userId && log.date === currentDate
//         );

//         if (existingDayLog) {
//           return prevLogs.map((log) =>
//             log.userId === userId && log.date === currentDate
//               ? { ...log, timeLogs: [...log.timeLogs, newTimeLog] }
//               : log
//           );
//         } else {
//           return [
//             ...prevLogs,
//             {
//               userId: userId,
//               date: currentDate,
//               timeLogs: [newTimeLog],
//               isExpanded: false
//             }
//           ];
//         }
//       });
//     } else {
//       // Clock Out
//       setDayLogs((prevLogs) =>
//         prevLogs.map((dayLog) => {
//           if (dayLog.userId === userId && dayLog.date === currentDate) {
//             const updatedTimeLogs = dayLog.timeLogs.map((log, index) => {
//               if (index === dayLog.timeLogs.length - 1 && log.clockOut === null) {
//                 return { ...log, clockOut: new Date() }; // Set clockOut to current time
//               }
//               return log;
//             });
//             return { ...dayLog, timeLogs: updatedTimeLogs };
//           }
//           return dayLog;
//         })
//       );
//     }

//     setIsClockedIn(!isClockedIn);
//   };

//   return (
//     <div className="p-8 h-screen">
//       <div className="grid gap-8">
//         <Card>
//           <CardContent className="flex justify-between">
//             <div className="mt-10">
//               <p className="flex text-4xl font-semibold leading-none text-gray-700 tracking-tight">
//                 <span className="text-violet-600">Hi</span>,
//                 {userLastName ? (
//                   <span className="ml-2">{userLastName}</span>
//                 ) : (
//                   <span className="text-gray-400">Loading...</span>
//                 )}
//               </p>
//               <p className="py-3">Working hours: 9:00 AM to 7:00 PM</p>
//               <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//             </div>
//             <Clock />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between text-gray-700">
//               Attendance Log
//               <Button
//                 onClick={handleClockInOut}
//                 className="bg-white text-violet-600 border-solid border-violet-600 shadow-xl rounded-3xl relative z-0 scale-100 transition-all duration-300 hover:text-white hover:bg-violet-600 hover:scale-100"
//                 variant={isClockedIn ? "destructive" : "default"}
//               >
//                 {isClockedIn ? "Clock Out" : "Clock In"}
//               </Button>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="mt-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead></TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Total Hours</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {dayLogs
//                   .filter((dayLog) => dayLog.userId === userId)
//                   .map((dayLog) => (
//                     <TableRow key={dayLog.date} className="cursor-pointer">
//                       <TableCell>
//                         {dayLog.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                       </TableCell>
//                       <TableCell>{dayLog.date}</TableCell>
//                       <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
//                           ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut)
//                           : "-"}
//                       </TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs.reduce((total, log) => {
//                           if (log.clockOut) {
//                             return total + (log.clockOut.getTime() - log.clockIn.getTime());
//                           }
//                           return total;
//                         }, 0) / (1000 * 60 * 60)} hours
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }





















// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import Clock from "../clock/page";
// import { useAttendance } from "@/lib/AttendanceContext";
// import data from "../../data/data.json"

// interface TimeLog {
//   clockIn: Date;
//   clockOut: Date | null;
// }

// export default function DashboardPage() {
//   const { userId,dayLogs, setDayLogs, isClockedIn, setIsClockedIn } = useAttendance();
//   const router = useRouter();
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const WORK_START_HOUR = 9;
//   const WORK_END_HOUR = 19;

//   //clock mate che 
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);


//   //session time check karva mate che
//   // useEffect(() => {
//   //   const accessToken = sessionStorage.getItem("accessToken");
//   //   const loginTime = sessionStorage.getItem("loginTime");

//   //   if (!accessToken || !loginTime) {
//   //     sessionStorage.clear();
//   //     router.push("/auth/login"); // Redirect to login if no session
//   //     return;
//   //   }

//   //   const currentTime = new Date().getTime();
//   //   const sessionDuration = currentTime - parseInt(loginTime);

//   //   if (sessionDuration > 1 * 60 * 1000) {
//   //     sessionStorage.clear();
//   //     router.push("/auth/login"); // Session expired
//   //   } else {
//   //     setUserLastName(sessionStorage.getItem("userLastName"));
//   //   }
//   // }, []);


//   const formatTime = (date: Date) => {
//     if (!(date instanceof Date) || isNaN(date.getTime())) {
//       // If date is invalid, return a default value or handle the error
//       return "Invalid date";
//     }
//     return new Intl.DateTimeFormat("en-US", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   const calculateTimeDifference = (start: Date, end: Date) => {
//     const diff = end.getTime() - start.getTime();
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return { hours, minutes };
//   };

//   const calculateLateTime = (clockIn: Date) => {
//     const workStart = new Date(clockIn);
//     workStart.setHours(WORK_START_HOUR, 0, 0, 0);
    
//     if (clockIn > workStart) {
//       const { hours, minutes } = calculateTimeDifference(workStart, clockIn);
//       return `${hours}h ${minutes}m`;
//     }
//     return "-";
//   };

//   const calculateEarlyTime = (clockIn: Date) => {
//     const workStart = new Date(clockIn);
//     workStart.setHours(WORK_START_HOUR, 0, 0, 0);
    
//     if (clockIn < workStart) {
//       const { hours, minutes } = calculateTimeDifference(clockIn, workStart);
//       return `${hours}h ${minutes}m`;
//     }
//     return "-";
//   };

//   const calculateLateLeave = (clockOut: Date) => {
//     const workEnd = new Date(clockOut);
//     workEnd.setHours(WORK_END_HOUR, 0, 0, 0);
    
//     if (clockOut > workEnd) {
//       const { hours, minutes } = calculateTimeDifference(workEnd, clockOut);
//       return `${hours}h ${minutes}m`;
//     }
//     return "-";
//   };

//   const calculateEarlyLeave = (clockOut: Date) => {
//     const workEnd = new Date(clockOut);
//     workEnd.setHours(WORK_END_HOUR, 0, 0, 0);
    
//     if (clockOut < workEnd) {
//       const { hours, minutes } = calculateTimeDifference(clockOut, workEnd);
//       return `${hours}h ${minutes}m`;
//     }
//     return "-";
//   };

//   const calculateTotalHours = (timeLogs: TimeLog[]) => {
//     let totalMilliseconds = 0;
    
//     // timeLogs.forEach(log => {
//     //   if (log.clockOut) {
//     //     totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
//     //   }
//     // });

//     timeLogs.forEach(log => {
//   if (log.clockOut instanceof Date && !isNaN(log.clockOut.getTime())) {
//     totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
//   } else {
//     // Handle invalid clockOut value, e.g., log an error or skip this log
//     console.warn("Invalid clockOut for log:", log);
//   }
// });

    
//     const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
//     const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   // const handleClockInOut = () => {
//   //   const currentDate = new Date().toLocaleDateString();
    
//   //   if (!isClockedIn) {
//   //     // Clock In
//   //     const newTimeLog: TimeLog = {
//   //       clockIn: new Date(),
//   //       clockOut: null
//   //     };
      
//   //     setDayLogs(prevLogs => {
//   //       const existingDayLog = prevLogs.find(log => log.date === currentDate);
        
//   //       if (existingDayLog) {
//   //         return prevLogs.map(log => 
//   //           log.date === currentDate
//   //             ? { ...log, timeLogs: [...log.timeLogs, newTimeLog] }
//   //             : log
//   //         );
//   //       } else {
//   //         return [...prevLogs, {
//   //           date: currentDate,
//   //           timeLogs: [newTimeLog],
//   //           isExpanded: false
//   //         }];
//   //       }
//   //     });
//   //   } else {
//   //     // Clock Out
//   //     setDayLogs(prevLogs => 
//   //       prevLogs.map(dayLog => {
//   //         if (dayLog.date === currentDate) {
//   //           const updatedTimeLogs = dayLog.timeLogs.map((log, index) => {
//   //             if (index === dayLog.timeLogs.length - 1) {
//   //               return { ...log, clockOut: new Date() };
//   //             }
//   //             return log;
//   //           });
//   //           return { ...dayLog, timeLogs: updatedTimeLogs };
//   //         }
//   //         return dayLog;
//   //       })
//   //     );
//   //   }
    
//   //   setIsClockedIn(!isClockedIn);
//   // };



//   const storeUserData = (data: any) => {
//     localStorage.setItem(`attendance_${userId}`, JSON.stringify(data));
//   };

//   // Fetch user data from localStorage based on userId
//   const fetchUserData = () => {
//     const storedData = localStorage.getItem(`attendance_${userId}`);
//     return storedData ? JSON.parse(storedData) : [];
//   };

//   useEffect(() => {
//     // Fetch and load user-specific data when user logs in
//     const userData = fetchUserData();
//     setDayLogs(userData);
//   }, [userId]);

//   const handleClockInOut = () => {
//     const currentDate = new Date().toLocaleDateString();
//     const currentTimeLog: TimeLog = {
//       clockIn: new Date(),
//       clockOut: null
//     };

//     if (!isClockedIn) {
//       // Clock In
//       const updatedLogs = [...dayLogs, { date: currentDate, timeLogs: [currentTimeLog], isExpanded: false }];
//       setDayLogs(updatedLogs);
//       storeUserData(updatedLogs);
//     } else {
//       // Clock Out
//       const updatedLogs = dayLogs.map((log) => {
//         if (log.date === currentDate) {
//           const updatedTimeLogs = log.timeLogs.map((timeLog, index) => {
//             if (index === log.timeLogs.length - 1 && !timeLog.clockOut) {
//               return { ...timeLog, clockOut: new Date() };
//             }
//             return timeLog;
//           });
//           return { ...log, timeLogs: updatedTimeLogs };
//         }
//         return log;
//       });
//       setDayLogs(updatedLogs);
//       storeUserData(updatedLogs);
//     }

//     setIsClockedIn(!isClockedIn);
//   };





//   const toggleDayExpansion = (date: string) => {
//     setDayLogs(prevLogs =>
//       prevLogs.map(log =>
//         log.date === date
//           ? { ...log, isExpanded: !log.isExpanded }
//           : log
//       )
//     );
//   };

//   // type user = {
//   //   firstName: string;
//   //   lastName: string
//   // };

//   // const [newData,setNewData] = useState<user[]>([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:3000/user");
//   //       const result = await response.json();
//   //       setNewData(result);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };
//   //   fetchData();
//   // },[]);

//   const [userLastName, setUserLastName] = useState<string | null>(null);

//   useEffect(() => {
//     const lastName = localStorage.getItem("userLastName");
//     setUserLastName(lastName);
//   }, []);


//   return (
//     <div className="p-8 h-screen">
//       <div className="grid gap-8">
//         <Card>
//           <CardContent className="flex justify-between">
//             <div className="mt-10">
//               <p className="flex text-4xl font-semibold leading-none text-gray-700 tracking-tight">
//                 {/* <span className="text-violet-600">Hi</span>, Bhikadiya */}
//                 <span className="text-violet-600">Hi</span>,
//                 {userLastName ? (
//                   <span className="ml-2">{userLastName}</span>
//                 ) : (
//                   <span className="text-gray-400">Loading...</span>
//                 )}
//               </p>
//               <p className="py-3">Working hours: 9:00 AM to 7:00 PM</p>
//               <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aspernatur distinctio repellat eius tempora. Magnam doloribus facere quia animi alias, provident, modi suscipit distinctio earum vel, culpa minima nemo officia.</p>
//             </div>
//             <Clock />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between text-gray-700">
//               Attendance Log
//               <Button
//                 onClick={handleClockInOut}
//                 className="bg-white text-violet-600 border-solid border-violet-600 shadow-xl rounded-3xl relative z-0 scale-100 transition-all duration-300 hover:text-white hover:bg-violet-600 hover:scale-100"
//                 variant={isClockedIn ? "destructive" : "default"}
//               >
//                 {isClockedIn ? "Clock Out" : "Clock In"}
//               </Button>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="mt-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead></TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Late Time</TableHead>
//                   <TableHead>Early Time</TableHead>
//                   <TableHead>Late Leave</TableHead>
//                   <TableHead>Early Leave</TableHead>
//                   <TableHead>Total Hours</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {dayLogs.map((dayLog) => (
//                   <>
//                     <TableRow key={dayLog.date} className="cursor-pointer hover:bg-gray-50" onClick={() => toggleDayExpansion(dayLog.date)}>
//                       <TableCell>
//                         {dayLog.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                       </TableCell>
//                       <TableCell>{dayLog.date}</TableCell>
//                       <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut 
//                           ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
//                           : "-"}
//                       </TableCell>
//                       <TableCell>{calculateLateTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                       <TableCell>{calculateEarlyTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
//                           ? calculateLateLeave(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
//                           : "-"}
//                       </TableCell>
//                       <TableCell>
//                         {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
//                           ? calculateEarlyLeave(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
//                           : "-"}
//                       </TableCell>
//                       <TableCell>{calculateTotalHours(dayLog.timeLogs)}</TableCell>
//                     </TableRow>
//                     {dayLog.isExpanded && dayLog.timeLogs.map((timeLog, index) => (
//                       <TableRow key={`${dayLog.date}-${index}`} className="bg-gray-50">
//                         <TableCell></TableCell>
//                         <TableCell>Session {index + 1}</TableCell>
//                         <TableCell>{formatTime(timeLog.clockIn)}</TableCell>
//                         <TableCell>{timeLog.clockOut ? formatTime(timeLog.clockOut) : "-"}</TableCell>
//                         <TableCell colSpan={5}></TableCell>
//                       </TableRow>
//                     ))}
//                   </>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }