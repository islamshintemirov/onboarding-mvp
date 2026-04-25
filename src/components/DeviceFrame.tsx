"use client";

type DeviceType = "mobile" | "tablet" | "desktop";

interface Props {
  type: DeviceType;
  html: string;
}

const DEVICES = {
  mobile: {
    label: "Mobile",
    dimensions: "375 × 812",
    iframeW: 375,
    iframeH: 812,
    screenW: 200,
    screenH: 432,
    get scale() { return this.screenW / this.iframeW; },
  },
  tablet: {
    label: "Tablet",
    dimensions: "768 × 1024",
    iframeW: 768,
    iframeH: 1024,
    screenW: 288,
    screenH: 384,
    get scale() { return this.screenW / this.iframeW; },
  },
  desktop: {
    label: "Desktop",
    dimensions: "1280 × 800",
    iframeW: 1280,
    iframeH: 800,
    screenW: 496,
    screenH: 310,
    get scale() { return this.screenW / this.iframeW; },
  },
};

function MobileFrame({ html, device }: { html: string; device: typeof DEVICES.mobile }) {
  return (
    <div
      style={{
        width: device.screenW + 20,
        background: "#1e293b",
        borderRadius: 36,
        padding: "0",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset",
      }}
    >
      {/* Notch bar */}
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px 36px 0 0",
        }}
      >
        <div style={{ width: 110, height: 22, background: "#0f172a", borderRadius: 11 }} />
      </div>

      {/* Screen */}
      <div
        style={{
          width: device.screenW,
          height: device.screenH,
          overflow: "hidden",
          margin: "0 10px",
          background: "#fff",
        }}
      >
        <div
          style={{
            width: device.iframeW,
            height: device.iframeH,
            transform: `scale(${device.scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            srcDoc={html}
            sandbox="allow-scripts"
            style={{ width: device.iframeW, height: device.iframeH, border: "none", display: "block" }}
            title="Mobile preview"
          />
        </div>
      </div>

      {/* Home indicator */}
      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 0 36px 36px",
        }}
      >
        <div style={{ width: 48, height: 4, background: "#475569", borderRadius: 2 }} />
      </div>
    </div>
  );
}

function TabletFrame({ html, device }: { html: string; device: typeof DEVICES.tablet }) {
  return (
    <div
      style={{
        width: device.screenW + 24,
        background: "#1e293b",
        borderRadius: 24,
        boxShadow: "0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06) inset",
      }}
    >
      {/* Top bar with camera */}
      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "24px 24px 0 0",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#334155" }} />
      </div>

      {/* Screen */}
      <div
        style={{
          width: device.screenW,
          height: device.screenH,
          overflow: "hidden",
          margin: "0 12px",
          background: "#fff",
        }}
      >
        <div
          style={{
            width: device.iframeW,
            height: device.iframeH,
            transform: `scale(${device.scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            srcDoc={html}
            sandbox="allow-scripts"
            style={{ width: device.iframeW, height: device.iframeH, border: "none", display: "block" }}
            title="Tablet preview"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div style={{ width: 36, height: 3, background: "#475569", borderRadius: 2 }} />
      </div>
    </div>
  );
}

function DesktopFrame({ html, device }: { html: string; device: typeof DEVICES.desktop }) {
  return (
    <div>
      {/* Browser window */}
      <div
        style={{
          width: device.screenW,
          background: "#fff",
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: 36,
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 12px",
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#fc6058" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#fec02f" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#2aca3e" }} />
          <div
            style={{
              flex: 1,
              height: 20,
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 4,
              margin: "0 8px",
            }}
          />
        </div>

        {/* Screen */}
        <div style={{ width: device.screenW, height: device.screenH, overflow: "hidden" }}>
          <div
            style={{
              width: device.iframeW,
              height: device.iframeH,
              transform: `scale(${device.scale})`,
              transformOrigin: "top left",
            }}
          >
            <iframe
              srcDoc={html}
              sandbox="allow-scripts"
              style={{ width: device.iframeW, height: device.iframeH, border: "none", display: "block" }}
              title="Desktop preview"
            />
          </div>
        </div>
      </div>

      {/* Monitor stand */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 60, height: 14, background: "#cbd5e1", clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ width: 100, height: 6, background: "#cbd5e1", borderRadius: 3 }} />
      </div>
    </div>
  );
}

export default function DeviceFrame({ type, html }: Props) {
  const device = DEVICES[type];

  return (
    <div className="flex flex-col items-center gap-3 iframe-enter">
      {/* Device label */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-700">{device.label}</span>
        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
          {device.dimensions}
        </span>
      </div>

      {/* Frame */}
      {type === "mobile" && <MobileFrame html={html} device={DEVICES.mobile} />}
      {type === "tablet" && <TabletFrame html={html} device={DEVICES.tablet} />}
      {type === "desktop" && <DesktopFrame html={html} device={DEVICES.desktop} />}
    </div>
  );
}
