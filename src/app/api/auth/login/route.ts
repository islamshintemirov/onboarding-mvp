import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const JOBESCAPE_API = "https://stage.api.user.jobescape.me";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // 1. Get tokens from Jobescape
    const tokenRes = await fetch(`${JOBESCAPE_API}/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    if (!tokenRes.ok) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { access, refresh } = await tokenRes.json();

    // 2. Get user profile
    const profileRes = await fetch(`${JOBESCAPE_API}/users/profile/`, {
      headers: { Authorization: `Bearer ${access}` },
    });

    if (!profileRes.ok) {
      return NextResponse.json({ error: "Could not fetch user profile" }, { status: 502 });
    }

    const profile = await profileRes.json();
    const userEmail: string = profile.email || email.trim();

    // 3. Upsert user in Supabase
    let userId: string | null = null;
    try {
      const { data } = await supabaseAdmin()
        .from("users")
        .upsert(
          {
            jobescape_email: userEmail,
            full_name:       profile.full_name   ?? null,
            phone_number:    profile.phone_number ?? null,
            last_login_at:   new Date().toISOString(),
          },
          { onConflict: "jobescape_email" }
        )
        .select("id")
        .single();

      userId = data?.id ?? null;
    } catch (e) {
      console.warn("Supabase upsert failed:", e);
    }

    return NextResponse.json({
      user: {
        id:       userId,
        email:    userEmail,
        fullName: profile.full_name ?? null,
      },
      access,
      refresh,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
