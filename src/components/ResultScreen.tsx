"use client";

import DeviceFrame from "@/components/DeviceFrame";

interface Props {
  html: string;
  templateName: string;
  deviceMode: "mobile" | "desktop";
  onRestart: () => void;
}

export default function ResultScreen({ html, templateName, deviceMode, onRestart }: Props) {
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

      {/* Device preview */}
      <div className="flex-1 flex items-start justify-center overflow-auto pb-6">
        <DeviceFrame key={deviceMode} type={deviceMode} html={html} />
      </div>

      {/* Upsell */}
      <p className="text-xs text-slate-400 mt-2 px-2 flex-shrink-0 text-center">
        Preview only · Full version includes data persistence, team sharing, and AI customization.
      </p>
    </div>
  );
}
