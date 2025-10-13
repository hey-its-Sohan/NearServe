"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { useSessionData } from "@/app/context/SessionContext";

function titleCase(str = "") {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Topbar({ onOpenSidebar }) {
  const pathname = usePathname();
  const { user } = useSessionData();

  // Breadcrumb label
  const current = useMemo(() => {
    const parts = (pathname || "").split("/").filter(Boolean);
    const i = parts.indexOf("dashboard");
    if (i === -1 || i === parts.length - 1) return "Home";
    return titleCase(parts.slice(i + 1).join(" / "));
  }, [pathname]);

  // Avatar (photo > photoUrl > image > initials)
  const avatarSrc =
    user?.photo ||
    user?.photoUrl ||
    user?.image ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
      user?.name || "User"
    )}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/70 backdrop-blur">
      <div className="px-5 lg:px-6 py-3.5 flex items-center justify-between">
        {/* Left: Breadcrumb + Mobile burger */}
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

        {/* Right: Avatar*/}
        <div className="flex items-center gap-3">
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
