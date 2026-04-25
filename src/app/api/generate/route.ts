import { NextRequest, NextResponse } from "next/server";
import { TEMPLATES } from "@/templates/index";
import { fillPlaceholders, toTitleCase } from "@/lib/templateUtils";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { workArea, whatToAutomate, templateId, primaryColor, workspaceName } =
      await request.json();

    if (!workArea?.trim() || !whatToAutomate?.trim() || !templateId?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Find template by explicit ID
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: "Unknown template" }, { status: 400 });
    }

    // Build base vars (forWhom defaults to "My Team")
    const vars = template.buildVars(workArea, whatToAutomate, "My Team");

    // Apply personalizations
    if (primaryColor?.trim()) {
      vars.PRIMARY_COLOR = primaryColor.trim();
    }
    if (workspaceName?.trim()) {
      vars.APP_TITLE = toTitleCase(workspaceName.trim());
    }

    const html = fillPlaceholders(template.html, vars);

    // Log to Supabase — fully isolated, never affects the response
    try {
      supabaseAdmin().from("onboardings").insert({
        work_area:        workArea.trim(),
        what_to_automate: whatToAutomate.trim(),
        for_whom:         "My Team",
        template_name:    template.name,
      }).then(({ error }) => {
        if (error) console.error("Supabase insert error:", error.message);
      });
    } catch (e) {
      console.warn("Supabase unavailable:", e);
    }

    return NextResponse.json({ html, templateName: template.name });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate your app. Please try again." },
      { status: 500 }
    );
  }
}
