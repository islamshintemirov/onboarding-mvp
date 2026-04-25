import { toTitleCase, inferContext } from "@/lib/templateUtils";

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{APP_TITLE}}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#1e293b;padding:20px;font-size:14px}
.header{margin-bottom:18px;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:8px}
.header h1{font-size:18px;font-weight:700;color:#0f172a}
.header p{font-size:12px;color:#64748b;margin-top:3px}
.period{font-size:12px;color:#64748b;background:white;border:1.5px solid #e2e8f0;border-radius:8px;padding:6px 12px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px}
.metric-card{background:white;border-radius:12px;border:1.5px solid #e2e8f0;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.metric-label{font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}
.metric-value{font-size:26px;font-weight:800;color:#0f172a;cursor:pointer;line-height:1}
.metric-value:focus{outline:none;border-bottom:2px solid {{PRIMARY_COLOR}}}
.metric-change{font-size:11px;margin-top:4px;font-weight:600}
.up{color:#16a34a}.down{color:#dc2626}.flat{color:#64748b}
.bar-section{background:white;border-radius:12px;border:1.5px solid #e2e8f0;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.bar-section h2{font-size:13px;font-weight:600;color:#475569;margin-bottom:12px}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.bar-label{font-size:12px;color:#64748b;width:110px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bar-track{flex:1;background:#f1f5f9;border-radius:20px;height:8px;overflow:hidden}
.bar-fill{height:8px;border-radius:20px;background:{{PRIMARY_COLOR}};transition:width .6s ease}
.bar-pct{font-size:11px;font-weight:600;color:#64748b;width:36px;text-align:right}
</style>
</head>
<body>
<div class="header">
  <div><h1>{{APP_TITLE}}</h1><p>{{USER_CONTEXT}}</p></div>
  <div class="period">📅 {{PERIOD}}</div>
</div>
<div class="grid">
  <div class="metric-card">
    <div class="metric-label">{{METRIC_1_LABEL}}</div>
    <div class="metric-value" contenteditable="true" id="m1">{{METRIC_1_VALUE}}</div>
    <div class="metric-change up">↑ 12% vs last period</div>
  </div>
  <div class="metric-card">
    <div class="metric-label">{{METRIC_2_LABEL}}</div>
    <div class="metric-value" contenteditable="true" id="m2">{{METRIC_2_VALUE}}</div>
    <div class="metric-change down">↓ 3% vs last period</div>
  </div>
  <div class="metric-card">
    <div class="metric-label">{{METRIC_3_LABEL}}</div>
    <div class="metric-value" contenteditable="true" id="m3">{{METRIC_3_VALUE}}</div>
    <div class="metric-change flat">→ No change</div>
  </div>
</div>
<div class="bar-section">
  <h2>Weekly progress</h2>
  <div class="bar-row"><div class="bar-label">Mon</div><div class="bar-track"><div class="bar-fill" style="width:72%"></div></div><div class="bar-pct">72%</div></div>
  <div class="bar-row"><div class="bar-label">Tue</div><div class="bar-track"><div class="bar-fill" style="width:88%"></div></div><div class="bar-pct">88%</div></div>
  <div class="bar-row"><div class="bar-label">Wed</div><div class="bar-track"><div class="bar-fill" style="width:55%"></div></div><div class="bar-pct">55%</div></div>
  <div class="bar-row"><div class="bar-label">Thu</div><div class="bar-track"><div class="bar-fill" style="width:94%"></div></div><div class="bar-pct">94%</div></div>
  <div class="bar-row"><div class="bar-label">Fri</div><div class="bar-track"><div class="bar-fill" style="width:67%"></div></div><div class="bar-pct">67%</div></div>
</div>
<script>
// Metric cards are contenteditable — click to edit values
document.querySelectorAll(".metric-value").forEach(el=>{
  el.addEventListener("blur",()=>{if(!el.textContent.trim())el.textContent="0";});
});
</script>
</body>
</html>`;

export function buildVars(
  workArea: string,
  whatToAutomate: string,
  forWhom: string
): Record<string, string> {
  const ctx = inferContext(workArea);
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long", year: "numeric" });
  return {
    APP_TITLE: toTitleCase(whatToAutomate),
    USER_CONTEXT: `${toTitleCase(forWhom)} · ${toTitleCase(workArea)}`,
    PRIMARY_COLOR: "#f59e0b",
    PERIOD: month,
    METRIC_1_LABEL: ctx.metricLabel1,
    METRIC_1_VALUE: "142",
    METRIC_2_LABEL: ctx.metricLabel2,
    METRIC_2_VALUE: "68%",
    METRIC_3_LABEL: ctx.metricLabel3,
    METRIC_3_VALUE: "94%",
  };
}
