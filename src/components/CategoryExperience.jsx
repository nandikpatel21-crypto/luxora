import React from 'react';
import { motion } from 'framer-motion';
import { Watch, Footprints, ArrowRight, Sparkles } from 'lucide-react';

export const CategoryExperience = ({ onSelectCategory }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FDFBF3]">
      
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#07120F] text-[#D8B46A] border border-[#C49A45]/40 text-xs font-bold uppercase tracking-widest shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
          <span>DUAL LUXURY GUILDS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#07120F]">
          Explore The Signature Collections
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C49A45] to-transparent mx-auto mt-2" />
      </div>

      {/* Category Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        
        {/* Panel 1: WATCHES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={() => onSelectCategory("watches")}
          className="group relative h-[450px] sm:h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-[#C49A45]/40 shadow-xl"
        >
          {/* Background Photography */}
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
            alt="LUXORA Geneva Timepieces Collection"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07120F] via-[#07120F]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10 text-[#FDFBF3]">
            
            {/* Top Tag */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07120F]/90 border border-[#C49A45] text-[10px] font-bold tracking-widest text-[#D8B46A] uppercase">
                <Watch className="w-3.5 h-3.5 text-[#C49A45]" />
                <span>GENEVA HOROLOGY</span>
              </div>
              <span className="text-xs font-mono text-[#D8B46A]">COLLECTION Nº 01</span>
            </div>

            {/* Bottom Meta */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF3]">
                  TIMEPIECES
                </h3>
                <p className="text-sm sm:text-base font-serif-title italic text-[#D8B46A]">
                  "Every Second, A Statement."
                </p>
              </div>

              <p className="text-xs text-[#E6D9BE]/90 font-light max-w-md leading-relaxed">
                Hand-built flying tourbillons, aventurine moonphase perpetuals, and onyx stone dials engineered over 300+ Geneva assembly hours.
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C49A45] text-[#07120F] font-bold text-xs uppercase tracking-wider group-hover:bg-[#FDFBF3] transition-colors duration-300 shadow-md">
                  <span>DISCOVER TIMEPIECES</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Panel 2: SHOES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onClick={() => onSelectCategory("shoes")}
          className="group relative h-[450px] sm:h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-[#C49A45]/40 shadow-xl"
        >
          {/* Background Photography */}
          <img
            src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop"
            alt="LUXORA Neapolitan Footwear Collection"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07120F] via-[#07120F]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10 text-[#FDFBF3]">
            
            {/* Top Tag */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07120F]/90 border border-[#C49A45] text-[10px] font-bold tracking-widest text-[#D8B46A] uppercase">
                <Footprints className="w-3.5 h-3.5 text-[#C49A45]" />
                <span>NEAPOLITAN FOOTWEAR</span>
              </div>
              <span className="text-xs font-mono text-[#D8B46A]">COLLECTION Nº 02</span>
            </div>

            {/* Bottom Meta */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF3]">
                  FOOTWEAR
                </h3>
                <p className="text-sm sm:text-base font-serif-title italic text-[#D8B46A]">
                  "Walk Beyond Ordinary."
                </p>
              </div>

              <p className="text-xs text-[#E6D9BE]/90 font-light max-w-md leading-relaxed">
                Seamless single-hide wholecut oxfords, hand-painted smoked espresso patinas, Goodyear welted soles, and silk-lined velvet slippers.
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#07120F] text-[#D8B46A] border border-[#C49A45] font-bold text-xs uppercase tracking-wider group-hover:bg-[#C49A45] group-hover:text-[#07120F] transition-colors duration-300 shadow-md">
                  <span>EXPLORE FOOTWEAR</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
