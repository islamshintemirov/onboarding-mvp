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
.add-form{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.add-form input{flex:1;min-width:140px;border:1.5px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:white}
.add-form input:focus{border-color:{{PRIMARY_COLOR}};box-shadow:0 0 0 3px {{PRIMARY_COLOR}}22}
.add-form button{background:{{PRIMARY_COLOR}};color:white;border:none;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0}
.add-form button:hover{opacity:.88}
.board{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.col{background:#f1f5f9;border-radius:12px;padding:12px;min-height:200px}
.col-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#475569;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}
.col-count{background:white;border-radius:20px;padding:1px 7px;font-size:11px;font-weight:700;color:#64748b}
.deal-card{background:white;border-radius:8px;border:1.5px solid #e2e8f0;padding:10px 12px;margin-bottom:8px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.deal-name{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:2px}
.deal-sub{font-size:11px;color:#64748b}
.deal-actions{display:flex;gap:4px;margin-top:8px}
.move-btn{font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;border:none;cursor:pointer;background:#f1f5f9;color:#475569}
.move-btn:hover{background:#e2e8f0}
.move-btn.forward{background:{{PRIMARY_COLOR}}18;color:{{PRIMARY_COLOR}}}
.del-btn{margin-left:auto;background:none;border:none;color:#cbd5e1;cursor:pointer;font-size:15px;padding:0 2px}
.del-btn:hover{color:#f87171}
.empty-col{font-size:12px;color:#94a3b8;text-align:center;padding:20px 0;font-style:italic}
</style>
</head>
<body>
<div class="header">
  <div><h1>{{APP_TITLE}}</h1><p>{{USER_CONTEXT}}</p></div>
</div>
<div class="add-form">
  <input type="text" id="newName" placeholder="{{ENTITY_LABEL}} name..." />
  <input type="text" id="newSub" placeholder="Company or note..." />
  <button onclick="addDeal()">+ Add {{ENTITY_LABEL}}</button>
</div>
<div class="board" id="board"></div>
<script>
const STAGES=["{{STAGE_1}}","{{STAGE_2}}","{{STAGE_3}}"];
let deals=[
  {id:1,name:"{{SAMPLE_1}}",sub:"Sample Co.",stage:0},
  {id:2,name:"{{SAMPLE_2}}",sub:"Example Ltd.",stage:1},
  {id:3,name:"{{SAMPLE_3}}",sub:"Demo Corp.",stage:0}
];
let nid=4;
function render(){
  const board=document.getElementById("board");
  board.innerHTML=STAGES.map((stage,si)=>{
    const cards=deals.filter(d=>d.stage===si);
    return \`<div class="col">
      <div class="col-title"><span>\${stage}</span><span class="col-count">\${cards.length}</span></div>
      \${cards.length===0?'<div class="empty-col">Drop cards here</div>':''}
      \${cards.map(d=>\`<div class="deal-card">
        <div class="deal-name">\${d.name}</div>
        <div class="deal-sub">\${d.sub}</div>
        <div class="deal-actions">
          \${si>0?'<button class="move-btn" onclick="move('+d.id+',-1)">← Back</button>':''}
          \${si<STAGES.length-1?'<button class="move-btn forward" onclick="move('+d.id+',1)">Forward →</button>':''}
          <button class="del-btn" onclick="del(\${d.id})">×</button>
        </div>
      </div>\`).join("")}
    </div>\`;
  }).join("");
}
function addDeal(){
  const name=document.getElementById("newName").value.trim();
  const sub=document.getElementById("newSub").value.trim();
  if(!name)return;
  deals.push({id:nid++,name,sub:sub||"—",stage:0});
  document.getElementById("newName").value="";
  document.getElementById("newSub").value="";
  render();
}
function move(id,dir){const d=deals.find(x=>x.id===id);if(d){d.stage=Math.max(0,Math.min(STAGES.length-1,d.stage+dir));render();}}
function del(id){deals=deals.filter(d=>d.id!==id);render();}
render();
</script>
</body>
</html>`;

export function buildVars(
  workArea: string,
  whatToAutomate: string,
  forWhom: string
): Record<string, string> {
  const ctx = inferContext(workArea);
  return {
    APP_TITLE: toTitleCase(whatToAutomate),
    USER_CONTEXT: `${toTitleCase(forWhom)} · ${toTitleCase(workArea)}`,
    PRIMARY_COLOR: "#6366f1",
    ENTITY_LABEL: ctx.entityLabel,
    STAGE_1: ctx.stage1,
    STAGE_2: ctx.stage2,
    STAGE_3: ctx.stage3,
    SAMPLE_1: ctx.sample1,
    SAMPLE_2: ctx.sample2,
    SAMPLE_3: ctx.sample3,
  };
}
