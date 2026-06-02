import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  if (!product) return null;

  const handleAddToCart = () => {
    // Add to cart with detailed custom selectors
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
      onClose(); // Automatically close overlay after successful add with minor delay
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="detail-modal-wrapper">
        {/* Backdrop Blur Overlay */}
        <motion.div
          className="detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Dynamic Details Overlay Modal */}
        <motion.div
          className="detail-modal-container glass-container"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        >
          {/* Close Overlay Icon */}
          <button className="detail-close-btn" onClick={onClose} aria-label="Close details">
            <X size={22} />
          </button>

          <div className="detail-layout">
            
            {/* Left Hand: High Resolution Showcase */}
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

            {/* Right Hand: Specification & Choices */}
            <div className="detail-spec-panel">
              <div>
                <span className="luxury-tag">Best of Boston Craftsmanship</span>
                <h2 className="detail-title font-serif">{product.name}</h2>
                
                {/* Product Rating */}
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

              {/* Functional Swatch Color Selector */}
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

              {/* Functional Sizing Nodes */}
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

              {/* Technical Specifications */}
              <div className="technical-specs">
                <h4 className="tech-title font-serif">Garment Architecture</h4>
                <ul className="tech-list">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Add button */}
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
    </AnimatePresence>
  );
}
