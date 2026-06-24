import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function VendorDashboard() {
  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold">
          Vendor Dashboard
        </h1>
      </main>
    </ProtectedRoute>
  );
}