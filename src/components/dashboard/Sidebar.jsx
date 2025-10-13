"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, User, BookmarkCheck, Heart, PlusCircle,
  Briefcase, Users, BarChart3, X, House
} from "lucide-react";

import Image from "next/image";
import { useSessionData } from "@/app/context/SessionContext";

function classNames(...c) { return c.filter(Boolean).join(" "); }

const baseItems = [
  { label: "Homepage", href: "/", icon: House },
  { label: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Booked", href: "/dashboard/booked", icon: BookmarkCheck },
  { label: "Saved", href: "/dashboard/saved", icon: Heart },
];

const providerItems = [
  { label: "Post Service", href: "/dashboard/post-service", icon: PlusCircle },
  { label: "My Services", href: "/dashboard/my-services", icon: Briefcase },
];

const adminItems = [
  { label: "All Users", href: "/dashboard/all-users", icon: Users },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

function getItemsByRole(role) {
  if (role === "provider") return [...baseItems, ...providerItems];
  if (role === "admin") return [...baseItems, ...providerItems, ...adminItems];
  return baseItems;
}

export default function Sidebar({ open = false, onClose }) {
  const pathname = usePathname();

  const { user, status } = useSessionData() || {};
  const roleRaw = user?.role ?? null;
  const role = typeof roleRaw === "string" ? roleRaw.toLowerCase() : null;

  const items = getItemsByRole(role);

  const roleBadgeText =
    status === "loading" ? "Loading…" : (role ? role[0].toUpperCase() + role.slice(1) : "—");

  return (
    <section>
      {/* Overlay for mobile */}
      <div
        aria-hidden
        onClick={onClose}
        className={classNames(
          "fixed inset-0 z-40 min-h-screen bg-black/30 backdrop-blur-sm lg:hidden transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Static */}
      <aside
        className={classNames(
          "fixed lg:static z-50 top-0 left-0 h-full w-72 border-r border-border bg-card text-foreground transition-transform min-h-screen",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>

            <span className="text-2xl font-extrabold text-gradient">Dashboard</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-2 rounded-md hover:bg-muted/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-64px)]">
          {items.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={classNames(
                  "flex items-center gap-3 rounded-lg px-3 py-2 border transition-all",
                  active
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "border-transparent hover:bg-muted/50"
                )}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
              >
                <Icon className={classNames("w-5 h-5", active && "text-primary")} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}

          {/* Role badge */}
          <div className="mt-6 mx-1 rounded-xl p-4 border border-border bg-muted/30">
            <p className="text-xs text-gray mb-1">Current role</p>
            <p className="text-sm font-semibold capitalize">{roleBadgeText}</p>
          </div>
        </nav>
      </aside>
    </section>
  );
}
