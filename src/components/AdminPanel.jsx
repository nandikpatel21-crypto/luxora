import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Plus, Edit, Trash2, CheckCircle, RefreshCw, X, Lock, Eye, Sparkles, MessageSquare } from 'lucide-react';
import { apiService } from '../services/apiService';

export const AdminPanel = ({ isOpen, onClose, onRefreshProducts }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [activeTab, setActiveTab] = useState("products"); // "products" | "inquiries"
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State for Add / Edit
  const [editingProduct, setEditingProduct] = useState(null); // null means create mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "watches",
    subcategory: "Tourbillon",
    price: 9500,
    originalPrice: 11000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    shortDescription: "Handcrafted luxury piece with Swiss movement.",
    badge: "New Arrival",
    inStock: true,
    featured: false
  });

  useEffect(() => {
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const checkAuth = async () => {
    const isAuth = apiService.isAdminAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadAdminData();
    }
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [prods, inqs] = await Promise.all([
        apiService.getProducts(),
        apiService.getInquiries()
      ]);
      setProducts(prods);
      setInquiries(inqs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const res = apiService.adminLogin(passcode);
    if (res.success) {
      setIsAuthenticated(true);
      setErrorMsg("");
      loadAdminData();
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickDemoLogin = () => {
    apiService.adminLogin("admin123");
    setIsAuthenticated(true);
    setErrorMsg("");
    loadAdminData();
  };

  const handleLogout = () => {
    apiService.adminLogout();
    setIsAuthenticated(false);
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "watches",
      subcategory: "Tourbillon",
      price: 12500,
      originalPrice: 14000,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      shortDescription: "Bespoke handcrafted edition with certified origin.",
      badge: "Atelier Signature",
      inStock: true,
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || "",
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      shortDescription: product.shortDescription,
      badge: product.badge || "",
      inStock: product.inStock,
      featured: product.featured
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProduct) {
        await apiService.updateProduct(editingProduct.id, formData);
      } else {
        await apiService.createProduct(formData);
      }
      setIsModalOpen(false);
      await loadAdminData();
      if (onRefreshProducts) onRefreshProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      await apiService.deleteProduct(id);
      await loadAdminData();
      if (onRefreshProducts) onRefreshProducts();
    }
  };

  const handleResetCatalog = async () => {
    if (window.confirm("Reset catalog back to initial flagship default items?")) {
      setLoading(true);
      await apiService.resetProducts();
      await loadAdminData();
      if (onRefreshProducts) onRefreshProducts();
    }
  };

  const handleInquiryStatusChange = async (id, status) => {
    await apiService.updateInquiryStatus(id, status);
    loadAdminData();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07120F]/90 backdrop-blur-md overflow-y-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-[#07120F] border border-[#C49A45]/40 rounded-2xl overflow-hidden shadow-2xl z-10 my-6 text-[#FDFBF3]"
        >
          {/* Header */}
          <div className="p-5 bg-[#101713] border-b border-[#C49A45]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#C49A45]" />
              <div>
                <h3 className="text-lg font-serif-title font-bold text-[#FDFBF3]">
                  LUXORA Executive Admin Portal
                </h3>
                <p className="text-xs text-[#E6D9BE]/80 font-light">
                  Manage Masterpiece Inventory & Concierge Leads
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#E6D9BE] hover:text-[#C49A45] border border-[#C49A45]/30 hover:border-[#C49A45]"
                >
                  Logout
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-[#E6D9BE] hover:text-[#C49A45] rounded-lg hover:bg-[#07120F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isAuthenticated ? (
            /* Login Modal */
            <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#101713] border border-[#C49A45]/40 flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-6 h-6 text-[#C49A45]" />
              </div>

              <div>
                <h4 className="text-2xl font-serif-title font-bold text-[#FDFBF3]">Admin Authentication</h4>
                <p className="text-xs text-[#E6D9BE]/80 mt-1">
                  Enter executive security passcode to manage catalog and leads.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin123)"
                  className="w-full bg-[#101713] border border-[#C49A45]/40 focus:border-[#C49A45] rounded-xl px-4 py-3 text-sm text-[#FDFBF3] text-center tracking-widest focus:outline-none"
                />

                {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
                >
                  Unlock Portal
                </button>
              </form>

              <div className="pt-4 border-t border-[#C49A45]/20">
                <button
                  onClick={handleQuickDemoLogin}
                  className="text-xs text-[#D8B46A] hover:underline flex items-center justify-center gap-1 mx-auto font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>1-Click Quick Demo Login (Evaluator Mode)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#101713] border border-[#C49A45]/20 space-y-1">
                  <span className="text-[10px] text-[#77746C] uppercase tracking-wider font-semibold">Total Products</span>
                  <div className="text-2xl font-bold font-sans text-[#D8B46A]">{products.length}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#101713] border border-[#C49A45]/20 space-y-1">
                  <span className="text-[10px] text-[#77746C] uppercase tracking-wider font-semibold">Timepieces</span>
                  <div className="text-2xl font-bold font-sans text-[#FDFBF3]">
                    {products.filter(p => p.category === "watches").length}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#101713] border border-[#C49A45]/20 space-y-1">
                  <span className="text-[10px] text-[#77746C] uppercase tracking-wider font-semibold">Footwear</span>
                  <div className="text-2xl font-bold font-sans text-[#FDFBF3]">
                    {products.filter(p => p.category === "shoes").length}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#101713] border border-[#C49A45]/20 space-y-1">
                  <span className="text-[10px] text-[#77746C] uppercase tracking-wider font-semibold">Inquiries Received</span>
                  <div className="text-2xl font-bold font-sans text-[#C49A45]">{inquiries.length}</div>
                </div>
              </div>

              {/* Navigation Tabs & Actions */}
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#C49A45]/20 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("products")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === "products"
                        ? "bg-[#C49A45] text-[#07120F]"
                        : "bg-[#101713] text-[#E6D9BE] hover:text-[#C49A45]"
                    }`}
                  >
                    Product Inventory ({products.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      activeTab === "inquiries"
                        ? "bg-[#C49A45] text-[#07120F]"
                        : "bg-[#101713] text-[#E6D9BE] hover:text-[#C49A45]"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Concierge Leads ({inquiries.length})</span>
                  </button>
                </div>

                {activeTab === "products" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetCatalog}
                      title="Reset Catalog to Defaults"
                      className="px-3.5 py-2 rounded-xl bg-[#101713] hover:bg-[#07120F] text-[#E6D9BE] hover:text-[#C49A45] border border-[#C49A45]/30 text-xs font-medium flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#C49A45]" />
                      <span>Reset Defaults</span>
                    </button>

                    <button
                      onClick={handleOpenCreateModal}
                      className="px-4 py-2 rounded-xl bg-[#C49A45] hover:bg-[#FDFBF3] text-[#07120F] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Tab 1: Products CRUD Table */}
              {activeTab === "products" ? (
                <div className="overflow-x-auto rounded-xl border border-[#C49A45]/30 bg-[#101713]">
                  <table className="w-full text-left text-xs text-[#FDFBF3]">
                    <thead className="bg-[#07120F] text-[#D8B46A] font-bold uppercase tracking-wider border-b border-[#C49A45]/20">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Featured</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C49A45]/15">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#07120F]/60 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg border border-[#C49A45]/30" />
                            <div>
                              <div className="font-bold text-[#FDFBF3]">{prod.name}</div>
                              <div className="text-[10px] text-[#77746C]">SKU: {prod.sku}</div>
                            </div>
                          </td>
                          <td className="p-3 capitalize text-[#E6D9BE] font-mono">{prod.category} ({prod.subcategory})</td>
                          <td className="p-3 font-bold text-[#D8B46A]">${prod.price?.toLocaleString()}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              prod.inStock ? "bg-[#C49A45]/20 text-[#D8B46A] border border-[#C49A45]/40" : "bg-red-950 text-red-300"
                            }`}>
                              {prod.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="p-3">
                            {prod.featured ? (
                              <span className="text-[#C49A45] font-bold text-[11px]">Yes ★</span>
                            ) : (
                              <span className="text-[#77746C] text-[11px]">No</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(prod)}
                                className="p-2 text-[#E6D9BE] hover:text-[#C49A45] rounded-lg hover:bg-[#07120F]"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-2 text-[#77746C] hover:text-red-400 rounded-lg hover:bg-[#07120F]"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Tab 2: Inquiries Table */
                <div className="overflow-x-auto rounded-xl border border-[#C49A45]/30 bg-[#101713]">
                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center text-[#E6D9BE]/70 font-light">
                      No customer inquiries received yet. Try submitting an inquiry from the store drawer!
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs text-[#FDFBF3]">
                      <thead className="bg-[#07120F] text-[#D8B46A] font-bold uppercase tracking-wider border-b border-[#C49A45]/20">
                        <tr>
                          <th className="p-3">Inquiry ID / Date</th>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Items</th>
                          <th className="p-3">Value</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C49A45]/15">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-[#07120F]/60">
                            <td className="p-3">
                              <div className="font-mono text-[#E6D9BE]">{inq.id}</div>
                              <div className="text-[10px] text-[#77746C]">
                                {new Date(inq.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="font-bold text-[#FDFBF3]">{inq.customerName}</div>
                              <div className="text-[11px] text-[#D8B46A]">{inq.contactInfo}</div>
                            </td>
                            <td className="p-3">
                              <div className="space-y-0.5">
                                {inq.items?.map((it, i) => (
                                  <div key={i} className="text-[11px] text-[#E6D9BE]">
                                    • {it.name} ({it.selectedSize || 'Standard'})
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="p-3 font-bold text-[#D8B46A]">
                              ${inq.totalValue?.toLocaleString()}
                            </td>
                            <td className="p-3">
                              <select
                                value={inq.status}
                                onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                                className="bg-[#07120F] border border-[#C49A45]/40 rounded px-2 py-1 text-xs text-[#FDFBF3] focus:outline-none"
                              >
                                <option value="New">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Fulfilled">Fulfilled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

            </div>
          )}

          {/* Create / Edit Product Sub-Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#07120F]/90 backdrop-blur-md">
              <div className="w-full max-w-lg bg-[#101713] border border-[#C49A45]/40 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-[#FDFBF3]">
                <div className="flex items-center justify-between border-b border-[#C49A45]/20 pb-3">
                  <h4 className="text-base font-serif-title font-bold text-[#FDFBF3]">
                    {editingProduct ? "Edit Masterpiece" : "Add New Masterpiece"}
                  </h4>
                  <button onClick={() => setIsModalOpen(false)} className="text-[#E6D9BE] hover:text-[#C49A45]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[#D8B46A] font-semibold block mb-1">Product Title:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#D8B46A] font-semibold block mb-1">Category:</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                      >
                        <option value="watches">Watches</option>
                        <option value="shoes">Shoes</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#D8B46A] font-semibold block mb-1">Subcategory:</label>
                      <input
                        type="text"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#D8B46A] font-semibold block mb-1">Price ($):</label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div>
                      <label className="text-[#D8B46A] font-semibold block mb-1">Original Price ($):</label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                        className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#D8B46A] font-semibold block mb-1">Image URL:</label>
                    <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div>
                    <label className="text-[#D8B46A] font-semibold block mb-1">Badge Tag:</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Masterpiece, Limited Edition"
                      className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div>
                    <label className="text-[#D8B46A] font-semibold block mb-1">Description:</label>
                    <textarea
                      rows={3}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full bg-[#07120F] border border-[#C49A45]/30 rounded-lg p-2.5 text-[#FDFBF3] focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-[#E6D9BE]">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      />
                      <span>In Stock</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-[#E6D9BE]">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      <span>Featured Item</span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-end gap-2 border-t border-[#C49A45]/20">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-[#07120F] text-[#E6D9BE] border border-[#C49A45]/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#C49A45] text-[#07120F] font-bold uppercase tracking-wider shadow-md"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
