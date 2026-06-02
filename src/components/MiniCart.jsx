import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import './MiniCart.css';

export default function MiniCart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Glass Drawer */}
          <motion.div
            className="cart-drawer glass-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          >
            <div className="cart-header">
              <div>
                <h2>Your Basket</h2>
                <span className="luxury-tag">Best of Boston Curated</span>
              </div>
              <button className="cart-close" onClick={onClose} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="cart-empty flex-center">
                  <p className="empty-message">Your basket is currently empty.</p>
                  <a href="#best-sellers" className="shop-cta hover-underline" onClick={onClose}>
                    Explore Best Sellers <ArrowRight size={14} style={{ marginLeft: 6 }} />
                  </a>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="cart-item"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <div className="cart-item-meta">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <span className="cart-item-price">${item.price * item.quantity}</span>
                        </div>
                        <p className="cart-item-spec">
                          Size: {item.selectedSize} &bull; Color:{' '}
                          <span
                            className="color-dot-small"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </p>

                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button
                              onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                              className="qty-btn"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="qty-val">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                              className="qty-btn"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item)}
                            className="remove-btn"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-val">Complimentary</span>
                </div>
                <div className="cart-summary-row total-row">
                  <span className="summary-label font-serif">Subtotal</span>
                  <span className="summary-val font-serif">${subtotal}</span>
                </div>
                <button className="checkout-btn flex-center">
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} className="checkout-arrow" />
                </button>
                <p className="cart-policy">
                  Complimentary carbon-neutral shipping & returns on all orders.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
