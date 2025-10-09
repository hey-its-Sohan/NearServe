"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        {/* Main */}
        <div className="flex-1 min-w-0 lg:ml-0">
           <Topbar onOpenSidebar={() => setOpen(true)} />
          <main className="px-4 lg:px-6 py-6">
            {/* Page content container */}
            <div className="mx-auto max-w-screen-xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
