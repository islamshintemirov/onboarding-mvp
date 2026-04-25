"use client";

import { Button, Separator } from "@heroui/react";

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
}

export default function Sidebar({ activeId = "vibe-coding" }: Props) {
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

      {/* Footer */}
      <div className="px-5 py-3">
        <p className="text-[11px] text-slate-400">v0.1 · MVP</p>
      </div>
    </aside>
  );
}
