"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search, ArrowRight, ShieldCheck, Zap, Package,
  Star, ChevronRight, Store, Upload, Globe,
  Monitor, Shirt, Sofa, Utensils, Dumbbell, BookOpen,
  Share2, Rss, CheckCircle, TrendingUp,
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
  { name: "Shopify", color: "#96bf48", letter: "S" },
  { name: "WooCommerce", color: "#7f54b3", letter: "W" },
  { name: "Wix", color: "#000000", letter: "W" },
  { name: "WordPress", color: "#21759b", letter: "W" },
];

const featured = [
  { name: "Wireless Earbuds Pro", price: "$29.99", was: "$59.99", seller: "TechHub Store", rating: 4.8, reviews: 342, badge: "50% OFF" },
  { name: "Linen Throw Blanket", price: "$18.00", was: "$36.00", seller: "CozyNest Shop", rating: 4.9, reviews: 128, badge: "DEAL" },
  { name: "Running Shoes X2", price: "$44.99", was: "$89.99", seller: "SportZone", rating: 4.7, reviews: 215, badge: "HOT" },
  { name: "Ceramic Coffee Mug Set", price: "$12.50", was: "$24.00", seller: "HomeGoods Co.", rating: 5.0, reviews: 87, badge: "NEW" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-[#e6e8ea] shadow-sm">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 md:px-10 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#4648d4] flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-black" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-[#45464d] font-medium text-sm hover:text-[#4648d4] transition-colors" href="#categories">Browse</a>
            <a className="text-[#45464d] font-medium text-sm hover:text-[#4648d4] transition-colors" href="#sell">Sell on Cheaper</a>
            <a className="text-[#45464d] font-medium text-sm hover:text-[#4648d4] transition-colors" href="#how-it-works">How It Works</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-[#45464d] hover:text-black transition-colors hidden sm:block">Sign In</Link>
            <Link href="/select-role" className="bg-[#4648d4] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a3cbf] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-white to-[#f7f9fb]">
          <div className="max-w-[1280px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4648d4]/10 text-[#4648d4] rounded-full text-xs font-bold tracking-widest mb-6">
              <Zap size={13} /> THE MARKETPLACE FOR EVERYONE
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 tracking-tight" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
              Buy Smart.<br />
              <span className="text-[#4648d4]">Sell More.</span>
            </h1>
            <p className="text-[#45464d] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              A marketplace where sellers list products from any platform and buyers find the best prices — all in one place.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg flex items-center border border-[#e6e8ea] mb-5 focus-within:ring-2 ring-[#4648d4]/30 transition-all">
              <Search size={20} className="mx-4 text-[#9aa0ab] flex-shrink-0" />
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm py-4 placeholder:text-[#9aa0ab]"
                placeholder="Search for products, brands, or stores..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="bg-[#4648d4] text-white px-7 py-3 rounded-xl font-bold text-sm m-1 hover:bg-[#3a3cbf] transition-colors hidden sm:block">
                Search
              </button>
            </div>

            {/* Trending tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <span className="text-sm text-[#9aa0ab] py-1">Trending:</span>
              {["Wireless Earbuds", "Sneakers", "Home Decor", "Organic Food", "Fitness Gear"].map((tag) => (
                <button key={tag} className="px-4 py-1.5 bg-white border border-[#e6e8ea] rounded-full text-xs font-semibold text-[#45464d] hover:border-[#4648d4] hover:text-[#4648d4] transition-colors">
                  {tag}
                </button>
              ))}
            </div>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link href="/register?role=buyer" className="flex items-center justify-center gap-2 bg-[#4648d4] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#4648d4]/20 hover:bg-[#3a3cbf] transition-colors">
                <Package size={18} /> Start Shopping
              </Link>
              <Link href="/register?role=vendor" className="flex items-center justify-center gap-2 bg-white text-[#191c1e] border-2 border-[#e6e8ea] px-8 py-4 rounded-xl font-bold text-sm hover:border-[#4648d4] hover:text-[#4648d4] transition-all">
                <Store size={18} /> Start Selling
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-10 border-t border-[#e6e8ea] pt-10">
              {[
                { val: "50,000+", label: "Products Listed" },
                { val: "8,200+", label: "Active Sellers" },
                { val: "120k+", label: "Happy Buyers" },
                { val: "$25M+", label: "Saved by Buyers" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-[#191c1e]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{val}</div>
                  <div className="text-[#9aa0ab] text-sm mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products ── */}
        <section className="py-16 px-4">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Today's Best Deals</h2>
                <p className="text-[#9aa0ab] text-sm mt-1">Hand-picked by our team every day</p>
              </div>
              <a href="#" className="flex items-center gap-1 text-[#4648d4] font-semibold text-sm hover:gap-2 transition-all">
                See all <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map(({ name, price, was, seller, rating, reviews, badge }) => (
                <div key={name} className="bg-white rounded-2xl border border-[#e6e8ea] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
                  <div className="h-44 bg-gradient-to-br from-[#f0f0f8] to-[#e8e8f8] relative flex items-center justify-center">
                    <Package size={48} className="text-[#4648d4]/20" />
                    <span className="absolute top-3 left-3 bg-[#4648d4] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{badge}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-[#9aa0ab] font-medium mb-1">{seller}</p>
                    <h3 className="font-semibold text-sm text-[#191c1e] mb-2 leading-snug">{name}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-[#191c1e]">{rating}</span>
                      <span className="text-[#9aa0ab] text-xs">({reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#4648d4] text-base">{price}</span>
                        <span className="text-[#9aa0ab] text-xs line-through ml-2">{was}</span>
                      </div>
                      <button className="bg-[#4648d4]/10 text-[#4648d4] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#4648d4] hover:text-white transition-colors">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section id="categories" className="py-16 px-4 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Shop by Category</h2>
                <p className="text-[#9aa0ab] text-sm mt-1">Thousands of products in every category</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(({ Icon, label, count }) => (
                <div key={label} className="bg-[#f7f9fb] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[#4648d4] hover:text-white transition-all cursor-pointer group border border-[#e6e8ea] hover:border-[#4648d4] hover:shadow-lg hover:shadow-[#4648d4]/20">
                  <Icon size={32} className="group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <div className="text-sm font-bold">{label}</div>
                    <div className="text-xs opacity-60 group-hover:opacity-80 mt-0.5">{count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sell on Cheaper ── */}
        <section id="sell" className="py-20 px-4 bg-[#131b2e]">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold tracking-widest mb-6">
                  <TrendingUp size={13} /> FOR SELLERS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                  Reach More Buyers.<br />Sell from Anywhere.
                </h2>
                <p className="text-[#8892a4] text-base mb-8 leading-relaxed">
                  Connect your existing store in seconds or upload your products manually. Your listings go live to thousands of buyers instantly.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: Globe, label: "Connect your existing store", sub: "Shopify, WooCommerce, Wix, WordPress" },
                    { icon: Upload, label: "Or upload products manually", sub: "CSV import or add one by one" },
                    { icon: ShieldCheck, label: "Get verified & build trust", sub: "Verified badge shown to all buyers" },
                    { icon: Zap, label: "Get buyers fast", sub: "Go live within minutes of listing" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={18} className="text-[#6ffbbe]" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{label}</div>
                        <div className="text-[#8892a4] text-xs mt-0.5">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/register?role=vendor" className="inline-flex items-center gap-2 bg-[#4648d4] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#3a3cbf] transition-colors">
                  Start Selling Free <ArrowRight size={16} />
                </Link>
              </div>

              {/* Integration logos */}
              <div>
                <p className="text-[#8892a4] text-sm font-semibold mb-6 uppercase tracking-widest">Connect your store</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {integrations.map(({ name, color, letter }) => (
                    <div key={name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: color }}>
                        {letter}
                      </div>
                      <span className="text-white font-semibold text-sm">{name}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Upload size={18} className="text-[#8892a4]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Manual Upload</div>
                    <div className="text-[#8892a4] text-xs mt-0.5">No store? No problem. Add products directly.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="py-20 px-4 bg-[#f7f9fb]">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>How It Works</h2>
              <p className="text-[#9aa0ab]">Simple for both sellers and buyers</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Buyers */}
              <div className="bg-white rounded-3xl p-8 border border-[#e6e8ea]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4648d4]/10 text-[#4648d4] rounded-full text-xs font-bold mb-6">
                  <Package size={13} /> FOR BUYERS
                </div>
                <div className="space-y-6">
                  {[
                    { n: "1", title: "Create a free account", desc: "Sign up as a buyer in under 30 seconds." },
                    { n: "2", title: "Browse or search", desc: "Find products across thousands of verified sellers." },
                    { n: "3", title: "Compare & buy", desc: "See prices, ratings, and reviews — then buy with confidence." },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#4648d4] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {n}
                      </div>
                      <div>
                        <div className="font-semibold text-[#191c1e] text-sm">{title}</div>
                        <div className="text-[#9aa0ab] text-xs mt-1">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/register?role=buyer" className="mt-8 w-full flex items-center justify-center gap-2 bg-[#4648d4] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#3a3cbf] transition-colors">
                  Shop Now <ArrowRight size={15} />
                </Link>
              </div>

              {/* Sellers */}
              <div className="bg-[#131b2e] rounded-3xl p-8 border border-white/5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold mb-6">
                  <Store size={13} /> FOR SELLERS
                </div>
                <div className="space-y-6">
                  {[
                    { n: "1", title: "Create a seller account", desc: "Sign up as a vendor — free, no monthly fees." },
                    { n: "2", title: "List your products", desc: "Connect Shopify, WooCommerce, Wix, or WordPress — or upload manually." },
                    { n: "3", title: "Start receiving orders", desc: "Your products are live to thousands of buyers immediately." },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {n}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{title}</div>
                        <div className="text-[#8892a4] text-xs mt-1">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/register?role=vendor" className="mt-8 w-full flex items-center justify-center gap-2 bg-white text-[#131b2e] py-3.5 rounded-xl font-bold text-sm hover:bg-[#e6e8ea] transition-colors">
                  Start Selling <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { Icon: ShieldCheck, color: "text-[#4648d4]", bg: "bg-[#4648d4]/10", title: "Verified Sellers", desc: "Every seller goes through our verification process so you always buy from trusted sources." },
                { Icon: Star, color: "text-amber-500", bg: "bg-amber-50", title: "Buyer Reviews", desc: "Real reviews from real buyers. Make informed decisions with honest feedback." },
                { Icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", title: "Secure Payments", desc: "Your money is protected. We hold payments until you confirm your order is received." },
              ].map(({ Icon, color, bg, title, desc }) => (
                <div key={title} className="flex items-start gap-5 p-6 rounded-2xl border border-[#e6e8ea]">
                  <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#191c1e] mb-2">{title}</h3>
                    <p className="text-[#9aa0ab] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-[1280px] mx-auto bg-gradient-to-br from-[#4648d4] to-[#2e30a8] rounded-[2rem] p-12 md:p-16 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
              Ready to Join the Marketplace?
            </h2>
            <p className="text-white/70 text-base mb-10 max-w-xl mx-auto">
              Whether you're here to shop or to sell — it's free to get started and takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register?role=buyer" className="bg-white text-[#4648d4] px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#e8e8f8] transition-colors">
                Start Shopping
              </Link>
              <Link href="/register?role=vendor" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-sm hover:bg-white/20 transition-colors">
                Start Selling
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#f0f2f4] border-t border-[#e6e8ea]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1280px] mx-auto px-10 py-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#4648d4] flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
              </div>
              <span className="font-bold text-lg text-black" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
            </div>
            <p className="text-[#9aa0ab] text-sm mb-5 leading-relaxed">The marketplace where sellers meet buyers and everyone gets a better deal.</p>
            <div className="flex gap-4">
              <a className="text-[#9aa0ab] hover:text-[#4648d4] transition-colors" href="#"><Share2 size={18} /></a>
              <a className="text-[#9aa0ab] hover:text-[#4648d4] transition-colors" href="#"><Globe size={18} /></a>
              <a className="text-[#9aa0ab] hover:text-[#4648d4] transition-colors" href="#"><Rss size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-[#191c1e]">Marketplace</h4>
            <ul className="space-y-3">
              {[["Browse Products", "#"], ["Top Deals", "#"], ["New Arrivals", "#"], ["Verified Sellers", "#"]].map(([l, h]) => (
                <li key={l}><a className="text-[#9aa0ab] text-sm hover:text-[#191c1e] transition-colors" href={h}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-[#191c1e]">Sellers</h4>
            <ul className="space-y-3">
              {[["Start Selling", "/register?role=vendor"], ["Shopify Integration", "#"], ["WooCommerce Integration", "#"], ["Manual Upload", "#"]].map(([l, h]) => (
                <li key={l}><Link className="text-[#9aa0ab] text-sm hover:text-[#191c1e] transition-colors" href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-[#191c1e]">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Privacy Policy", "Terms of Service", "Support"].map((l) => (
                <li key={l}><a className="text-[#9aa0ab] text-sm hover:text-[#191c1e] transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center py-5 border-t border-[#e6e8ea] text-[#9aa0ab] text-xs">
          © 2026 Cheaper Marketplace. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
