"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Grid, List, ChevronDown, 
  ShoppingBag, Heart, Star, Eye, Package,
  SlidersHorizontal, X, Sparkles, TrendingUp,
  Zap, Award, Clock, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products', icon: Package },
    { id: 'electronics', label: 'Electronics', icon: Zap },
    { id: 'fashion', label: 'Fashion', icon: ShoppingBag },
    { id: 'home', label: 'Home & Living', icon: Star },
    { id: 'food', label: 'Food & Beverages', icon: Award },
    { id: 'sports', label: 'Sports', icon: TrendingUp },
    { id: 'books', label: 'Books', icon: Clock },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'popular', label: 'Most Popular' },
  ];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container py-8">
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-black rounded-xl">
              <Package size={20} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black">Products</h1>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-600">
              {products.length} items
            </span>
          </div>
          <p className="text-gray-400 text-sm">Browse our collection of premium products</p>
        </motion.div>

        <motion.div 
          className="flex flex-col lg:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-1 relative">
            <motion.div 
              className={`relative flex items-center bg-white border transition-all duration-300 rounded-2xl overflow-hidden ${
                isSearchFocused 
                  ? 'border-black shadow-2xl shadow-black/10 ring-2 ring-black/5' 
                  : 'border-gray-200 hover:border-gray-400 hover:shadow-lg'
              }`}
              animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
            >
              <Search size={18} className={`ml-4 transition-colors duration-300 ${isSearchFocused ? 'text-black' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="flex-1 bg-transparent outline-none text-sm py-3.5 px-3 text-black placeholder:text-gray-400"
              />
              <kbd className="hidden sm:inline-block mr-3 px-2 py-1 text-[10px] font-semibold text-gray-400 bg-gray-50 rounded border border-gray-200">
                ⌘K
              </kbd>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-black hover:border-black hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SlidersHorizontal size={16} className="group-hover:rotate-12 transition-transform" />
              Filters
              <span className="ml-1 px-2 py-0.5 bg-black text-white text-[10px] rounded-full">3</span>
            </motion.button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-black appearance-none cursor-pointer hover:border-black hover:shadow-lg transition-all duration-300 pr-10"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-all duration-300 border-l border-gray-200 ${
                  viewMode === 'list' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 shadow-xl"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Filter size={20} className="text-black" />
                  <h3 className="font-semibold text-black text-lg">Filters</h3>
                </div>
                <motion.button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={18} className="text-gray-400" />
                </motion.button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</label>
                  <div className="mt-2 space-y-1">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-black text-white shadow-lg shadow-black/20'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <category.icon size={14} />
                        {category.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price Range</label>
                  <div className="mt-4 space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                      style={{
                        background: `linear-gradient(to right, black 0%, black ${(priceRange[1]/1000)*100}%, #e5e7eb ${(priceRange[1]/1000)*100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-black">${priceRange[0]}</span>
                      <span className="font-semibold text-black">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</label>
                  <div className="mt-2 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <motion.button
                        key={star}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 w-full"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">& up</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Availability</label>
                  <div className="mt-2 space-y-1">
                    {['In Stock Only', 'On Sale', 'Free Shipping'].map((item) => (
                      <motion.button
                        key={item}
                        className="block w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                        whileHover={{ x: 4 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                <motion.button 
                  className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-black/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Filters
                </motion.button>
                <motion.button 
                  className="px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear All
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-yellow-400" />
            <p className="text-sm text-gray-400">
              Showing <span className="text-black font-semibold">{products.length}</span> products
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-gray-400">
              {viewMode === 'grid' ? 'Grid View' : 'List View'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package size={16} className="text-gray-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm animate-pulse">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 bg-gray-50 rounded-full mb-4">
              <Package size={56} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-black">No products found</h3>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
            <button className="mt-6 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className={viewMode === 'grid' 
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
              : 'flex flex-col gap-5'
            }
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && products.length > 0 && (
          <motion.div 
            className="flex justify-center items-center gap-2 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-black hover:text-black hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            <motion.button 
              className="px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-black/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              1
            </motion.button>
            <motion.button 
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-black hover:text-black hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              2
            </motion.button>
            <motion.button 
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-black hover:text-black hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              3
            </motion.button>
            <span className="text-gray-400 text-sm px-2">...</span>
            <motion.button 
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-black hover:text-black hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              10
            </motion.button>
            <motion.button 
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-black hover:text-black hover:shadow-lg transition-all duration-300 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <ChevronDown size={14} className="rotate-[-90deg]" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;