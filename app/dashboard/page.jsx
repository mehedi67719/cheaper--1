"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role || user.user_metadata?.role;

      if (role === "vendor") {
        router.replace("/dashboard/vendor");
      } else if (role === "admin") {
        router.replace("/cheaper-admin");
      } else if (role === "buyer") {
        router.replace("/dashboard/buyer");
      } else {
        router.replace("/select-role?from=oauth");
      }
    }

    redirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading your dashboard...</div>
    </div>
  );
}
