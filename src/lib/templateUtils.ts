export function fillPlaceholders(html: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
    html
  );
}

export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function inferContext(workArea: string): {
  col2: string;
  entityLabel: string;
  sample1: string;
  sample2: string;
  sample3: string;
  category1: string;
  category2: string;
  category3: string;
  metricLabel1: string;
  metricLabel2: string;
  metricLabel3: string;
  stage1: string;
  stage2: string;
  stage3: string;
} {
  const area = workArea.toLowerCase();

  if (area.includes("market")) {
    return {
      col2: "Campaign",
      entityLabel: "Lead",
      sample1: "Q3 campaign launch",
      sample2: "Social media content plan",
      sample3: "Email newsletter draft",
      category1: "Ads Budget",
      category2: "Content Creation",
      category3: "Events",
      metricLabel1: "Leads Generated",
      metricLabel2: "Conversion Rate",
      metricLabel3: "Campaign ROI",
      stage1: "New Lead",
      stage2: "Qualified",
      stage3: "Converted",
    };
  }
  if (area.includes("sales")) {
    return {
      col2: "Deal",
      entityLabel: "Deal",
      sample1: "Follow-up with Acme Corp",
      sample2: "Send proposal to TechCo",
      sample3: "Close Q3 deal",
      category1: "Travel",
      category2: "Client Dinners",
      category3: "Marketing",
      metricLabel1: "Deals Closed",
      metricLabel2: "Pipeline Value",
      metricLabel3: "Win Rate",
      stage1: "Prospect",
      stage2: "Proposal Sent",
      stage3: "Closed Won",
    };
  }
  if (area.includes("hr") || area.includes("people") || area.includes("recruit")) {
    return {
      col2: "Department",
      entityLabel: "Candidate",
      sample1: "Onboarding new hire",
      sample2: "Schedule performance reviews",
      sample3: "Update job descriptions",
      category1: "Recruiting",
      category2: "Training",
      category3: "Benefits",
      metricLabel1: "Open Positions",
      metricLabel2: "Time to Hire",
      metricLabel3: "Retention Rate",
      stage1: "Applied",
      stage2: "Interviewing",
      stage3: "Hired",
    };
  }
  if (
    area.includes("engineer") ||
    area.includes("dev") ||
    area.includes("tech") ||
    area.includes("product")
  ) {
    return {
      col2: "Sprint",
      entityLabel: "Issue",
      sample1: "Fix login page bug",
      sample2: "Build notification feature",
      sample3: "Code review for PR #42",
      category1: "Infrastructure",
      category2: "Tools & Licenses",
      category3: "Contractors",
      metricLabel1: "Open Issues",
      metricLabel2: "Sprint Velocity",
      metricLabel3: "Bug Rate",
      stage1: "Backlog",
      stage2: "In Review",
      stage3: "Shipped",
    };
  }
  if (area.includes("financ") || area.includes("account")) {
    return {
      col2: "Period",
      entityLabel: "Client",
      sample1: "Monthly reconciliation",
      sample2: "Invoice processing",
      sample3: "Budget forecast update",
      category1: "Operations",
      category2: "Software",
      category3: "Personnel",
      metricLabel1: "Revenue",
      metricLabel2: "Expenses",
      metricLabel3: "Net Margin",
      stage1: "New Client",
      stage2: "Active",
      stage3: "Invoiced",
    };
  }
  if (area.includes("ops") || area.includes("operation")) {
    return {
      col2: "Process",
      entityLabel: "Vendor",
      sample1: "Vendor contract renewal",
      sample2: "Process documentation",
      sample3: "Quarterly audit prep",
      category1: "Facilities",
      category2: "Logistics",
      category3: "Software",
      metricLabel1: "Active Vendors",
      metricLabel2: "On-Time Delivery",
      metricLabel3: "Cost Savings",
      stage1: "Evaluation",
      stage2: "Negotiation",
      stage3: "Active",
    };
  }

  return {
    col2: "Project",
    entityLabel: "Contact",
    sample1: "Initial planning session",
    sample2: "Stakeholder update",
    sample3: "Review and sign-off",
    category1: "Operations",
    category2: "Marketing",
    category3: "R&D",
    metricLabel1: "Tasks Completed",
    metricLabel2: "Team Efficiency",
    metricLabel3: "Goal Progress",
    stage1: "New",
    stage2: "In Progress",
    stage3: "Done",
  };
}
