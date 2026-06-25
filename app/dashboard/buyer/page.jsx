"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingBag, Heart, Settings, LogOut,
  Search, Package, Star, ArrowUpRight, ChevronRight,
  X, Trash2, ExternalLink, Clock, CheckCircle, Truck,
  Filter, SlidersHorizontal, Store,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { logout } from "@/lib/auth";

const mockOrders = [
  { id: "#4021", product: "Wireless Earbuds Pro", seller: "TechHub Store", amount: 29.99, status: "delivered", date: "Jun 22", img: null },
  { id: "#4018", product: "Linen Throw Blanket", seller: "CozyNest Shop", amount: 18.00, status: "shipped", date: "Jun 20", img: null },
  { id: "#4012", product: "Running Shoes X2", seller: "SportZone", amount: 44.99, status: "processing", date: "Jun 18", img: null },
  { id: "#3998", product: "Ceramic Mug Set (4)", seller: "HomeGoods Co.", amount: 12.50, status: "delivered", date: "Jun 12", img: null },
];

const mockWishlist = [
  { id: 1, name: "Standing Desk Pro", seller: "WorkSpace Co.", price: 249.99, was: 349.99, rating: 4.7, reviews: 203 },
  { id: 2, name: "Air Purifier HEPA", seller: "CleanAir Shop", price: 89.00, was: 129.00, rating: 4.9, reviews: 87 },
  { id: 3, name: "Leather Wallet Slim", seller: "Craft & Co.", price: 34.00, was: 54.00, rating: 4.6, reviews: 145 },
  { id: 4, name: "Smart Plug (4-pack)", seller: "TechHub Store", price: 19.99, was: 29.99, rating: 4.8, reviews: 412 },
];

const mockBrowse = [
  { id: 1, name: "Wireless Earbuds Pro", seller: "TechHub Store", price: 29.99, was: 59.99, rating: 4.8, reviews: 342, pct: "50" },
  { id: 2, name: "Linen Throw Blanket", seller: "CozyNest Shop", price: 18.00, was: 36.00, rating: 4.9, reviews: 128, pct: "50" },
  { id: 3, name: "Running Shoes X2", seller: "SportZone", price: 44.99, was: 89.99, rating: 4.7, reviews: 215, pct: "50" },
  { id: 4, name: "Ceramic Mug Set (4)", seller: "HomeGoods Co.", price: 12.50, was: 24.00, rating: 5.0, reviews: 87, pct: "48" },
  { id: 5, name: "Standing Desk Pro", seller: "WorkSpace Co.", price: 249.99, was: 349.99, rating: 4.7, reviews: 203, pct: "29" },
  { id: 6, name: "Air Purifier HEPA", seller: "CleanAir Shop", price: 89.00, was: 129.00, rating: 4.9, reviews: 87, pct: "31" },
  { id: 7, name: "Leather Wallet Slim", seller: "Craft & Co.", price: 34.00, was: 54.00, rating: 4.6, reviews: 145, pct: "37" },
  { id: 8, name: "Smart Plug (4-pack)", seller: "TechHub Store", price: 19.99, was: 29.99, rating: 4.8, reviews: 412, pct: "33" },
];

const statusConfig = {
  delivered: { label: "Delivered", color: "text-emerald-700 bg-emerald-50 border-emerald-100", Icon: CheckCircle },
  shipped: { label: "Shipped", color: "text-blue-700 bg-blue-50 border-blue-100", Icon: Truck },
  processing: { label: "Processing", color: "text-amber-700 bg-amber-50 border-amber-100", Icon: Clock },
};

const navItems = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "browse", label: "Browse", Icon: Search },
  { id: "orders", label: "My Orders", Icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "settings", label: "Settings", Icon: Settings },
];

