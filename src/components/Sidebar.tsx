"use client";

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
      <div className="px-5 py-5 border-b border-slate-100">
        <span className="text-base font-bold text-slate-900 tracking-tight">Jobescape</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">
          Onboardings
        </p>
        <ul className="space-y-0.5">
          {ONBOARDINGS.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                  activeId === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-400">v0.1 · MVP</p>
      </div>
    </aside>
  );
}
