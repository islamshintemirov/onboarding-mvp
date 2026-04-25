"use client";

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
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold text-green-700 mb-2">
            <span>✅</span> Your app is ready!
          </div>
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
        <div className="px-4 pt-3 pb-4 flex-shrink-0">
          <p className="text-[11px] text-slate-400 text-center mb-3">
            Preview only · Full version includes persistence &amp; AI customization.
          </p>
          <a
            href="https://app.jobescape.me"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors text-center"
          >
            Learn to build this → Start first lesson
          </a>
          <button
            onClick={onRestart}
            className="block w-full text-xs text-slate-400 hover:text-slate-600 pt-2 transition-colors cursor-pointer text-center"
          >
            ← Try again
          </button>
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
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold text-green-700 mb-2">
            <span>✅</span> Your app is ready!
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Here&apos;s your working tool
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Built with the{" "}
            <span className="font-medium text-slate-700">{templateName}</span>{" "}
            template · Preview is interactive
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 mt-1">
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-2 text-sm transition-colors whitespace-nowrap"
          >
            Start first lesson →
          </a>
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
