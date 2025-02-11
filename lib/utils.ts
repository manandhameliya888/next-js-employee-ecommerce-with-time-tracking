import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export const calculatePoints = (totalMinutes: number): number => {
  // 30 minutes = 5 points
  return Math.floor(totalMinutes / 30) * 5;
};

export const getAttendanceStatus = (
  clockIn: Date,
  clockOut: Date,
  workStartHour: number,
  workEndHour: number
): string => {
  const workStart = new Date(clockIn);
  workStart.setHours(workStartHour, 0, 0, 0);
  
  const workEnd = new Date(clockOut);
  workEnd.setHours(workEndHour, 0, 0, 0);

  if (clockIn > workStart) return 'Late';
  if (clockOut < workEnd) return 'Early Leave';
  if (clockOut > workEnd) return 'Extra Time';
  return 'On Time';
};

export const calculateTotalMinutes = (clockIn: Date, clockOut: Date): number => {
  return Math.floor((clockOut.getTime() - clockIn.getTime()) / (1000 * 60));
};