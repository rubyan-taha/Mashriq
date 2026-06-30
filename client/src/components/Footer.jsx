import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'var(--bg-alt)', 
      color: 'var(--text-primary)', 
      padding: '100px 10% 40px',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}>
        <img 
          src="/images/logo.png" 
          alt="Mashriq Logo" 
          style={{ height: '80px', mixBlendMode: 'multiply', filter: 'grayscale(100%) opacity(0.8)', marginBottom: '40px' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h2 className="font-display" style={{ fontSize: '36px', letterSpacing: '0.4em' }}>MASHRIQ</h2>
        <p className="font-editorial" style={{ fontSize: '18px', color: 'var(--text-secondary)', marginTop: '20px', fontStyle: 'italic' }}>
          Jalalpur Jattan, Gujrat
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '80px' }}>
        
        {/* Navigation */}
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <Link to="/menu" className="font-display" style={{ fontSize: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>MENU</Link>
             <Link to="/our-story" className="font-display" style={{ fontSize: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>OUR STORY</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <Link to="/what-makes-us-diff" className="font-display" style={{ fontSize: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>METHODOLOGY</Link>
             <Link to="/reserve" className="font-display" style={{ fontSize: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>RESERVATIONS</Link>
          </div>
        </div>

        {/* Contact */}
        <div style={{ textAlign: 'right' }}>
           <p className="font-display" style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '16px' }}>CONTACT</p>
           <p className="font-body" style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '8px' }}>+92 300 1234567</p>
           <p className="font-body" style={{ fontSize: '13px', color: 'var(--text-primary)' }}>info@mashriq.com</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
        <p className="font-body" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          &copy; {currentYear} Mashriq. All rights reserved.
        </p>
        <Link to="/admin" className="font-display" style={{ fontSize: '9px', textDecoration: 'none', color: 'var(--text-muted)' }}>
          ADMIN PORTAL
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
