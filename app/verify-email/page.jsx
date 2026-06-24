"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <AuthShell>
      <AuthCard
        title="Check your inbox"
        subtitle="We sent you a confirmation link."
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
              📬
            </div>
            <p className="text-center text-gray-600 text-sm leading-6">
              We sent a confirmation link to{" "}
              <span className="font-semibold text-black">{email}</span>.
              Click the link in that email to activate your account.
            </p>
            <p className="text-center text-xs text-gray-400">
              No email? Check your spam folder, or wait a minute and try again.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full h-12 rounded-xl bg-black text-white font-semibold flex items-center justify-center transition hover:bg-gray-800"
          >
            Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
