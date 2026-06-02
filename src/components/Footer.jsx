import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 2000);
    }
  };

  return (
    <footer id="footer" className="footer-section flex-center">
      <div className="footer-inner glass-container">
        
        {/* Top Segment: Newsletter & Branding */}
        <div className="footer-top-row">
          <div className="footer-brand-column">
            <h2 className="footer-logo font-serif">BEST OF BOSTON</h2>
            <p className="brand-statement">
              Modern luxury and architectural tailoring engineered in New England. Shaping contemporary streetwear standards since 2026.
            </p>
          </div>

          <div className="footer-newsletter-column">
            <span className="luxury-tag">JOIN THE DIALOGUE</span>
            <p className="newsletter-subtitle">Subscribe for limited collection drops, private showroom events, and designer lookbooks.</p>
            
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-submit-btn flex-center" aria-label="Subscribe">
                  {subscribed ? 'JOINED' : <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Middle Segment: Grid of Location and Nav */}
        <div className="footer-grid">
          <div className="footer-grid-col">
            <span className="footer-col-title font-serif">SHOWROOM LOCATIONS</span>
            <p className="showroom-address">
              <strong>Flagship Store</strong><br />
              254 Newbury Street<br />
              Boston, MA 02116
            </p>
            <p className="showroom-hours">
              Mon - Sat: 11:00 AM - 7:00 PM<br />
              Sun: 12:00 PM - 6:00 PM
            </p>
          </div>

          <div className="footer-grid-col">
            <span className="footer-col-title font-serif">COLLECTIONS</span>
            <a href="#hero" className="footer-col-link hover-underline">Collection 01 / Rebellion</a>
            <a href="#collections" className="footer-col-link hover-underline">Architectural Coats</a>
            <a href="#best-sellers" className="footer-col-link hover-underline">French Terry Sweaters</a>
            <a href="#best-sellers" className="footer-col-link hover-underline">Footwear Division</a>
          </div>

          <div className="footer-grid-col">
            <span className="footer-col-title font-serif">ASSISTANCE</span>
            <a href="#footer" className="footer-col-link hover-underline">Shipping & Returns</a>
            <a href="#footer" className="footer-col-link hover-underline">Garment Care Guide</a>
            <a href="#footer" className="footer-col-link hover-underline">Showroom Appointments</a>
            <a href="#footer" className="footer-col-link hover-underline">Private Orders</a>
          </div>

          <div className="footer-grid-col">
            <span className="footer-col-title font-serif">CONNECT</span>
            <div className="social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn flex-center" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn flex-center" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="mailto:info@bestofboston.com" className="social-icon-btn flex-center" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
            <p className="showroom-address">
              Collaborations:<br />
              <a href="mailto:creatives@bestofboston.com" className="hover-underline">creatives@bestofboston.com</a>
            </p>
          </div>
        </div>

        {/* Bottom Segment: Copyrights */}
        <div className="footer-bottom-row">
          <span className="footer-copy">&copy; 2026 BEST OF BOSTON. ALL RIGHTS RESERVED.</span>
          <div className="footer-legal-links">
            <a href="#footer" className="hover-underline">Terms of Service</a>
            <span className="bullet-spacer">&bull;</span>
            <a href="#footer" className="hover-underline">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
