// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";


// export default function AttendancePage() {
//   return (
//     <div className="p-8">
//       <div className="grid gap-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Attendance Overview</CardTitle>
//             <Select defaultValue="month">
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select period" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//                 <SelectItem value="year">This Year</SelectItem>
//               </SelectContent>
//             </Select>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-4 mb-8">
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Total Hours</h3>
//                 <p className="text-3xl font-bold">160h</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Points Earned</h3>
//                 <p className="text-3xl font-bold">75</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Attendance Rate</h3>
//                 <p className="text-3xl font-bold">95%</p>
//               </div>
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Working Hours</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Points</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {/* Sample data */}
//                 <TableRow>
//                   <TableCell>2024-03-20</TableCell>
//                   <TableCell>09:00 AM</TableCell>
//                   <TableCell>07:00 PM</TableCell>
//                   <TableCell>10h</TableCell>
//                   <TableCell>On Time</TableCell>
//                   <TableCell>5</TableCell>
//                 </TableRow>

//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAttendance } from "@/lib/AttendanceContext";
import { useState, useMemo } from "react";

export default function AttendancePage() {
  const { dayLogs } = useAttendance();
  const [period, setPeriod] = useState("month");

  const calculateTotalHours = () => {
    let totalMilliseconds = 0;

    dayLogs.forEach(dayLog => {
      dayLog.timeLogs.forEach(log => {
        if (log.clockOut) {
          totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
        }
      });
    });

    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return { totalHours: hours, totalMinutes: minutes };
  };

  const { totalHours, totalMinutes } = useMemo(calculateTotalHours, [dayLogs]);

  const attendanceRate = Math.min(100, Math.round((dayLogs.length / 30) * 100)); // Assuming 30 days in a month
  const points = Math.floor(totalHours * 5);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const calculateWorkingHours = (timeLogs: { clockIn: Date; clockOut: Date | null }[]) => {
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

  return (
    <div className="p-8">
      <div className="grid gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Attendance Overview</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Hours</h3>
                <p className="text-3xl font-bold">{totalHours}h {totalMinutes}m</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Points Earned</h3>
                <p className="text-3xl font-bold">{points}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Attendance Rate</h3>
                <p className="text-3xl font-bold">{attendanceRate}%</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayLogs.map((dayLog) => (
                  <TableRow key={dayLog.date}>
                    <TableCell>{dayLog.date}</TableCell>
                    <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
                    <TableCell>
                      {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
                        ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
                        : "-"}
                    </TableCell>
                    <TableCell>{calculateWorkingHours(dayLog.timeLogs)}</TableCell>
                    <TableCell>
                      {dayLog.timeLogs[0].clockIn.getHours() <= 9 ? "On Time" : "Late"}
                    </TableCell>
                    <TableCell>
                      {Math.floor(
                        Number(calculateWorkingHours(dayLog.timeLogs).replace("h", "")) * 0.5
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useAttendance } from "@/lib/AttendanceContext";
// import { useState } from "react";

// export default function AttendancePage() {

//   const { dayLogs } = useAttendance();
//   const [period, setPeriod] = useState("month");

//   const calculateStats = () => {

//     let totalHours = 0;
//     let totalDays = dayLogs.length;
    
//     dayLogs.forEach(dayLog => {
//       dayLog.timeLogs.forEach(log => {
//         if (log.clockOut) {
//           totalHours += (log.clockOut.getTime() - log.clockIn.getTime()) / (1000 * 60 * 60);
//         }
//       });
//     });

//     const hours = Math.floor(totalHours / (1000 * 60 * 60));
//     const minutes = Math.floor((totalHours % (1000 * 60 * 60)) / (1000 * 60));
    

//     const attendanceRate = (totalDays / 30) * 100; // Assuming 30 days in a month
//     const points = Math.floor(totalHours * 0.5); // 0.5 points per hour

//     return {
//       totalHours: `${hours}h ${minutes}m`,
//       // totalHours: Math.round(totalHours),
//       points,
//       attendanceRate: Math.min(100, Math.round(attendanceRate))
//     };
//   };

//   const formatTime = (date: Date) => {
//     return new Intl.DateTimeFormat("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   const calculateWorkingHours = (timeLogs: { clockIn: Date; clockOut: Date | null }[]) => {
//     // let total = 0;
//     // timeLogs.forEach(log => {
//     //   if (log.clockOut) {
//     //     // total += (log.clockOut.getTime() - log.clockIn.getTime()) / (1000 * 60 * 60);
//     //     total += (log.clockOut.getTime() - log.clockIn.getTime()) / (1000 * 60 * 60);
//     //   }
//     // });
//     // return `${Math.round(hour)}h${Math.round(minute)}m`;
//     // // return formatHoursAndMinutes(total);

//     let totalMilliseconds = 0;

//     timeLogs.forEach(log => {
//       if (log.clockOut) {
//         totalMilliseconds += log.clockOut.getTime() - log.clockIn.getTime();
//       }
//     });
    
//     const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
//     const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

//     return `${hours}h ${minutes}m`;
//   };

//   const stats = calculateStats();

//   return (
//     <div className="p-8">
//       <div className="grid gap-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Attendance Overview</CardTitle>
//             <Select value={period} onValueChange={setPeriod}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select period" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//                 <SelectItem value="year">This Year</SelectItem>
//               </SelectContent>
//             </Select>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-4 mb-8">
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Total Hours</h3>
//                 <p className="text-3xl font-bold">{stats.totalHours}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Points Earned</h3>
//                 <p className="text-3xl font-bold">{stats.points}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Attendance Rate</h3>
//                 <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
//               </div>
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Working Hours</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Points</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {dayLogs.map((dayLog) => (
//                   <TableRow key={dayLog.date}>
//                     <TableCell>{dayLog.date}</TableCell>
//                     <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                     <TableCell>
//                       {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
//                         ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
//                         : "-"}
//                     </TableCell>
//                     <TableCell>{calculateWorkingHours(dayLog.timeLogs)}</TableCell>
//                     <TableCell>
//                       {dayLog.timeLogs[0].clockIn.getHours() <= 9 ? "On Time" : "Late"}
//                     </TableCell>
//                     <TableCell>
//                       {Math.floor(
//                         Number(calculateWorkingHours(dayLog.timeLogs).replace("h", "")) * 0.5
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useAttendance } from "@/lib/AttendanceContext";
// import { useState } from "react";

// export default function AttendancePage() {
//   const { dayLogs } = useAttendance();
//   const [period, setPeriod] = useState("month");

//   const formatHoursAndMinutes = (totalHours: number) => {
//     const hours = Math.floor(totalHours);
//     const minutes = Math.round((totalHours - hours) * 60);
//     return `${hours}h ${minutes}m`;
//   };

//   const calculateStats = () => {
//     let totalHours = 0;
//     let totalWorkDays = 0;
//     const currentDate = new Date();
//     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//     const totalWorkingDays = countWorkingDays(firstDayOfMonth, lastDayOfMonth);
    
//     dayLogs.forEach(dayLog => {
//       const logDate = new Date(dayLog.date);
//       if (logDate >= firstDayOfMonth && logDate <= lastDayOfMonth) {
//         totalWorkDays++;
//         dayLog.timeLogs.forEach(log => {
//           if (log.clockOut) {
//             totalHours += (log.clockOut.getTime() - log.clockIn.getTime()) / (1000 * 60 * 60);
//           }
//         });
//       }
//     });

//     const attendanceRate = (totalWorkDays / totalWorkingDays) * 100;
//     const points = Math.floor(totalHours * 0.5); // 0.5 points per hour

//     return {
//       totalHours,
//       formattedHours: formatHoursAndMinutes(totalHours),
//       points,
//       attendanceRate: Math.min(100, Math.round(attendanceRate))
//     };
//   };

//   const countWorkingDays = (start: Date, end: Date) => {
//     let count = 0;
//     const current = new Date(start);
//     while (current <= end) {
//       // Check if it's a weekday (Monday-Friday)
//       if (current.getDay() !== 0 && current.getDay() !== 6) {
//         count++;
//       }
//       current.setDate(current.getDate() + 1);
//     }
//     return count;
//   };

//   const formatTime = (date: Date) => {
//     return new Intl.DateTimeFormat("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   const calculateWorkingHours = (timeLogs: { clockIn: Date; clockOut: Date | null }[]) => {
//     let total = 0;
//     timeLogs.forEach(log => {
//       if (log.clockOut) {
//         total += (log.clockOut.getTime() - log.clockIn.getTime()) / (1000 * 60 * 60);
//       }
//     });
//     return formatHoursAndMinutes(total);
//   };

//   const stats = calculateStats();

//   return (
//     <div className="p-8">
//       <div className="grid gap-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Attendance Overview</CardTitle>
//             <Select value={period} onValueChange={setPeriod}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select period" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//                 <SelectItem value="year">This Year</SelectItem>
//               </SelectContent>
//             </Select>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-4 mb-8">
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Total Hours</h3>
//                 <p className="text-3xl font-bold">{stats.formattedHours}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Points Earned</h3>
//                 <p className="text-3xl font-bold">{stats.points}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold">Attendance Rate</h3>
//                 <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
//               </div>
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Clock In</TableHead>
//                   <TableHead>Clock Out</TableHead>
//                   <TableHead>Working Hours</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Points</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {dayLogs.map((dayLog) => (
//                   <TableRow key={dayLog.date}>
//                     <TableCell>{dayLog.date}</TableCell>
//                     <TableCell>{formatTime(dayLog.timeLogs[0].clockIn)}</TableCell>
//                     <TableCell>
//                       {dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut
//                         ? formatTime(dayLog.timeLogs[dayLog.timeLogs.length - 1].clockOut!)
//                         : "-"}
//                     </TableCell>
//                     <TableCell>{calculateWorkingHours(dayLog.timeLogs)}</TableCell>
//                     <TableCell>
//                       {dayLog.timeLogs[0].clockIn.getHours() <= 9 ? "On Time" : "Late"}
//                     </TableCell>
//                     <TableCell>
//                       {Math.floor(
//                         Number(calculateWorkingHours(dayLog.timeLogs).replace(/[hm\s]/g, "")) * 0.5
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }