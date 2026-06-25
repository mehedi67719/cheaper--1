"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingBag, Plug, Settings,
  LogOut, Plus, Upload, Globe, ArrowUpRight, MoreHorizontal,
  TrendingUp, Eye, Star, ChevronRight, Search, X,
  CheckCircle, Clock, AlertCircle, Pencil, Trash2, Store,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { logout } from "@/lib/auth";

const integrations = [
  { name: "Shopify", bg: "#96bf48", desc: "Sync your Shopify product catalog automatically", connected: false },
  { name: "WooCommerce", bg: "#7f54b3", desc: "Import products from your WooCommerce store", connected: false },
  { name: "Wix", bg: "#1a1a1a", desc: "Connect your Wix store and sync inventory", connected: false },
  { name: "WordPress", bg: "#21759b", desc: "Link your WordPress site with WooCommerce plugin", connected: false },
];

const mockProducts = [
  { id: 1, name: "Wireless Earbuds Pro", category: "Electronics", price: 29.99, stock: 42, status: "active", views: 1240, orders: 38 },
  { id: 2, name: "Linen Throw Blanket", category: "Home & Living", price: 18.00, stock: 15, status: "active", views: 682, orders: 21 },
  { id: 3, name: "Running Shoes X2", category: "Sports", price: 44.99, stock: 0, status: "out_of_stock", views: 893, orders: 14 },
  { id: 4, name: "Ceramic Mug Set (4)", category: "Home & Living", price: 12.50, stock: 88, status: "active", views: 430, orders: 9 },
];

const mockOrders = [
  { id: "#3821", buyer: "Sarah K.", product: "Wireless Earbuds Pro", amount: 29.99, status: "delivered", date: "Jun 23" },
  { id: "#3820", buyer: "James L.", product: "Linen Throw Blanket", amount: 18.00, status: "shipped", date: "Jun 23" },
  { id: "#3818", buyer: "Amara D.", product: "Ceramic Mug Set (4)", amount: 12.50, status: "processing", date: "Jun 22" },
  { id: "#3815", buyer: "Tom W.", product: "Wireless Earbuds Pro", amount: 29.99, status: "delivered", date: "Jun 21" },
  { id: "#3812", buyer: "Priya N.", product: "Running Shoes X2", amount: 44.99, status: "delivered", date: "Jun 20" },
];

const statusConfig = {
  delivered: { label: "Delivered", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
  shipped: { label: "Shipped", color: "text-blue-700 bg-blue-50 border-blue-100" },
  processing: { label: "Processing", color: "text-amber-700 bg-amber-50 border-amber-100" },
  active: { label: "Active", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
  out_of_stock: { label: "Out of stock", color: "text-red-700 bg-red-50 border-red-100" },
};

const navItems = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "products", label: "Products", Icon: Package },
  { id: "orders", label: "Orders", Icon: ShoppingBag },
  { id: "integrations", label: "Integrations", Icon: Plug },
  { id: "settings", label: "Settings", Icon: Settings },
];

