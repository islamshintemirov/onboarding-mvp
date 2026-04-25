import { toTitleCase, inferContext } from "@/lib/templateUtils";

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{APP_TITLE}}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#1e293b;padding:20px;font-size:14px}
.card{background:white;border-radius:14px;border:1.5px solid #e2e8f0;padding:24px;box-shadow:0 1px 4px rgba(0,0,0,.05);max-width:520px}
.card h1{font-size:18px;font-weight:700;color:#0f172a;margin-bottom:4px}
.card .sub{font-size:12px;color:#64748b;margin-bottom:20px}
.field{margin-bottom:16px}
label{display:block;font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}
textarea,select{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:13px;color:#1e293b;outline:none;background:white;resize:vertical;font-family:inherit;line-height:1.5}
textarea:focus,select:focus{border-color:{{PRIMARY_COLOR}};box-shadow:0 0 0 3px {{PRIMARY_COLOR}}22}
.stars{display:flex;gap:4px}
.star{font-size:24px;cursor:pointer;color:#e2e8f0;transition:color .1s;user-select:none}
.star.lit{color:#f59e0b}
.btn{width:100%;background:{{PRIMARY_COLOR}};color:white;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px;transition:opacity .15s}
.btn:hover{opacity:.88}
.success{display:none;text-align:center;padding:32px 20px}
.success .icon{font-size:48px;margin-bottom:12px}
.success h2{font-size:18px;font-weight:700;color:#16a34a;margin-bottom:6px}
.success p{font-size:13px;color:#64748b}
.success .reset{margin-top:14px;background:none;border:1.5px solid #e2e8f0;border-radius:8px;padding:8px 16px;font-size:13px;cursor:pointer;color:#475569}
.success .reset:hover{background:#f8fafc}
</style>
</head>
<body>
<div class="card">
  <div id="formContent">
    <h1>{{APP_TITLE}}</h1>
    <div class="sub">{{USER_CONTEXT}}</div>
    <div class="field">
      <label>{{Q1_LABEL}}</label>
      <select id="q1">
        <option value="">Select an option...</option>
        <option>Very satisfied</option>
        <option>Satisfied</option>
        <option>Neutral</option>
        <option>Dissatisfied</option>
        <option>Very dissatisfied</option>
      </select>
    </div>
    <div class="field">
      <label>Overall rating</label>
      <div class="stars" id="stars">
        <span class="star" data-v="1" onclick="rate(1)">★</span>
        <span class="star" data-v="2" onclick="rate(2)">★</span>
        <span class="star" data-v="3" onclick="rate(3)">★</span>
        <span class="star" data-v="4" onclick="rate(4)">★</span>
        <span class="star" data-v="5" onclick="rate(5)">★</span>
      </div>
    </div>
    <div class="field">
      <label>{{Q2_LABEL}}</label>
      <textarea id="q2" rows="3" placeholder="Type your answer..."></textarea>
    </div>
    <div class="field">
      <label>{{Q3_LABEL}}</label>
      <textarea id="q3" rows="2" placeholder="Optional..."></textarea>
    </div>
    <button class="btn" onclick="submit()">Submit Feedback</button>
  </div>
  <div class="success" id="success">
    <div class="icon">✅</div>
    <h2>Thank you!</h2>
    <p>Your feedback has been recorded successfully.</p>
    <button class="reset" onclick="reset()">Submit another response</button>
  </div>
</div>
<script>
let rating=0;
function rate(v){
  rating=v;
  document.querySelectorAll(".star").forEach(s=>{s.classList.toggle("lit",parseInt(s.dataset.v)<=v);});
}
function submit(){
  document.getElementById("formContent").style.display="none";
  document.getElementById("success").style.display="block";
}
function reset(){
  rating=0;
  document.querySelectorAll(".star").forEach(s=>s.classList.remove("lit"));
  document.getElementById("q1").value="";
  document.getElementById("q2").value="";
  document.getElementById("q3").value="";
  document.getElementById("formContent").style.display="block";
  document.getElementById("success").style.display="none";
}
</script>
</body>
</html>`;

export function buildVars(
  workArea: string,
  whatToAutomate: string,
  forWhom: string
): Record<string, string> {
  const ctx = inferContext(workArea);
  void ctx;
  return {
    APP_TITLE: toTitleCase(whatToAutomate),
    USER_CONTEXT: `For ${toTitleCase(forWhom)} · ${toTitleCase(workArea)}`,
    PRIMARY_COLOR: "#10b981",
    Q1_LABEL: `How satisfied are you with ${workArea || "your current workflow"}?`,
    Q2_LABEL: "What's working well and what could be improved?",
    Q3_LABEL: "Any additional comments or suggestions?",
  };
}
