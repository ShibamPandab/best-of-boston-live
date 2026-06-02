import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  
  // Track mouse coordinates (instant values)
  const mouse = useRef({ x: 0, y: 0 });
  // Interpolated cursor coordinates for smooth luxury inertia
  const cursor = useRef({ x: 0, y: 0 });
  
  const [text, setText] = useState('');
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Hidden initially, fade in on mouse moves
    const handleFirstMove = () => setHidden(false);
    window.addEventListener('mousemove', handleFirstMove, { once: true });

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Global Hover Watcher for text labels and scaling
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, select, input, [role="button"], .product-card, .lookbook-card');
      
      if (target) {
        // 1. Text Labels
        if (target.classList.contains('product-card') || target.closest('.product-card')) {
          // Prefer hover scale if hovering directly on action buttons inside product cards
          const isButton = e.target.closest('a, button, select, input, [role="button"]');
          if (isButton) {
            setText('');
            setHovered(true);
          } else {
            setText('VIEW');
            setHovered(false);
          }
        } else if (target.classList.contains('lookbook-card') || target.closest('.lookbook-card')) {
          const isButton = e.target.closest('a, button, select, input, [role="button"]');
          if (isButton) {
            setText('');
            setHovered(true);
          } else {
            setText('DRAG');
            setHovered(false);
          }
        } else {
          setText('');
          setHovered(true);
        }
      } else {
        setText('');
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Damping animation loop (60fps)
    let animationFrameId;
    const render = () => {
      if (!cursorRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Base interpolation factor for premium luxury smoothness
      const ease = 0.22; 
      cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
      cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

      // Update Cursor position using hardware accelerated translate3d
      cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={cursorRef}
      className={`elegant-custom-cursor ${clicked ? 'cursor-clicked' : ''} ${
        hovered ? 'cursor-hovered' : ''
      } ${text ? 'cursor-has-label' : ''}`}
    >
      {text && <span className="cursor-label">{text}</span>}
    </div>
  );
}
