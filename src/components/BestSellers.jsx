import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import './BestSellers.css';

export default function BestSellers({ onProductSelect, onAddToCart }) {
  // Staged entrance animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="best-sellers" className="sellers-section flex-center">
      <div className="sellers-inner glass-container">
        
        {/* Section Header */}
        <div className="sellers-header">
          <div className="flex-center" style={{ flexDirection: 'column' }}>
            <span className="luxury-tag">Boston Custom Tailored</span>
            <h2 className="sellers-title font-serif">CURATED BEST SELLERS</h2>
            <div className="sellers-divider" />
          </div>
        </div>

        {/* Product Responsive Grid */}
        <motion.div 
          className="product-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="product-card"
              variants={cardVariants}
            >
              {/* Product Image Frame */}
              <div className="prod-img-frame" onClick={() => onProductSelect(product)}>
                <img src={product.image} alt={product.name} className="prod-img" />
                
                {/* Status Badges */}
                {product.limited && (
                  <span className="badge-limited">LIMITED</span>
                )}
                
                {/* Quick actions overlay */}
                <div className="prod-actions-overlay flex-center">
                  <button 
                    className="action-btn flex-center" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductSelect(product);
                    }}
                    aria-label="Quick View Details"
                  >
                    <Eye size={16} />
                    <span>QUICK VIEW</span>
                  </button>
                  <button 
                    className="action-btn flex-center accent-action" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    aria-label="Add to Basket"
                  >
                    <ShoppingCart size={16} />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>

              {/* Product Info Description */}
              <div className="prod-info">
                <div className="prod-meta-top">
                  <span className="prod-category">{product.category}</span>
                  <div className="prod-rating flex-center">
                    <Star size={10} className="star-icon" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="prod-name" onClick={() => onProductSelect(product)}>{product.name}</h3>
                
                <div className="prod-meta-bottom">
                  <span className="prod-price">${product.price}</span>
                  <span className="prod-desc-excerpt">{product.colors.length} Architectural Tones</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
