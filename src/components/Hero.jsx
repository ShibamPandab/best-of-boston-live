import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  // Staged entrance animation containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const imageScaleVariants = {
    hidden: { scale: 1.15, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="hero" className="hero-section flex-center">
      <motion.div 
        className="hero-wrapper glass-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Taglines */}
        <div className="hero-meta-top">
          <motion.span className="luxury-tag" variants={itemVariants}>
            Collection 01 &bull; Fall/Winter 26
          </motion.span>
          <motion.span className="editorial-serial" variants={itemVariants}>
            [0439a0b4]
          </motion.span>
        </div>

        {/* Cinematic Title */}
        <div className="hero-title-container">
          <h1 className="hero-title">
            <motion.span className="title-row" variants={itemVariants}>
              ARCHITECTURAL
            </motion.span>
            <motion.span className="title-row font-serif accent-text" variants={itemVariants}>
              SILHOUETTES
            </motion.span>
          </h1>
        </div>

        {/* Center Grand Fashion Card */}
        <div className="hero-center-deck">
          <motion.div 
            className="hero-main-card"
            variants={itemVariants}
          >
            <div className="main-card-frame">
              <motion.img 
                src="/assets/hero_model.png" 
                alt="Best of Boston Editorial Model" 
                className="hero-model-img"
                variants={imageScaleVariants}
              />
              <div className="card-gradient-overlay" />
            </div>
            
            {/* Embedded Floating Card Info */}
            <div className="card-floating-badge glass-container">
              <span className="badge-cat">Outerwear Spec</span>
              <h3 className="badge-title">Beacon Hill Trench</h3>
              <p className="badge-desc">75% Virgin Wool &bull; Engineered oversized drape</p>
              <a href="#best-sellers" className="badge-link hover-underline">VIEW WORKMANSHIP</a>
            </div>
          </motion.div>

          {/* Organic Floating Accent Image Card (Left-Offset) */}
          <motion.div 
            className="hero-floating-card floating-left"
            variants={itemVariants}
            animate={{
              y: [0, -12, 0],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img src="/assets/streetwear_hoodie.png" alt="French Terry Hoodie Preview" className="floating-card-img" />
            <div className="floating-card-meta">
              <span className="floating-card-title">Back Bay Hoodie</span>
              <span className="floating-card-price">$185</span>
            </div>
          </motion.div>

          {/* Organic Floating Accent Image Card (Right-Offset) */}
          <motion.div 
            className="hero-floating-card floating-right"
            variants={itemVariants}
            animate={{
              y: [0, 12, 0],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            <img src="/assets/boston_sneakers.png" alt="Gallery Sneakers Preview" className="floating-card-img" />
            <div className="floating-card-meta">
              <span className="floating-card-title">Gallery High-Top</span>
              <span className="floating-card-price">$360</span>
            </div>
          </motion.div>
        </div>

        {/* Footer info & Navigation Prompt */}
        <div className="hero-meta-bottom">
          <motion.div className="brand-philosophy" variants={itemVariants}>
            <p>A premium streetwear dialogue from Boston. Re-engineering classic silhouettes through architectural tailoring, heavyweight textiles, and historical brownstone influences.</p>
          </motion.div>
          
          <motion.a 
            href="#collections" 
            className="scroll-indicator flex-center"
            variants={itemVariants}
            whileHover={{ y: 5 }}
          >
            <span className="scroll-text">DISCOVER THE LOOKBOOK</span>
            <ArrowDown size={14} className="scroll-arrow" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
