import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Check, MessageCircle, ShoppingBag, Shield, Truck, Clock, Sparkles } from 'lucide-react';
import { apiService } from '../services/apiService';

export const ProductModal = ({ product, onClose, onAddToBag }) => {
  if (!product) return null;

  const galleryImages = product.gallery?.length ? product.gallery : [product.image];
  const [activeImg, setActiveImg] = useState(galleryImages[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Standard Fit");
  const [customEngraving, setCustomEngraving] = useState("");
  const [added, setAdded] = useState(false);

  const handleWhatsApp = () => {
    const customizedItem = {
      ...product,
      selectedSize,
    };
    const waLink = apiService.generateWhatsAppLink(customizedItem, customEngraving);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  const handleAddToBag = () => {
    onAddToBag({
      ...product,
      selectedSize,
      customEngraving
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#07120F]/85 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Main Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#07120F] border border-[#C49A45]/40 rounded-2xl overflow-hidden shadow-2xl z-10 my-8 text-[#FDFBF3]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#101713] text-[#E6D9BE] hover:text-[#C49A45] border border-[#C49A45]/30 hover:border-[#C49A45] transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 bg-[#101713] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C49A45]/20">
              <div className="space-y-4">
                {/* Main View */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#07120F] border border-[#C49A45]/30">
                  <img
                    src={activeImg}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#C49A45] text-[#07120F] rounded-full shadow-md font-sans">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(img)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          activeImg === img ? "border-[#C49A45] scale-105" : "border-[#C49A45]/20 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-4 border-t border-[#C49A45]/20 grid grid-cols-3 gap-2 text-center text-[10px] text-[#E6D9BE]/80 font-sans">
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-[#C49A45]" />
                  <span>Certified Genuine</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#C49A45]" />
                  <span>Express Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Clock className="w-4 h-4 text-[#C49A45]" />
                  <span>Lifetime Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Specifications & Actions */}
            <div className="md:col-span-6 p-6 space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#C49A45] uppercase tracking-widest font-bold">
                    <span>{product.subcategory || product.category}</span>
                    <span>SKU: {product.sku}</span>
                  </div>
                  <h2 className="text-2xl font-serif-title font-bold text-[#FDFBF3] mt-1">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-2xl font-bold font-sans text-[#D8B46A]">
                      ${product.price?.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-[#77746C] line-through">
                        ${product.originalPrice?.toLocaleString()}
                      </div>
                    )}
                    <div className="flex items-center gap-1 ml-auto text-xs text-[#C49A45]">
                      <Star className="w-3.5 h-3.5 fill-[#C49A45] text-[#C49A45]" />
                      <span className="font-bold text-[#FDFBF3]">{product.rating}</span>
                      <span className="text-[#77746C]">({product.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#E6D9BE]/90 leading-relaxed font-light">
                  {product.description || product.shortDescription}
                </p>

                {/* Technical Specifications List */}
                {product.specs && (
                  <div className="bg-[#101713] p-3.5 rounded-xl border border-[#C49A45]/30 space-y-2">
                    <div className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
                      <span>Specifications</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="space-y-0.5">
                          <span className="text-[10px] text-[#77746C] block uppercase">{key}</span>
                          <span className="text-[#FDFBF3] font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Options / Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider block">
                      Select Size / Specification:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            selectedSize === sz
                              ? "bg-[#C49A45] text-[#07120F] font-bold border border-[#C49A45]"
                              : "bg-[#101713] text-[#FDFBF3] border border-[#C49A45]/20 hover:border-[#C49A45]"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Bespoke Engraving */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider block">
                    Bespoke Monogram / Custom Engraving (Optional):
                  </label>
                  <input
                    type="text"
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value)}
                    placeholder="e.g. Initials 'L.A.V.' or Custom Gift Note"
                    className="w-full bg-[#101713] border border-[#C49A45]/30 focus:border-[#C49A45] rounded-lg px-3 py-2 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none"
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#C49A45]/20 space-y-2">
                {/* Primary Add to Bag */}
                <button
                  onClick={handleAddToBag}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border ${
                    added
                      ? "bg-[#07120F] text-[#C49A45] border-[#C49A45]"
                      : "bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] border-[#C49A45] shadow-lg"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#C49A45]" />
                      <span>Item Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#07120F]" />
                      <span>Add to Inquiry Bag</span>
                    </>
                  )}
                </button>

                {/* Secondary WhatsApp Button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#07120F] hover:bg-[#07120F]/80 text-[#D8B46A] border border-[#C49A45]/60 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#C49A45]" />
                  <span>Inquire via WhatsApp Concierge</span>
                </button>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
