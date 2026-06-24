import Link from "next/link";

export default function AuthShell({ children }) {
  return (
    <main className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-[28px] shadow-xl overflow-hidden grid lg:grid-cols-2">
        <section className="hidden lg:flex bg-[#111827] text-white p-12 flex-col justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Cheaper
          </Link>

          <div>
            <p className="text-sm text-gray-300 mb-4">B2B Marketplace</p>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Source Smarter. Compare Suppliers. Reduce Procurement Costs.
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              Connect with trusted suppliers and discover competitive pricing
              across thousands of products.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">10k+</p>
              <p className="text-gray-300">Products</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-gray-300">Suppliers</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-gray-300">Access</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          {children}
        </section>
      </div>
    </main>
  );
}