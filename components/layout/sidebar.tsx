"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import image from "../../public/image.svg"
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  ShoppingBag,
  Settings,
  LogOut,
  House,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarDays,
  },
  {
    title: "Shop",
    href: "/dashboard/shop",
    icon: ShoppingBag,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("loginTime");
    router.push("/auth/login"); // Redirect after logout
  };


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-64">
      <div className="flex items-center p-4">
        <Image className="h-12 w-12" src={image} alt="logo"></Image>
        <h1 className="text-2xl font-bold">Ajeevan<span className="text-violet-600">Tech</span></h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-800"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4">
        {/* <button onClick={()=>{router.push("/auth/login")}} className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-gray-800 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button> */}
        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-gray-800 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}