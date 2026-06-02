import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, RefreshCw } from 'lucide-react';
import './ProductDetails.css';

export default function ProductDetails({ product, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  // Synchronize options when product details load
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.hex || '');
      setSelectedSize(product.sizes[0] || '');
      setAdded(false);
    }
  }, [product]);

  // Lock body/html scroll while modal is active to prevent cluttered scroll behavior
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    const colorObject = product.colors.find(c => c.hex === selectedColor) || product.colors[0];
    onAddToCart({
      ...product,
      selectedColor: selectedColor,
      selectedColorName: colorObject.name,
      selectedSize: selectedSize
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose(); // Close automatically after success feedback
    }, 1200);
  };

  return (
    <div className="detail-modal-wrapper">
      {/* Backdrop Blur Overlay with semi-transparent dark tint */}
      <motion.div
        className="detail-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={onClose}
      />

      {/* Dynamic Details Overlay Modal with premium Apple-style transition */}
      <motion.div
        className="detail-modal-container glass-container"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Floating high-contrast close button */}
        <button className="detail-close-btn flex-center" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        <div className="detail-layout">
          
          {/* Left Panel: Visuals Showcase */}
          <div className="detail-visual-panel">
            <span className="badge-cat-tag">{product.category} Showcase</span>
            <div className="detail-img-frame">
              <img src={product.image} alt={product.name} className="detail-main-img" />
            </div>
            <div className="visual-assurance flex-center">
              <div className="assurance-node flex-center">
                <ShieldCheck size={14} className="assurance-icon" />
                <span>Secure Payments</span>
              </div>
              <div className="assurance-node flex-center">
                <RefreshCw size={14} className="assurance-icon" />
                <span>Returns Covered</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Specifications & Customization */}
          <div className="detail-spec-panel">
            <div>
              <span className="luxury-tag">Best of Boston Craftsmanship</span>
              <h2 className="detail-title font-serif">{product.name}</h2>
              
              <div className="detail-ratings-row flex-center">
                <div className="stars-row flex-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="star-icon-filled" />
                  ))}
                </div>
                <span className="reviews-summary">{product.rating} &bull; ({product.reviews} Verification Reviews)</span>
              </div>

              <div className="detail-price-tag">${product.price}</div>
              <p className="detail-desc">{product.description}</p>
            </div>

            {/* Color Swatch Selection */}
            <div className="selector-group">
              <span className="selector-label">
                Selected Color: <strong>{product.colors.find(c => c.hex === selectedColor)?.name}</strong>
              </span>
              <div className="swatches-container">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    className={`swatch-node ${selectedColor === color.hex ? 'swatch-active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizing Selection */}
            <div className="selector-group">
              <span className="selector-label">
                Select Size: <strong>{selectedSize}</strong>
              </span>
              <div className="sizes-container">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-node ${selectedSize === size ? 'size-active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Specifications */}
            <div className="technical-specs">
              <h4 className="tech-title font-serif">Garment Architecture</h4>
              <ul className="tech-list">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Action CTA Add Button */}
            <button 
              className={`add-to-basket-btn flex-center ${added ? 'btn-success' : ''}`}
              onClick={handleAddToCart}
              disabled={added}
            >
              <ShoppingBag size={16} className="btn-basket-icon" />
              <span>{added ? 'ADDED TO BASKET' : 'ADD TO BASKET'}</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
