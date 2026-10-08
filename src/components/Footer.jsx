import React from 'react';
import { LuxoraLogo } from './LuxoraLogo';
import { ShieldCheck, Truck, Clock, Send, Sparkles, Lock, MessageCircle, Globe } from 'lucide-react';

export const Footer = ({ onSelectCategory, onOpenAdmin, onNavigateBespoke, onNavigateHeritage, onNavigateShowcase }) => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to the LUXORA Private Salon Digest. An invitation has been dispatched to your inbox.");
  };

  return (
    <footer className="bg-[#07120F] border-t border-[#C49A45]/40 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-[#E6D9BE]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section: Brand Identity & Private Salon Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-[#C49A45]/25">
          
          {/* Brand Intro */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <LuxoraLogo darkBg={true} />
            <p className="text-xs sm:text-sm text-[#E6D9BE]/80 font-light max-w-lg pt-1 leading-relaxed">
              Geneva Haute Horlogerie & Neapolitan Leather Guild. Crafted for those who appreciate horological precision and bespoke footwear artistry. Step Into Time.
            </p>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#D8B46A]">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C49A45]" />
                <span>Global Flagships: Geneva • Milan • New York • Dubai</span>
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#101713] p-6 sm:p-8 rounded-3xl border border-[#C49A45]/35 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-serif-title font-bold text-[#D8B46A] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#C49A45]" />
              <span>LUXORA Private Salon Digest</span>
            </div>
            <p className="text-xs text-[#E6D9BE]/80 font-light leading-relaxed">
              Receive confidential invitations to limited flying tourbillon allocations and private trunk shows.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                placeholder="Enter your VIP email address..."
                className="flex-1 bg-[#07120F] border border-[#C49A45]/30 rounded-xl px-4 py-3 text-xs text-[#FDFBF3] placeholder-[#77746C] focus:outline-none focus:border-[#C49A45]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                Join Digest
              </button>
            </form>
          </div>

        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          {/* Column 1: Collections */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif-title font-bold text-[#D8B46A] uppercase tracking-widest">
              Collections
            </h4>
            <div className="w-10 h-0.5 bg-[#C49A45]/50" />
            <ul className="space-y-2.5 font-light">
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-[#C49A45] transition-colors">
                  All Masterpieces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('watches')} className="hover:text-[#C49A45] transition-colors">
                  Geneva Timepieces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('shoes')} className="hover:text-[#C49A45] transition-colors">
                  Neapolitan Footwear
                </button>
              </li>
              <li>
                <button onClick={onNavigateShowcase} className="hover:text-[#C49A45] transition-colors">
                  Curated Editorial Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Atelier & Guild */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif-title font-bold text-[#D8B46A] uppercase tracking-widest">
              Atelier & Guild
            </h4>
            <div className="w-10 h-0.5 bg-[#C49A45]/50" />
            <ul className="space-y-2.5 font-light">
              <li>
                <button onClick={onNavigateBespoke} className="hover:text-[#C49A45] transition-colors">
                  Bespoke Customizer Studio
                </button>
              </li>
              <li>
                <button onClick={onNavigateHeritage} className="hover:text-[#C49A45] transition-colors">
                  Heritage & Craftsmanship
                </button>
              </li>
              <li>
                <span className="text-[#77746C] cursor-default">Flying Tourbillon Specs</span>
              </li>
              <li>
                <span className="text-[#77746C] cursor-default">Goodyear Welted Guide</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif-title font-bold text-[#D8B46A] uppercase tracking-widest">
              Client Concierge
            </h4>
            <div className="w-10 h-0.5 bg-[#C49A45]/50" />
            <ul className="space-y-2.5 font-light">
              <li><span className="text-[#E6D9BE]/90">24/7 WhatsApp VIP Concierge</span></li>
              <li><span className="text-[#E6D9BE]/90">Armored Express Shipping</span></li>
              <li><span className="text-[#E6D9BE]/90">Certificate of Origin</span></li>
              <li><span className="text-[#E6D9BE]/90">Lifetime Authenticity Guarantee</span></li>
            </ul>
          </div>

          {/* Column 4: Executive Administration */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif-title font-bold text-[#D8B46A] uppercase tracking-widest">
              Administration
            </h4>
            <div className="w-10 h-0.5 bg-[#C49A45]/50" />
            <ul className="space-y-2.5 font-light">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-[#D8B46A] hover:text-[#FDFBF3] transition-colors font-semibold"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>Executive Admin Portal</span>
                </button>
              </li>
              <li><span className="text-[#77746C]">Confidentiality Policy</span></li>
              <li><span className="text-[#77746C]">Terms of Acquisition</span></li>
            </ul>
          </div>

        </div>

        {/* Thin Gold Divider Line */}
        <div className="gold-divider" />

        {/* Bottom Rights Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77746C] gap-4">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} LUXORA Geneva & Florence. All rights reserved. Step Into Time.
          </div>

          <div className="flex items-center gap-6 text-[#D8B46A]">
            <span>Geneva</span>
            <span>•</span>
            <span>Milan</span>
            <span>•</span>
            <span>New York</span>
            <span>•</span>
            <span>Tokyo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
