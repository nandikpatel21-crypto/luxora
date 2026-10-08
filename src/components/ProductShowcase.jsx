import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Watch, Footprints, ArrowRight, Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductShowcase = ({
  products = [],
  onQuickView,
  onAddToBag,
  wishlistIds = [],
  onToggleWishlist,
  onSelectCategory
}) => {
  const watchProducts = products.filter((p) => p.category === "watches");
  const shoeProducts = products.filter((p) => p.category === "shoes");
  const featuredProducts = products.filter((p) => p.featured || p.badge === "Best Seller" || p.badge === "Masterpiece");

  // Spotlight product for "CURATED FOR YOU"
  const spotlightProduct = featuredProducts[0] || products[0];
  const sideCurated = featuredProducts.slice(1, 3);

  if (!products.length) return null;

  return (
    <div className="space-y-20 py-10 bg-[#FDFBF3]" id="curated-showcase">
      
      {/* ---------------------------------------------------- */}
      {/* 1. CURATED FOR YOU (Asymmetrical Editorial Spotlight) */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A45] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDITORIAL SELECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#07120F]">
              Curated For You
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory("all")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A45] hover:text-[#07120F] tracking-widest uppercase transition-colors"
          >
            <span>VIEW ALL MASTERPIECES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Spotlight Hero Card */}
          {spotlightProduct && (
            <div className="lg:col-span-7 group relative rounded-3xl bg-[#07120F] border border-[#C49A45]/40 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between text-[#FDFBF3]">
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A45]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#C49A45] text-[#07120F] font-bold text-[10px] uppercase tracking-widest">
                    {spotlightProduct.badge || "Spotlight"}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(spotlightProduct)}
                    className="p-2 rounded-full bg-[#101713] text-[#C49A45] border border-[#C49A45]/30 hover:bg-[#C49A45] hover:text-[#07120F] transition-all"
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.includes(spotlightProduct.id) ? "fill-[#C49A45]" : ""}`} />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-xs text-[#D8B46A] uppercase tracking-widest font-bold block">
                      {spotlightProduct.subcategory || spotlightProduct.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#FDFBF3]">
                      {spotlightProduct.name}
                    </h3>
                    <p className="text-xs text-[#E6D9BE]/80 font-light leading-relaxed">
                      {spotlightProduct.shortDescription}
                    </p>

                    <div className="pt-2 text-2xl font-bold font-sans text-[#D8B46A]">
                      ${spotlightProduct.price?.toLocaleString()}
                    </div>
                  </div>

                  <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#C49A45]/30 bg-[#101713]">
                    <img
                      src={spotlightProduct.image}
                      alt={spotlightProduct.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#C49A45]/20 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onQuickView(spotlightProduct)}
                  className="px-6 py-3 rounded-full bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Discover Details</span>
                </button>

                <button
                  onClick={() => onAddToBag(spotlightProduct)}
                  className="px-6 py-3 rounded-full bg-[#101713] hover:bg-[#C49A45] text-[#FDFBF3] hover:text-[#07120F] border border-[#C49A45]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Inquire Now</span>
                </button>
              </div>

            </div>
          )}

          {/* Side Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {sideCurated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToBag={onAddToBag}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. BESTSELLING TIMEPIECES (Horology Showcase) */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#07120F] border border-[#C49A45]/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-[#FDFBF3] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49A45]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D8B46A] uppercase tracking-widest">
                <Watch className="w-3.5 h-3.5 text-[#C49A45]" />
                <span>GENEVA HAUTE HORLOGERIE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF3]">
                Bestselling Timepieces
              </h2>
            </div>
            <button
              onClick={() => onSelectCategory("watches")}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D8B46A] hover:text-[#FDFBF3] tracking-widest uppercase transition-colors"
            >
              <span>EXPLORE ALL WATCHES</span>
              <ArrowRight className="w-4 h-4 text-[#C49A45]" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToBag={onAddToBag}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. THE ART OF FOOTWEAR (Neapolitan Showcase) */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A45] uppercase tracking-widest">
              <Footprints className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>NEAPOLITAN LEATHER GUILD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#07120F]">
              The Art of Footwear
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory("shoes")}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A45] hover:text-[#07120F] tracking-widest uppercase transition-colors"
          >
            <span>EXPLORE ALL FOOTWEAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shoeProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToBag={onAddToBag}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
