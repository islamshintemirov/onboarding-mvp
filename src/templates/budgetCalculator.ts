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
.summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:18px}
.card{background:white;border-radius:10px;border:1.5px solid #e2e8f0;padding:12px 14px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.card-label{font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
.card-value{font-size:20px;font-weight:700}
.card-value.income{color:#16a34a}
.card-value.expense{color:#dc2626}
.card-value.net.positive{color:#16a34a}
.card-value.net.negative{color:#dc2626}
.card-value.net.zero{color:#64748b}
table{width:100%;border-collapse:collapse;background:white;border-radius:12px;border:1.5px solid #e2e8f0;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
thead th{padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.04em;background:#f8fafc;border-bottom:1px solid #e2e8f0}
tbody tr{border-bottom:1px solid #f1f5f9}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:#fafafa}
td{padding:10px 14px;font-size:13px;color:#334155}
td input{border:none;outline:none;background:transparent;font-size:13px;color:#334155;width:100%;font-family:inherit}
td input.amount{color:#0f172a;font-weight:600;width:90px}
.type-badge{display:inline-block;font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;cursor:pointer;user-select:none}
.type-income{background:#dcfce7;color:#16a34a}
.type-expense{background:#fee2e2;color:#dc2626}
.del-btn{background:none;border:none;color:#cbd5e1;cursor:pointer;font-size:16px;padding:0}
.del-btn:hover{color:#f87171}
.add-row{margin-top:12px;display:flex;gap:8px}
.add-row input{flex:1;border:1.5px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:white;min-width:0}
.add-row input:focus{border-color:{{PRIMARY_COLOR}};box-shadow:0 0 0 3px {{PRIMARY_COLOR}}22}
.add-row input.amount-inp{width:110px;flex:none}
.add-row button{background:{{PRIMARY_COLOR}};color:white;border:none;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0}
.add-row button:hover{opacity:.88}
</style>
</head>
<body>
<div class="header">
  <h1>{{APP_TITLE}}</h1>
  <p>{{USER_CONTEXT}}</p>
</div>
<div class="summary">
  <div class="card"><div class="card-label">Income</div><div class="card-value income" id="totalIncome">$0</div></div>
  <div class="card"><div class="card-label">Expenses</div><div class="card-value expense" id="totalExpense">$0</div></div>
  <div class="card"><div class="card-label">Balance</div><div class="card-value net zero" id="netBalance">$0</div></div>
</div>
<table>
  <thead><tr><th>Description</th><th>Category</th><th>Amount</th><th>Type</th><th></th></tr></thead>
  <tbody id="tbody"></tbody>
</table>
<div class="add-row">
  <input type="text" id="desc" placeholder="Description..." />
  <input type="text" id="cat" placeholder="{{CATEGORY_1}}" style="width:130px;flex:none" />
  <input type="number" id="amt" class="amount-inp" placeholder="0.00" min="0" step="0.01"/>
  <button onclick="addItem()">+ Add</button>
</div>
<script>
let items=[
  {id:1,desc:"{{CATEGORY_1}} spend",cat:"{{CATEGORY_1}}",amount:1200,type:"expense"},
  {id:2,desc:"{{CATEGORY_2}} budget",cat:"{{CATEGORY_2}}",amount:800,type:"expense"},
  {id:3,desc:"Q3 allocation",cat:"Budget",amount:5000,type:"income"}
];
let nid=4;
function fmt(n){return(n<0?"−$":"$")+Math.abs(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
function calc(){
  const inc=items.filter(i=>i.type==="income").reduce((s,i)=>s+i.amount,0);
  const exp=items.filter(i=>i.type==="expense").reduce((s,i)=>s+i.amount,0);
  const net=inc-exp;
  document.getElementById("totalIncome").textContent=fmt(inc);
  document.getElementById("totalExpense").textContent=fmt(exp);
  const el=document.getElementById("netBalance");
  el.textContent=fmt(net);
  el.className="card-value net "+(net>0?"positive":net<0?"negative":"zero");
}
function render(){
  document.getElementById("tbody").innerHTML=items.map(it=>\`<tr>
    <td><input value="\${it.desc}" onchange="items.find(x=>x.id===\${it.id}).desc=this.value"/></td>
    <td><input value="\${it.cat}" onchange="items.find(x=>x.id===\${it.id}).cat=this.value"/></td>
    <td><input class="amount" type="number" value="\${it.amount}" min="0" step="0.01" onchange="items.find(x=>x.id===\${it.id}).amount=parseFloat(this.value)||0;calc()"/></td>
    <td><span class="type-badge type-\${it.type}" onclick="toggleType(\${it.id})">\${it.type==="income"?"Income":"Expense"}</span></td>
    <td><button class="del-btn" onclick="del(\${it.id})">×</button></td>
  </tr>\`).join("");
  calc();
}
function toggleType(id){const i=items.find(x=>x.id===id);if(i)i.type=i.type==="income"?"expense":"income";render();}
function addItem(){
  const desc=document.getElementById("desc").value.trim();
  const cat=document.getElementById("cat").value.trim()||"{{CATEGORY_1}}";
  const amt=parseFloat(document.getElementById("amt").value)||0;
  if(!desc)return;
  items.push({id:nid++,desc,cat,amount:amt,type:"expense"});
  document.getElementById("desc").value="";
  document.getElementById("amt").value="";
  render();
}
function del(id){items=items.filter(i=>i.id!==id);render();}
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
    PRIMARY_COLOR: "#8b5cf6",
    CATEGORY_1: ctx.category1,
    CATEGORY_2: ctx.category2,
    CATEGORY_3: ctx.category3,
  };
}
