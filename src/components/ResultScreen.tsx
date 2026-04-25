"use client";

interface Props {
  html: string;
  templateName: string;
  onRestart: () => void;
}

export default function ResultScreen({ html, templateName, onRestart }: Props) {
  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-4">
          <span>✅</span> Your app is ready!
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Here&apos;s your working tool
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Built with the <span className="font-medium text-slate-700">{templateName}</span> template
        </p>
      </div>

      {/* App preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4 iframe-enter">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="ml-2 text-xs text-slate-400 font-medium">Your App Preview</span>
        </div>
        <iframe
          srcDoc={html}
          sandbox="allow-scripts"
          title="Your generated app"
          className="w-full h-[480px] border-0"
        />
      </div>

      {/* Upsell note */}
      <p className="text-xs text-slate-400 text-center mb-5">
        This is a preview. The full version includes data persistence, team sharing, and AI customization.
      </p>

      {/* CTA */}
      <a
        href="https://app.jobescape.me"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 text-center text-sm transition-colors"
      >
        Learn to build this yourself → Start first lesson
      </a>

      {/* Secondary */}
      <div className="text-center mt-4">
        <button
          onClick={onRestart}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          ← Try with different input
        </button>
      </div>
    </div>
  );
}
