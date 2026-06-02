import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onCartToggle, cartItemsCount }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-inner glass-container">
          {/* Mobile Menu Icon */}
          <button 
            className="nav-icon-btn mobile-only" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          {/* Nav Links */}
          <div className="nav-links desktop-only">
            <a href="#hero" className="nav-link hover-underline">Shop</a>
            <a href="#collections" className="nav-link hover-underline">Lookbook</a>
            <a href="#best-sellers" className="nav-link hover-underline">Curated</a>
          </div>

          {/* Luxury Logo */}
          <div className="nav-logo">
            <a href="#hero">BEST OF BOSTON</a>
          </div>

          {/* Action Icons */}
          <div className="nav-actions">
            <button 
              className="nav-icon-btn" 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search items"
            >
              <Search size={18} />
            </button>
            <button 
              className="nav-icon-btn cart-trigger" 
              onClick={onCartToggle}
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span className="cart-badge flex-center">{cartItemsCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Modern Search Drawer Overlay */}
      {searchOpen && (
        <div className="search-overlay flex-center">
          <div className="search-modal glass-container">
            <button className="search-close-btn" onClick={() => setSearchOpen(false)}>
              <X size={20} />
            </button>
            <span className="luxury-tag">Boston Curated Search</span>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search collection, outerwear, knits..." 
                autoFocus 
                className="search-input"
              />
              <Search size={20} className="search-input-icon" />
            </div>
            <div className="popular-searches">
              <span className="popular-title">Suggested:</span>
              <a href="#best-sellers" onClick={() => setSearchOpen(false)}>Beacon Hill Trench</a>
              <a href="#best-sellers" onClick={() => setSearchOpen(false)}>Gallery Sneakers</a>
              <a href="#best-sellers" onClick={() => setSearchOpen(false)}>French Terry Hoodie</a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-menu glass-container" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
            <div className="mobile-logo">BEST OF BOSTON</div>
            <div className="mobile-links flex-center">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Collection 01</a>
              <a href="#collections" onClick={() => setMobileMenuOpen(false)}>The Lookbook</a>
              <a href="#best-sellers" onClick={() => setMobileMenuOpen(false)}>Shop All</a>
              <a href="#footer" onClick={() => setMobileMenuOpen(false)}>Our Stores</a>
            </div>
            <div className="mobile-footer">
              <span className="luxury-tag">EST. 2026 / BOSTON</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
