// "use client";
// import { useEffect, useRef } from "react";

// export default function Clock() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const radius = canvas.width / 2;

//     function drawClock() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawFace(ctx, radius);
//       drawNumbers(ctx, radius);
//       drawTime(ctx, radius);
//     }

//     function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.beginPath();
//       ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "white";
//       ctx.fill();

//       ctx.lineWidth = 5;
//       ctx.strokeStyle = "black";
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "black";
//       ctx.fill();
//     }

//     function drawNumbers(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.font = `${radius * 0.15}px Arial`;
//       ctx.textBaseline = "middle";
//       ctx.textAlign = "center";

//       for (let num = 1; num <= 12; num++) {
//         const angle = (num * Math.PI) / 6;
//         const x = radius + Math.cos(angle) * (radius - 20);
//         const y = radius + Math.sin(angle) * (radius - 20);
//         ctx.fillText(num.toString(), x, y);
//       }
//     }

//     function drawTime(ctx: CanvasRenderingContext2D, radius: number) {
//       const now = new Date();
//       let hour = now.getHours();
//       let minute = now.getMinutes();
//       let second = now.getSeconds();

//       hour = hour % 12;
//       hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
//       drawHand(ctx, hour, radius * 0.5, 6);

//       minute = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
//       drawHand(ctx, minute, radius * 0.7, 4);

//       second = (second * Math.PI) / 30;
//       drawHand(ctx, second, radius * 0.9, 2, "red");
//     }

//     function drawHand(
//       ctx: CanvasRenderingContext2D,
//       pos: number,
//       length: number,
//       width: number,
//       color: string = "black"
//     ) {
//       ctx.beginPath();
//       ctx.lineWidth = width;
//       ctx.lineCap = "round";
//       ctx.strokeStyle = color;
//       ctx.moveTo(radius, radius);
//       ctx.lineTo(radius + Math.cos(pos) * length, radius + Math.sin(pos) * length);
//       ctx.stroke();
//     }

//     function updateClock() {
//       drawClock();
//       requestAnimationFrame(updateClock);
//     }

//     updateClock();
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <canvas ref={canvasRef} width={200} height={200} className="bg-white shadow-lg rounded-full"></canvas>
//     </div>
//   );
// }



// "use client";
// import { useEffect, useRef } from "react";

// export default function Clock() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return; // ✅ Ensure canvas is not null

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return; // ✅ Ensure ctx is not null

//     const radius = canvas.width / 2;

//     function drawClock() {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawFace(ctx, radius);
//       drawNumbers(ctx, radius);
//       drawTime(ctx, radius);
//     }

//     function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.beginPath();
//       ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "white";
//       ctx.fill();

//       ctx.lineWidth = 5;
//       ctx.strokeStyle = "black";
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "black";
//       ctx.fill();
//     }

//     function drawNumbers(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.font = `${radius * 0.15}px Arial`;
//       ctx.textBaseline = "middle";
//       ctx.textAlign = "center";

//       for (let num = 1; num <= 12; num++) {
//         const angle = (num * Math.PI) / 6;
//         const x = radius + Math.cos(angle) * (radius - 20);
//         const y = radius + Math.sin(angle) * (radius - 20);
//         ctx.fillText(num.toString(), x, y);
//       }
//     }

//     function drawTime(ctx: CanvasRenderingContext2D, radius: number) {
//       const now = new Date();
//       let hour = now.getHours();
//       let minute = now.getMinutes();
//       let second = now.getSeconds();

//       hour = hour % 12;
//       hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
//       drawHand(ctx, hour, radius * 0.5, 6);

//       minute = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
//       drawHand(ctx, minute, radius * 0.7, 4);

//       second = (second * Math.PI) / 30;
//       drawHand(ctx, second, radius * 0.9, 2, "red");
//     }

//     function drawHand(
//       ctx: CanvasRenderingContext2D,
//       pos: number,
//       length: number,
//       width: number,
//       color: string = "black"
//     ) {
//       ctx.beginPath();
//       ctx.lineWidth = width;
//       ctx.lineCap = "round";
//       ctx.strokeStyle = color;
//       ctx.moveTo(radius, radius);
//       ctx.lineTo(radius + Math.cos(pos) * length, radius + Math.sin(pos) * length);
//       ctx.stroke();
//     }

//     function updateClock() {
//       drawClock();
//       requestAnimationFrame(updateClock);
//     }

//     updateClock();
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <canvas ref={canvasRef} width={200} height={200} className="bg-white shadow-lg rounded-full"></canvas>
//     </div>
//   );
// }


// "use client";
// import { useEffect, useRef } from "react";

// export default function Clock() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       console.warn("Canvas not found");
//       return;
//     }

