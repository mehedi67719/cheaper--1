import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const origin = requestUrl.origin;

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorDescription || error)}`, origin)
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("[auth/callback] Exchange error:", exchangeError.message);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(exchangeError.message)}`, origin)
    );
  }

  const user = data?.session?.user;
  if (!user) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  const role = user.user_metadata?.role || user.app_metadata?.role;

  if (role === "vendor") return NextResponse.redirect(new URL("/dashboard/vendor", origin));
  if (role === "buyer") return NextResponse.redirect(new URL("/dashboard/buyer", origin));

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "vendor") return NextResponse.redirect(new URL("/dashboard/vendor", origin));
    if (profile?.role === "buyer") return NextResponse.redirect(new URL("/dashboard/buyer", origin));
  } catch {}

  return NextResponse.redirect(new URL("/select-role?from=oauth", origin));
}
