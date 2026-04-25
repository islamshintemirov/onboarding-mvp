"use client";

import FormScreen from "@/components/FormScreen";
import GeneratingScreen from "@/components/GeneratingScreen";

interface Props {
  deviceMode: "mobile" | "desktop";
  resultHtml: string;
  templateName: string;
}

const SCREENS = [
  { id: "form",       label: "1 · Form" },
  { id: "generating", label: "2 · Generating" },
  { id: "result",     label: "3 · Result" },
];

// Mobile phone dimensions
const MOB_CONTENT_W = 375;
const MOB_CONTENT_H = 720;
const MOB_NOTCH_H   = 48;
const MOB_HOME_H    = 32;
const MOB_PAD_H     = 10; // horizontal padding each side
const MOB_SHELL_W   = MOB_CONTENT_W + MOB_PAD_H * 2;
const MOB_SHELL_H   = MOB_NOTCH_H + MOB_CONTENT_H + MOB_HOME_H;
const MOB_DISPLAY_W = 228;
const MOB_SCALE     = MOB_DISPLAY_W / MOB_SHELL_W;
const MOB_DISPLAY_H = MOB_SHELL_H * MOB_SCALE;

// Desktop browser dimensions
const DSK_CONTENT_W = 1100;
const DSK_CONTENT_H = 620;
const DSK_CHROME_H  = 40;
const DSK_TOTAL_H   = DSK_CHROME_H + DSK_CONTENT_H;
const DSK_DISPLAY_W = 360;
const DSK_SCALE     = DSK_DISPLAY_W / DSK_CONTENT_W;
const DSK_DISPLAY_H = DSK_TOTAL_H * DSK_SCALE;

function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: MOB_SHELL_W,
        height: MOB_SHELL_H,
        background: "#1e293b",
        borderRadius: 48,
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07) inset",
      }}
    >
      <div style={{ height: MOB_NOTCH_H, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 110, height: 22, background: "#0f172a", borderRadius: 11 }} />
      </div>
      <div
        style={{
          width: MOB_CONTENT_W,
          height: MOB_CONTENT_H,
          background: "#f8fafc",
          margin: `0 ${MOB_PAD_H}px`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
      <div style={{ height: MOB_HOME_H, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 4, background: "#475569", borderRadius: 2 }} />
      </div>
    </div>
  );
}

function DesktopShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: DSK_CONTENT_W,
        height: DSK_TOTAL_H,
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
      }}
    >
      {/* Browser chrome */}
      <div style={{ height: DSK_CHROME_H, background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 6, padding: "0 12px" }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#fc6058" }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#fec02f" }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#2aca3e" }} />
        <div style={{ flex: 1, height: 20, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 4, margin: "0 8px" }} />
      </div>
      {/* Content */}
      <div style={{ width: DSK_CONTENT_W, height: DSK_CONTENT_H, background: "#f8fafc", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function ScaledPanel({
  label,
  shellW,
  shellH,
  displayW,
  displayH,
  scale,
  shell: Shell,
  children,
}: {
  label: string;
  shellW: number;
  shellH: number;
  displayW: number;
  displayH: number;
  scale: number;
  shell: React.ComponentType<{ children: React.ReactNode }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#94a3b8",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      <div style={{ width: displayW, height: displayH, position: "relative", flexShrink: 0 }}>
        <div
          style={{
            width: shellW,
            height: shellH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <Shell>{children}</Shell>
        </div>
      </div>
    </div>
  );
}

export default function AllScreensCanvas({ deviceMode, resultHtml, templateName }: Props) {
  const isMobile = deviceMode === "mobile";
  const Shell = isMobile ? MobileShell : DesktopShell;
  const shellW   = isMobile ? MOB_SHELL_W   : DSK_CONTENT_W;
  const shellH   = isMobile ? MOB_SHELL_H   : DSK_TOTAL_H;
  const displayW = isMobile ? MOB_DISPLAY_W : DSK_DISPLAY_W;
  const displayH = isMobile ? MOB_DISPLAY_H : DSK_DISPLAY_H;
  const scale    = isMobile ? MOB_SCALE     : DSK_SCALE;

  const screenContents: Record<string, React.ReactNode> = {
    form: (
      <div className="min-h-full flex flex-col items-center justify-center p-8">
        <FormScreen onSubmit={() => {}} error={null} />
      </div>
    ),
    generating: (
      <div className="min-h-full flex items-center justify-center p-8">
        <GeneratingScreen onComplete={() => {}} />
      </div>
    ),
    result: resultHtml ? (
      <iframe
        srcDoc={resultHtml}
        sandbox="allow-scripts"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        title="Result preview"
      />
    ) : (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
        <span style={{ fontSize: 32 }}>🎯</span>
        <p style={{ fontSize: 13, color: "#94a3b8" }}>
          Fill the form and generate an app to see this screen
        </p>
      </div>
    ),
  };

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        background: "#161d2b",
        backgroundImage: "radial-gradient(circle, #263047 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 48,
          padding: "64px 80px",
          minWidth: "max-content",
        }}
      >
        {SCREENS.map(({ id, label }) => (
          <ScaledPanel
            key={id}
            label={label}
            shellW={shellW}
            shellH={shellH}
            displayW={displayW}
            displayH={displayH}
            scale={scale}
            shell={Shell}
          >
            {screenContents[id]}
          </ScaledPanel>
        ))}
      </div>

      {/* Footer hint */}
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "#475569",
          paddingBottom: 32,
        }}
      >
        {templateName
          ? `Showing screens for "${templateName}" template`
          : "Switch to Preview to generate an app, then come back to see all screens"}
      </p>
    </div>
  );
}
