"use client";

import { Button, Separator } from "@heroui/react";

interface User {
  id: string | null;
  email: string;
  fullName: string | null;
}

interface Onboarding {
  id: string;
  label: string;
  icon: string;
}

const ONBOARDINGS: Onboarding[] = [
  { id: "vibe-coding", label: "Vibe Coding", icon: "⚡" },
];

interface Props {
  activeId?: string;
  user?: User | null;
  onLogout?: () => void;
}

export default function Sidebar({ activeId = "vibe-coding", user, onLogout }: Props) {
  const displayName = user?.fullName || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-4">
        <span className="text-base font-bold text-slate-900 tracking-tight">Jobescape</span>
      </div>

      <Separator />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">
          Onboardings
        </p>
        <div className="flex flex-col gap-0.5">
          {ONBOARDINGS.map((item) => (
            <Button
              key={item.id}
              variant={activeId === item.id ? "secondary" : "ghost"}
              fullWidth
              size="sm"
              className="justify-start gap-2 px-3"
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <Separator />

      {/* User */}
      {user && (
        <div className="px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{displayName}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" fullWidth className="justify-start text-slate-400" onPress={onLogout}>
            Sign out
          </Button>
        </div>
      )}
    </aside>
  );
}
