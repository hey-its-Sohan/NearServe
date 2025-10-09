"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth";
import { Mail, Shield, Camera } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser(); 
  const [preview, setPreview] = useState(null);

  
  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result);
    reader.readAsDataURL(file);
  };

  
  const roleStyle = {
    customer:
      "bg-secondary/10 text-secondary border border-secondary/30",
    provider:
      "bg-primary/10 text-primary border border-primary/30",
    admin:
      "bg-accent/10 text-accent border border-accent/30",
  }[user.role] || "bg-muted text-foreground/80 border border-border";

  
  const roleLabel = user.role?.[0]?.toUpperCase() + user.role?.slice(1);

  return (
    <section className="space-y-6">
      
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gradient">My Profile</h1>
          <br />
          <p className="text-gray">Only your information based on your role.</p>
        </div>

        <div
          className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${roleStyle}`}
        >
          {roleLabel}
        </div>
      </header>

     
      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        
        <div className="card-animate flex flex-col items-center">
          <div className="relative">
            <img
              src={
                preview ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                  user?.name || "User"
                )}`
              }
              alt="Profile avatar"
              className="size-40 rounded-2xl object-cover border border-border bg-muted"
            />
            <label
              className="absolute -bottom-2 -right-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border shadow cursor-pointer hover:bg-muted/60"
              title="Change photo"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm">Change</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPickAvatar}
              />
            </label>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold">{user?.name || "User"}</h3>
            <p className="text-gray text-sm">{user?.email || "you@example.com"}</p>
          </div>
        </div>

        
        <div className="card-animate">
          <div className="grid gap-5 sm:grid-cols-2">
            
            <div>
              <label className="text-sm text-gray">Full Name</label>
              <div className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2">
                {user?.name || "User"}
              </div>
            </div>

            
            <div>
              <label className="text-sm text-gray flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <div className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2 overflow-x-auto">
                {user?.email || "you@example.com"}
              </div>
            </div>

            
            <div className="sm:col-span-2">
              <label className="text-sm text-gray flex items-center gap-2">
                <Shield className="w-4 h-4" /> Role
              </label>
              <div
                className={`mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full capitalize ${roleStyle}`}
              >
                <span className="h-2 w-2 rounded-full bg-current/70" />
                {roleLabel}
              </div>
            </div>
          </div>

          
          <p className="text-xs text-gray mt-6">
            This page only shows the currently logged-in user’s information.
          </p>
        </div>
      </div>
    </section>
  );
}
