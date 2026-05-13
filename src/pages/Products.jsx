import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SectionHeader from '../components/SectionHeader';
import { filterProducts, searchProducts } from '../utils/helpers';
import { supabase } from '../lib/supabase';

const categories = ['all', 'jewelry', 'clutches'];
const PER_PAGE = 8;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [category, search]);

  const filtered = searchProducts(filterProducts(products, category), search);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const startIdx = (page - 1) * PER_PAGE;
  const paged = filtered.slice(startIdx, startIdx + PER_PAGE);

  return (
    <div className="pt-24 md:pt-28">
      {/* Header */}
      <section className="section-luxury pb-0">
        <div className="container-maison">
          <SectionHeader
            overline="Our Collections"
            title="Explore"
            titleItalic="The Maison"
            description="Every piece in our collection has been designed, crafted, and curated with the belief that jewelry should tell a story."
          />

          {/* Filter Bar — tabs left, search right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid rgba(198,167,105,0.15)',
              paddingBottom: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            {/* Category tabs — left side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '0.625rem 1.25rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    border: '1px solid',
                    borderColor: category === cat ? 'var(--color-obsidian)' : 'rgba(198,167,105,0.2)',
                    backgroundColor: category === cat ? 'var(--color-obsidian)' : 'transparent',
                    color: category === cat ? 'white' : 'var(--color-taupe)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {cat === 'all' ? 'All Pieces' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Search — right side */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '260px' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-taupe)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0 0.625rem 1.75rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(198,167,105,0.2)',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  color: 'var(--color-obsidian)',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ paddingBottom: '5rem' }}>
        <div className="container-maison">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', fontFamily: 'var(--font-sans)', color: 'var(--color-taupe)', fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Loading Collections...
            </div>
          ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={category + search + page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {paged.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {paged.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setModalProduct}
                      index={i}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-serif text-2xl text-taupe font-light">No pieces found</p>
                  <p className="text-body mt-2">Try adjusting your search or category filter.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          )}

          {/* Pagination bar */}
          {filtered.length > 0 && (
            <div
              style={{
                marginTop: '4rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(198,167,105,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Results count — left */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-taupe)',
                }}
              >
                Showing {startIdx + 1}–{Math.min(startIdx + PER_PAGE, filtered.length)} of {filtered.length} pieces
              </p>

              {/* Page controls — right */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Prev */}
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(198,167,105,0.2)',
                    backgroundColor: 'transparent',
                    color: page === 1 ? 'rgba(198,167,105,0.2)' : 'var(--color-taupe)',
                    cursor: page === 1 ? 'default' : 'pointer',
                    transition: 'all 0.3s',
                  }}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: p === page ? 'var(--color-obsidian)' : 'rgba(198,167,105,0.2)',
                      backgroundColor: p === page ? 'var(--color-obsidian)' : 'transparent',
                      color: p === page ? 'white' : 'var(--color-taupe)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    {p}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(198,167,105,0.2)',
                    backgroundColor: 'transparent',
                    color: page === totalPages ? 'rgba(198,167,105,0.2)' : 'var(--color-taupe)',
                    cursor: page === totalPages ? 'default' : 'pointer',
                    transition: 'all 0.3s',
                  }}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </div>
  );
}
