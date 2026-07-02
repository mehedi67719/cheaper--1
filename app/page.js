"use client";

import CategoriesSection from "@/components/dashboard/Home/CategoriesSection";
import CTASection from "@/components/dashboard/Home/CTASection";
import FeaturedDeals from "@/components/dashboard/Home/FeaturedDeals";
import HeroSection from "@/components/dashboard/Home/HeroSection";
import HowItWorks from "@/components/dashboard/Home/HowItWorks";
import SellSection from "@/components/dashboard/Home/SellSection";
import TrustSection from "@/components/dashboard/Home/TrustSection";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <main>
        <HeroSection/>
        <FeaturedDeals products={products} loading={loading} />
        <CategoriesSection />
        <SellSection />
        <HowItWorks />
        <TrustSection />
        <CTASection />
      </main>
    </div>
  );
}