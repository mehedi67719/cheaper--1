"use client";

import Link from "next/link";
import {
  Search, TrendingUp, ShieldCheck, Package, CheckCircle,
  ArrowRight, Monitor, Cog, Stethoscope, Building2,
  UtensilsCrossed, Share2, Globe, Rss, Smartphone,
  BadgeCheck, Sofa, BarChart3,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { Icon: Monitor, label: "Electronics" },
  { Icon: Cog, label: "Industrial" },
  { Icon: Stethoscope, label: "Medical" },
  { Icon: Sofa, label: "Furniture" },
  { Icon: Building2, label: "Construction" },
  { Icon: UtensilsCrossed, label: "Food & Bev" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/20 shadow-sm">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 md:px-10 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#4648d4] flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-hanken), Hanken Grotesk, sans-serif" }}>C</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-black" style={{ fontFamily: "var(--font-hanken), Hanken Grotesk, sans-serif" }}>Cheaper</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-[#4648d4] font-semibold text-sm" href="/b2b">For Business</Link>
            <Link className="text-[#45464d] font-medium text-sm hover:text-[#4648d4] transition-colors" href="/b2c">For Individuals</Link>
            <a className="text-[#45464d] font-medium text-sm hover:text-[#4648d4] transition-colors" href="#">Flash Deals</a>
            <a className="text-[#45464d] font-medium text-sm hover:text-[#4648d4] transition-colors" href="#">Support</a>
          </nav>
          <Link href="/select-role" className="bg-[#4648d4] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:scale-105 transition-transform active:scale-95">
            Get Started
          </Link>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="pt-32 pb-20 px-4 overflow-hidden">
          <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight" style={{ fontFamily: "var(--font-hanken), Hanken Grotesk, sans-serif" }}>
                Find Better Prices.<br />
                <span className="text-[#4648d4]">Buy Smarter.</span><br />
                Grow Faster.
              </h1>
              <p className="text-[#45464d] text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                Compare products, suppliers, and wholesale offers from thousands of trusted businesses in one place.
              </p>

              {/* B2B / B2C CTA split */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/b2b" className="flex items-center justify-center gap-2 bg-[#4648d4] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#4648d4]/20 hover:scale-105 transition-transform">
                  <Building2 size={18} /> I'm a Business
                </Link>
                <Link href="/b2c" className="flex items-center justify-center gap-2 bg-white text-[#4648d4] border-2 border-[#4648d4]/20 px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#4648d4]/5 transition-colors">
                  <Monitor size={18} /> I'm Shopping for Deals
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-[#c6c6cd]/30 pt-8">
                <div>
                  <div className="text-2xl font-bold text-black" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>50,000+</div>
                  <div className="text-[#45464d] text-sm">Products Listed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>$25M+</div>
                  <div className="text-[#45464d] text-sm">Capital Saved</div>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck size={20} className="text-[#4edea3]" />
                  <div className="text-[#45464d] text-sm">Verified Suppliers</div>
                </div>
              </div>
            </div>

            <div className="relative hero-float hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass p-4">
                <img
                  className="w-full h-auto rounded-xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa68mosCoGphAUph_bdZeEo58PbzjwLhaA0wXk-WAaW3y-3xZRy8QdX4vbip7SABElCRaYEcJ86izbQiaFBLz87eiPsHVbOzYOeqYT9rPtOj-GF1yIi50PcVKWnD4R6C3KO78DhSKfl_AhcF0Wom-8F-hWCge-7qdsgmLarW_2lD7gqr61v4V9wxLhfIw5eMrrStCQOZWRb3zZWudAdG-sSp1K5vZQ1Cs5g9wooqpTcPKnnv2hJ26GGr6993NueeOCsd0OOiX0DcYb"
                  alt="Procurement dashboard"
                />
                <div className="absolute -top-6 -right-6 bg-[#6ffbbe] text-[#002113] px-6 py-4 rounded-2xl shadow-xl animate-bounce">
                  <span className="block text-2xl font-bold" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>18%</span>
                  <span className="text-sm font-medium">Average Savings</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Search ── */}
        <section className="px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="glass p-2 rounded-2xl shadow-xl flex items-center border border-white/40 focus-within:ring-2 ring-[#4648d4]/20 transition-all">
              <Search size={20} className="mx-4 text-[#76777d] flex-shrink-0" />
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm py-4 placeholder:text-[#76777d]"
                placeholder="Search for electronics, suppliers, or wholesale deals..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm hidden sm:block hover:bg-black/80 transition-colors">Search</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-[#45464d] mr-2 py-1">Trending:</span>
              {["Electronics", "Wholesale", "Bulk Paper", "Office Tech"].map((tag) => (
                <a key={tag} className="px-4 py-1 bg-[#e6e8ea] rounded-full text-xs font-semibold text-[#45464d] hover:bg-[#4648d4]/10 hover:text-[#4648d4] transition-colors cursor-pointer" href="#">{tag}</a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Choose Your Path ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>One Platform, Two Experiences</h2>
              <p className="text-[#45464d]">Whether you're sourcing for your business or hunting for personal deals, Cheaper has you covered.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link href="/b2b" className="group p-8 rounded-2xl border-2 border-[#4648d4]/20 hover:border-[#4648d4] hover:shadow-xl transition-all bg-gradient-to-br from-white to-[#4648d4]/5">
                <div className="w-14 h-14 bg-[#4648d4] rounded-xl flex items-center justify-center mb-6">
                  <Building2 size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>For Business (B2B)</h3>
                <p className="text-[#45464d] text-sm mb-4">Bulk procurement, RFQ management, verified supplier network, and enterprise pricing tiers.</p>
                <ul className="space-y-2 mb-6">
                  {["Instant RFQ engine", "Tax-exempt purchasing", "Dedicated account management"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#45464d]">
                      <CheckCircle size={16} className="text-[#4648d4] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-[#4648d4] font-bold text-sm group-hover:gap-3 transition-all">
                  Explore B2B Solutions <ArrowRight size={16} />
                </span>
              </Link>

              <Link href="/b2c" className="group p-8 rounded-2xl border-2 border-[#6ffbbe]/40 hover:border-[#4edea3] hover:shadow-xl transition-all bg-gradient-to-br from-white to-[#6ffbbe]/10">
                <div className="w-14 h-14 bg-[#6ffbbe] rounded-xl flex items-center justify-center mb-6">
                  <Monitor size={28} className="text-[#002113]" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>For Individuals (B2C)</h3>
                <p className="text-[#45464d] text-sm mb-4">Live price alerts, 6-month price history, factory-direct deals, and smart comparison tools.</p>
                <ul className="space-y-2 mb-6">
                  {["Live price drop alerts", "6-month price history", "Factory-direct deals"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#45464d]">
                      <CheckCircle size={16} className="text-[#005236] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-[#005236] font-bold text-sm group-hover:gap-3 transition-all">
                  Find My Deals <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-24 px-4">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Powerful Procurement Features</h2>
              <p className="text-[#45464d] max-w-2xl mx-auto">Everything you need to streamline your purchasing workflow and maximize your budget efficiency.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { Icon: BarChart3, bg: "bg-[#4648d4]/10", color: "text-[#4648d4]", title: "Compare Prices", desc: "Real-time price tracking across multiple marketplaces and vendors to ensure the best deal." },
                { Icon: ShieldCheck, bg: "bg-[#6ffbbe]/20", color: "text-[#005236]", title: "Verified Suppliers", desc: "Direct access to a pre-vetted network of global manufacturers and local distributors." },
                { Icon: Package, bg: "bg-[#131b2e]", color: "text-white", title: "Wholesale & Retail", desc: "Whether you need one unit or ten thousand, we provide the right pricing tiers instantly." },
              ].map(({ Icon, bg, color, title, desc }) => (
                <div key={title} className="bg-white p-8 rounded-2xl shadow-sm border border-[#c6c6cd]/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`w-14 h-14 ${bg} ${color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{title}</h3>
                  <p className="text-[#45464d] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-24 px-4 bg-[#eceef0]">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>How It Works</h2>
              <p className="text-[#45464d]">Your journey from searching to saving in three simple steps.</p>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#4648d4] to-transparent -translate-x-1/2" />
              <div className="space-y-24">
                {[
                  { n: 1, side: "left", title: "Search", desc: "Input any product or part number. Our AI-powered engine scans thousands of verified listings across the global marketplace." },
                  { n: 2, side: "right", title: "Compare", desc: "Use our interactive dashboard to compare total cost of ownership, including shipping, taxes, and bulk discounts." },
                  { n: 3, side: "left", title: "Save", desc: "Place your order with confidence. We facilitate the transaction and track the savings directly to your business analytics." },
                ].map(({ n, side, title, desc }) => (
                  <div key={n} className="flex flex-col lg:flex-row items-center gap-12 relative">
                    {side === "left" ? (
                      <>
                        <div className="lg:w-1/2 lg:text-right order-2 lg:order-1">
                          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{title}</h3>
                          <p className="text-[#45464d] text-sm max-w-md ml-auto">{desc}</p>
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-[#4648d4] text-white rounded-full flex items-center justify-center font-bold text-xl order-1 lg:order-2 flex-shrink-0">{n}</div>
                        <div className="lg:w-1/2 order-3" />
                      </>
                    ) : (
                      <>
                        <div className="lg:w-1/2 order-1" />
                        <div className="relative z-10 w-16 h-16 bg-[#4648d4] text-white rounded-full flex items-center justify-center font-bold text-xl order-1 lg:order-2 flex-shrink-0">{n}</div>
                        <div className="lg:w-1/2 order-3 lg:text-left">
                          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{title}</h3>
                          <p className="text-[#45464d] text-sm max-w-md">{desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="py-24 px-4">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Explore by Category</h2>
                <p className="text-[#45464d]">Find the best deals in every industry.</p>
              </div>
              <a className="text-[#4648d4] font-bold flex items-center gap-2 text-sm hover:gap-3 transition-all" href="#">
                See All Categories <ArrowRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map(({ Icon, label }) => (
                <div key={label} className="aspect-square bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-[#4648d4] hover:text-white transition-all cursor-pointer group shadow-sm border border-[#e6e8ea]">
                  <Icon size={36} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-[1280px] mx-auto bg-[#131b2e] rounded-[2rem] p-12 md:p-20 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
              Ready to Transform Your Buying Experience?
            </h2>
            <p className="text-[#7c839b] text-base mb-10 max-w-2xl mx-auto">
              Join 10,000+ businesses who have already optimized their spending with Cheaper Marketplace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/b2b" className="bg-[#4648d4] text-white px-10 py-5 rounded-2xl font-bold text-sm hover:scale-105 transition-transform">
                Start for Business
              </Link>
              <Link href="/b2c" className="bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10">
                Find Personal Deals
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#e0e3e5] border-t border-[#c6c6cd] mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1280px] mx-auto px-10 py-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#4648d4] flex items-center justify-center">
                <span className="text-white font-bold" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
              </div>
              <span className="font-bold text-lg text-black" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
            </div>
            <p className="text-[#45464d] text-sm mb-6 leading-relaxed">The premium B2B & B2C marketplace platform for efficient procurement and smart shopping.</p>
            <div className="flex gap-4">
              <a className="text-[#45464d] hover:text-[#4648d4]" href="#"><Share2 size={20} /></a>
              <a className="text-[#45464d] hover:text-[#4648d4]" href="#"><Globe size={20} /></a>
              <a className="text-[#45464d] hover:text-[#4648d4]" href="#"><Rss size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6">Solutions</h4>
            <ul className="space-y-4">
              {[["For Business (B2B)", "/b2b"], ["For Individuals (B2C)", "/b2c"], ["Documentation", "#"], ["Help Center", "#"]].map(([l, h]) => (
                <li key={l}><Link className="text-[#45464d] text-sm hover:text-black underline transition-all" href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6">Company</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "About Us", "Careers"].map((l) => (
                <li key={l}><a className="text-[#45464d] text-sm hover:text-black underline transition-all" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6">Get the App</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 bg-black text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-black/80 transition-colors">
                <Smartphone size={20} /><span>Download on iOS</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-black text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-black/80 transition-colors">
                <Smartphone size={20} /><span>Get it on Android</span>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center py-6 border-t border-[#c6c6cd] text-[#45464d] text-sm">
          © 2026 Cheaper Marketplace. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
