import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Award, ChevronRight, MessageCircle, Footprints, Watch } from 'lucide-react';
import { apiService } from '../services/apiService';

const HERO_SLIDES = [
  {
    type: "watches",
    title: "The Royal Skeleton Tourbillon",
    subtitle: "Swiss Haute Horlogerie",
    price: "$18,500",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    tagline: "320 Hours of Geneva Assembly • Flying Tourbillon Movement",
    badge: "Masterpiece Edition",
    ctaLabel: "EXPLORE TIMEPIECES"
  },
  {
    type: "shoes",
    title: "Imperium Wholecut Oxford",
    subtitle: "Neapolitan Leather Guild",
    price: "$1,450",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop",
    tagline: "Hand-Burnished French Full-Grain Calfskin • Single Hide",
    badge: "Atelier Exclusive",
    ctaLabel: "DISCOVER FOOTWEAR"
  },
  {
    type: "watches",
    title: "Aethelgard Onyx Chronograph",
    subtitle: "Limited Heritage 1974",
    price: "$9,800",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
    tagline: "Polished Black Onyx Stone Dial with 18k Rose Gold",
    badge: "Heritage 1974",
    ctaLabel: "EXPLORE CHRONOGRAPHS"
  }
];

export const Hero = ({ onExploreWatches, onExploreShoes, onBespokeClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = HERO_SLIDES[activeSlide];

  const handleWhatsAppVIP = () => {
    const waLink = apiService.generateWhatsAppLink(
      null, 
      `VIP Concierge Inquiry for ${currentSlide.title}`
    );
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FDFBF3]">
      
      {/* Background Ambient Luxury Lighting & Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(196,154,69,0.14)_0%,_rgba(253,251,243,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E6D9BE25_1px,transparent_1px),linear-gradient(to_bottom,#E6D9BE25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Delicate Gold Graphic Lines Accent */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-px bg-gradient-to-r from-transparent via-[#C49A45]/40 to-transparent pointer-events-none" />

      {/* Floating Ambient Golden Orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-[#C49A45]/15 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.25, 0.55, 0.25]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#D8B46A]/15 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        
        {/* Left Column: Asymmetrical Editorial Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-7 text-center lg:text-left"
        >
          {/* Collection Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#07120F] text-[#FDFBF3] border border-[#C49A45]/40 text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A45] animate-pulse" />
            <span className="text-[#D8B46A]">TIMELESS LUXURY — STEP INTO TIME</span>
          </div>

          {/* Main Headline (Exact User Request) */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-[#77746C] tracking-[0.3em] uppercase font-sans">
              LUXORA GENEVA & NEAPOLITAN COLLECTION
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-title font-bold text-[#07120F] leading-[1.1] tracking-tight">
              TIMELESS STYLE. <br />
              <span className="gold-gradient-text">UNMATCHED ELEGANCE.</span>
            </h1>
          </div>

          {/* Subheading (Exact User Request) */}
          <p className="text-base sm:text-lg text-[#77746C] max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
            Discover the art of refined timepieces and exceptional footwear. 
            LUXORA bridges Geneva horological precision and Italian leather atelier mastery.
          </p>

          {/* Call to Actions - Dual Category Focus */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            
            {/* CTA 1: EXPLORE WATCHES */}
            <button
              onClick={onExploreWatches}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#07120F] hover:bg-[#C49A45] text-[#D8B46A] hover:text-[#07120F] border border-[#C49A45] font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 group"
            >
              <Watch className="w-4 h-4 text-[#C49A45] group-hover:text-[#07120F] transition-colors" />
              <span>EXPLORE WATCHES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: DISCOVER SHOES */}
            <button
              onClick={onExploreShoes}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#C49A45] hover:bg-[#07120F] text-[#07120F] hover:text-[#D8B46A] border border-[#C49A45] font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:shadow-[0_0_25px_rgba(196,154,69,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5 group"
            >
              <Footprints className="w-4 h-4 text-[#07120F] group-hover:text-[#C49A45] transition-colors" />
              <span>DISCOVER SHOES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Bespoke Atelier CTA */}
            <button
              onClick={onBespokeClick}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#FFFFFF] hover:bg-[#E6D9BE]/40 text-[#07120F] border border-[#E6D9BE] hover:border-[#C49A45] font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>Bespoke Atelier</span>
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-8 border-t border-[#E6D9BE] grid grid-cols-3 gap-4 text-center lg:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-serif-title font-bold text-[#07120F]">100%</div>
              <div className="text-[11px] text-[#77746C] tracking-widest font-sans uppercase font-medium mt-0.5">Handcrafted</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif-title font-bold text-[#07120F]">320 hrs</div>
              <div className="text-[11px] text-[#77746C] tracking-widest font-sans uppercase font-medium mt-0.5">Geneva Precision</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-serif-title font-bold text-[#07120F]">Lifetime</div>
              <div className="text-[11px] text-[#77746C] tracking-widest font-sans uppercase font-medium mt-0.5">Authenticity</div>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Dramatic Cinematic Frame & Interactive Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative group">
            
            {/* Ambient Golden Border Glow Background */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#C49A45]/50 via-[#D8B46A]/30 to-[#C49A45]/50 opacity-80 blur-xl group-hover:opacity-100 transition duration-1000" />

            <div className="relative rounded-2xl bg-[#07120F] overflow-hidden border border-[#C49A45]/50 p-4 sm:p-6 shadow-2xl">
              
              {/* Product Showcase Stage */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#101713]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.image}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>

                {/* Top Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07120F] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-full bg-[#07120F]/90 backdrop-blur-md border border-[#C49A45] text-[10px] font-bold tracking-widest text-[#D8B46A] uppercase shadow-md">
                  {currentSlide.badge}
                </div>

                {/* Price Tag Pill */}
                <div className="absolute top-3.5 right-3.5 px-4 py-1.5 rounded-full bg-[#C49A45] text-[#07120F] font-bold text-xs font-sans shadow-lg">
                  {currentSlide.price}
                </div>
              </div>

              {/* Product Meta Info */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#D8B46A] uppercase tracking-widest">
                    {currentSlide.subtitle}
                  </span>
                  <span className="text-[10px] text-[#E6D9BE]/70 uppercase tracking-widest font-mono">
                    Nº 0{activeSlide + 1} / 03
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#FDFBF3]">
                  {currentSlide.title}
                </h3>
                
                <p className="text-xs text-[#E6D9BE]/80 font-light leading-relaxed">
                  {currentSlide.tagline}
                </p>
              </div>

              {/* Slider Controls Bar */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#C49A45]/25">
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeSlide === idx ? "w-7 bg-[#C49A45]" : "w-2 bg-[#77746C]/40 hover:bg-[#C49A45]/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D8B46A] hover:text-[#FDFBF3] transition-colors"
                >
                  <span>Next Masterpiece</span>
                  <ChevronRight className="w-4 h-4 text-[#C49A45]" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
