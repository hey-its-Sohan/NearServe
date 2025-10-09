"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, ChevronRight } from "lucide-react";
import { useSessionData } from "@/app/context/SessionContext";


function titleCase(str = "") {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Topbar({ onOpenSidebar }) {
  const pathname = usePathname();
  const {user} = useSessionData();
  const [isDark, setIsDark] = useState(false);

  // Breadcrumb label
  const current = useMemo(() => {
    const parts = (pathname || "").split("/").filter(Boolean);
    const i = parts.indexOf("dashboard");
    if (i === -1 || i === parts.length - 1) return "Home";
    return titleCase(parts.slice(i + 1).join(" / "));
  }, [pathname]);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((d) => !d);
  };

 
  const avatarSrc =
    user?.photo ||
    user?.photoUrl || 
    user?.image || 
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
      user?.name || "User"
    )}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/70 backdrop-blur">
      <div className="px-5 lg:px-6 py-4.5 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          {/* Mobile/Tablet burger */}
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-md border border-border hover:bg-muted/50"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-gray hover:text-primary">
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4 text-gray" />
            <span className="font-medium">{current}</span>
          </div>
        </div>

        {/* Right: Theme toggle + Avatar (clickable) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`relative inline-flex items-center h-8 w-14 rounded-full border border-border transition-colors ${
              isDark ? "bg-neutral/80" : "bg-muted"
            }`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute left-1 top-1 h-6 w-6 rounded-full grid place-items-center bg-card shadow transition-transform ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </span>
          </button>

          <Link
            href="/dashboard/profile"
            className="relative inline-block rounded-full ring-0 hover:ring-2 ring-primary/40 transition"
            aria-label="Open profile"
          >
          
            <img
              src={avatarSrc}
              alt="User avatar"
              className="size-9 rounded-full object-cover bg-neutral"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
