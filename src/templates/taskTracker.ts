import { toTitleCase, inferContext } from "@/lib/templateUtils";

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{APP_TITLE}}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#1e293b;padding:20px;font-size:14px}
.header{margin-bottom:18px}
.header h1{font-size:18px;font-weight:700;color:#0f172a}
.header p{font-size:12px;color:#64748b;margin-top:3px}
.toolbar{display:flex;gap:8px;margin-bottom:14px}
.toolbar input{flex:1;border:1.5px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:white;color:#1e293b;min-width:0}
.toolbar input:focus{border-color:{{PRIMARY_COLOR}};box-shadow:0 0 0 3px {{PRIMARY_COLOR}}22}
.toolbar button{background:{{PRIMARY_COLOR}};color:white;border:none;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;flex-shrink:0}
.toolbar button:hover{opacity:.88}
.filters{display:flex;gap:6px;margin-bottom:12px}
.filter-btn{background:#f1f5f9;border:1.5px solid #e2e8f0;border-radius:20px;padding:4px 12px;font-size:12px;font-weight:500;cursor:pointer;color:#475569}
.filter-btn.active{background:{{PRIMARY_COLOR}};color:white;border-color:{{PRIMARY_COLOR}}}
.list{background:white;border-radius:12px;border:1.5px solid #e2e8f0;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.item{display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid #f1f5f9;transition:background .1s}
.item:last-child{border-bottom:none}
.item:hover{background:#fafafa}
.item.done .text{text-decoration:line-through;color:#94a3b8}
.item input[type=checkbox]{width:16px;height:16px;accent-color:{{PRIMARY_COLOR}};cursor:pointer;flex-shrink:0}
.text{flex:1;color:#334155;line-height:1.4}
.badge{font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;flex-shrink:0}
.badge-todo{background:#f1f5f9;color:#64748b}
.badge-done{background:#dcfce7;color:#16a34a}
.del{background:none;border:none;color:#cbd5e1;cursor:pointer;font-size:16px;padding:0 2px;line-height:1}
.del:hover{color:#f87171}
.empty{padding:30px;text-align:center;color:#94a3b8;font-size:13px}
.stats{margin-top:10px;font-size:12px;color:#94a3b8;text-align:right}
</style>
</head>
<body>
<div class="header">
  <h1>{{APP_TITLE}}</h1>
  <p>{{USER_CONTEXT}}</p>
</div>
<div class="toolbar">
  <input type="text" id="inp" placeholder="Add a task and press Enter..." />
  <button onclick="add()">+ Add</button>
</div>
<div class="filters">
  <button class="filter-btn active" onclick="setFilter('all',this)">All</button>
  <button class="filter-btn" onclick="setFilter('todo',this)">To Do</button>
  <button class="filter-btn" onclick="setFilter('done',this)">Done</button>
</div>
<div class="list" id="list"></div>
<div class="stats" id="stats"></div>
<script>
let tasks=[
  {id:1,text:"{{SAMPLE_ROW_1}}",done:false},
  {id:2,text:"{{SAMPLE_ROW_2}}",done:false},
  {id:3,text:"{{SAMPLE_ROW_3}}",done:true}
];
let nid=4,filter="all";
function setFilter(f,btn){
  filter=f;
  document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  render();
}
function render(){
  const visible=tasks.filter(t=>filter==="all"||(filter==="todo"&&!t.done)||(filter==="done"&&t.done));
  const rem=tasks.filter(t=>!t.done).length;
  document.getElementById("stats").textContent=rem+" task"+(rem!==1?"s":"")+" remaining · "+tasks.filter(t=>t.done).length+" done";
  const el=document.getElementById("list");
  if(!visible.length){el.innerHTML='<div class="empty">No tasks here yet.</div>';return;}
  el.innerHTML=visible.map(t=>\`<div class="item\${t.done?" done":""}">
    <input type="checkbox" \${t.done?"checked":""} onchange="toggle(\${t.id})"/>
    <span class="text">\${t.text}</span>
    <span class="badge \${t.done?"badge-done":"badge-todo"}">\${t.done?"Done":"To Do"}</span>
    <button class="del" onclick="del(\${t.id})">×</button>
  </div>\`).join("");
}
function add(){
  const inp=document.getElementById("inp");
  const v=inp.value.trim();
  if(!v)return;
  tasks.push({id:nid++,text:v,done:false});
  inp.value="";
  render();
}
function toggle(id){const t=tasks.find(t=>t.id===id);if(t)t.done=!t.done;render();}
function del(id){tasks=tasks.filter(t=>t.id!==id);render();}
document.getElementById("inp").addEventListener("keydown",e=>{if(e.key==="Enter")add();});
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
    PRIMARY_COLOR: "#3b82f6",
    COL_2: ctx.col2,
    SAMPLE_ROW_1: ctx.sample1,
    SAMPLE_ROW_2: ctx.sample2,
    SAMPLE_ROW_3: ctx.sample3,
  };
}
