import { NextRequest, NextResponse } from "next/server";
import { selectTemplate } from "@/templates/index";
import { fillPlaceholders } from "@/lib/templateUtils";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { workArea, whatToAutomate, forWhom } = await request.json();

    if (!workArea?.trim() || !whatToAutomate?.trim() || !forWhom?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const template = selectTemplate(workArea, whatToAutomate, forWhom);
    const vars = template.buildVars(workArea, whatToAutomate, forWhom);
    const html = fillPlaceholders(template.html, vars);

    // Log to Supabase (fire-and-forget — don't block the response)
    supabaseAdmin().from("onboardings").insert({
      work_area:       workArea.trim(),
      what_to_automate: whatToAutomate.trim(),
      for_whom:        forWhom.trim(),
      template_name:   template.name,
    }).then(({ error }) => {
      if (error) console.error("Supabase insert error:", error.message);
    });

    return NextResponse.json({ html, templateName: template.name });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate your app. Please try again." },
      { status: 500 }
    );
  }
}
