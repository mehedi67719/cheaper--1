"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Star, Heart, ShoppingBag, Package, Store,
  Shield, Truck, RefreshCw, ChevronRight, Share2, Flag,
  Check, Minus, Plus, ExternalLink,
} from "lucide-react";

const PRODUCTS = {
  1: {
    id: 1, name: "Wireless Earbuds Pro", seller: "TechHub Store", sellerRating: 4.9, sellerSales: "12.4k",
    price: 29.99, was: 59.99, rating: 4.8, reviews: 342, pct: 50, category: "Electronics",
    desc: "Premium wireless earbuds with active noise cancellation, 30-hour battery life, and IPX5 water resistance. Crystal-clear audio with deep bass and crisp highs. Seamlessly pair with any Bluetooth 5.3 device.",
    features: ["Active Noise Cancellation", "30-hour battery (10hr buds + 20hr case)", "IPX5 water resistant", "Bluetooth 5.3", "USB-C charging", "Touch controls"],
    specs: { "Connectivity": "Bluetooth 5.3", "Battery": "10hr (buds) + 20hr (case)", "Water Rating": "IPX5", "Driver Size": "10mm", "Weight": "5g per earbud" },
  },
  2: {
    id: 2, name: "Linen Throw Blanket", seller: "CozyNest Shop", sellerRating: 4.9, sellerSales: "3.1k",
    price: 18.00, was: 36.00, rating: 4.9, reviews: 128, pct: 50, category: "Home",
    desc: "Handwoven 100% French linen throw blanket. Naturally breathable, hypoallergenic, and gets softer with every wash. Perfect for sofa draping or light bedding. Available in earthy, neutral tones.",
    features: ["100% French linen", "Hypoallergenic", "Pre-washed & softened", "Machine washable", "140 × 200cm", "Ethically made"],
    specs: { "Material": "100% French Linen", "Size": "140 × 200 cm", "Weight": "450g", "Care": "Machine wash 40°C", "Origin": "Portugal" },
  },
  3: {
    id: 3, name: "Running Shoes X2", seller: "SportZone", sellerRating: 4.7, sellerSales: "8.9k",
    price: 44.99, was: 89.99, rating: 4.7, reviews: 215, pct: 50, category: "Sports",
    desc: "Lightweight responsive running shoes with our proprietary CloudFoam sole technology. Breathable mesh upper with a secure lace system. Designed for road and light trail running.",
    features: ["CloudFoam sole", "Breathable mesh upper", "Reflective detailing", "Wide toe box", "Sizes 36–48", "6 colour options"],
    specs: { "Upper": "Engineered Mesh", "Sole": "CloudFoam EVA", "Drop": "8mm", "Weight": "240g (size 42)", "Surface": "Road / Light Trail" },
  },
  4: {
    id: 4, name: "Ceramic Mug Set (4)", seller: "HomeGoods Co.", sellerRating: 4.8, sellerSales: "5.6k",
    price: 12.50, was: 24.00, rating: 5.0, reviews: 87, pct: 48, category: "Home",
    desc: "Set of four hand-glazed ceramic mugs with a speckled finish. Each holds 350ml and is microwave and dishwasher safe. A modern update to your morning ritual.",
    features: ["Set of 4 mugs", "350ml capacity", "Hand-glazed ceramic", "Microwave safe", "Dishwasher safe", "Speckled matte finish"],
    specs: { "Material": "Stoneware Ceramic", "Capacity": "350ml each", "Set Size": "4 mugs", "Care": "Dishwasher safe", "Dimensions": "9cm H × 8cm W" },
  },
  5: {
    id: 5, name: "Standing Desk Pro", seller: "WorkSpace Co.", sellerRating: 4.7, sellerSales: "2.3k",
    price: 249.99, was: 349.99, rating: 4.7, reviews: 203, pct: 29, category: "Office",
    desc: "Electric height-adjustable standing desk with memory presets. Solid bamboo top surface, quiet dual motor, anti-collision system, and cable management tray included.",
    features: ["Electric height adjust", "4 memory presets", "Dual-motor lift system", "Anti-collision", "Bamboo surface", "Cable tray included"],
    specs: { "Surface": "Bamboo (1.8m × 0.8m)", "Height Range": "60–125cm", "Weight Capacity": "80kg", "Motor": "Dual 350W", "Noise Level": "<45dB" },
  },
  6: {
    id: 6, name: "Air Purifier HEPA", seller: "CleanAir Shop", sellerRating: 4.9, sellerSales: "1.8k",
    price: 89.00, was: 129.00, rating: 4.9, reviews: 87, pct: 31, category: "Home",
    desc: "True HEPA H13 air purifier covering up to 50m². Removes 99.97% of particles including dust, pollen, pet dander, and smoke. Three fan speeds with auto mode and sleep mode.",
    features: ["True HEPA H13 filter", "Covers 50m²", "99.97% particle removal", "Auto + sleep mode", "Filter life indicator", "Ultra quiet at 25dB"],
    specs: { "Coverage": "50m²", "Filter": "True HEPA H13", "Noise": "25–52dB", "Power": "55W", "Dimensions": "32 × 32 × 56cm" },
  },
  7: {
    id: 7, name: "Leather Wallet Slim", seller: "Craft & Co.", sellerRating: 4.6, sellerSales: "4.1k",
    price: 34.00, was: 54.00, rating: 4.6, reviews: 145, pct: 37, category: "Fashion",
    desc: "Full-grain vegetable-tanned leather slim wallet. Holds 6–8 cards and folded bills. Develops a unique patina over time. RFID blocking. Handcrafted in small batches.",
    features: ["Full-grain leather", "RFID blocking", "6–8 card slots", "Bill compartment", "Develops patina", "Handcrafted"],
    specs: { "Material": "Vegetable-tanned leather", "Dimensions": "9 × 11cm (folded)", "Cards": "6–8", "RFID": "Yes", "Origin": "Handcrafted in Italy" },
  },
  8: {
    id: 8, name: "Smart Plug (4-pack)", seller: "TechHub Store", sellerRating: 4.9, sellerSales: "12.4k",
    price: 19.99, was: 29.99, rating: 4.8, reviews: 412, pct: 33, category: "Electronics",
    desc: "Wi-Fi smart plugs with energy monitoring. Works with Alexa, Google Home, and HomeKit. Schedule, automate, and control devices remotely from your phone. No hub required.",
    features: ["Works with Alexa, Google, HomeKit", "Energy monitoring", "Remote control via app", "Scheduling & automation", "16A per plug", "No hub needed"],
    specs: { "Pack Size": "4 plugs", "Max Load": "16A / 3680W", "Connectivity": "Wi-Fi 2.4GHz", "Compatibility": "Alexa, Google, HomeKit", "App": "iOS & Android" },
  },
};

