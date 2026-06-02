import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Core Components
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import BestSellers from './components/BestSellers';
import ProductDetails from './components/ProductDetails';
import MiniCart from './components/MiniCart';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('boston_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
  }, []);

  // Sync cart items to localStorage on modification
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('boston_cart', JSON.stringify(items));
  };

  // GSAP scroll trigger entries
  useEffect(() => {
    // Fade up sections smoothly as they arrive in viewport
    const sections = document.querySelectorAll('.glass-container');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.85, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.5,
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Cart actions
  const handleAddToCart = (product) => {
    // Determine details if added directly from grid vs details modal
    const size = product.selectedSize || product.sizes[0];
    const colorHex = product.selectedColor || product.colors[0].hex;
    const colorObj = product.colors.find(c => c.hex === colorHex) || product.colors[0];

    const targetKey = `${product.id}-${colorHex}-${size}`;

    const existingIndex = cartItems.findIndex(
      (item) => `${item.id}-${item.selectedColor}-${item.selectedSize}` === targetKey
    );

    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        ...product,
        selectedSize: size,
        selectedColor: colorHex,
        selectedColorName: colorObj.name,
        quantity: 1
      });
    }

    saveCart(updatedCart);
    
    // Automatically open mini-cart when item is added unless details view is active
    if (!product.selectedSize) {
      setCartOpen(true);
    }
  };

  const handleUpdateQuantity = (item, qty) => {
    let updatedCart = [...cartItems];
    const targetKey = `${item.id}-${item.selectedColor}-${item.selectedSize}`;
    const idx = updatedCart.findIndex(
      (i) => `${i.id}-${i.selectedColor}-${i.selectedSize}` === targetKey
    );

    if (idx > -1) {
      if (qty <= 0) {
        updatedCart.splice(idx, 1);
      } else {
        updatedCart[idx].quantity = qty;
      }
      saveCart(updatedCart);
    }
  };

  const handleRemoveItem = (item) => {
    const targetKey = `${item.id}-${item.selectedColor}-${item.selectedSize}`;
    const updatedCart = cartItems.filter(
      (i) => `${i.id}-${i.selectedColor}-${i.selectedSize}` !== targetKey
    );
    saveCart(updatedCart);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Luxury cursor follow dot */}
      <CustomCursor />

      {/* Floated Navigation Header */}
      <Navbar 
        onCartToggle={() => setCartOpen(!cartOpen)} 
        cartItemsCount={totalCartCount} 
      />

      {/* Main Editorial Experience Sections */}
      <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Hero />
        <Collections />
        <BestSellers 
          onProductSelect={setSelectedProduct} 
          onAddToCart={handleAddToCart} 
        />
      </main>

      {/* Architectural Footer */}
      <Footer />

      {/* Sliding mini-cart panel */}
      <MiniCart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* High-fidelity custom specifications drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>
    </>
  );
}
