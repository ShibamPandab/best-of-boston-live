import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Collections.css';

// Curated Lookbook Looks matching luxury themes
const looks = [
  {
    id: 'look-1',
    num: '01',
    collection: 'Brick & Ivy',
    title: 'THE BOSTON TRENCH',
    image: '/assets/boston_trench.png',
    fabric: 'Virgin Wool / Canvas blend'
  },
  {
    id: 'look-2',
    num: '02',
    collection: 'Back Bay Studio',
    title: 'ARCHITECTURAL SWEATER',
    image: '/assets/streetwear_hoodie.png',
    fabric: '480gsm Dense French Terry'
  },
  {
    id: 'look-3',
    num: '03',
    collection: 'Harvard Sq. Casual',
    title: 'GALLERY HIGH-TOP',
    image: '/assets/boston_sneakers.png',
    fabric: 'Calfskin & Charcoal Nappa'
  },
  {
    id: 'look-4',
    num: '04',
    collection: 'Charles River Crew',
    title: 'UTILITY CANVAS TOTE',
    image: '/assets/boston_tote.png',
    fabric: '24oz Waxed Cotton & Leather'
  }
];

export default function Collections() {
  const dragConstraintsRef = useRef(null);

  // Custom 3D tilt interaction hook
  const TiltCard = ({ look }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const box = card.getBoundingClientRect();
      
      // Calculate cursor position percentage relative to card dimensions (-0.5 to 0.5)
      const x = (e.clientX - box.left) / box.width - 0.5;
      const y = (e.clientY - box.top) / box.height - 0.5;
      
      // Map to degrees of rotation (max 15 degrees)
      setTilt({
        x: x * 15,
        y: -y * 15
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={cardRef}
        className="lookbook-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="look-frame">
          <img src={look.image} alt={look.title} className="look-img" draggable="false" />
          <div className="look-number">{look.num}</div>
          <div className="look-fabric-badge">{look.fabric}</div>
        </div>
        
        <div className="look-metadata">
          <span className="luxury-tag">{look.collection} Lookbook</span>
          <h3 className="look-title font-serif">{look.title}</h3>
          <div className="explore-tag flex-center">
            <span>DISCOVER</span>
            <ArrowRight size={12} className="tag-arrow" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="collections" className="collections-section flex-center">
      <div className="collections-inner glass-container">
        {/* Section Header */}
        <div className="collections-header">
          <div>
            <span className="luxury-tag">Lookbook &bull; Autumn/Winter</span>
            <h2 className="section-title">THE STREET DIALOGUES</h2>
          </div>
          <p className="section-desc desktop-only">
            Grab and drag horizontally to explore the custom fabric designs, architectural shapes, and luxury proportions tailored in Boston.
          </p>
        </div>

        {/* Horizontal Drag Area */}
        <div className="lookbook-viewport" ref={dragConstraintsRef}>
          <motion.div
            className="lookbook-container"
            drag="x"
            dragConstraints={dragConstraintsRef}
            dragElastic={0.1}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {looks.map((look) => (
              <TiltCard key={look.id} look={look} />
            ))}
          </motion.div>
        </div>

        {/* Progress Guide */}
        <div className="lookbook-footer">
          <span className="scroll-hint">[ DRAG TO EXPLORE ]</span>
        </div>
      </div>
    </section>
  );
}
