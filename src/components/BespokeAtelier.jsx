import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Watch, Footprints, MessageCircle, ShieldCheck, Check, RotateCcw } from 'lucide-react';
import { apiService } from '../services/apiService';

export const BespokeAtelier = ({ onAddToBag }) => {
  const [activeTab, setActiveTab] = useState("watch"); // "watch" | "shoe"

  // Watch Configuration State
  const [watchCase, setWatchCase] = useState("18k Rose Gold");
  const [watchDial, setWatchDial] = useState("Royal Skeleton Tourbillon");
  const [watchStrap, setWatchStrap] = useState("Mississippi Alligator Leather");
  const [watchEngraving, setWatchEngraving] = useState("LUXORA 2026");

  // Shoe Configuration State
  const [shoePatina, setShoePatina] = useState("Smoked Espresso");
  const [shoeSole, setShoeSole] = useState("Goodyear Welted Italian Leather");
  const [shoeSize, setShoeSize] = useState("EU 42");
  const [shoeMonogram, setShoeMonogram] = useState("L.V.");

  // Image Mapping based on choices
  const watchImages = {
    "18k Rose Gold": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    "Platinum 950": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    "Brushed Titanium": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
    "Obsidian Ceramic": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop"
  };

  const shoeImages = {
    "Smoked Espresso": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop",
    "Cognac Amber": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop",
    "Midnight Black": "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    "Emerald Patina": "https://images.unsplash.com/photo-1582845844300-999d39731481?q=80&w=1200&auto=format&fit=crop"
  };

  const currentPreviewImage = activeTab === "watch" 
    ? watchImages[watchCase] 
    : shoeImages[shoePatina];

  const estimatedPrice = activeTab === "watch" ? 22500 : 1850;

  const handleWhatsAppBespoke = () => {
    const bespokeDetails = activeTab === "watch"
      ? `Bespoke Timepiece Request:\n- Case: ${watchCase}\n- Dial: ${watchDial}\n- Strap: ${watchStrap}\n- Case Engraving: ${watchEngraving}`
      : `Bespoke Footwear Request:\n- Patina Finish: ${shoePatina}\n- Sole Construction: ${shoeSole}\n- Size: ${shoeSize}\n- Monogram Initials: ${shoeMonogram}`;

    const waLink = apiService.generateWhatsAppLink(
      { name: `LUXORA Bespoke ${activeTab === "watch" ? "Watch" : "Footwear"} Atelier`, price: estimatedPrice, sku: `BESPOKE-${activeTab.toUpperCase()}` },
      bespokeDetails
    );
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="bespoke-atelier" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FDFBF3]">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#07120F] text-[#D8B46A] border border-[#C49A45]/40 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
          <span>LUXORA Interactive Atelier</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#07120F]">
          Configure Your Bespoke Masterpiece
        </h2>
        <p className="text-xs sm:text-sm text-[#77746C] max-w-xl mx-auto font-light">
          Personalize every nuance of your timepiece or footwear. Created individually by our Geneva watchmakers and Neapolitan shoemakers.
        </p>

        {/* Switcher Tabs */}
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => setActiveTab("watch")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
              activeTab === "watch"
                ? "bg-[#C49A45] text-[#07120F] border-[#C49A45] shadow-md scale-105"
                : "bg-[#FFFFFF] text-[#07120F] border-[#E6D9BE] hover:border-[#C49A45]"
            }`}
          >
            <Watch className={`w-4 h-4 ${activeTab === "watch" ? "text-[#07120F]" : "text-[#C49A45]"}`} />
            <span>Timepiece Atelier</span>
          </button>

          <button
            onClick={() => setActiveTab("shoe")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
              activeTab === "shoe"
                ? "bg-[#C49A45] text-[#07120F] border-[#C49A45] shadow-md scale-105"
                : "bg-[#FFFFFF] text-[#07120F] border-[#E6D9BE] hover:border-[#C49A45]"
            }`}
          >
            <Footprints className={`w-4 h-4 ${activeTab === "shoe" ? "text-[#07120F]" : "text-[#07120F]"}`} />
            <span>Footwear Atelier</span>
          </button>
        </div>
      </div>

      {/* Atelier Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#07120F] border border-[#C49A45]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Left Column: Visual Preview Stage */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#101713] border border-[#C49A45]/40">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPreviewImage}
                src={currentPreviewImage}
                alt="Bespoke Preview"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {/* Live Watermark Overlay */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-lg bg-[#07120F]/90 backdrop-blur-md border border-[#C49A45]/60 text-[10px] font-mono text-[#D8B46A]">
              Live Preview: {activeTab === "watch" ? `${watchCase} / ${watchStrap}` : `${shoePatina} / ${shoeMonogram}`}
            </div>

            <div className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-[#C49A45] text-[#07120F] font-bold font-sans text-sm shadow-xl">
              Estimated: ${estimatedPrice.toLocaleString()}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#E6D9BE]/80 font-sans px-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
              <span>Includes Certificate of Bespoke Authenticity</span>
            </span>
            <span className="text-[#D8B46A] font-semibold">Production Time: 4-6 Weeks</span>
          </div>
        </div>

        {/* Right Column: Customizer Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          {activeTab === "watch" ? (
            /* Watch Atelier Form */
            <div className="space-y-5">
              
              {/* Case Material */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Case Material & Finish:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["18k Rose Gold", "Platinum 950", "Brushed Titanium", "Obsidian Ceramic"].map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setWatchCase(mat)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                        watchCase === mat
                          ? "bg-[#C49A45] border-[#C49A45] text-[#07120F] font-bold"
                          : "bg-[#101713] border-[#C49A45]/20 text-[#FDFBF3] hover:border-[#C49A45]"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dial Finish */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Dial Architecture:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Royal Skeleton Tourbillon", "Meteorite Stone Dial", "Deep Onyx Stone", "Sunray Champagne"].map((dial) => (
                    <button
                      key={dial}
                      onClick={() => setWatchDial(dial)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                        watchDial === dial
                          ? "bg-[#C49A45] border-[#C49A45] text-[#07120F] font-bold"
                          : "bg-[#101713] border-[#C49A45]/20 text-[#FDFBF3] hover:border-[#C49A45]"
                      }`}
                    >
                      {dial}
                    </button>
                  ))}
                </div>
              </div>

              {/* Strap Choice */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Bespoke Strap Leather:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Mississippi Alligator Leather", "French Box Calfskin", "Nubuck Suede", "Milanese Gold Mesh"].map((strap) => (
                    <button
                      key={strap}
                      onClick={() => setWatchStrap(strap)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                        watchStrap === strap
                          ? "bg-[#C49A45] border-[#C49A45] text-[#07120F] font-bold"
                          : "bg-[#101713] border-[#C49A45]/20 text-[#FDFBF3] hover:border-[#C49A45]"
                      }`}
                    >
                      {strap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engraving */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Caseback Laser Engraving:
                </label>
                <input
                  type="text"
                  value={watchEngraving}
                  onChange={(e) => setWatchEngraving(e.target.value)}
                  placeholder="e.g. Family Crest or Name"
                  className="w-full bg-[#101713] border border-[#C49A45]/30 focus:border-[#C49A45] rounded-xl px-3.5 py-2.5 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none"
                />
              </div>

            </div>
          ) : (
            /* Shoe Atelier Form */
            <div className="space-y-5">
              
              {/* Patina Finish */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Hand-Painted Patina Finish:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Smoked Espresso", "Cognac Amber", "Midnight Black", "Emerald Patina"].map((pat) => (
                    <button
                      key={pat}
                      onClick={() => setShoePatina(pat)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                        shoePatina === pat
                          ? "bg-[#C49A45] border-[#C49A45] text-[#07120F] font-bold"
                          : "bg-[#101713] border-[#C49A45]/20 text-[#FDFBF3] hover:border-[#C49A45]"
                      }`}
                    >
                      {pat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sole Construction */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Sole Crafting:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Goodyear Welted Italian Leather", "Blake Rapid Stitched Sole", "Rubber Commando Sole", "Thin Venetian Dress Sole"].map((sole) => (
                    <button
                      key={sole}
                      onClick={() => setShoeSole(sole)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                        shoeSole === sole
                          ? "bg-[#C49A45] border-[#C49A45] text-[#07120F] font-bold"
                          : "bg-[#101713] border-[#C49A45]/20 text-[#FDFBF3] hover:border-[#C49A45]"
                      }`}
                    >
                      {sole}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shoe Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setShoeSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        shoeSize === sz
                          ? "bg-[#C49A45] text-[#07120F] font-bold"
                          : "bg-[#101713] text-[#E6D9BE] border border-[#C49A45]/20 hover:text-white"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monogram */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#D8B46A] uppercase tracking-wider">
                  Brass Heel Monogram Initials:
                </label>
                <input
                  type="text"
                  value={shoeMonogram}
                  onChange={(e) => setShoeMonogram(e.target.value)}
                  placeholder="e.g. 'A.B.'"
                  className="w-full bg-[#101713] border border-[#C49A45]/30 focus:border-[#C49A45] rounded-xl px-3.5 py-2.5 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none"
                />
              </div>

            </div>
          )}

          {/* Direct WhatsApp Concierge Action */}
          <div className="pt-2">
            <button
              onClick={handleWhatsAppBespoke}
              className="w-full py-4 px-6 rounded-xl bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-[0_0_25px_rgba(196,154,69,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-[#07120F]" />
              <span>Submit Bespoke Inquiry via WhatsApp</span>
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
