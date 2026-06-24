"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function BuyerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["buyer"]}>
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
        <p className="mt-2 text-gray-500">Find and compare suppliers.</p>
      </main>
    </ProtectedRoute>
  );
}
