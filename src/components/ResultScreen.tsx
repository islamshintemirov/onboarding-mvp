"use client";

import { useState } from "react";
import DeviceFrame from "@/components/DeviceFrame";

type DeviceType = "mobile" | "tablet" | "desktop";

interface Props {
  html: string;
  templateName: string;
  onRestart: () => void;
}

const TOGGLES: { id: DeviceType; label: string; icon: string }[] = [
  { id: "mobile",  label: "Mobile",  icon: "📱" },
  { id: "tablet",  label: "Tablet",  icon: "⬜" },
  { id: "desktop", label: "Desktop", icon: "🖥" },
];

export default function ResultScreen({ html, templateName, onRestart }: Props) {
  const [active, setActive] = useState<DeviceType>("desktop");

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-2 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold text-green-700 mb-2">
            <span>✅</span> Your app is ready!
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Here&apos;s your working tool
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Built with the <span className="font-medium text-slate-700">{templateName}</span> template · Preview is interactive
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onRestart}
            className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl px-4 py-2 transition-colors cursor-pointer bg-white"
          >
            ← Try again
          </button>
          <a
            href="https://app.jobescape.me"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2 text-sm transition-colors whitespace-nowrap"
          >
            Start first lesson →
          </a>
        </div>
      </div>

      {/* Toggle bar */}
      <div className="flex items-center justify-center mb-6 flex-shrink-0">
        <div className="inline-flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
          {TOGGLES.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                active === id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Device preview */}
      <div className="flex-1 flex items-start justify-center overflow-auto pb-6">
        <DeviceFrame key={active} type={active} html={html} />
      </div>

      {/* Upsell */}
      <p className="text-xs text-slate-400 mt-2 px-2 flex-shrink-0 text-center">
        Preview only · Full version includes data persistence, team sharing, and AI customization.
      </p>
    </div>
  );
}
