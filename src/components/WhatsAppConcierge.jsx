import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Send, Clock, ShieldCheck } from 'lucide-react';
import { apiService } from '../services/apiService';

export const WhatsAppConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const presets = [
    "I would like to inquire about Bespoke Customization options.",
    "Please send me the latest LUXORA 2026 Masterpiece Catalog.",
    "I need guidance choosing between Tourbillon timepieces."
  ];

  const handleSend = (text) => {
    const waLink = apiService.generateWhatsAppLink(null, text || customMsg);
    window.open(waLink, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-80 sm:w-88 bg-[#07120F] border border-[#C49A45]/40 rounded-2xl overflow-hidden shadow-2xl text-[#FDFBF3]"
          >
            {/* Popover Header */}
            <div className="p-4 bg-[#101713] border-b border-[#C49A45]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#C49A45] flex items-center justify-center text-[#07120F]">
                    <MessageCircle className="w-4 h-4 fill-[#07120F]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#D8B46A] border-2 border-[#07120F] rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-serif-title font-bold text-[#FDFBF3]">LUXORA VIP Concierge</h4>
                  <p className="text-[10px] text-[#D8B46A] font-sans">Online • Geneva & Milan Atelier</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#E6D9BE] hover:text-[#C49A45] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 bg-[#07120F]">
              <div className="p-3 rounded-xl bg-[#101713] border border-[#C49A45]/20 text-xs text-[#E6D9BE] leading-relaxed font-light">
                Welcome to LUXORA. How may our senior horological and leather specialists assist you today?
              </div>

              {/* Quick Prompt Presets */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#D8B46A] font-bold uppercase tracking-wider block">
                  Suggested VIP Inquiries:
                </span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#101713] hover:bg-[#C49A45] border border-[#C49A45]/20 hover:border-[#C49A45] text-[11px] text-[#FDFBF3] hover:text-[#07120F] font-medium transition-all"
                  >
                    "{p}"
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type a custom inquiry..."
                  className="flex-1 bg-[#101713] border border-[#C49A45]/30 rounded-lg px-3 py-2 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none focus:border-[#C49A45]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={() => handleSend()}
                  className="p-2 bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] rounded-lg transition-colors font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Concierge"
        className="relative group p-4 rounded-full bg-[#07120F] text-[#D8B46A] border border-[#C49A45] shadow-[0_0_25px_rgba(196,154,69,0.3)] hover:shadow-[0_0_35px_rgba(196,154,69,0.5)] transition-all duration-300 flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6 text-[#C49A45] animate-pulse" />
        <span className="hidden sm:inline text-xs font-bold text-[#FDFBF3] uppercase tracking-wider pr-1">
          WhatsApp VIP
        </span>

        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C49A45] border-2 border-[#07120F] rounded-full" />
      </button>

    </div>
  );
};
