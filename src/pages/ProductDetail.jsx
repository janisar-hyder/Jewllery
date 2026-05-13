import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/helpers';
import { getWhatsAppLink } from '../hooks/useWhatsApp';
import { fadeInUp, fadeInLeft, fadeInRight } from '../animations/variants';
import { supabase } from '../lib/supabase';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) {
        setProduct(data);
        const { data: relatedData } = await supabase.from('products').select('*').eq('category', data.category).neq('id', id).limit(3);
        if (relatedData) setRelated(relatedData);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center container-maison">
        <h1 className="font-sans text-sm tracking-[0.2em] uppercase text-taupe mb-4">Loading Product...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center container-maison">
        <h1 className="font-serif text-4xl text-obsidian mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-maison-outline inline-flex">
          <span>Browse Collection</span>
        </Link>
      </div>
    );
  }



  return (
    <div className="pt-24 md:pt-28">
      {/* Breadcrumbs */}
      <div className="container-maison py-4">
        <div className="flex items-center gap-2 text-overline text-taupe overflow-x-auto" style={{ fontSize: '9px' }}>
          <Link to="/" className="hover:text-gold transition-colors duration-500 whitespace-nowrap">Home</Link>
          <ChevronRight size={10} />
          <Link to="/products" className="hover:text-gold transition-colors duration-500 whitespace-nowrap">Collections</Link>
          <ChevronRight size={10} />
          <span className="text-obsidian whitespace-nowrap">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container-maison pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Image Gallery */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <ImageGallery images={product.images} name={product.name} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            {/* Category & Badge */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-overline text-gold">{product.category}</p>
              {product.badge && (
                <>
                  <span className="w-px h-3 bg-gold/30" />
                  <span className="text-overline text-obsidian" style={{ fontSize: '9px' }}>{product.badge}</span>
                </>
              )}
            </div>


            {/* Name */}
            <h1 className="font-serif text-3xl md:text-5xl font-light text-obsidian leading-tight mb-4">
              {product.name}
            </h1>

            <div className="gold-line-long my-5" />

            {/* Price */}
            <p className="font-serif text-2xl md:text-3xl text-obsidian mb-6">
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            <p className="text-body mb-6">{product.description}</p>

            {/* Material */}
            {product.material && (
              <div className="mb-2 pb-4 border-b border-gold/10">
                <p className="text-overline text-taupe mb-1">Material</p>
                <p className="text-sm text-obsidian">{product.material}</p>
              </div>
            )}

            {/* Care */}
            {product.care && (
              <div className="mb-6 pb-4 border-b border-gold/10">
                <p className="text-overline text-taupe mb-1">Care Instructions</p>
                <p className="text-sm text-obsidian">{product.care}</p>
              </div>
            )}

            {/* Order Button */}
            <a
              href={getWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full text-center mb-4"
            >
              <MessageCircle size={18} />
              <span>Order on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="btn-maison-outline w-full text-center"
            >
              <span>Inquire About This Piece</span>
            </Link>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gold/10">
              {[
                { Icon: ShieldCheck, label: 'Authentic\nCraftsmanship' },
                { Icon: Truck, label: 'Nationwide\nDelivery' },
                { Icon: RotateCcw, label: 'Easy\nReturns' },
              ].map(({ Icon, label }, i) => (
                <div key={i} className="text-center">
                  <Icon size={20} className="text-gold mx-auto mb-2" />
                  <p className="text-overline text-taupe whitespace-pre-line" style={{ fontSize: '8px', lineHeight: '1.6' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-luxury bg-champagne/40">
          <div className="container-maison">
            <div className="gold-line mx-auto mb-6" />
            <h2 className="text-collection text-center text-obsidian mb-12">
              You May Also <em className="italic font-light">Love</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
