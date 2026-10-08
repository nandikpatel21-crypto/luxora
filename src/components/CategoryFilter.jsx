import React from 'react';
import { Search, SlidersHorizontal, Watch, Footprints, Sparkles, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

export const CategoryFilter = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  priceFilter,
  onPriceFilterChange,
  totalResults
}) => {
  const categories = [
    { id: "all", label: "All Collections", icon: LayoutGrid },
    { id: "watches", label: "Timepieces", icon: Watch },
    { id: "shoes", label: "Footwear", icon: Footprints },
    { id: "featured", label: "Featured Masterpieces", icon: Sparkles },
  ];

  return (
    <div className="w-full bg-[#FFFFFF]/90 backdrop-blur-md border-y border-[#E6D9BE] py-6 px-4 sm:px-6 lg:px-8 mb-10 shadow-sm">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Top Row: Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? "text-[#07120F] bg-[#C49A45] border-[#C49A45] shadow-md scale-105"
                      : "text-[#07120F] bg-[#FDFBF3] hover:bg-[#FFFFFF] hover:text-[#C49A45] border-[#E6D9BE]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#07120F]" : cat.id === 'watches' ? "text-[#C49A45]" : cat.id === 'shoes' ? "text-[#07120F]" : "text-[#77746C]"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="text-xs text-[#77746C] font-semibold tracking-wider uppercase">
            Showing <span className="text-[#07120F] font-bold text-sm bg-[#E6D9BE]/40 px-2 py-0.5 rounded-md border border-[#E6D9BE]">{totalResults}</span> Curated Items
          </div>
        </div>

        {/* Bottom Row: Search & Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          
          {/* Search Box */}
          <div className="sm:col-span-6 lg:col-span-6 relative">
            <Search className="w-4 h-4 text-[#77746C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by model, leather type, movement, or specification..."
              className="w-full bg-[#FFFFFF] border border-[#E6D9BE] focus:border-[#C49A45] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#101713] placeholder-[#77746C] focus:outline-none transition-all duration-300 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#77746C] hover:text-[#07120F]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Price Filter Select */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={priceFilter}
              onChange={(e) => onPriceFilterChange(e.target.value)}
              aria-label="Filter by Price"
              className="w-full bg-[#FFFFFF] border border-[#E6D9BE] focus:border-[#C49A45] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#101713] focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="all">All Prices</option>
              <option value="under-2000">Under $2,000</option>
              <option value="2000-10000">$2,000 - $10,000</option>
              <option value="over-10000">$10,000 & Above</option>
            </select>
          </div>

          {/* Sort By Select */}
          <div className="sm:col-span-3 lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort catalog"
              className="w-full bg-[#FFFFFF] border border-[#E6D9BE] focus:border-[#C49A45] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#101713] focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
