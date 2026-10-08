import React, { useState, useEffect } from 'react';
import { LuxoraLogo } from './LuxoraLogo';
import { Search, ShoppingBag, ShieldCheck, Menu, X, Sparkles, Heart, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenCart,
  cartCount,
  onOpenWishlist,
  wishlistCount = 0,
  onOpenAdmin,
  isAdmin,
  onNavigateBespoke,
  onNavigateHeritage,
  onNavigateShowcase
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "All Masterpieces", category: "all" },
    { label: "Timepieces", category: "watches" },
    { label: "Footwear", category: "shoes" },
    { label: "Curated Showcase", action: onNavigateShowcase },
    { label: "Bespoke Atelier", action: onNavigateBespoke, badge: "Custom" },
    { label: "Heritage", action: onNavigateHeritage },
  ];

  const handleLinkClick = (link) => {
    if (link.action) {
      link.action();
    } else if (link.category) {
      onSelectCategory(link.category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      
      {/* Top Luxury Announcement Strip */}
      <div className="bg-[#07120F] text-[#E6D9BE] border-b border-[#C49A45]/30 py-1.5 px-4 text-[10px] sm:text-xs font-medium tracking-widest uppercase flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[#D8B46A]">
            <Clock className="w-3 h-3 text-[#C49A45]" />
            <span>GENEVA & NEAPOLITAN ATELIER GUILD</span>
          </div>

          <div className="mx-auto md:mx-0 flex items-center gap-2 font-light">
            <Sparkles className="w-3 h-3 text-[#C49A45] animate-pulse" />
            <span className="text-[#FDFBF3]">COMPLIMENTARY WORLDWIDE ARMORED SHIPPING ON ALL INQUIRIES</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[#D8B46A]">
            <span>24/7 VIP CONCIERGE</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className={`transition-all duration-500 ${
        scrolled 
          ? "bg-[#FDFBF3]/95 backdrop-blur-md border-b border-[#E6D9BE] py-3.5 shadow-md" 
          : "bg-gradient-to-b from-[#FDFBF3] via-[#FDFBF3]/90 to-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div onClick={() => onSelectCategory('all')}>
            <LuxoraLogo darkBg={false} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, idx) => {
              const isActive = link.category && activeCategory === link.category;
              return (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link)}
                  className={`group relative px-3.5 py-2 text-xs xl:text-sm font-medium tracking-wider transition-colors duration-300 rounded-full ${
                    isActive ? "text-[#C49A45] font-semibold" : "text-[#101713] hover:text-[#C49A45]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-bold tracking-normal uppercase bg-[#C49A45] text-[#07120F] rounded-full shadow-xs">
                        {link.badge}
                      </span>
                    )}
                  </span>

                  {/* Gold Underline Hover Animation */}
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-[#C49A45] transition-all duration-300 transform origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog"
              title="Search Timepieces & Footwear"
              className="p-2.5 text-[#07120F] hover:text-[#C49A45] hover:bg-[#E6D9BE]/30 rounded-full transition-all duration-300 border border-transparent hover:border-[#E6D9BE]"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="Saved Masterpieces"
              title="View Saved Wishlist"
              className="relative p-2.5 text-[#07120F] hover:text-[#C49A45] hover:bg-[#E6D9BE]/30 rounded-full transition-all duration-300 border border-transparent hover:border-[#E6D9BE]"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlistCount > 0 ? "fill-[#C49A45] text-[#C49A45]" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-[#C49A45] text-[#07120F] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Inquiry Bag / Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Inquiry Bag"
              className="relative p-2 sm:px-4 sm:py-2.5 text-[#07120F] hover:text-[#C49A45] rounded-full transition-all duration-300 border border-[#E6D9BE] bg-[#FFFFFF] hover:border-[#C49A45] flex items-center gap-2 shadow-xs hover:shadow-md"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#C49A45]" />
              <span className="hidden sm:inline text-xs font-semibold text-[#07120F] tracking-wide">Inquiry Bag</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-[#C49A45] text-[#07120F] rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Admin Panel Entry */}
            <button
              onClick={onOpenAdmin}
              aria-label="Executive Admin Dashboard"
              title="Executive Admin Access"
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${
                isAdmin 
                  ? "bg-[#C49A45] text-[#07120F] border-[#C49A45] shadow-xs" 
                  : "bg-[#07120F] text-[#FDFBF3] border-[#C49A45]/40 hover:bg-[#C49A45] hover:text-[#07120F]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>{isAdmin ? "Admin Active" : "Admin"}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2.5 text-[#07120F] hover:text-[#C49A45] rounded-xl bg-[#FFFFFF] border border-[#E6D9BE]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-b border-[#E6D9BE] bg-[#FDFBF3]/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-lg"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className="w-full text-left px-4 py-3 text-sm font-medium tracking-wide text-[#07120F] hover:text-[#C49A45] hover:bg-[#FFFFFF] rounded-xl flex items-center justify-between border border-transparent hover:border-[#E6D9BE] transition-all"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] bg-[#C49A45] text-[#07120F] rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}

                <div className="pt-3 border-t border-[#E6D9BE] flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-xs font-semibold text-[#07120F] px-4 py-3 bg-[#FFFFFF] rounded-xl border border-[#E6D9BE]"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#C49A45]" />
                      <span>Saved Wishlist</span>
                    </span>
                    <span className="font-bold text-[#C49A45]">{wishlistCount} Items</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 text-xs font-semibold text-[#FDFBF3] px-4 py-3 bg-[#07120F] rounded-xl border border-[#C49A45]/40"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
                    <span>{isAdmin ? "Admin Portal (Active)" : "Access Admin Portal"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  );
};
