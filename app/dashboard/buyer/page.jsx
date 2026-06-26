"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingBag, Heart, Settings, LogOut,
  Search, Package, Star, ArrowUpRight, ChevronRight,
  X, Trash2, ExternalLink, Clock, CheckCircle, Truck,
  Filter, SlidersHorizontal, Store, Loader2,
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
  { id: "5", name: "Standing Desk Pro", seller: "WorkSpace Co.", price: 249.99, was: 349.99, rating: 4.7, reviews: 203 },
  { id: "6", name: "Air Purifier HEPA", seller: "CleanAir Shop", price: 89.00, was: 129.00, rating: 4.9, reviews: 87 },
  { id: "7", name: "Leather Wallet Slim", seller: "Craft & Co.", price: 34.00, was: 54.00, rating: 4.6, reviews: 145 },
  { id: "8", name: "Smart Plug (4-pack)", seller: "TechHub Store", price: 19.99, was: 29.99, rating: 4.8, reviews: 412 },
];

const MOCK_BROWSE = [
  { id: "1", name: "Wireless Earbuds Pro", vendor_name: "TechHub Store", price: 29.99, original_price: 59.99, rating: 4.8, reviews: 342 },
  { id: "2", name: "Linen Throw Blanket", vendor_name: "CozyNest Shop", price: 18.00, original_price: 36.00, rating: 4.9, reviews: 128 },
  { id: "3", name: "Running Shoes X2", vendor_name: "SportZone", price: 44.99, original_price: 89.99, rating: 4.7, reviews: 215 },
  { id: "4", name: "Ceramic Mug Set (4)", vendor_name: "HomeGoods Co.", price: 12.50, original_price: 24.00, rating: 5.0, reviews: 87 },
  { id: "5", name: "Standing Desk Pro", vendor_name: "WorkSpace Co.", price: 249.99, original_price: 349.99, rating: 4.7, reviews: 203 },
  { id: "6", name: "Air Purifier HEPA", vendor_name: "CleanAir Shop", price: 89.00, original_price: 129.00, rating: 4.9, reviews: 87 },
  { id: "7", name: "Leather Wallet Slim", vendor_name: "Craft & Co.", price: 34.00, original_price: 54.00, rating: 4.6, reviews: 145 },
  { id: "8", name: "Smart Plug (4-pack)", vendor_name: "TechHub Store", price: 19.99, original_price: 29.99, rating: 4.8, reviews: 412 },
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

function pct(price, original) {
  if (!original || original <= price) return null;
  return Math.round((1 - price / original) * 100);
}

export default function BuyerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [browseProducts, setBrowseProducts] = useState(MOCK_BROWSE);
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browseFromDb, setBrowseFromDb] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      const role = profile?.role || user.user_metadata?.role;
      if (role !== "buyer") { router.replace("/dashboard"); return; }

      setUser(user);
      setLoading(false);
      loadBrowseProducts();
    }
    checkAuth();
  }, [router]);

  async function loadBrowseProducts(query = "") {
    setBrowseLoading(true);
    let q = supabase
      .from("products")
      .select("id, name, vendor_name, price, original_price, rating, reviews, category, stock, status")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(48);

    if (query.trim()) {
      q = q.or(`name.ilike.%${query}%,vendor_name.ilike.%${query}%,category.ilike.%${query}%`);
    }

    const { data, error } = await q;

    if (!error && data) {
      if (data.length > 0) {
        setBrowseFromDb(true);
        setBrowseProducts(data);
      } else if (!query) {
        setBrowseFromDb(false);
        setBrowseProducts(MOCK_BROWSE);
      } else {
        setBrowseFromDb(false);
        const filtered = MOCK_BROWSE.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.vendor_name.toLowerCase().includes(query.toLowerCase())
        );
        setBrowseProducts(filtered);
      }
    } else {
      setBrowseFromDb(false);
      const filtered = query
        ? MOCK_BROWSE.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.vendor_name.toLowerCase().includes(query.toLowerCase())
          )
        : MOCK_BROWSE;
      setBrowseProducts(filtered);
    }
    setBrowseLoading(false);
  }

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => loadBrowseProducts(searchQuery), 300);
      return () => clearTimeout(t);
    }
  }, [searchQuery, loading]);

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
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                    Welcome back, {displayName.split(" ")[0]}
                  </h1>
                  <p className="text-sm text-[#888] mt-1">Your shopping activity at a glance</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Orders placed", value: "4", sub: "+1 this month", Icon: ShoppingBag },
                    { label: "Items delivered", value: "2", sub: "On time", Icon: CheckCircle },
                    { label: "Saved items", value: String(wishlist.length), sub: "In your wishlist", Icon: Heart },
                    { label: "Total spent", value: "$105.48", sub: "All time", Icon: Store },
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

                {/* Recent orders */}
                <div className="bg-white border border-[#e2ddd6] rounded-xl mb-5">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2ddd6]">
                    <h2 className="text-sm font-semibold text-[#111]">Recent orders</h2>
                    <button onClick={() => setActiveTab("orders")} className="text-xs text-[#4648d4] font-medium hover:underline flex items-center gap-1">
                      View all <ChevronRight size={13} />
                    </button>
                  </div>
                  <div className="divide-y divide-[#f0ede8]">
                    {mockOrders.slice(0, 3).map((order) => {
                      const sc = statusConfig[order.status];
                      return (
                        <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                              <Package size={14} className="text-[#ccc]" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-[#111] truncate">{order.product}</div>
                              <div className="text-xs text-[#aaa]">{order.seller} · {order.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-semibold text-sm text-[#111]">${order.amount}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.color}`}>{sc.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "Browse marketplace", sub: "Browse thousands of products from verified sellers", icon: Search, action: () => setActiveTab("browse") },
                    { label: "My wishlist", sub: `${wishlist.length} saved items`, icon: Heart, action: () => setActiveTab("wishlist") },
                    { label: "All orders", sub: "Track your recent purchases", icon: ShoppingBag, action: () => setActiveTab("orders") },
                  ].map(({ label, sub, icon: Icon, action }) => (
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
                  ))}
                </div>
              </div>
            )}

            {/* ── BROWSE ── */}
            {activeTab === "browse" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Browse</h1>
                    {browseFromDb && (
                      <p className="text-xs text-emerald-600 font-medium mt-0.5">Showing live listings</p>
                    )}
                  </div>
                  <button className="flex items-center gap-2 border border-[#e2ddd6] bg-white text-[#555] px-3 py-2 rounded-lg text-xs font-medium hover:border-[#999] transition-colors">
                    <SlidersHorizontal size={13} /> Filter
                  </button>
                </div>

                <div className="bg-white border border-[#e2ddd6] rounded-lg flex items-center mb-5 focus-within:ring-2 focus-within:ring-[#4648d4]/20 transition-all">
                  <Search size={15} className="mx-3 text-[#ccc] flex-shrink-0" />
                  <input
                    className="flex-1 text-sm py-2.5 outline-none text-[#111] placeholder:text-[#bbb]"
                    placeholder="Search products, sellers…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="mr-3 text-[#bbb] hover:text-[#888]">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {browseLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 size={20} className="animate-spin text-[#ccc]" />
                  </div>
                ) : browseProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <Package size={28} className="text-[#ccc] mx-auto mb-3" />
                    <p className="text-sm font-medium text-[#888]">No products found</p>
                    <p className="text-xs text-[#bbb] mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {browseProducts.map((product) => {
                      const discount = pct(product.price, product.original_price);
                      const inWishlist = wishlist.find(w => w.id === product.id);
                      return (
                        <div key={product.id} className="bg-white border border-[#e2ddd6] rounded-xl overflow-hidden hover:border-[#999] hover:shadow-md transition-all group cursor-pointer">
                          <div className="h-32 bg-[#f5f3ef] relative flex items-center justify-center">
                            <Package size={28} className="text-[#ddd]" />
                            {discount && (
                              <span className="absolute top-2 left-2 bg-[#111] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                {discount}% off
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                if (inWishlist) {
                                  removeFromWishlist(product.id);
                                } else {
                                  setWishlist(w => [...w, { id: product.id, name: product.name, seller: product.vendor_name, price: product.price, was: product.original_price, rating: product.rating || 0, reviews: product.reviews || 0 }]);
                                }
                              }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-[#e2ddd6] flex items-center justify-center hover:border-[#999] transition-colors"
                            >
                              <Heart size={11} className={inWishlist ? "text-red-500 fill-red-500" : "text-[#aaa]"} />
                            </button>
                          </div>
                          <div className="p-3">
                            <p className="text-[10px] text-[#999] font-medium mb-0.5 truncate">{product.vendor_name || "Marketplace"}</p>
                            <h3 className="font-semibold text-xs text-[#111] mb-1.5 leading-snug line-clamp-2">{product.name}</h3>
                            {(product.rating > 0) && (
                              <div className="flex items-center gap-1 mb-1.5">
                                <Star size={10} className="text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-bold text-[#111]">{product.rating}</span>
                                {product.reviews > 0 && <span className="text-[#bbb] text-[10px]">({product.reviews})</span>}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline gap-1">
                                <span className="font-bold text-[#111] text-sm">${parseFloat(product.price).toFixed(2)}</span>
                                {product.original_price && product.original_price > product.price && (
                                  <span className="text-[#bbb] text-[10px] line-through">${parseFloat(product.original_price).toFixed(2)}</span>
                                )}
                              </div>
                              <Link href={`/products/${product.id}`} className="text-[10px] font-semibold text-[#4648d4] hover:underline">View →</Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold text-[#111] mb-6" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>My Orders</h1>

                <div className="flex gap-1 bg-white border border-[#e2ddd6] rounded-lg p-1 mb-5 w-fit">
                  {["All", "Processing", "Shipped", "Delivered"].map((f, i) => (
                    <button key={f} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${i === 0 ? "bg-[#111] text-white" : "text-[#555] hover:bg-[#f5f3ef] hover:text-[#111]"}`}>
                      {f}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {mockOrders.map((order) => {
                    const sc = statusConfig[order.status];
                    const StatusIcon = sc.Icon;
                    return (
                      <div key={order.id} className="bg-white border border-[#e2ddd6] rounded-xl p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 min-w-0">
                            <div className="w-12 h-12 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                              <Package size={18} className="text-[#ccc]" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-[#111] text-sm truncate">{order.product}</div>
                              <div className="text-xs text-[#aaa] mt-0.5">{order.seller}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.color}`}>
                                  <StatusIcon size={10} /> {sc.label}
                                </span>
                                <span className="text-[10px] text-[#bbb]">{order.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="font-bold text-[#111] text-sm">${order.amount}</div>
                            <div className="text-[10px] text-[#bbb] font-mono mt-1">{order.id}</div>
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
                  <h1 className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Wishlist</h1>
                  <span className="text-sm text-[#888]">{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</span>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart size={32} className="text-[#ccc] mx-auto mb-4" />
                    <p className="text-sm font-semibold text-[#888] mb-1">Your wishlist is empty</p>
                    <p className="text-xs text-[#bbb] mb-5">Save products you love and come back to them later</p>
                    <button
                      onClick={() => setActiveTab("browse")}
                      className="bg-[#111] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                    >
                      Browse marketplace
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => {
                      const discount = pct(item.price, item.was);
                      return (
                        <div key={item.id} className="bg-white border border-[#e2ddd6] rounded-xl p-5 flex gap-4">
                          <div className="w-16 h-16 rounded-lg bg-[#f5f3ef] border border-[#e2ddd6] flex items-center justify-center flex-shrink-0">
                            <Package size={20} className="text-[#ccc]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-[#999] mb-0.5 font-medium truncate">{item.seller}</div>
                            <div className="font-semibold text-sm text-[#111] mb-1 leading-snug truncate">{item.name}</div>
                            <div className="flex items-center gap-1 mb-2">
                              <Star size={10} className="text-amber-500 fill-amber-500" />
                              <span className="text-[10px] font-bold text-[#111]">{item.rating}</span>
                              <span className="text-[#bbb] text-[10px]">({item.reviews})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-bold text-[#111] text-sm">${item.price.toFixed(2)}</span>
                                {item.was && <span className="text-[#bbb] text-xs line-through">${item.was.toFixed(2)}</span>}
                                {discount && <span className="text-emerald-600 text-[10px] font-semibold">{discount}% off</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <button onClick={() => removeFromWishlist(item.id)} className="text-[#bbb] hover:text-red-500 transition-colors">
                              <X size={15} />
                            </button>
                            <Link
                              href={`/products/${item.id}`}
                              className="text-[10px] font-semibold text-[#4648d4] hover:underline mt-auto"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      );
                    })}
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
                    { title: "Full name", desc: "Your name shown on orders and reviews", value: displayName },
                    { title: "Email address", desc: "Used for order confirmations and account access", value: user?.email },
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
