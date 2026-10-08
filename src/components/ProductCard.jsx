import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageCircle, ShoppingBag, Star, Sparkles, Check, Heart } from 'lucide-react';
import { apiService } from '../services/apiService';

export const ProductCard = ({ product, onQuickView, onAddToBag, isWishlisted, onToggleWishlist }) => {
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = isHovered && product.gallery && product.gallery[1] 
    ? product.gallery[1] 
    : product.image;

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const link = apiService.generateWhatsAppLink(product);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleBagClick = (e) => {
    e.stopPropagation();
    onAddToBag(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      className="group relative rounded-2xl bg-[#FFFFFF] border border-[#E6D9BE] hover:border-[#C49A45] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-[0_12px_35px_rgba(196,154,69,0.22)]"
    >
      <div>
        {/* Image Stage */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FDFBF3]">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07120F]/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase bg-[#C49A45] text-[#07120F] rounded-full shadow-xs font-sans">
                {product.badge}
              </span>
            )}
            {product.featured && (
              <span className="px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase bg-[#07120F] text-[#D8B46A] rounded-full border border-[#C49A45]/40 backdrop-blur-md">
                Featured
              </span>
            )}
          </div>

          {/* Top Right Wishlist Heart */}
          <button
            onClick={handleWishlistClick}
            aria-label="Save to Wishlist"
            title="Save to Wishlist"
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md z-20 transition-all duration-300 ${
              isWishlisted 
                ? "bg-[#07120F] text-[#C49A45] border border-[#C49A45]" 
                : "bg-[#FFFFFF]/80 text-[#07120F] hover:text-[#C49A45] border border-[#E6D9BE]"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-[#C49A45]" : ""}`} />
          </button>

          {/* Quick View Floating Overlay */}
          <div className="absolute inset-0 bg-[#07120F]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="px-4 py-2 bg-[#C49A45] hover:bg-[#07120F] text-[#07120F] hover:text-[#C49A45] rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all duration-300"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="p-5 space-y-2.5">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#C49A45] uppercase tracking-widest font-bold text-[10px]">
              {product.subcategory || product.category}
            </span>
            <div className="flex items-center gap-1 text-[#C49A45]">
              <Star className="w-3.5 h-3.5 fill-[#C49A45] text-[#C49A45]" />
              <span className="font-bold text-xs text-[#07120F]">{product.rating}</span>
              <span className="text-[#77746C] text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-serif-title font-bold text-[#07120F] group-hover:text-[#C49A45] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Excerpt */}
          <p className="text-xs text-[#77746C] line-clamp-2 font-light leading-relaxed">
            {product.shortDescription}
          </p>

        </div>
      </div>

      {/* Footer / Price & Direct Actions */}
      <div className="p-5 pt-0 mt-auto border-t border-[#E6D9BE]/60 pt-3">
        <div className="flex items-center justify-between gap-2">
          
          {/* Pricing */}
          <div>
            <div className="text-base sm:text-lg font-bold font-sans text-[#07120F]">
              ${product.price?.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-[#77746C] line-through">
                ${product.originalPrice?.toLocaleString()}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              title="Direct WhatsApp Inquiry"
              aria-label="Direct WhatsApp Inquiry"
              className="p-2.5 rounded-xl bg-[#07120F] hover:bg-[#C49A45] text-[#C49A45] hover:text-[#07120F] border border-[#C49A45]/40 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Add to Inquiry Bag */}
            <button
              onClick={handleBagClick}
              title="Add to Inquiry Bag"
              aria-label="Add to Inquiry Bag"
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                added
                  ? "bg-[#07120F] text-[#C49A45] border border-[#C49A45]"
                  : "bg-[#C49A45] hover:bg-[#07120F] text-[#07120F] hover:text-[#C49A45] shadow-xs"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </motion.div>
  );
};
