import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AdminProductModal({ isOpen, onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    badge: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price ? product.price.toString() : '',
        description: product.description || '',
        badge: product.badge || '',
        image: product.images && product.images.length > 0 ? product.images[0] : '',
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        badge: '',
        image: '',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: Number(formData.price),
      images: [formData.image],
    };
    onSave(formattedData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-ivory shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gold/20 bg-champagne/30">
            <h2 className="font-serif text-2xl text-obsidian">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-taupe hover:text-obsidian transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content - Scrollable */}
          <div className="p-6 overflow-y-auto">
            <form id="admin-product-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-overline text-obsidian block">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gold/20 px-4 py-2 text-obsidian focus:outline-none focus:border-gold transition-colors font-sans text-sm"
                    placeholder="e.g. Royal Kundan Set"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-overline text-obsidian block">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gold/20 px-4 py-2 text-obsidian focus:outline-none focus:border-gold transition-colors font-sans text-sm"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Bridal Sets">Bridal Sets</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Rings">Rings</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Clutches">Clutches</option>
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="text-overline text-obsidian block">Price (PKR) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full bg-white border border-gold/20 px-4 py-2 text-obsidian focus:outline-none focus:border-gold transition-colors font-sans text-sm"
                    placeholder="e.g. 45000"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-2">
                  <label className="text-overline text-obsidian block">Badge (Optional)</label>
                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    className="w-full bg-white border border-gold/20 px-4 py-2 text-obsidian focus:outline-none focus:border-gold transition-colors font-sans text-sm"
                    placeholder="e.g. Bestseller, New"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-overline text-obsidian block">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gold/20 px-4 py-2 text-obsidian focus:outline-none focus:border-gold transition-colors font-sans text-sm"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="mt-2 h-32 w-24 border border-gold/20 overflow-hidden rounded-sm">
                     <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} onLoad={(e) => e.target.style.display='block'}/>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-overline text-obsidian block">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white border border-gold/20 px-4 py-2 text-obsidian focus:outline-none focus:border-gold transition-colors font-sans text-sm resize-none"
                  placeholder="Enter product description here..."
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gold/20 bg-champagne/30 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold text-obsidian border border-obsidian/20 hover:bg-obsidian/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="admin-product-form"
              className="px-6 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold bg-obsidian text-white hover:bg-gold transition-colors"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
