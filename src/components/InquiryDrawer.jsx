import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle, Send, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { apiService } from '../services/apiService';
import confetti from 'canvas-confetti';

export const InquiryDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalValue = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleWhatsAppCheckout = () => {
    if (!cartItems.length) return;
    const note = `Customer: ${customerName || 'Valued Guest'} (${customerContact || 'N/A'})\nNotes: ${inquiryNotes}`;
    const waLink = apiService.generateWhatsAppLink(cartItems, note);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  const handleSubmitWebInquiry = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return;
    setLoading(true);

    try {
      await apiService.createInquiry({
        customerName: customerName || "Anonymous VIP Guest",
        contactInfo: customerContact || "WhatsApp Direct",
        notes: inquiryNotes,
        items: cartItems,
        totalValue
      });

      // Fire Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmittedSuccess(true);
      setTimeout(() => {
        onClearCart();
        setSubmittedSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              <Sparkles className="w-4 h-4 text-[#C49A45]" />
              <h3 className="text-base font-serif-title font-bold text-[#FDFBF3] uppercase tracking-wider">
                VIP Inquiry Bag ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#E6D9BE] hover:text-[#C49A45] rounded-lg hover:bg-[#07120F]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {submittedSuccess ? (
            <div className="p-8 text-center my-auto space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#C49A45] mx-auto animate-bounce" />
              <h4 className="text-2xl font-serif-title font-bold text-[#FDFBF3]">Inquiry Transmitted</h4>
              <p className="text-xs text-[#E6D9BE] font-light">
                Your VIP request has been logged. Our senior concierge will reach out to you within the hour.
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <p className="text-sm text-[#E6D9BE]/80 font-light">
                      Your inquiry bag is currently empty.
                    </p>
                    <p className="text-xs text-[#D8B46A]">
                      Explore our timepieces or footwear to request a bespoke quote.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#101713] border border-[#C49A45]/20"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-[#C49A45]/30"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif-title font-bold text-[#FDFBF3] truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-[#D8B46A] font-sans font-bold mt-0.5">
                          ${item.price.toLocaleString()}
                        </div>
                        {item.selectedSize && (
                          <div className="text-[10px] text-[#E6D9BE]/70">
                            Option: {item.selectedSize}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-2 text-[#77746C] hover:text-[#C49A45]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Form & Actions Footer */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-[#C49A45]/20 space-y-4 bg-[#101713]">
                  
                  {/* Total Value */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#E6D9BE]/80 uppercase tracking-wider text-xs">Estimated Acquisition:</span>
                    <span className="text-lg font-bold text-[#D8B46A] font-sans">
                      ${totalValue.toLocaleString()}
                    </span>
                  </div>

                  {/* Customer Quick Form */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Full Name / Title"
                      className="w-full bg-[#07120F] border border-[#C49A45]/30 focus:border-[#C49A45] rounded-lg px-3 py-2 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      placeholder="WhatsApp Number or Email"
                      className="w-full bg-[#07120F] border border-[#C49A45]/30 focus:border-[#C49A45] rounded-lg px-3 py-2 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    {/* Primary Direct Web Inquiry Button */}
                    <button
                      onClick={handleSubmitWebInquiry}
                      disabled={loading}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? "Transmitting..." : "Submit Direct Web Inquiry"}</span>
                    </button>

                    {/* Secondary WhatsApp Button */}
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#07120F] hover:bg-[#07120F]/80 text-[#D8B46A] border border-[#C49A45]/60 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-[#C49A45]" />
                      <span>Checkout via WhatsApp Concierge</span>
                    </button>
                  </div>

                </div>
              )}
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
