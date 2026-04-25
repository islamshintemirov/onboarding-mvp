import { toTitleCase, inferContext } from "@/lib/templateUtils";

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{APP_TITLE}}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#1e293b;padding:20px;font-size:14px}
.card{background:white;border-radius:14px;border:1.5px solid #e2e8f0;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,.05)}
.top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.title-block h1{font-size:18px;font-weight:700;color:#0f172a}
.title-block p{font-size:12px;color:#64748b;margin-top:3px}
.date-block{display:flex;flex-direction:column;align-items:flex-end;gap:4px}
.date-block input{border:1.5px solid #e2e8f0;border-radius:8px;padding:6px 10px;font-size:13px;outline:none;color:#1e293b;background:white}
.date-block input:focus{border-color:{{PRIMARY_COLOR}}}
.section{margin-bottom:16px}
.section-title{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.add-link{font-size:11px;font-weight:600;color:{{PRIMARY_COLOR}};cursor:pointer;text-transform:none;letter-spacing:0}
.add-link:hover{opacity:.7}
.attendee-list{display:flex;flex-wrap:wrap;gap:6px}
.tag{background:#f1f5f9;border:1.5px solid #e2e8f0;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;color:#475569;display:flex;align-items:center;gap:4px}
.tag-del{cursor:pointer;color:#94a3b8;font-size:14px;line-height:1}.tag-del:hover{color:#f87171}
.tag-input{border:1.5px solid #e2e8f0;border-radius:8px;padding:5px 10px;font-size:12px;outline:none;width:150px}
.tag-input:focus{border-color:{{PRIMARY_COLOR}}}
.item-row{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.item-row input[type=checkbox]{width:15px;height:15px;accent-color:{{PRIMARY_COLOR}};flex-shrink:0}
.item-row input[type=text]{flex:1;border:none;border-bottom:1px solid #f1f5f9;padding:4px 6px;font-size:13px;outline:none;color:#334155;background:transparent}
.item-row input[type=text]:focus{border-bottom-color:{{PRIMARY_COLOR}}}
.item-row input.done-text{text-decoration:line-through;color:#94a3b8}
.item-row .del-btn{background:none;border:none;color:#cbd5e1;cursor:pointer;font-size:15px;padding:0}
.item-row .del-btn:hover{color:#f87171}
.add-item-btn{font-size:12px;color:{{PRIMARY_COLOR}};background:none;border:none;cursor:pointer;padding:2px 0;font-weight:600}
.add-item-btn:hover{opacity:.7}
.notes-area{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:13px;color:#334155;outline:none;resize:vertical;font-family:inherit;line-height:1.6}
.notes-area:focus{border-color:{{PRIMARY_COLOR}};box-shadow:0 0 0 3px {{PRIMARY_COLOR}}22}
.save-btn{width:100%;background:{{PRIMARY_COLOR}};color:white;border:none;border-radius:10px;padding:11px;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px}
.save-btn:hover{opacity:.88}
</style>
</head>
<body>
<div class="card">
  <div class="top">
    <div class="title-block"><h1>{{APP_TITLE}}</h1><p>{{USER_CONTEXT}}</p></div>
    <div class="date-block">
      <input type="date" id="meetDate" />
      <input type="time" id="meetTime" />
    </div>
  </div>

  <div class="section">
    <div class="section-title">Attendees <span class="add-link" onclick="showAttInput()">+ Add</span></div>
    <div class="attendee-list" id="attList"></div>
    <input type="text" class="tag-input" id="attInput" placeholder="Name..." style="display:none;margin-top:6px" onkeydown="addAtt(event)" onblur="hideAttInput()"/>
  </div>

  <div class="section">
    <div class="section-title">Agenda</div>
    <div id="agendaList"></div>
    <button class="add-item-btn" onclick="addAgenda()">+ Add agenda item</button>
  </div>

  <div class="section">
    <div class="section-title">Action Items</div>
    <div id="actionList"></div>
    <button class="add-item-btn" onclick="addAction()">+ Add action item</button>
  </div>

  <div class="section">
    <div class="section-title">Notes</div>
    <textarea class="notes-area" rows="4" placeholder="Key decisions, discussion points..."></textarea>
  </div>

  <button class="save-btn" onclick="saveMeeting()">Save Meeting Notes</button>
</div>
<script>
const now=new Date();
document.getElementById("meetDate").value=now.toISOString().split("T")[0];
document.getElementById("meetTime").value=now.toTimeString().slice(0,5);

let attendees=["{{ATT_1}}","{{ATT_2}}"];
let agenda=["{{AGENDA_1}}","{{AGENDA_2}}"];
let actions=[{text:"{{ACTION_1}}",done:false},{text:"{{ACTION_2}}",done:false}];
let nid=10;

function renderAtts(){
  document.getElementById("attList").innerHTML=attendees.map((a,i)=>\`<span class="tag">\${a}<span class="tag-del" onclick="delAtt(\${i})">×</span></span>\`).join("")+" ";
}
function showAttInput(){document.getElementById("attInput").style.display="inline-block";document.getElementById("attInput").focus();}
function hideAttInput(){setTimeout(()=>{document.getElementById("attInput").style.display="none";},120);}
function addAtt(e){
  if(e.key!=="Enter")return;
  const v=document.getElementById("attInput").value.trim();
  if(v){attendees.push(v);renderAtts();}
  document.getElementById("attInput").value="";
}
function delAtt(i){attendees.splice(i,1);renderAtts();}

function renderAgenda(){
  document.getElementById("agendaList").innerHTML=agenda.map((a,i)=>\`<div class="item-row">
    <input type="text" value="\${a}" onchange="agenda[\${i}]=this.value"/>
    <button class="del-btn" onclick="agenda.splice(\${i},1);renderAgenda()">×</button>
  </div>\`).join("");
}
function addAgenda(){agenda.push("");renderAgenda();const els=document.querySelectorAll("#agendaList input[type=text]");if(els.length)els[els.length-1].focus();}

function renderActions(){
  document.getElementById("actionList").innerHTML=actions.map((a,i)=>\`<div class="item-row">
    <input type="checkbox" \${a.done?"checked":""} onchange="actions[\${i}].done=this.checked;renderActions()"/>
    <input type="text" class="\${a.done?"done-text":""}" value="\${a.text}" onchange="actions[\${i}].text=this.value"/>
    <button class="del-btn" onclick="actions.splice(\${i},1);renderActions()">×</button>
  </div>\`).join("");
}
function addAction(){actions.push({text:"",done:false});renderActions();const els=document.querySelectorAll("#actionList input[type=text]");if(els.length)els[els.length-1].focus();}

function saveMeeting(){alert("Meeting notes saved!");}

renderAtts();renderAgenda();renderActions();
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
    USER_CONTEXT: `${toTitleCase(forWhom)} · ${toTitleCase(workArea)}`,
    PRIMARY_COLOR: "#0ea5e9",
    ATT_1: "You",
    ATT_2: toTitleCase(forWhom).split(" ")[0] || "Team Lead",
    AGENDA_1: `Review ${workArea || "team"} updates`,
    AGENDA_2: "Discuss priorities for next week",
    ACTION_1: `Share summary with ${forWhom || "the team"}`,
    ACTION_2: "Schedule follow-up",
  };
}
