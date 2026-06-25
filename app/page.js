"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search, ArrowRight, ShieldCheck, Store, Upload,
  Globe, Monitor, Shirt, Sofa, Utensils, Dumbbell,
  BookOpen, Share2, CheckCircle, TrendingUp, Package,
  Star, ChevronRight, Rss,
} from "lucide-react";

const categories = [
  { Icon: Monitor, label: "Electronics", count: "12,400+" },
  { Icon: Shirt, label: "Fashion", count: "8,200+" },
  { Icon: Sofa, label: "Home & Living", count: "6,800+" },
  { Icon: Utensils, label: "Food & Bev", count: "3,100+" },
  { Icon: Dumbbell, label: "Sports", count: "4,500+" },
  { Icon: BookOpen, label: "Books", count: "9,700+" },
];

const integrations = [
  { name: "Shopify", bg: "#96bf48", initial: "S" },
  { name: "WooCommerce", bg: "#7f54b3", initial: "W" },
  { name: "Wix", bg: "#1a1a1a", initial: "W" },
  { name: "WordPress", bg: "#21759b", initial: "W" },
];

const featured = [
  { name: "Wireless Earbuds Pro", price: "$29.99", was: "$59.99", seller: "TechHub Store", rating: 4.8, reviews: 342, pct: "50" },
  { name: "Linen Throw Blanket", price: "$18.00", was: "$36.00", seller: "CozyNest Shop", rating: 4.9, reviews: 128, pct: "50" },
  { name: "Running Shoes X2", price: "$44.99", was: "$89.99", seller: "SportZone", rating: 4.7, reviews: 215, pct: "50" },
  { name: "Ceramic Mug Set (4)", price: "$12.50", was: "$24.00", seller: "HomeGoods Co.", rating: 5.0, reviews: 87, pct: "48" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#f5f3ef] text-[#111] min-h-screen" style={{ fontFamily: "var(--font-inter), sans-serif" }}>

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-[#f5f3ef]/95 backdrop-blur-sm border-b border-[#e2ddd6]">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 md:px-10 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#111] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {[["Browse", "#categories"], ["Sell", "#sell"], ["How it works", "#how"]].map(([label, href]) => (
              <a key={label} href={href} className="text-[#555] text-sm font-medium hover:text-[#111] transition-colors">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[#555] hover:text-[#111] transition-colors hidden sm:block">Sign in</Link>
            <Link href="/select-role" className="bg-[#111] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="pt-36 pb-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#4648d4] tracking-widest uppercase mb-5">The marketplace for everyone</p>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                Buy smart.<br />
                Sell more.
              </h1>
              <p className="text-[#666] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                Sellers list from any platform. Buyers find the best prices. One marketplace, no middlemen.
              </p>

              <div className="bg-white border border-[#e2ddd6] rounded-xl flex items-center max-w-lg mb-5 focus-within:ring-2 focus-within:ring-[#4648d4]/20 transition-all">
                <Search size={18} className="mx-4 text-[#aaa] flex-shrink-0" />
                <input
                  className="flex-1 bg-transparent outline-none text-sm py-3.5 text-[#111] placeholder:text-[#aaa]"
                  placeholder="Search products, brands, stores…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="bg-[#4648d4] text-white px-5 py-2.5 rounded-lg text-sm font-semibold m-1 hover:bg-[#3537b8] transition-colors">
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-12">
                {["Wireless Earbuds", "Sneakers", "Home Decor", "Organic Food"].map((tag) => (
                  <button key={tag} className="px-3.5 py-1.5 bg-white border border-[#e2ddd6] rounded-full text-xs text-[#666] font-medium hover:border-[#111] hover:text-[#111] transition-colors">
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register?role=buyer" className="flex items-center justify-center gap-2 bg-[#111] text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#333] transition-colors">
                  <Package size={16} /> Start shopping
                </Link>
                <Link href="/register?role=vendor" className="flex items-center justify-center gap-2 bg-white text-[#111] border border-[#e2ddd6] px-7 py-3.5 rounded-lg font-semibold text-sm hover:border-[#111] transition-colors">
                  <Store size={16} /> Start selling
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-10 border-t border-[#e2ddd6] flex flex-wrap gap-10">
              {[
                { val: "50,000+", label: "Products listed" },
                { val: "8,200+", label: "Active sellers" },
                { val: "120k+", label: "Buyers" },
                { val: "$25M+", label: "Saved by buyers" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{val}</div>
                  <div className="text-sm text-[#888] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Deals ── */}
        <section className="py-16 px-6 bg-white border-t border-b border-[#e2ddd6]">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Today's deals</h2>
                <p className="text-sm text-[#888] mt-1">Curated daily by our team</p>
              </div>
              <a href="#" className="flex items-center gap-1 text-sm font-semibold text-[#4648d4] hover:underline">
                View all <ChevronRight size={15} />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map(({ name, price, was, seller, rating, reviews, pct }) => (
                <div key={name} className="border border-[#e2ddd6] rounded-xl overflow-hidden hover:border-[#999] hover:shadow-md transition-all cursor-pointer group bg-white">
                  <div className="h-40 bg-[#f5f3ef] relative flex items-center justify-center">
                    <Package size={40} className="text-[#ccc]" />
                    <span className="absolute top-3 left-3 bg-[#111] text-white text-[10px] font-bold px-2 py-0.5 rounded">{pct}% off</span>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-[#999] font-medium mb-1 uppercase tracking-wide">{seller}</p>
                    <h3 className="font-semibold text-sm text-[#111] mb-2 leading-snug">{name}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star size={11} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-[#111]">{rating}</span>
                      <span className="text-[#bbb] text-xs">({reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-[#111]">{price}</span>
                        <span className="text-[#bbb] text-xs line-through">{was}</span>
                      </div>
                      <button className="text-xs font-semibold text-[#4648d4] hover:underline">Buy →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section id="categories" className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Shop by category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map(({ Icon, label, count }) => (
                <button key={label} className="bg-white border border-[#e2ddd6] rounded-xl p-5 flex flex-col items-center gap-3 hover:border-[#111] hover:bg-[#f5f3ef] transition-all group text-center">
                  <Icon size={28} className="text-[#555] group-hover:text-[#111] transition-colors" />
                  <div>
                    <div className="text-sm font-semibold text-[#111]">{label}</div>
                    <div className="text-[10px] text-[#aaa] mt-0.5">{count} items</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sell on Cheaper ── */}
        <section id="sell" className="py-20 px-6 bg-[#111]">
          <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold text-[#888] tracking-widest uppercase mb-5">For sellers</p>
              <h2 className="text-4xl font-extrabold text-white leading-tight mb-5" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                Your store, your products, your buyers.
              </h2>
              <p className="text-[#888] text-base leading-relaxed mb-10">
                Connect your existing store in seconds or list products manually. Either way, your items reach thousands of active buyers immediately.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: Globe, title: "Connect your store", sub: "Shopify, WooCommerce, Wix, WordPress — one-click sync" },
                  { icon: Upload, title: "Manual upload", sub: "No store? Add products one by one or via CSV" },
                  { icon: ShieldCheck, title: "Get verified", sub: "Verification badge builds trust and increases conversions" },
                  { icon: TrendingUp, title: "Grow your revenue", sub: "Reach buyers who are actively looking for what you sell" },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-[#aaa]" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{title}</div>
                      <div className="text-[#666] text-xs mt-0.5 leading-relaxed">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/register?role=vendor" className="inline-flex items-center gap-2 bg-white text-[#111] px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#e8e5e0] transition-colors">
                Start selling free <ArrowRight size={15} />
              </Link>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#666] uppercase tracking-widest mb-5">Connect your store</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {integrations.map(({ name, bg, initial }) => (
                  <div key={name} className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-center gap-3 hover:bg-white/10 hover:border-white/15 transition-all cursor-pointer">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: bg }}>
                      {initial}
                    </div>
                    <span className="text-white text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 border border-dashed border-white/15 rounded-xl p-5 flex items-center gap-3 cursor-pointer hover:bg-white/8 transition-colors">
                <div className="w-8 h-8 rounded-md bg-white/8 flex items-center justify-center flex-shrink-0">
                  <Upload size={15} className="text-[#666]" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Manual upload</div>
                  <div className="text-[#555] text-xs mt-0.5">No store needed — add products directly</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how" className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-12">
              <p className="text-xs font-semibold text-[#4648d4] tracking-widest uppercase mb-3">Simple by design</p>
              <h2 className="text-3xl font-extrabold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>How it works</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Buyers */}
              <div className="bg-white border border-[#e2ddd6] rounded-2xl p-8">
                <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-6">For buyers</p>
                <div className="space-y-7">
                  {[
                    { n: "01", title: "Create a free account", desc: "Sign up as a buyer in under 30 seconds. No credit card needed." },
                    { n: "02", title: "Browse or search", desc: "Find products across thousands of verified sellers, sorted by price." },
                    { n: "03", title: "Compare and buy", desc: "See ratings and reviews, compare prices, then buy with confidence." },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex items-start gap-5">
                      <span className="text-xs font-bold text-[#ccc] mt-0.5 w-5 flex-shrink-0">{n}</span>
                      <div>
                        <div className="font-semibold text-[#111] text-sm">{title}</div>
                        <div className="text-[#888] text-xs mt-1 leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[#e2ddd6]">
                  <Link href="/register?role=buyer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#111] hover:text-[#4648d4] transition-colors">
                    Shop now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Sellers */}
              <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
                <p className="text-xs font-semibold text-[#555] uppercase tracking-widest mb-6">For sellers</p>
                <div className="space-y-7">
                  {[
                    { n: "01", title: "Create a seller account", desc: "Sign up as a vendor — free, no monthly fees, ever." },
                    { n: "02", title: "List your products", desc: "Connect Shopify, WooCommerce, Wix, or WordPress — or upload manually." },
                    { n: "03", title: "Receive orders", desc: "Your listings go live to thousands of active buyers immediately." },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex items-start gap-5">
                      <span className="text-xs font-bold text-[#444] mt-0.5 w-5 flex-shrink-0">{n}</span>
                      <div>
                        <div className="font-semibold text-white text-sm">{title}</div>
                        <div className="text-[#666] text-xs mt-1 leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[#222]">
                  <Link href="/register?role=vendor" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#aaa] transition-colors">
                    Start selling <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section className="py-14 px-6 border-t border-[#e2ddd6] bg-white">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
            {[
              { Icon: ShieldCheck, title: "Verified sellers", desc: "Every seller goes through our verification process before going live." },
              { Icon: Star, title: "Real reviews", desc: "Authentic buyer reviews on every product. No fake ratings." },
              { Icon: CheckCircle, title: "Buyer protection", desc: "Payments held securely until you confirm your order arrived." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <Icon size={20} className="text-[#4648d4] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#111] text-sm mb-1">{title}</h3>
                  <p className="text-[#888] text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto border border-[#e2ddd6] rounded-2xl p-12 md:p-16 text-center bg-white">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111] mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
              Ready to join the marketplace?
            </h2>
            <p className="text-[#888] text-base mb-10 max-w-md mx-auto">
              Free to get started. Takes less than two minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/register?role=buyer" className="bg-[#111] text-white px-9 py-4 rounded-lg font-semibold text-sm hover:bg-[#333] transition-colors">
                Start shopping
              </Link>
              <Link href="/register?role=vendor" className="bg-white text-[#111] border border-[#e2ddd6] px-9 py-4 rounded-lg font-semibold text-sm hover:border-[#111] transition-colors">
                Start selling
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e2ddd6] bg-[#f5f3ef]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-[#111] flex items-center justify-center">
                <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
              </div>
              <span className="font-bold text-base" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
            </div>
            <p className="text-[#888] text-xs leading-relaxed mb-4 max-w-[180px]">
              The marketplace where sellers meet buyers and everyone wins.
            </p>
            <div className="flex gap-3">
              {[Share2, Globe, Rss].map((Icon, i) => (
                <a key={i} href="#" className="text-[#bbb] hover:text-[#111] transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#111] mb-4 uppercase tracking-wide">Marketplace</h4>
            <ul className="space-y-3">
              {["Browse Products", "Top Deals", "New Arrivals", "Verified Sellers"].map((l) => (
                <li key={l}><a className="text-[#888] text-xs hover:text-[#111] transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#111] mb-4 uppercase tracking-wide">Sellers</h4>
            <ul className="space-y-3">
              {[["Start selling", "/register?role=vendor"], ["Shopify", "#"], ["WooCommerce", "#"], ["Manual upload", "#"]].map(([l, h]) => (
                <li key={l}><Link className="text-[#888] text-xs hover:text-[#111] transition-colors" href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#111] mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-3">
              {["About", "Privacy", "Terms", "Support"].map((l) => (
                <li key={l}><a className="text-[#888] text-xs hover:text-[#111] transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#e2ddd6] px-6 py-5 max-w-[1200px] mx-auto flex justify-between items-center">
          <span className="text-[#aaa] text-xs">© 2026 Cheaper Marketplace</span>
          <span className="text-[#aaa] text-xs">All rights reserved</span>
        </div>
      </footer>

    </div>
  );
}