//     const ctx = canvas.getContext("2d");
//     if (!ctx) {
//       console.warn("Canvas context not found");
//       return;
//     }

//     const radius = canvas.width / 2;

//     function drawClock() {
//       if (!ctx || !canvas) return; // ✅ Extra safety check
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawFace(ctx, radius);
//       drawNumbers(ctx, radius);
//       drawTime(ctx, radius);
//     }

//     function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.beginPath();
//       ctx.arc(radius, radius, radius - 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "white";
//       ctx.fill();

//       ctx.lineWidth = 5;
//       ctx.strokeStyle = "black";
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "black";
//       ctx.fill();
//     }

//     function drawNumbers(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.font = `${radius * 0.15}px Arial`;
//       ctx.textBaseline = "middle";
//       ctx.textAlign = "center";

//       for (let num = 1; num <= 12; num++) {
//         const angle = (num * Math.PI) / 6;
//         const x = radius + Math.cos(angle) * (radius - 20);
//         const y = radius + Math.sin(angle) * (radius - 20);
//         ctx.fillText(num.toString(), x, y);
//       }
//     }

//     function drawTime(ctx: CanvasRenderingContext2D, radius: number) {
//       const now = new Date();
//       let hour = now.getHours();
//       let minute = now.getMinutes();
//       let second = now.getSeconds();

//       hour = hour % 12;
//       hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
//       drawHand(ctx, hour, radius * 0.5, 6);

//       minute = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
//       drawHand(ctx, minute, radius * 0.7, 4);

//       second = (second * Math.PI) / 30;
//       drawHand(ctx, second, radius * 0.9, 2, "gray");
//     }

//     function drawHand(
//       ctx: CanvasRenderingContext2D,
//       pos: number,
//       length: number,
//       width: number,
//       color: string = "black"
//     ) {
//       ctx.beginPath();
//       ctx.lineWidth = width;
//       ctx.lineCap = "round";
//       ctx.strokeStyle = color;
//       ctx.moveTo(radius, radius);
//       ctx.lineTo(radius + Math.cos(pos) * length, radius + Math.sin(pos) * length);
//       ctx.stroke();
//     }

//     let animationFrameId: number;

//     function updateClock() {
//       drawClock();
//       animationFrameId = requestAnimationFrame(updateClock);
//     }

//     updateClock();

//     return () => cancelAnimationFrame(animationFrameId); // ✅ Clean up animation on unmount
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <canvas ref={canvasRef} width={200} height={200} className="bg-white shadow-lg rounded-full"></canvas>
//     </div>
//   );
// }




// "use client";
// import { useEffect, useRef } from "react";

// export default function Clock() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const radius = canvas.width / 2;
//     ctx.translate(radius, radius);

//     function drawClock() {
//       ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
//       drawFace(ctx, radius);
//       drawMarkers(ctx, radius);
//       drawTime(ctx, radius);
//     }

//     function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
//       // Outer circle
//       ctx.beginPath();
//       ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "#f5f8ff"; // Light blue shade
//       ctx.fill();

//       // Inner border shadow
//       ctx.strokeStyle = "#d6e4ff";
//       ctx.lineWidth = 5;
//       ctx.stroke();

//       // Center circle
//       ctx.beginPath();
//       ctx.arc(0, 0, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "#666";
//       ctx.fill();
//     }

//     function drawMarkers(ctx: CanvasRenderingContext2D, radius: number) {
//       for (let i = 0; i < 60; i++) {
//         const angle = (i * Math.PI) / 30;
//         const x = Math.cos(angle) * (radius - 10);
//         const y = Math.sin(angle) * (radius - 10);

//         ctx.beginPath();
//         ctx.arc(x, y, i % 5 === 0 ? 3 : 2, 0, 2 * Math.PI);
//         ctx.fillStyle = i % 5 === 0 ? "#ccc" : "#e0e6ff";
//         ctx.fill();
//       }
//     }

//     function drawTime(ctx: CanvasRenderingContext2D, radius: number) {
//       const now = new Date();
//       let hour = now.getHours() % 12;
//       let minute = now.getMinutes();
//       let second = now.getSeconds();

//       // Hour Hand
//       hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
//       drawHand(ctx, hour, radius * 0.5, 6, "#222");

//       // Minute Hand
//       minute = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
//       drawHand(ctx, minute, radius * 0.7, 4, "#99a3b1");

//       // Second Hand
//       second = (second * Math.PI) / 30;
//       drawHand(ctx, second, radius * 0.9, 2, "#e63946");

//       // Red dot at the end of second hand
//       const sx = Math.cos(second) * (radius * 0.9);
//       const sy = Math.sin(second) * (radius * 0.9);
//       ctx.beginPath();
//       ctx.arc(sx, sy, 4, 0, 2 * Math.PI);
//       ctx.fillStyle = "#e63946";
//       ctx.fill();
//     }

