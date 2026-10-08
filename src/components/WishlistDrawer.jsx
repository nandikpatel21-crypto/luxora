import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { apiService } from '../services/apiService';

export const WishlistDrawer = ({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onMoveToBag,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-[#07120F]/80 backdrop-blur-sm">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#07120F] border-l border-[#C49A45]/30 h-full flex flex-col justify-between shadow-2xl z-10 text-[#FDFBF3]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#C49A45]/20 flex items-center justify-between bg-[#101713]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C49A45] fill-[#C49A45]" />
              <h3 className="text-base font-serif-title font-bold text-[#FDFBF3] uppercase tracking-wider">
                Saved Wishlist ({wishlistItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#E6D9BE] hover:text-[#C49A45] rounded-lg hover:bg-[#07120F]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <Heart className="w-12 h-12 text-[#77746C] mx-auto stroke-1" />
                <p className="text-sm text-[#E6D9BE]/80 font-light">
                  Your saved wishlist is empty.
                </p>
                <p className="text-xs text-[#D8B46A]">
                  Click the heart icon on any timepiece or shoe card to save your favorites.
                </p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onQuickView(item);
                    onClose();
                  }}
                  className="group relative flex items-center gap-3 p-3 rounded-xl bg-[#101713] border border-[#C49A45]/20 hover:border-[#C49A45] transition-all cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[#C49A45]/30"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] text-[#C49A45] uppercase font-bold tracking-widest block">
                      {item.subcategory || item.category}
                    </span>
                    <h4 className="text-xs font-serif-title font-bold text-[#FDFBF3] truncate group-hover:text-[#D8B46A]">
                      {item.name}
                    </h4>
                    <div className="text-xs text-[#D8B46A] font-sans font-bold mt-0.5">
                      ${item.price?.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveToBag(item);
                      }}
                      title="Add to Inquiry Bag"
                      className="p-2 rounded-lg bg-[#C49A45] text-[#07120F] hover:bg-[#FDFBF3] font-bold text-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWishlist(item.id);
                      }}
                      title="Remove from Wishlist"
                      className="p-2 text-[#77746C] hover:text-[#C49A45]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="p-5 border-t border-[#C49A45]/20 bg-[#101713] text-center text-xs text-[#E6D9BE]/70 font-light">
            Items saved in your wishlist remain stored during your session.
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
