import { INITIAL_PRODUCTS, WHATSAPP_NUMBER } from "../data/initialProducts";

const PRODUCTS_KEY = "luxora_products_v1";
const INQUIRIES_KEY = "luxora_inquiries_v1";
const ADMIN_AUTH_KEY = "luxora_admin_auth_v1";

// Helper to simulate tiny delay for realistic asynchronous API responses
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // --- PRODUCTS CRUD ---
  async getProducts() {
    await delay();
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (!stored) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error reading products:", err);
      return INITIAL_PRODUCTS;
    }
  },

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id) || null;
  },

  async createProduct(productData) {
    await delay();
    const products = await this.getProducts();
    const newProduct = {
      ...productData,
      id: `lux-custom-${Date.now()}`,
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 1,
      sku: productData.sku || `LX-GEN-${Math.floor(1000 + Math.random() * 9000)}`,
      gallery: productData.gallery?.length ? productData.gallery : [productData.image],
      sizes: productData.sizes || (productData.category === "shoes" ? ["EU 41", "EU 42", "EU 43"] : ["Standard Case"]),
      specs: productData.specs || { "Craftsmanship": "Handmade Luxury Edition" }
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    return newProduct;
  },

  async updateProduct(id, productData) {
    await delay();
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");

    const updatedProduct = { ...products[index], ...productData };
    products[index] = updatedProduct;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return updatedProduct;
  },

  async deleteProduct(id) {
    await delay();
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    return true;
  },

  async resetProducts() {
    await delay();
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  },

  // --- INQUIRIES ---
  async getInquiries() {
    await delay();
    try {
      const stored = localStorage.getItem(INQUIRIES_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch (err) {
      return [];
    }
  },

  async createInquiry(inquiryData) {
    await delay();
    const inquiries = await this.getInquiries();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "New", // New, Contacted, Fulfilled
      ...inquiryData
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return newInquiry;
  },

  async updateInquiryStatus(id, status) {
    await delay();
    const inquiries = await this.getInquiries();
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- ADMIN AUTHENTICATION ---
  adminLogin(password) {
    // Accepts 'admin', 'admin123', or 'luxora2026'
    const isValid = password === "admin" || password === "admin123" || password === "luxora2026";
    if (isValid) {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      return { success: true };
    }
    return { success: false, message: "Invalid Admin Passcode" };
  },

  isAdminAuthenticated() {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  },

  adminLogout() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    return true;
  },

  // --- WHATSAPP HELPER ---
  generateWhatsAppLink(itemOrCart, customNote = "") {
    let text = "";
    if (Array.isArray(itemOrCart)) {
      text = `Greetings LUXORA Concierge,\n\nI would like to inquire about the following bespoke selection:\n\n`;
      itemOrCart.forEach((item, index) => {
        text += `${index + 1}. *${item.name}*\n   SKU: ${item.sku}\n   Price: $${item.price.toLocaleString()}\n   Selected Size: ${item.selectedSize || 'Standard'}\n\n`;
      });
      const total = itemOrCart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
      text += `*Total Estimated Value:* $${total.toLocaleString()}\n`;
      if (customNote) {
        text += `\n*Bespoke Note / Engraving:* ${customNote}\n`;
      }
    } else if (itemOrCart) {
      text = `Greetings LUXORA Concierge,\n\nI am interested in acquiring the *${itemOrCart.name}* (SKU: ${itemOrCart.sku || 'LX-LUX'}).\nListed Price: $${itemOrCart.price.toLocaleString()}.\nSelected Option: ${itemOrCart.selectedSize || 'Standard Case/Fit'}.\n`;
      if (customNote) {
        text += `Customization Request: ${customNote}\n`;
      }
    } else {
      text = `Greetings LUXORA Concierge, I would like to make a VIP inquiry regarding your collection.`;
    }

    const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }
};
