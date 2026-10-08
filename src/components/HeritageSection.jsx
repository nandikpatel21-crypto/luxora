import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Watch, Footprints, Sparkles, Check } from 'lucide-react';

export const HeritageSection = () => {
  const milestones = [
    {
      year: "1974",
      title: "Geneva Atelier Founded",
      desc: "First hand-built skeleton chronograph produced in Geneva, establishing the tradition of flying tourbillon engineering."
    },
    {
      year: "1988",
      title: "Neapolitan Leather Guild",
      desc: "Partnership established with Master Artisan Giuseppe in Florence for hand-painted French full-grain calfskin footwear."
    },
    {
      year: "2012",
      title: "Patent LX-901 Tourbillon",
      desc: "Invention of the ultra-light titanium cage tourbillon with 72-hour power reserve."
    },
    {
      year: "2026",
      title: "LUXORA Step Into Time",
      desc: "Unifying Swiss horological mastery and Italian bespoke footwear under one global luxury house."
    }
  ];

  return (
    <section id="heritage-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E6D9BE] bg-[#FDFBF3]">
      <div className="space-y-20">
        
        {/* ===================================================== */}
        {/* 1. LUXURY BRAND STORY SECTION (Exact User Requirement) */}
        {/* ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Lifestyle Image Stage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative group rounded-3xl overflow-hidden border border-[#C49A45]/40 shadow-2xl bg-[#07120F]">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"
                alt="LUXORA Craftsmanship Lifestyle"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07120F] via-transparent to-transparent opacity-75" />

              {/* Small Gold Accent Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#07120F]/90 backdrop-blur-md border border-[#C49A45]/50 flex items-center justify-between text-[#FDFBF3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C49A45] flex items-center justify-center text-[#07120F]">
                    <Sparkles className="w-5 h-5 fill-[#07120F]" />
                  </div>
                  <div>
                    <div className="text-xs font-serif-title font-bold text-[#FDFBF3]">Signature Philosophy</div>
                    <div className="text-[10px] text-[#D8B46A] uppercase tracking-widest font-mono">GENEVA • FLORENCE</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#C49A45]">EST. 1974</span>
                </div>
              </div>
            </div>

            {/* Background Decorative Gold Frame Line */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#C49A45]/30 rounded-3xl -z-10 hidden sm:block pointer-events-none" />
          </motion.div>

          {/* Right Column: Editorial Brand Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Small Gold Accent Bar */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#07120F] border border-[#C49A45]/40 text-[#D8B46A] text-xs font-bold uppercase tracking-widest shadow-xs">
              <Feather className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>THE LUXORA PHILOSOPHY</span>
            </div>

            {/* Exact Headline Required by User */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#07120F] leading-tight tracking-tight">
              MORE THAN ACCESSORIES. <br />
              <span className="gold-gradient-text">A STATEMENT OF YOU.</span>
            </h2>

            {/* Thin Metallic Gold Line Accent */}
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#C49A45] to-transparent mx-auto lg:mx-0" />

            {/* Exact Supporting Text Required by User */}
            <p className="text-sm sm:text-base text-[#101713] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              "From the precision of every second to the confidence in every step, LUXORA celebrates personal style through thoughtfully selected watches and footwear."
            </p>

            <p className="text-xs text-[#77746C] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              We curate only masterwork timepieces with flying tourbillons and hand-patinated Italian wholecut oxfords. Every acquisition represents a lasting testament to personal achievement.
            </p>

            {/* Key Pillars */}
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-[#07120F] max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#C49A45]/20 flex items-center justify-center text-[#C49A45]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Swiss Horological Assembly</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#C49A45]/20 flex items-center justify-center text-[#C49A45]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Single-Hide Calfskin Leather</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#C49A45]/20 flex items-center justify-center text-[#C49A45]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Hand-Beveled Oak Soles</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#C49A45]/20 flex items-center justify-center text-[#C49A45]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>24/7 VIP Client Concierge</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* ===================================================== */}
        {/* 2. TIMELINE & MILESTONES */}
        {/* ===================================================== */}
        <div className="pt-12 border-t border-[#E6D9BE] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C49A45] uppercase tracking-widest font-sans block">
                OUR HERITAGE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#07120F]">
                A Legacy Built on Uncompromising Standards
              </h3>
            </div>

            <div className="space-y-4">
              {milestones.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6D9BE] hover:border-[#C49A45] transition-all duration-300 shadow-xs"
                >
                  <span className="px-3.5 py-1 bg-[#07120F] text-[#D8B46A] rounded-xl text-xs font-bold font-mono shadow-xs">
                    {m.year}
                  </span>
                  <div>
                    <h4 className="text-sm font-serif-title font-bold text-[#07120F]">
                      {m.title}
                    </h4>
                    <p className="text-xs text-[#77746C] font-light mt-0.5 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Artisan Image Montage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E6D9BE] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"
                  alt="Watchmaker Craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07120F] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-[#D8B46A] font-serif-title font-bold">
                  Geneva Horology Assembly
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E6D9BE] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop"
                  alt="Shoemaker Patina"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07120F] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-[#D8B46A] font-serif-title font-bold">
                  Italian Hand-Patina Guild
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