//     function drawHand(
//       ctx: CanvasRenderingContext2D,
//       pos: number,
//       length: number,
//       width: number,
//       color: string
//     ) {
//       ctx.beginPath();
//       ctx.lineWidth = width;
//       ctx.lineCap = "round";
//       ctx.strokeStyle = color;
//       ctx.moveTo(0, 0);
//       ctx.lineTo(Math.cos(pos) * length, Math.sin(pos) * length);
//       ctx.stroke();
//     }

//     let animationFrameId: number;
//     function updateClock() {
//       drawClock();
//       animationFrameId = requestAnimationFrame(updateClock);
//     }

//     updateClock();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-[#eef2ff]">
//       <canvas ref={canvasRef} width={200} height={200} className="bg-transparent"></canvas>
//     </div>
//   );
// }




// "use client";
// import { useEffect, useRef } from "react";

// export default function Clock() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return; // ✅ Safe check

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return; // ✅ Safe check

//     const radius = canvas.width / 2;
//     ctx.translate(radius, radius);

//     function drawClock() {
//       if (!ctx || !canvas) return; // ✅ Prevents null issues
//       ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
//       drawFace(ctx, radius);
//       drawMarkers(ctx, radius);
//       drawTime(ctx, radius);
//     }

//     function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
//       ctx.beginPath();
//       ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "#f5f8ff";
//       ctx.fill();
//       ctx.strokeStyle = "#d6e4ff";
//       ctx.lineWidth = 5;
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.arc(0, 0, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "#666";
//       ctx.fill();
//     }

//     function drawMarkers(ctx: CanvasRenderingContext2D, radius: number) {
//       for (let i = 0; i < 60; i++) {
//         const angle = (i * Math.PI) / 30;
//         const x = Math.cos(angle) * (radius - 10);
//         const y = Math.sin(angle) * (radius - 10);
//         ctx.beginPath();
//         ctx.arc(x, y, i % 5 === 0 ? 3 : 2, 0, 2 * Math.PI);
//         ctx.fillStyle = i % 5 === 0 ? "#ccc" : "#e0e6ff";
//         ctx.fill();
//       }
//     }

//     function drawTime(ctx: CanvasRenderingContext2D, radius: number) {
//       const now = new Date();
//       let hour = now.getHours() % 12;
//       let minute = now.getMinutes();
//       let second = now.getSeconds();

//       hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
//       drawHand(ctx, hour, radius * 0.5, 6, "#222");

//       minute = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
//       drawHand(ctx, minute, radius * 0.7, 4, "#99a3b1");

//       second = (second * Math.PI) / 30;
//       drawHand(ctx, second, radius * 0.9, 2, "#e63946");

//       const sx = Math.cos(second) * (radius * 0.9);
//       const sy = Math.sin(second) * (radius * 0.9);
//       ctx.beginPath();
//       ctx.arc(sx, sy, 4, 0, 2 * Math.PI);
//       ctx.fillStyle = "#e63946";
//       ctx.fill();
//     }

//     function drawHand(
//       ctx: CanvasRenderingContext2D,
//       pos: number,
//       length: number,
//       width: number,
//       color: string
//     ) {
//       ctx.beginPath();
//       ctx.lineWidth = width;
//       ctx.lineCap = "round";
//       ctx.strokeStyle = color;
//       ctx.moveTo(0, 0);
//       ctx.lineTo(Math.cos(pos) * length, Math.sin(pos) * length);
//       ctx.stroke();
//     }

//     let animationFrameId: number;
//     function updateClock() {
//       if (!ctx || !canvas) return; // ✅ Prevents errors on re-render
//       drawClock();
//       animationFrameId = requestAnimationFrame(updateClock);
//     }

//     updateClock();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-[#eef2ff]">
//       <canvas ref={canvasRef} width={200} height={200} className="bg-transparent"></canvas>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState, useRef } from 'react';

// const AnalogClock: React.FC = () => {
//   const [time, setTime] = useState(new Date());
//   const requestRef = useRef<number>();

//   const animate = () => {
//     setTime(new Date());
//     requestRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, []);

//   const hours = time.getHours();
//   const minutes = time.getMinutes();
//   const seconds = time.getSeconds();
//   const milliseconds = time.getMilliseconds();

//   // Calculate smooth angles including milliseconds for continuous movement
//   const hourDegrees = (hours % 12) * 30 + minutes / 2 + seconds / 120;
//   const minuteDegrees = minutes * 6 + seconds / 10;
//   const secondDegrees = seconds * 6 + (milliseconds / 1000) * 6; // Smooth seconds

//   return (
//     <div className="clock-container relative w-64 h-64 rounded-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] flex items-center justify-center">
//       <div className="clock-face relative w-56 h-56">
//         {/* Hour hand */}
//         <div 
//           className="hour-hand absolute w-1.5 h-16 bg-black rounded-full origin-bottom transition-transform duration-100"
//           style={{ 
//             left: 'calc(50% - 0.75px)',
//             bottom: '50%',
//             transform: `rotate(${hourDegrees}deg)`,
//             transformOrigin: 'bottom'
//           }}
//         />
        
//         {/* Minute hand */}
//         <div 
//           className="minute-hand absolute w-1 h-24 bg-black rounded-full origin-bottom transition-transform duration-100"
//           style={{ 
//             left: 'calc(50% - 0.5px)',
//             bottom: '50%',
//             transform: `rotate(${minuteDegrees}deg)`,
//             transformOrigin: 'bottom'
//           }}
//         />
        
//         {/* Second hand */}
//         <div 
//           className="second-hand absolute w-0.5 h-28 bg-red-500 rounded-full origin-bottom"
//           style={{ 
//             left: 'calc(50% - 0.25px)',
//             bottom: '50%',
//             transform: `rotate(${secondDegrees}deg)`,
//             transformOrigin: 'bottom',
//             transition: 'none' // Remove transition for smoother movement
//           }}
//         />
        
//         {/* Center dot */}
//         <div className="absolute w-3 h-3 bg-black rounded-full" style={{ 
//           left: 'calc(50% - 6px)',
//           top: 'calc(50% - 6px)'
//         }} />
//       </div>
//     </div>
//   );
// };

// export default AnalogClock;

"use client";

import React, { useEffect, useState, useRef } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number>();

  const animate = () => {
    setTime(new Date());
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  // Calculate hand rotations with smooth transitions
  const hourDegrees = ((hours % 12) * 30) + (minutes / 2) + (seconds / 120);
  const minuteDegrees = minutes * 6 + (seconds / 10);
  const secondDegrees = seconds * 6 + (milliseconds / 1000) * 6;

  return (
    <div className='flex justify-center items-center'>
        <div className="flex flex-col items-center max-w-xs bg-white rounded-lg p-8 shadow-lg">
        {/* Digital Clock */}
        <div className="mb-8 flex items-center gap-2">
            <div className="text-5xl font-light tracking-wider">
            <span className="text-violet-600">{displayHours.toString().padStart(2, '0')}</span>
            <span className="text-gray-400">:</span>
            <span className="text-gray-400">{minutes.toString().padStart(2, '0')}</span>
            </div>
            <div className="flex flex-col ml-2 text-sm font-medium">
            <span className={ampm === 'AM' ? 'text-violet-600' : 'text-gray-400'}>AM</span>
            <span className={ampm === 'PM' ? 'text-violet-600' : 'text-gray-400'}>PM</span>
            </div>
        </div>

        {/* Analog Clock */}
        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-[inset_0_2px_6px_rgba(159,90,253,1)]">
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1 h-2 bg-gray-300"
                style={{
                left: '50%',
                top: '4px',
                transform: `rotate(${i * 30}deg) translateX(-50%)`,
                transformOrigin: '50% 88px',
                }}
            />
            ))}

            {/* Hour Hand */}
            <div
            className="absolute w-1.5 bg-violet-600 rounded-full origin-bottom shadow-sm"
            style={{
                height: '25%',
                bottom: '50%',
                left: 'calc(50% - 0.75px)',
                transform: `rotate(${hourDegrees}deg)`,
                transformOrigin: 'bottom'
            }}
            />

            {/* Minute Hand */}
            <div
            className="absolute w-1 bg-violet-600 rounded-full origin-bottom shadow-sm"
            style={{
                height: '35%',
                bottom: '50%',
                left: 'calc(50% - 0.5px)',
                transform: `rotate(${minuteDegrees}deg)`,
                transformOrigin: 'bottom'
            }}
            />

            {/* Second Hand */}
            <div
            className="absolute w-0.5 bg-violet-400 rounded-full origin-bottom"
            style={{
                height: '40%',
                bottom: '50%',
                left: 'calc(50% - 0.125px)',
                transform: `rotate(${secondDegrees}deg)`,
                transformOrigin: 'bottom',
                transition: 'none'
            }}
            />

            {/* Center Dot with shadow for depth */}
            <div className="absolute w-3 h-3 bg-violet-600 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
            style={{
                left: 'calc(50% - 6px)',
                top: 'calc(50% - 6px)'
            }}
            />

            {/* Inner shadow ring for depth */}
            <div className="absolute inset-2 rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]" />
        </div>
        </div>
    </div>
  );
};

export default Clock;