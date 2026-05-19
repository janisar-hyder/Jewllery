import React, { useState, useMemo } from 'react';
import { formatPrice } from '../utils/helpers';
import ProductCard from '../components/ProductCard';
import './AdminDashboard.css';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State for Modal
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Formal',
    badge: '',
    sku: '',
    description: '',
    images: [],
    currentImageUrl: ''
  });

  const badgeClass = {
    New: 'badge-new',
    Sale: 'badge-sale',
    Limited: 'badge-limited',
    '': 'badge-active'
  };

  const badgeLabel = {
    New: 'New',
    Sale: 'On Sale',
    Limited: 'Limited',
    '': 'Active'
  };

  // Auth & Data fetching
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!session) return;
    
    fetchProducts();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('products_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [session]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
  };

  const initials = (name) => {
    if (!name) return 'PR';
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const categories = new Set(products.map(p => p.category)).size;
    const totalValue = products.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    const featured = products.filter(p => p.badge).length;
    return { totalProducts, categories, totalValue, featured };
  }, [products]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: 'Formal', badge: '', sku: '', description: '', images: [], currentImageUrl: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || 'Formal',
      badge: product.badge || '',
      sku: product.sku || '',
      description: product.description || '',
      images: product.images || [],
      currentImageUrl: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Generate a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        alert('Upload failed: ' + uploadError.message);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      setFormData(prev => ({ ...prev, images: [...prev.images, publicUrl] }));
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
      // Reset input so same file can be re-selected
      e.target.value = '';
    }
  };

  const handleAddImageUrl = () => {
    if (formData.currentImageUrl.trim() !== '') {
      setFormData({ 
        ...formData, 
        images: [...formData.images, formData.currentImageUrl.trim()],
        currentImageUrl: ''
      });
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => idx !== indexToRemove)
    });
  };

  // Helper: extract storage file path from a Supabase Storage public URL
  const getStoragePath = (url) => {
    if (!url || !url.includes('/storage/v1/object/public/products/')) return null;
    return url.split('/storage/v1/object/public/products/')[1];
  };

  const saveProduct = async () => {
    const newProductData = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      badge: formData.badge,
      sku: formData.sku,
      description: formData.description,
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1599643478514-4a820c5678eb?auto=format&fit=crop&q=80&w=600']
    };

    if (editingProduct) {
      await supabase.from('products').update(newProductData).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([newProductData]);
    }
    
    closeModal();
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Find product to get its images
      const product = products.find(p => p.id === id);
      if (product && product.images) {
        // Delete images from storage bucket
        const storagePaths = product.images
          .map(getStoragePath)
          .filter(Boolean);
        if (storagePaths.length > 0) {
          await supabase.storage.from('products').remove(storagePaths);
        }
      }
      await supabase.from('products').delete().eq('id', id);
    }
  };

  if (loadingSession) {
    return <div className="admin-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}><p style={{ fontFamily: 'var(--font-sans)', color: 'var(--taupe)' }}>Loading Admin Dashboard...</p></div>;
  }

  if (!session) {
    return (
      <div className="admin-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleLogin} style={{ background: 'var(--white)', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 24px 64px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--obsidian)', margin: '0' }}>Sufrah<span style={{ color: 'var(--gold)' }}>.</span></h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--taupe)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>Admin Console Login</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@sufrah.com" style={{ width: '100%' }} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%' }} />
            </div>
            <button type="submit" className="add-btn" style={{ width: '100%', height: '44px', justifyContent: 'center', marginTop: '8px' }}>
              <span style={{ display: 'inline' }}>Sign In</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      
      <div className="layout" id="app">
        {/* SIDEBAR BACKDROP FOR MOBILE */}
        <div 
          className={`sidebar-backdrop ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* SIDEBAR */}
        <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-brand">
            <div className="brand-name">Sufrah<span className="brand-dot">.</span></div>
            <div className="brand-sub">Admin Console</div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Overview</div>
            <button className="nav-item"><i className="ti ti-layout-dashboard"></i> Dashboard</button>

            <div className="nav-section-label">Catalog</div>
            <button className="nav-item active"><i className="ti ti-package"></i> Products <span className="nav-badge">{products.length}</span></button>
            <button className="nav-item"><i className="ti ti-shopping-bag"></i> Orders <span className="nav-badge" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}>3</span></button>
            <button className="nav-item"><i className="ti ti-stack-2"></i> Collections</button>

            <div className="nav-section-label">Business</div>
            <button className="nav-item"><i className="ti ti-users"></i> Customers</button>
            <button className="nav-item"><i className="ti ti-chart-line"></i> Analytics</button>
            <button className="nav-item"><i className="ti ti-adjustments"></i> Settings</button>
          </nav>

          <div className="sidebar-footer">
              <div className="sidebar-user">
              <div className="user-avatar">S</div>
              <div className="user-info">
                <div className="user-name">Sufrah Admin</div>
                <div className="user-role">Super Admin</div>
              </div>
              <button onClick={handleLogout} style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer' }} title="Log out">
                <i className="ti ti-logout" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}></i>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          {/* TOPBAR */}
          <header className="topbar">
            <div className="topbar-left">
              <button 
                className="menu-toggle hidden-desktop" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <i className="ti ti-menu-2"></i>
              </button>
              <div className="breadcrumb">Catalog / Products</div>
              <div className="page-title">Product Management</div>
            </div>
            <div className="topbar-right">
              <button className="topbar-btn" title="Search"><i className="ti ti-search"></i></button>
              <button className="topbar-btn" title="Notifications"><i className="ti ti-bell"></i><span className="notif-dot"></span></button>
              <div className="divider-v"></div>
              <button className="add-btn" onClick={openAddModal}>
                <i className="ti ti-plus" style={{ fontSize: '14px' }}></i> 
                <span>Add Product</span>
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <div className="content">
            {/* METRICS */}
            <div className="metrics">
              <div className="metric-card">
                <div className="metric-icon"><i className="ti ti-package"></i></div>
                <div className="metric-label">Total Products</div>
                <div className="metric-value">{metrics.totalProducts}</div>
                <div className="metric-sub">Pieces in collection</div>
              </div>
              <div className="metric-card highlight">
                <div className="metric-icon"><i className="ti ti-stack-2"></i></div>
                <div className="metric-label">Categories</div>
                <div className="metric-value">{metrics.categories}</div>
                <div className="metric-sub">Active collections</div>
              </div>
              <div className="metric-card">
                <div className="metric-icon"><i className="ti ti-currency-rupee"></i></div>
                <div className="metric-label">Est. Retail Value</div>
                <div className="metric-value sm">₨ {metrics.totalValue.toLocaleString()}</div>
                <div className="metric-badge"><i className="ti ti-trending-up" style={{ fontSize: '10px' }}></i> +12% this month</div>
              </div>
              <div className="metric-card">
                <div className="metric-icon"><i className="ti ti-star"></i></div>
                <div className="metric-label">Featured Items</div>
                <div className="metric-value">{metrics.featured}</div>
                <div className="metric-sub">Active promotions</div>
              </div>
            </div>

            {/* TABLE CARD */}
            <div className="table-card">
              <div className="table-toolbar">
                <div className="search-wrap">
                  <i className="ti ti-search"></i>
                  <input 
                    className="search-input" 
                    type="text" 
                    placeholder="Search collection..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="filter-btn"><i className="ti ti-adjustments-horizontal" style={{ fontSize: '14px' }}></i> Filter</button>
                <button className="filter-btn"><i className="ti ti-arrows-sort" style={{ fontSize: '14px' }}></i> Sort</button>
                <div className="toolbar-right">
                  <span className="view-count">Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td data-label="Product">
                            <div className="product-cell">
                              <div className="product-img">
                                {p.images && p.images[0] ? (
                                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : initials(p.name)}
                              </div>
                              <div>
                                <div className="product-name">{p.name}</div>
                                <div className="product-sku">{p.sku || `SUF-${p.id.toString().slice(-4)}`} · {p.description && p.description.length > 38 ? p.description.slice(0, 38) + '…' : (p.description || 'No description')}</div>
                              </div>
                            </div>
                          </td>
                          <td data-label="Category"><span className="cat-pill">{p.category}</span></td>
                          <td data-label="Price"><span className="price-val">₨ {Number(p.price).toLocaleString()}</span></td>
                          <td data-label="Status">
                            <span className={`badge ${badgeClass[p.badge] || 'badge-active'}`}>
                              {badgeLabel[p.badge] || 'Active'}
                            </span>
                          </td>
                          <td data-label="Actions" className="actions-cell">
                            <div className="action-row">
                              <button className="act-btn edit" onClick={() => openEditModal(p)} title="Edit"><i className="ti ti-edit"></i></button>
                              <button className="act-btn del" onClick={() => deleteProduct(p.id)} title="Delete"><i className="ti ti-trash"></i></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--taupe)' }}>
                          <i className="ti ti-package" style={{ fontSize: '32px', display: 'block', margin: '0 auto 12px', opacity: 0.3 }}></i>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--obsidian)', marginBottom: '4px' }}>No products found</div>
                          <div style={{ fontSize: '12px' }}>Try adjusting your search</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <div className="footer-info">Showing <span>{filteredProducts.length === 0 ? '0' : `1–${filteredProducts.length}`}</span> of <span>{products.length}</span> products</div>
                <div className="pagination">
                  <button className="page-btn"><i className="ti ti-chevron-left" style={{ fontSize: '12px' }}></i></button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <button className="page-btn"><i className="ti ti-chevron-right" style={{ fontSize: '12px' }}></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-container">
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</div>
                <button className="modal-close" onClick={closeModal}><i className="ti ti-x"></i></button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Embroidered Khaddar Suit" 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label>Product Images</label>
                    {formData.images.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        {formData.images.map((img, idx) => (
                          <div key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`preview-${idx}`} />
                            <button 
                              type="button" 
                              onClick={() => removeImage(idx)} 
                              style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px' }}
                              title="Remove image"
                            >
                              <i className="ti ti-x"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={formData.currentImageUrl}
                        onChange={(e) => setFormData({...formData, currentImageUrl: e.target.value})}
                        placeholder="Paste image URL..." 
                        style={{ flex: 1, margin: 0 }}
                      />
                      <button 
                        type="button"
                        onClick={handleAddImageUrl}
                        style={{ 
                          background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '6px', 
                          padding: '0 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                          fontSize: '11px', fontWeight: '500', color: 'var(--taupe)', whiteSpace: 'nowrap'
                        }}
                      >
                        <i className="ti ti-plus"></i> Add URL
                      </button>
                      <label 
                        style={{ 
                          background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '6px', 
                          padding: '0 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                          fontSize: '11px', fontWeight: '500', color: 'var(--taupe)', whiteSpace: 'nowrap'
                        }}
                      >
                        <i className="ti ti-upload"></i> {uploading ? 'Uploading...' : 'Upload'}
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
                      </label>
                    </div>
                    {uploading && (
                      <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid var(--gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span>
                        Uploading image to storage...
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (PKR)</label>
                    <input 
                      type="number" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Formal</option>
                      <option>Casual</option>
                      <option>Bridal</option>
                      <option>Accessories</option>
                      <option>Unstitched</option>
                      <option>Jewelry</option>
                      <option>Clutches</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      value={formData.badge}
                      onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    >
                      <option value="">Active</option>
                      <option value="New">New</option>
                      <option value="Sale">Sale</option>
                      <option value="Limited">Limited</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>SKU</label>
                    <input 
                      type="text" 
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      placeholder="SUF-0001" 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Briefly describe this product..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button className="btn-save" onClick={saveProduct}>Save Product</button>
              </div>
            </div>

            {/* Live Preview Pane */}
            <div className="modal-preview-pane">
              <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: '600', color: 'var(--obsidian)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Preview</h3>
              </div>
              <div style={{ padding: '24px', pointerEvents: 'none' }}>
                <ProductCard 
                  product={{
                    id: 'preview',
                    name: formData.name || 'Product Name',
                    price: Number(formData.price) || 0,
                    category: formData.category || 'Category',
                    badge: formData.badge,
                    images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1599643478514-4a820c5678eb?auto=format&fit=crop&q=80&w=600']
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
