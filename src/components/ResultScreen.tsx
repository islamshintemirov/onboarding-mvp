"use client";

import { Button, Chip } from "@heroui/react";

interface Props {
  html: string;
  templateName: string;
  deviceMode: "mobile" | "desktop";
  onRestart: () => void;
}

export default function ResultScreen({ html, templateName, deviceMode, onRestart }: Props) {
  if (deviceMode === "mobile") {
    return (
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className="flex flex-col items-center text-center pt-5 pb-3 px-4 flex-shrink-0">
          <Chip color="success" variant="soft" size="sm" className="mb-2">
            ✅ Your app is ready!
          </Chip>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Here&apos;s your working tool
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Built with the{" "}
            <span className="font-medium text-slate-700">{templateName}</span>{" "}
            template
          </p>
        </div>

        {/* iframe */}
        <div className="flex-1 mx-0" style={{ minHeight: 0 }}>
          <iframe
            srcDoc={html}
            sandbox="allow-scripts"
            style={{ width: "100%", height: "100%", border: "none", display: "block", minHeight: 380 }}
            title="App preview"
          />
        </div>

        {/* Footer */}
        <div className="px-4 pt-3 pb-4 flex-shrink-0 flex flex-col gap-2">
          <p className="text-[11px] text-slate-400 text-center">
            Preview only · Full version includes persistence &amp; AI customization.
          </p>
          <Button
            variant="primary"
            fullWidth
            size="md"
            onPress={() => window.open("https://app.jobescape.me", "_blank")}
          >
            Learn to build this → Start first lesson
          </Button>
          <Button variant="ghost" fullWidth size="sm" onPress={onRestart}>
            ← Try again
          </Button>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 flex-shrink-0">
        <div>
          <Chip color="success" variant="soft" size="sm" className="mb-2">
            ✅ Your app is ready!
          </Chip>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Here&apos;s your working tool
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Built with the{" "}
            <span className="font-medium text-slate-700">{templateName}</span>{" "}
            template · Preview is interactive
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 mt-1">
          <Button variant="outline" size="sm" onPress={onRestart}>
            ← Try again
          </Button>
          <Button
            variant="primary"
            size="sm"
            onPress={() => window.open("https://app.jobescape.me", "_blank")}
          >
            Start first lesson →
          </Button>
        </div>
      </div>

      {/* iframe */}
      <div className="flex-1 mx-6 rounded-xl overflow-hidden border border-slate-200" style={{ minHeight: 0 }}>
        <iframe
          srcDoc={html}
          sandbox="allow-scripts"
          style={{ width: "100%", height: "100%", border: "none", display: "block", minHeight: 500 }}
          title="App preview"
        />
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-400 text-center py-3 flex-shrink-0">
        Preview only · Full version includes data persistence, team sharing, and AI customization.
      </p>
    </div>
  );
}
