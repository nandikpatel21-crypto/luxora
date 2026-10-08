import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryExperience } from './components/CategoryExperience';
import { ProductShowcase } from './components/ProductShowcase';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { BespokeAtelier } from './components/BespokeAtelier';
import { HeritageSection } from './components/HeritageSection';
import { TrustBar } from './components/TrustBar';
import { InquiryDrawer } from './components/InquiryDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { Footer } from './components/Footer';
import { apiService } from './services/apiService';
import { Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  // Products State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");

  // Cart / Inquiry Bag State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals & Views State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadProducts();
    checkAdmin();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load catalog:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkAdmin = () => {
    setIsAdmin(apiService.isAdminAuthenticated());
  };

  // Cart Actions
  const handleAddToBag = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.selectedSize === product.selectedSize);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedSize === product.selectedSize
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromBag = (index) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearBag = () => {
    setCartItems([]);
  };

  // Wishlist Actions
  const handleToggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (activeCategory === "watches" && p.category !== "watches") return false;
    if (activeCategory === "shoes" && p.category !== "shoes") return false;
    if (activeCategory === "featured" && !p.featured) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name?.toLowerCase().includes(q);
      const matchDesc = p.shortDescription?.toLowerCase().includes(q);
      const matchSub = p.subcategory?.toLowerCase().includes(q);
      const matchSku = p.sku?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchSub && !matchSku) return false;
    }

    // Price filter match
    if (priceFilter === "under-2000" && p.price >= 2000) return false;
    if (priceFilter === "2000-10000" && (p.price < 2000 || p.price > 10000)) return false;
    if (priceFilter === "over-10000" && p.price <= 10000) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    // default 'featured'
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Navigation Scrolling Handlers
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShowcase = () => {
    const el = document.getElementById("curated-showcase");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBespoke = () => {
    const el = document.getElementById("bespoke-atelier");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHeritage = () => {
    const el = document.getElementById("heritage-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const wishlistIds = wishlistItems.map((item) => item.id);

  return (
    <div className="min-h-screen bg-[#FDFBF3] text-[#101713] font-sans selection:bg-[#C49A45] selection:text-[#07120F]">
      
      {/* Refined Luxury Header Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenSearch={() => {
          scrollToCatalog();
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) searchInput.focus();
        }}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistItems.length}
        onOpenAdmin={() => {
          checkAdmin();
          setIsAdminOpen(true);
        }}
        isAdmin={isAdmin}
        onNavigateBespoke={scrollToBespoke}
        onNavigateHeritage={scrollToHeritage}
        onNavigateShowcase={scrollToShowcase}
      />

      {/* Main Content Experience */}
      <main>
        
        {/* WOW-Factor Cinematic Hero Section */}
        <Hero
          onExploreWatches={() => {
            setActiveCategory("watches");
            scrollToCatalog();
          }}
          onExploreShoes={() => {
            setActiveCategory("shoes");
            scrollToCatalog();
          }}
          onBespokeClick={scrollToBespoke}
        />

        {/* Distinctive Category Experience Panels */}
        <CategoryExperience
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* Editorial Product Showcase Sections */}
        <ProductShowcase
          products={products}
          onQuickView={setSelectedProduct}
          onAddToBag={handleAddToBag}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* Complete Masterpiece Catalog Section with Filters */}
        <section id="catalog-section" className="pt-12 pb-20 bg-[#FDFBF3] border-t border-[#E6D9BE]">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <span className="text-xs font-bold text-[#C49A45] uppercase tracking-widest block mb-1">
              THE FULL COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#07120F]">
              Explore The Catalog
            </h2>
          </div>

          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            totalResults={filteredProducts.length}
          />

          {/* Catalog Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-24 text-center space-y-3">
                <div className="w-10 h-10 border-2 border-[#C49A45] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#C49A45] font-serif-title tracking-widest uppercase">
                  Curating LUXORA Masterpieces...
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#FFFFFF] rounded-3xl border border-[#E6D9BE] p-8 space-y-4 shadow-md">
                <Sparkles className="w-8 h-8 text-[#C49A45] mx-auto" />
                <h3 className="text-xl font-serif-title font-bold text-[#07120F]">No Matching Masterpieces Found</h3>
                <p className="text-xs sm:text-sm text-[#77746C] max-w-sm mx-auto font-light">
                  Try adjusting your search keywords or price filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setPriceFilter("all");
                  }}
                  className="px-6 py-3 rounded-full bg-[#C49A45] hover:bg-[#07120F] text-[#07120F] hover:text-[#C49A45] font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToBag={handleAddToBag}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>

        </section>

        {/* Interactive Bespoke Atelier */}
        <BespokeAtelier onAddToBag={handleAddToBag} />

        {/* Heritage & Brand Story Section */}
        <HeritageSection />

        {/* Verified Trust & Brand Confidence Bar */}
        <TrustBar />

      </main>

      {/* Floating WhatsApp VIP Concierge Widget */}
      <WhatsAppConcierge />

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToBag={handleAddToBag}
        />
      )}

      {/* Inquiry Bag Side Drawer */}
      <InquiryDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromBag}
        onUpdateQuantity={() => {}}
        onClearCart={handleClearBag}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToBag={(item) => {
          handleAddToBag(item);
          handleRemoveFromWishlist(item.id);
        }}
        onQuickView={setSelectedProduct}
      />

      {/* Executive Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          checkAdmin();
        }}
        onRefreshProducts={loadProducts}
      />

      {/* Exceptional Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenAdmin={() => {
          checkAdmin();
          setIsAdminOpen(true);
        }}
        onNavigateBespoke={scrollToBespoke}
        onNavigateHeritage={scrollToHeritage}
        onNavigateShowcase={scrollToShowcase}
      />

    </div>
  );
}

export default App;
