import React from 'react';
import { ShieldCheck, Truck, Clock, Award, Lock, Sparkles } from 'lucide-react';

export const TrustBar = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Certificate of Origin",
      desc: "Every timepiece & pair includes a certified origin document."
    },
    {
      icon: Truck,
      title: "Armored Worldwide Shipping",
      desc: "Dispatched in insured, climate-controlled luxury packaging."
    },
    {
      icon: Clock,
      title: "24/7 VIP Concierge",
      desc: "Direct access to horological and leather specialists."
    },
    {
      icon: Award,
      title: "Hand-Crafted Mastery",
      desc: "Geneva watch assembly & Neapolitan hand-patinated hide."
    }
  ];

  return (
    <section className="py-12 bg-[#07120F] text-[#FDFBF3] border-y border-[#C49A45]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#101713] border border-[#C49A45]/20 hover:border-[#C49A45] transition-all">
                <div className="p-3 rounded-xl bg-[#07120F] border border-[#C49A45]/40 text-[#C49A45] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-serif-title font-bold text-[#FDFBF3]">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#E6D9BE]/70 font-light leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
