import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageGallery({ images, name }) {
  const [selected, setSelected] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden aspect-[3/4] bg-champagne mb-4 shadow-jewelry cursor-crosshair"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[selected]}
          alt={`${name} - View ${selected + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms]"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZooming ? 'scale(1.6)' : 'scale(1)',
          }}
        />
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden bg-champagne transition-all duration-500 ${
                selected === i ? 'ring-1 ring-gold' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