export default function BuyerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      const role = profile?.role || user.user_metadata?.role;
      if (role !== "buyer") { router.replace("/dashboard"); return; }

      setUser(user);
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const removeFromWishlist = (id) => setWishlist(w => w.filter(item => item.id !== id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <div className="text-[#888] text-sm">Loading your dashboard…</div>
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Buyer";
  const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const filtered = mockBrowse.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex" style={{ fontFamily: "var(--font-inter), sans-serif" }}>

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
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#e2ddd6] flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#111] flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
            </div>
            <span className="font-bold text-base" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
          </Link>
          <button className="lg:hidden text-[#888]" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>

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
                {id === "wishlist" && wishlist.length > 0 && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-white/20 text-white" : "bg-[#f5f3ef] text-[#888]"}`}>
                    {wishlist.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

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

        {/* Mobile top bar */}
        <div className="lg:hidden h-14 bg-white border-b border-[#e2ddd6] flex items-center justify-between px-5 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-[#555]">
            <LayoutDashboard size={20} />
          </button>
          <span className="font-semibold text-sm text-[#111] capitalize">{navItems.find(n => n.id === activeTab)?.label}</span>
          <div className="w-6" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                    Hey, {displayName.split(" ")[0]}
                  </h1>
                  <p className="text-sm text-[#888] mt-1">Here's what's happening with your account</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total orders", value: mockOrders.length, sub: "All time" },
                    { label: "Spent this month", value: "$92.99", sub: "June 2026" },
                    { label: "Wishlist items", value: wishlist.length, sub: "Saved products" },
                    { label: "Sellers followed", value: "3", sub: "Active sellers" },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="bg-white border border-[#e2ddd6] rounded-xl p-5">
                      <div className="text-xs font-medium text-[#888] mb-3">{label}</div>
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
                    {mockOrders.slice(0, 3).map((order) => {
                      const { label, color, Icon } = statusConfig[order.status];
                      return (
                        <div key={order.id} className="flex items-center gap-4 px-5 py-3.5">
                          <div className="w-10 h-10 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                            <Package size={16} className="text-[#bbb]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#111] truncate">{order.product}</div>
                            <div className="text-xs text-[#aaa]">{order.seller} · {order.date}</div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-semibold text-sm text-[#111]">${order.amount.toFixed(2)}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${color}`}>{label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Wishlist preview + browse */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-white border border-[#e2ddd6] rounded-xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2ddd6]">
                      <h2 className="text-sm font-semibold text-[#111]">Wishlist</h2>
                      <button onClick={() => setActiveTab("wishlist")} className="text-xs text-[#4648d4] font-medium hover:underline flex items-center gap-1">
                        View all <ChevronRight size={13} />
                      </button>
                    </div>
                    <div className="divide-y divide-[#f0ede8]">
                      {wishlist.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                          <div className="w-8 h-8 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                            <Package size={13} className="text-[#ccc]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-[#111] truncate">{item.name}</div>
                            <div className="text-[10px] text-[#aaa]">${item.price}</div>
                          </div>
                          <Heart size={13} className="text-[#ccc] flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-[#e2ddd6] rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center">
                      <Search size={20} className="text-[#999]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#111] text-sm">Find something new</div>
                      <div className="text-xs text-[#aaa] mt-1">Browse thousands of products from verified sellers</div>
                    </div>
                    <button
                      onClick={() => setActiveTab("browse")}
                      className="bg-[#111] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#333] transition-colors"
                    >
                      Browse marketplace
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── BROWSE ── */}
            {activeTab === "browse" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Browse</h1>
                </div>

                {/* Search + filter */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-white border border-[#e2ddd6] rounded-lg flex items-center focus-within:ring-2 focus-within:ring-[#4648d4]/20 transition-all">
                    <Search size={15} className="mx-3 text-[#ccc] flex-shrink-0" />
                    <input
                      className="flex-1 text-sm py-2.5 outline-none text-[#111] placeholder:text-[#bbb]"
                      placeholder="Search products, brands, sellers…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="mr-3 text-[#bbb] hover:text-[#555]"><X size={14} /></button>
                    )}
                  </div>
                  <button className="bg-white border border-[#e2ddd6] px-4 py-2.5 rounded-lg text-sm text-[#555] font-medium hover:border-[#999] transition-colors flex items-center gap-2">
                    <SlidersHorizontal size={15} /> Filter
                  </button>
                </div>

                {/* Category pills */}
                <div className="flex gap-2 flex-wrap mb-6">
                  {["All", "Electronics", "Fashion", "Home", "Sports", "Food", "Books"].map((cat, i) => (
                    <button key={cat} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                      i === 0
                        ? "bg-[#111] text-white border-[#111]"
                        : "bg-white text-[#555] border-[#e2ddd6] hover:border-[#111] hover:text-[#111]"
                    }`}>
                      {cat}
                    </button>
                  ))}
                </div>

                {filtered.length === 0 ? (
                  <div className="text-center py-16">
                    <Search size={28} className="text-[#ccc] mx-auto mb-3" />
                    <p className="text-sm text-[#888]">No products match "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((product) => (
                      <div key={product.id} className="bg-white border border-[#e2ddd6] rounded-xl overflow-hidden hover:border-[#999] hover:shadow-md transition-all group cursor-pointer">
                        <div className="h-36 bg-[#f5f3ef] relative flex items-center justify-center">
                          <Package size={36} className="text-[#ddd]" />
                          <span className="absolute top-2.5 left-2.5 bg-[#111] text-white text-[10px] font-bold px-2 py-0.5 rounded">{product.pct}% off</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!wishlist.find(w => w.id === product.id)) {
                                setWishlist(w => [...w, { ...product, was: product.was }]);
                              }
                            }}
                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white border border-[#e2ddd6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#999]"
                          >
                            <Heart size={12} className={wishlist.find(w => w.id === product.id) ? "text-red-500 fill-red-500" : "text-[#aaa]"} />
                          </button>
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] text-[#aaa] font-medium mb-1 uppercase tracking-wide">{product.seller}</p>
                          <h3 className="font-semibold text-xs text-[#111] mb-2 leading-snug">{product.name}</h3>
                          <div className="flex items-center gap-1 mb-3">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-[#111]">{product.rating}</span>
                            <span className="text-[#bbb] text-xs">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-bold text-[#111] text-sm">${product.price}</span>
                              <span className="text-[#bbb] text-xs line-through">${product.was}</span>
                            </div>
                            <button className="text-xs font-semibold text-[#4648d4] hover:underline">Buy →</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold text-[#111] mb-6" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>My orders</h1>

                {/* Filter */}
                <div className="flex gap-1 bg-white border border-[#e2ddd6] rounded-lg p-1 mb-5 w-fit">
                  {["All", "Processing", "Shipped", "Delivered"].map((f, i) => (
                    <button key={f} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      i === 0 ? "bg-[#111] text-white" : "text-[#555] hover:bg-[#f5f3ef] hover:text-[#111]"
                    }`}>
                      {f}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {mockOrders.map((order) => {
                    const { label, color, Icon: StatusIcon } = statusConfig[order.status];
                    return (
                      <div key={order.id} className="bg-white border border-[#e2ddd6] rounded-xl p-5 hover:border-[#999] transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                              <Package size={20} className="text-[#ccc]" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#111] text-sm">{order.product}</div>
                              <div className="text-xs text-[#aaa] mt-0.5">from {order.seller}</div>
                            </div>
                          </div>
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 flex-shrink-0 ${color}`}>
                            <StatusIcon size={11} /> {label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-[#f0ede8] pt-4">
                          <div className="flex items-center gap-5 text-[#888]">
                            <span>Order <span className="font-mono text-[#999]">{order.id}</span></span>
                            <span>{order.date}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-[#111] text-sm">${order.amount.toFixed(2)}</span>
                            {order.status === "delivered" && (
                              <button className="text-[#4648d4] font-semibold hover:underline flex items-center gap-1">
                                Leave review <Star size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── WISHLIST ── */}
            {activeTab === "wishlist" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Wishlist</h1>
                    <p className="text-sm text-[#888] mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("browse")}
                    className="flex items-center gap-2 bg-[#111] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                  >
                    <Search size={15} /> Browse more
                  </button>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-[#e2ddd6] rounded-2xl">
                    <Heart size={32} className="text-[#ddd] mx-auto mb-4" />
                    <p className="font-semibold text-[#888] mb-2">Your wishlist is empty</p>
                    <p className="text-sm text-[#bbb] mb-6">Save products you like while browsing the marketplace</p>
                    <button
                      onClick={() => setActiveTab("browse")}
                      className="bg-[#111] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                    >
                      Start browsing
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="bg-white border border-[#e2ddd6] rounded-xl p-5 flex items-start gap-4 hover:border-[#999] transition-colors group">
                        <div className="w-14 h-14 rounded-xl bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                          <Package size={22} className="text-[#ccc]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[#111] text-sm mb-0.5">{item.name}</div>
                          <div className="text-xs text-[#aaa] mb-2 flex items-center gap-1">
                            <Store size={11} /> {item.seller}
                          </div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-[#111]">{item.rating}</span>
                            <span className="text-[#bbb] text-xs">({item.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-bold text-[#111]">${item.price}</span>
                              <span className="text-[#bbb] text-xs line-through">${item.was}</span>
                              <span className="text-emerald-600 text-xs font-semibold">
                                {Math.round((1 - item.price / item.was) * 100)}% off
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button className="text-xs font-semibold bg-[#111] text-white px-3.5 py-2 rounded-lg hover:bg-[#333] transition-colors">
                            Buy
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 rounded-lg text-[#ccc] hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold text-[#111] mb-6" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Settings</h1>

                <div className="space-y-4">
                  {[
                    { title: "Full name", desc: "Your name shown to sellers when placing orders", value: displayName },
                    { title: "Email address", desc: "Used for order confirmations and account security", value: user?.email },
                    { title: "Shipping address", desc: "Default address for deliveries", value: "Not set" },
                  ].map(({ title, desc, value }) => (
                    <div key={title} className="bg-white border border-[#e2ddd6] rounded-xl p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-[#111] text-sm">{title}</div>
                          <div className="text-xs text-[#888] mt-0.5">{desc}</div>
                        </div>
                        <button className="text-xs font-semibold text-[#4648d4] hover:underline flex-shrink-0">Edit</button>
                      </div>
                      <div className={`mt-3 text-sm font-medium bg-[#f5f3ef] border border-[#e2ddd6] rounded-lg px-3 py-2.5 ${value === "Not set" ? "text-[#bbb]" : "text-[#555]"}`}>
                        {value}
                      </div>
                    </div>
                  ))}

                  <div className="bg-white border border-[#e2ddd6] rounded-xl p-6">
                    <div className="font-semibold text-[#111] text-sm mb-1">Notifications</div>
                    <div className="text-xs text-[#888] mb-4">Choose what you get notified about</div>
                    <div className="space-y-3">
                      {[
                        { label: "Order updates", checked: true },
                        { label: "Price drops on wishlist items", checked: true },
                        { label: "New products from followed sellers", checked: false },
                        { label: "Promotional emails", checked: false },
                      ].map(({ label, checked }) => (
                        <label key={label} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={checked} className="rounded w-4 h-4 accent-[#111]" />
                          <span className="text-sm text-[#555]">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-red-100 rounded-xl p-6">
                    <div className="font-semibold text-[#111] text-sm mb-1">Danger zone</div>
                    <div className="text-xs text-[#888] mb-4">These actions are permanent and cannot be undone.</div>
                    <button className="text-xs font-semibold text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
