"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimeLog {
  clockIn: Date;
  clockOut: Date | null;
}

interface DayLog {
  // userId: string;
  date: string;
  timeLogs: TimeLog[];
  isExpanded: boolean;
}

interface AttendanceContextType {
  dayLogs: DayLog[];
  setDayLogs: React.Dispatch<React.SetStateAction<DayLog[]>>;
  isClockedIn: boolean;
  setIsClockedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [isClockedIn, setIsClockedIn] = useState(false);

  return (
    <AttendanceContext.Provider value={{ dayLogs, setDayLogs, isClockedIn, setIsClockedIn }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
}




// "use client";

// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface TimeLog {
//   clockIn: Date;
//   clockOut: Date | null;
// }

// interface DayLog {
//   date: string;
//   timeLogs: TimeLog[];
//   isExpanded: boolean;
// }

// interface AttendanceContextType {
//   userId: string | null; // Add userId here
//   setUserId: React.Dispatch<React.SetStateAction<string | null>>; // Function to update userId
//   dayLogs: DayLog[];
//   setDayLogs: React.Dispatch<React.SetStateAction<DayLog[]>>;
//   isClockedIn: boolean;
//   setIsClockedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

// export function AttendanceProvider({ children }: { children: ReactNode }) {
//   // Add userId state
//   const [userId, setUserId] = useState<string | null>(null); // Default is null (not logged in yet)
//   const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
//   const [isClockedIn, setIsClockedIn] = useState(false);

//   return (
//     <AttendanceContext.Provider
//       value={{
//         userId,
//         setUserId, // Provide setUserId function
//         dayLogs,
//         setDayLogs,
//         isClockedIn,
//         setIsClockedIn,
//       }}
//     >
//       {children}
//     </AttendanceContext.Provider>
//   );
// }

// export function useAttendance() {
//   const context = useContext(AttendanceContext);
//   if (context === undefined) {
//     throw new Error("useAttendance must be used within an AttendanceProvider");
//   }
//   return context;
// }