const MOCK_REVIEWS = [
  { id: 1, author: "Sarah M.", rating: 5, date: "Jun 15, 2026", verified: true, text: "Absolutely love it. Arrived quickly and the quality exceeded my expectations for the price. Would buy again without hesitation." },
  { id: 2, author: "James T.", rating: 5, date: "Jun 10, 2026", verified: true, text: "Great value. Works exactly as described. Setup was straightforward and it's been reliable since day one." },
  { id: 3, author: "Priya K.", rating: 4, date: "Jun 4, 2026", verified: false, text: "Good product overall. Took a couple days extra to arrive but the seller communicated well. Happy with the purchase." },
];

export default function ProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const product = PRODUCTS[Number(id)];

  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-[#111] mb-2">Product not found</h1>
          <p className="text-sm text-[#888] mb-6">This listing may have been removed or is no longer available.</p>
          <Link href="/" className="bg-[#111] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const savings = (product.was - product.price).toFixed(2);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>

      {/* Nav */}
      <nav className="bg-white border-b border-[#e2ddd6] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-[#888] hover:text-[#111] transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <span className="text-[#ddd]">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#aaa]">
              <Link href="/" className="hover:text-[#111]">Marketplace</Link>
              <ChevronRight size={12} />
              <span className="text-[#888]">{product.category}</span>
              <ChevronRight size={12} />
              <span className="text-[#111] font-medium truncate max-w-[160px]">{product.name}</span>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#111] flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
            </div>
            <span className="font-bold text-sm hidden sm:block" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">

          {/* ── LEFT column ── */}
          <div className="space-y-5">

            {/* Image */}
            <div className="bg-white border border-[#e2ddd6] rounded-2xl overflow-hidden">
              <div className="h-72 sm:h-96 bg-[#f5f3ef] flex items-center justify-center relative">
                <Package size={72} className="text-[#ddd]" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#111] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {product.pct}% off
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 bg-white border border-[#e2ddd6] rounded-full flex items-center justify-center hover:border-[#999] transition-colors"
                  >
                    {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} className="text-[#888]" />}
                  </button>
                  <button
                    onClick={() => setWishlisted(w => !w)}
                    className="w-9 h-9 bg-white border border-[#e2ddd6] rounded-full flex items-center justify-center hover:border-[#999] transition-colors"
                  >
                    <Heart size={15} className={wishlisted ? "text-red-500 fill-red-500" : "text-[#888]"} />
                  </button>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 p-4 border-t border-[#f0ede8]">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-16 h-16 rounded-lg bg-[#f5f3ef] border flex items-center justify-center cursor-pointer transition-colors ${i === 0 ? "border-[#111]" : "border-[#e2ddd6] hover:border-[#999]"}`}>
                    <Package size={20} className="text-[#ddd]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs: Description / Features / Specs / Reviews */}
            <div className="bg-white border border-[#e2ddd6] rounded-2xl overflow-hidden">
              <div className="flex border-b border-[#e2ddd6]">
                {[
                  { id: "description", label: "Description" },
                  { id: "features", label: "Features" },
                  { id: "specs", label: "Specs" },
                  { id: "reviews", label: `Reviews (${product.reviews})` },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 py-3.5 text-xs font-semibold transition-colors border-b-2 ${
                      activeTab === id
                        ? "border-[#111] text-[#111]"
                        : "border-transparent text-[#888] hover:text-[#555]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "description" && (
                  <p className="text-sm text-[#555] leading-relaxed">{product.desc}</p>
                )}

                {activeTab === "features" && (
                  <ul className="space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[#555]">
                        <div className="w-5 h-5 rounded-full bg-[#111] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={11} className="text-white" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "specs" && (
                  <dl className="divide-y divide-[#f0ede8]">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-3 text-sm">
                        <dt className="text-[#888] font-medium">{key}</dt>
                        <dd className="text-[#111] font-semibold text-right">{val}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 pb-5 border-b border-[#f0ede8]">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>{product.rating}</div>
                        <div className="flex gap-0.5 mt-1 justify-center">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={14} className={s <= Math.round(product.rating) ? "text-amber-500 fill-amber-500" : "text-[#ddd]"} />
                          ))}
                        </div>
                        <div className="text-xs text-[#aaa] mt-1">{product.reviews} reviews</div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map(s => (
                          <div key={s} className="flex items-center gap-2">
                            <span className="text-xs text-[#888] w-3">{s}</span>
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <div className="flex-1 h-1.5 bg-[#f0ede8] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: s === 5 ? "72%" : s === 4 ? "20%" : s === 3 ? "6%" : "2%" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {MOCK_REVIEWS.map((review) => (
                      <div key={review.id} className="pb-5 border-b border-[#f0ede8] last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#111]">{review.author}</span>
                              {review.verified && (
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">Verified</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={11} className={s <= review.rating ? "text-amber-500 fill-amber-500" : "text-[#ddd]"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-[#aaa]">{review.date}</span>
                        </div>
                        <p className="text-sm text-[#555] leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT column (sticky) ── */}
          <div className="space-y-4">
            <div className="bg-white border border-[#e2ddd6] rounded-2xl p-6 lg:sticky lg:top-20">

              {/* Badge + category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest">{product.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#ddd]" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{product.pct}% off</span>
              </div>

              <h1 className="text-xl font-bold text-[#111] leading-snug mb-4" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={14} className={s <= Math.round(product.rating) ? "text-amber-500 fill-amber-500" : "text-[#ddd]"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#111]">{product.rating}</span>
                <button onClick={() => setActiveTab("reviews")} className="text-xs text-[#4648d4] hover:underline">
                  ({product.reviews} reviews)
                </button>
              </div>

              {/* Price */}
              <div className="bg-[#f5f3ef] border border-[#e2ddd6] rounded-xl p-4 mb-5">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                    ${product.price}
                  </span>
                  <span className="text-lg text-[#bbb] line-through">${product.was}</span>
                </div>
                <div className="text-xs text-emerald-600 font-semibold">
                  You save ${savings} ({product.pct}% off)
                </div>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold text-[#888] uppercase tracking-wide">Qty</span>
                <div className="flex items-center border border-[#e2ddd6] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f3ef] transition-colors text-[#555]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#111]">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f3ef] transition-colors text-[#555]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-[#aaa]">In stock</span>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 mb-5">
                <button className="w-full h-12 bg-[#111] text-white rounded-xl font-semibold hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={17} /> Buy now · ${(product.price * qty).toFixed(2)}
                </button>
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className={`w-full h-11 rounded-xl font-semibold text-sm border transition-colors flex items-center justify-center gap-2 ${
                    wishlisted
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-[#e2ddd6] text-[#555] hover:border-[#999] hover:text-[#111]"
                  }`}
                >
                  <Heart size={15} className={wishlisted ? "fill-red-500" : ""} />
                  {wishlisted ? "Saved to wishlist" : "Add to wishlist"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#f0ede8] mb-5">
                {[
                  { Icon: Truck, label: "Fast shipping" },
                  { Icon: Shield, label: "Buyer protection" },
                  { Icon: RefreshCw, label: "Easy returns" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <Icon size={17} className="text-[#888]" />
                    <span className="text-[10px] font-medium text-[#888] leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Seller card */}
              <div className="flex items-center gap-3 p-3.5 bg-[#f5f3ef] border border-[#e2ddd6] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center flex-shrink-0">
                  <Store size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#111] truncate">{product.seller}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-[#111]">{product.sellerRating}</span>
                    <span className="text-xs text-[#aaa]">· {product.sellerSales} sales</span>
                  </div>
                </div>
                <button className="text-xs font-semibold text-[#4648d4] hover:underline flex items-center gap-1 flex-shrink-0">
                  Visit <ExternalLink size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-[#111] mb-5" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(PRODUCTS)
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="bg-white border border-[#e2ddd6] rounded-xl overflow-hidden hover:border-[#999] hover:shadow-md transition-all group">
                  <div className="h-32 bg-[#f5f3ef] flex items-center justify-center relative">
                    <Package size={32} className="text-[#ddd]" />
                    <span className="absolute top-2 left-2 bg-[#111] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{p.pct}% off</span>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-[#aaa] uppercase tracking-wide mb-0.5">{p.seller}</p>
                    <h3 className="text-xs font-semibold text-[#111] mb-2 leading-snug truncate">{p.name}</h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-[#111] text-sm">${p.price}</span>
                      <span className="text-[#bbb] text-xs line-through">${p.was}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
