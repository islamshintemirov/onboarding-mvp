import * as taskTracker from "./taskTracker";
import * as budgetCalculator from "./budgetCalculator";
import * as feedbackForm from "./feedbackForm";
import * as kpiDashboard from "./kpiDashboard";
import * as meetingNotes from "./meetingNotes";
import * as simpleCrm from "./simpleCrm";

export interface Template {
  id: string;
  name: string;
  keywords: string[];
  html: string;
  buildVars: (
    workArea: string,
    whatToAutomate: string,
    forWhom: string
  ) => Record<string, string>;
}

export const TEMPLATES: Template[] = [
  {
    id: "task-tracker",
    name: "Task Tracker",
    keywords: ["task", "todo", "to-do", "track", "project", "manage", "kanban", "sprint", "checklist", "list"],
    html: taskTracker.html,
    buildVars: taskTracker.buildVars,
  },
  {
    id: "simple-crm",
    name: "Pipeline Board",
    keywords: ["crm", "pipeline", "sales", "lead", "deal", "contact", "client", "customer", "candidate", "hire", "recruit"],
    html: simpleCrm.html,
    buildVars: simpleCrm.buildVars,
  },
  {
    id: "budget-calculator",
    name: "Budget Calculator",
    keywords: ["budget", "money", "finance", "cost", "expense", "spend", "calculate", "invoice", "payment", "revenue"],
    html: budgetCalculator.html,
    buildVars: budgetCalculator.buildVars,
  },
  {
    id: "kpi-dashboard",
    name: "KPI Dashboard",
    keywords: ["kpi", "metric", "dashboard", "analytics", "report", "performance", "data", "measure", "goal", "target", "stat"],
    html: kpiDashboard.html,
    buildVars: kpiDashboard.buildVars,
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    keywords: ["meeting", "notes", "agenda", "standup", "minutes", "action", "attendee", "sync", "call"],
    html: meetingNotes.html,
    buildVars: meetingNotes.buildVars,
  },
  {
    id: "feedback-form",
    name: "Feedback Form",
    keywords: ["feedback", "survey", "form", "collect", "rating", "review", "response", "questionnaire", "poll"],
    html: feedbackForm.html,
    buildVars: feedbackForm.buildVars,
  },
];

export function selectTemplate(
  workArea: string,
  whatToAutomate: string,
  forWhom: string
): Template {
  const input = `${workArea} ${whatToAutomate} ${forWhom}`.toLowerCase();
  let best = TEMPLATES[0];
  let bestScore = 0;
  for (const template of TEMPLATES) {
    const score = template.keywords.filter((kw) => input.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = template;
    }
  }
  return best;
}