export default function VendorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      const role = profile?.role || user.user_metadata?.role;
      if (role !== "vendor") { router.replace("/dashboard"); return; }

      setUser(user);
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <div className="text-[#888] text-sm">Loading your dashboard…</div>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Seller";
  const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex" style={{ fontFamily: "var(--font-inter), sans-serif" }}>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-60 bg-white border-r border-[#e2ddd6] flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#e2ddd6] flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#111] flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
            </div>
            <span className="font-bold text-base" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
          </Link>
          <button className="lg:hidden text-[#888]" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-0.5">
            {navItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === id
                    ? "bg-[#111] text-white"
                    : "text-[#555] hover:bg-[#f5f3ef] hover:text-[#111]"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-[#e2ddd6] p-3 flex-shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#111] truncate">{displayName}</div>
              <div className="text-[10px] text-[#aaa] truncate">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#888] hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar (mobile) */}
        <div className="lg:hidden h-14 bg-white border-b border-[#e2ddd6] flex items-center justify-between px-5 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-[#555]">
            <LayoutDashboard size={20} />
          </button>
          <span className="font-semibold text-sm text-[#111] capitalize">{activeTab}</span>
          <div className="w-6" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                      Good morning, {displayName.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-[#888] mt-1">Here's how your store is performing</p>
                  </div>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="hidden sm:flex items-center gap-2 bg-[#111] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                  >
                    <Plus size={16} /> Add product
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total products", value: "4", sub: "+1 this week", Icon: Package },
                    { label: "Total orders", value: "82", sub: "+12 this month", Icon: ShoppingBag },
                    { label: "Revenue", value: "$1,840", sub: "+8% vs last month", Icon: TrendingUp },
                    { label: "Product views", value: "3,245", sub: "Last 30 days", Icon: Eye },
                  ].map(({ label, value, sub, Icon }) => (
                    <div key={label} className="bg-white border border-[#e2ddd6] rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[#888]">{label}</span>
                        <Icon size={15} className="text-[#ccc]" />
                      </div>
                      <div className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{value}</div>
                      <div className="text-xs text-[#aaa] mt-1">{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white border border-[#e2ddd6] rounded-xl mb-5">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2ddd6]">
                    <h2 className="text-sm font-semibold text-[#111]">Recent orders</h2>
                    <button onClick={() => setActiveTab("orders")} className="text-xs text-[#4648d4] font-medium hover:underline flex items-center gap-1">
                      View all <ChevronRight size={13} />
                    </button>
                  </div>
                  <div className="divide-y divide-[#f0ede8]">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="text-xs font-mono text-[#999] flex-shrink-0">{order.id}</span>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-[#111] truncate">{order.product}</div>
                            <div className="text-xs text-[#aaa]">{order.buyer} · {order.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-semibold text-sm text-[#111]">${order.amount}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "Add a product", sub: "List manually or via CSV", icon: Plus, action: () => setShowAddProduct(true) },
                    { label: "Connect store", sub: "Shopify, WooCommerce & more", icon: Plug, action: () => setActiveTab("integrations") },
                    { label: "View marketplace", sub: "See your live listings", icon: Store, href: "/" },
                  ].map(({ label, sub, icon: Icon, action, href }) => (
                    href ? (
                      <Link key={label} href={href} className="bg-white border border-[#e2ddd6] rounded-xl p-5 flex items-start gap-4 hover:border-[#999] transition-colors group">
                        <div className="w-9 h-9 rounded-lg bg-[#f5f3ef] flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-[#555]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#111]">{label}</div>
                          <div className="text-xs text-[#aaa] mt-0.5">{sub}</div>
                        </div>
                        <ArrowUpRight size={14} className="text-[#ccc] ml-auto group-hover:text-[#111] transition-colors mt-0.5" />
                      </Link>
                    ) : (
                      <button key={label} onClick={action} className="bg-white border border-[#e2ddd6] rounded-xl p-5 flex items-start gap-4 hover:border-[#999] transition-colors group text-left">
                        <div className="w-9 h-9 rounded-lg bg-[#f5f3ef] flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-[#555]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#111]">{label}</div>
                          <div className="text-xs text-[#aaa] mt-0.5">{sub}</div>
                        </div>
                        <ArrowUpRight size={14} className="text-[#ccc] ml-auto group-hover:text-[#111] transition-colors mt-0.5" />
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* ── PRODUCTS ── */}
            {activeTab === "products" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Products</h1>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center gap-2 bg-[#111] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                  >
                    <Plus size={16} /> Add product
                  </button>
                </div>

                {/* Search */}
                <div className="bg-white border border-[#e2ddd6] rounded-lg flex items-center mb-4 focus-within:ring-2 focus-within:ring-[#4648d4]/20 transition-all">
                  <Search size={15} className="mx-3 text-[#ccc] flex-shrink-0" />
                  <input className="flex-1 text-sm py-2.5 outline-none text-[#111] placeholder:text-[#bbb]" placeholder="Search products…" />
                </div>

                <div className="bg-white border border-[#e2ddd6] rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#f0ede8]">
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide">Product</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide hidden md:table-cell">Category</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide">Price</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide hidden sm:table-cell">Stock</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide">Status</th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-[#888] uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ede8]">
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-[#faf9f7] transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                                <Package size={14} className="text-[#aaa]" />
                              </div>
                              <span className="font-medium text-[#111]">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-[#888] hidden md:table-cell">{product.category}</td>
                          <td className="px-5 py-4 font-semibold text-[#111]">${product.price.toFixed(2)}</td>
                          <td className="px-5 py-4 text-[#888] hidden sm:table-cell">
                            {product.stock === 0 ? <span className="text-red-500">0</span> : product.stock}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusConfig[product.status].color}`}>
                              {statusConfig[product.status].label}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 rounded-lg text-[#aaa] hover:text-[#111] hover:bg-[#f5f3ef] transition-colors"><Pencil size={14} /></button>
                              <button className="p-1.5 rounded-lg text-[#aaa] hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty state hint */}
                <div className="mt-4 border border-dashed border-[#e2ddd6] rounded-xl p-8 text-center">
                  <Upload size={24} className="text-[#ccc] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#888] mb-1">Import more products</p>
                  <p className="text-xs text-[#bbb] mb-4">Connect your store or upload a CSV to import products in bulk</p>
                  <button
                    onClick={() => setActiveTab("integrations")}
                    className="text-xs font-semibold text-[#4648d4] hover:underline"
                  >
                    Connect a store →
                  </button>
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold text-[#111] mb-6" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Orders</h1>

                {/* Filter tabs */}
                <div className="flex gap-1 bg-white border border-[#e2ddd6] rounded-lg p-1 mb-5 w-fit">
                  {["All", "Processing", "Shipped", "Delivered"].map((f) => (
                    <button key={f} className="px-4 py-1.5 rounded-md text-xs font-medium text-[#555] hover:bg-[#f5f3ef] hover:text-[#111] transition-colors first:bg-[#111] first:text-white">
                      {f}
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-[#e2ddd6] rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#f0ede8]">
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide">Order</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide hidden md:table-cell">Product</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide hidden sm:table-cell">Buyer</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide">Amount</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide">Status</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-[#888] uppercase tracking-wide hidden lg:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ede8]">
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#faf9f7] transition-colors">
                          <td className="px-5 py-4 font-mono text-xs text-[#999]">{order.id}</td>
                          <td className="px-5 py-4 font-medium text-[#111] hidden md:table-cell">{order.product}</td>
                          <td className="px-5 py-4 text-[#888] hidden sm:table-cell">{order.buyer}</td>
                          <td className="px-5 py-4 font-semibold text-[#111]">${order.amount}</td>
                          <td className="px-5 py-4">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusConfig[order.status].color}`}>
                              {statusConfig[order.status].label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-[#aaa] text-xs hidden lg:table-cell">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── INTEGRATIONS ── */}
            {activeTab === "integrations" && (
              <div>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Integrations</h1>
                  <p className="text-sm text-[#888] mt-1">Connect your existing store to automatically sync your products.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {integrations.map(({ name, bg, desc, connected }) => (
                    <div key={name} className="bg-white border border-[#e2ddd6] rounded-xl p-6 hover:border-[#999] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: bg }}>
                            {name[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-[#111] text-sm">{name}</div>
                            {connected && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-emerald-600 font-medium">Connected</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-colors ${
                          connected
                            ? "border-[#e2ddd6] text-[#888] hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                            : "bg-[#111] text-white border-[#111] hover:bg-[#333]"
                        }`}>
                          {connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                      <p className="text-xs text-[#888] leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Manual upload */}
                <div className="bg-white border border-[#e2ddd6] rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                      <Upload size={18} className="text-[#888]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#111] text-sm">Manual upload</div>
                      <div className="text-xs text-[#888] mt-0.5">Don't have an integrated store? Add products directly or import via CSV.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddProduct(true)}
                      className="flex items-center gap-2 bg-[#111] text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#333] transition-colors"
                    >
                      <Plus size={14} /> Add single product
                    </button>
                    <button className="flex items-center gap-2 bg-white text-[#111] border border-[#e2ddd6] px-4 py-2.5 rounded-lg text-xs font-semibold hover:border-[#999] transition-colors">
                      <Upload size={14} /> Import CSV
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold text-[#111] mb-6" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Settings</h1>

                <div className="space-y-4">
                  {[
                    { title: "Store name", desc: "Your public store name on the marketplace", value: displayName + "'s Store" },
                    { title: "Contact email", desc: "Used for order notifications and buyer contact", value: user?.email },
                  ].map(({ title, desc, value }) => (
                    <div key={title} className="bg-white border border-[#e2ddd6] rounded-xl p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-[#111] text-sm">{title}</div>
                          <div className="text-xs text-[#888] mt-0.5">{desc}</div>
                        </div>
                        <button className="text-xs font-semibold text-[#4648d4] hover:underline flex-shrink-0">Edit</button>
                      </div>
                      <div className="mt-3 text-sm text-[#555] font-medium bg-[#f5f3ef] border border-[#e2ddd6] rounded-lg px-3 py-2.5">
                        {value}
                      </div>
                    </div>
                  ))}

                  <div className="bg-white border border-red-100 rounded-xl p-6">
                    <div className="font-semibold text-[#111] text-sm mb-1">Danger zone</div>
                    <div className="text-xs text-[#888] mb-4">These actions are permanent and cannot be undone.</div>
                    <button className="text-xs font-semibold text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                      Delete store
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Add Product Modal ── */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#e2ddd6]">
              <h2 className="font-bold text-[#111] text-base" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Add a product</h2>
              <button onClick={() => setShowAddProduct(false)} className="text-[#aaa] hover:text-[#111] transition-colors"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#555] block mb-1.5">Product name</label>
                <input className="w-full border border-[#e2ddd6] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4648d4]/20 text-[#111]" placeholder="e.g. Wireless Earbuds Pro" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#555] block mb-1.5">Price ($)</label>
                  <input type="number" className="w-full border border-[#e2ddd6] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4648d4]/20 text-[#111]" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#555] block mb-1.5">Stock qty</label>
                  <input type="number" className="w-full border border-[#e2ddd6] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4648d4]/20 text-[#111]" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#555] block mb-1.5">Category</label>
                <select className="w-full border border-[#e2ddd6] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4648d4]/20 text-[#111] bg-white">
                  <option value="">Select a category…</option>
                  {["Electronics", "Fashion", "Home & Living", "Food & Bev", "Sports", "Books"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#555] block mb-1.5">Description</label>
                <textarea className="w-full border border-[#e2ddd6] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#4648d4]/20 text-[#111] resize-none" rows={3} placeholder="Describe your product…" />
              </div>
              <div className="border-2 border-dashed border-[#e2ddd6] rounded-lg p-5 text-center cursor-pointer hover:border-[#999] transition-colors">
                <Upload size={20} className="text-[#ccc] mx-auto mb-2" />
                <p className="text-xs text-[#888]">Drop images here or <span className="text-[#4648d4] font-medium">browse</span></p>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-[#e2ddd6]">
              <button onClick={() => setShowAddProduct(false)} className="flex-1 border border-[#e2ddd6] text-[#555] py-2.5 rounded-lg text-sm font-semibold hover:border-[#999] transition-colors">
                Cancel
              </button>
              <button className="flex-1 bg-[#111] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors">
                Save product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
