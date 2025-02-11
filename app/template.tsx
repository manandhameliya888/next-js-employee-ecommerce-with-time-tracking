"use client";

import { AttendanceProvider } from '@/lib/AttendanceContext';

export default function Template({ children }: { children: React.ReactNode }) {
  return <AttendanceProvider>{children}</AttendanceProvider>;
}