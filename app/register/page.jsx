"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { register } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "buyer";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLabel = useMemo(() => (role === "vendor" ? "Vendor" : "Buyer"), [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    const { error } = await register({ email, password, fullName, role });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title={`Create ${roleLabel} Account`}
        subtitle="Join Cheaper and start sourcing smarter."
      >
        <SocialLoginButtons />

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-semibold text-gray-400">OR CONTINUE WITH EMAIL</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-black"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-black"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-gray-200 px-4 pr-16 outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-black"
          />

          <PasswordStrength password={password} />

          <label className="flex items-start gap-3 text-sm text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded"
            />
            <span>
              I agree to Cheaper&apos;s{" "}
              <Link href="#" className="font-semibold text-black">Terms</Link>{" "}
              and{" "}
              <Link href="#" className="font-semibold text-black">Privacy Policy</Link>.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-black font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : `Create ${roleLabel} Account`}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black">Sign In</Link>
        </p>
      </AuthCard>
    </AuthShell>
  );
}
