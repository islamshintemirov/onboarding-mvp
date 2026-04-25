"use client";

interface Props {
  mode: "desktop" | "mobile";
  children: React.ReactNode;
}

export default function PreviewWrapper({ mode, children }: Props) {
  if (mode === "mobile") {
    return (
      <div className="flex items-start justify-center py-8">
        {/* Phone shell */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: 48,
            padding: "0 10px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07) inset",
            flexShrink: 0,
          }}
        >
          {/* Notch */}
          <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 120, height: 24, background: "#0f172a", borderRadius: 12 }} />
          </div>

          {/* Screen */}
          <div
            style={{
              width: 375,
              height: 720,
              background: "#f8fafc",
              overflowY: "auto",
              overflowX: "hidden",
              borderRadius: 4,
            }}
          >
            {children}
          </div>

          {/* Home indicator */}
          <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 52, height: 5, background: "#475569", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    );
  }

  // Desktop: browser window
  return (
    <div className="flex items-start justify-center py-8 px-6 w-full">
      <div
        className="w-full bg-white rounded-xl overflow-hidden"
        style={{
          maxWidth: 1100,
          boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px #e2e8f0",
        }}
      >
        {/* Browser chrome */}
        <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center gap-2 px-4 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 h-6 bg-white border border-slate-200 rounded-md mx-3 flex items-center px-3">
            <span className="text-xs text-slate-400">onboarding-jobescape.vercel.app</span>
          </div>
        </div>

        {/* Page content */}
        <div style={{ minHeight: 600, background: "#f8fafc" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
