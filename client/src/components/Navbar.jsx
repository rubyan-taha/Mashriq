import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If we are on the Home page, we want the navbar to be hidden initially 
  // until the user scrolls past the 100vh hero section.
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // If we are on the home page, wait until scrolled past 80vh to show the navbar
      // On other pages, just check if scrolled > 50 to apply background blur
      if (isHomePage) {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };
    
    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const linksLeft = [
    { to: '/menu', label: 'Menu' },
    { to: '/our-story', label: 'Our Story' },
  ];
  
  const linksRight = [
    { to: '/what-makes-us-diff', label: 'Why Us' },
    { to: '/reserve', label: 'Booking' },
  ];

  const allLinks = [...linksLeft, ...linksRight];

  const isActive = (path) => location.pathname === path;

  const linkStyle = (active) => ({
    fontFamily: 'Jost, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.4s ease',
    padding: '10px 0',
  });

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 0',
        background: scrolled && !isHomePage ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled && !isHomePage ? 'blur(12px)' : 'none',
        borderBottom: scrolled && !isHomePage ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        // On home page, slide it down from top when scrolled past hero
        transform: isHomePage && !scrolled ? 'translateY(-100%)' : 'translateY(0)',
        opacity: isHomePage && !scrolled ? 0 : 1,
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          
          {/* Desktop Layout */}
          <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6vw' }}>
            {/* Left Links */}
            <div style={{ display: 'flex', gap: '4vw' }}>
              {linksLeft.map(l => (
                <Link key={l.to} to={l.to} style={linkStyle(isActive(l.to))}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = isActive(l.to) ? 'var(--text-primary)' : 'var(--text-secondary)'}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <Link to="/" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, letterSpacing: '0.25em', color: 'var(--text-primary)' }}>
                  MASHRIQ
                </span>
              </div>
            </Link>

            {/* Right Links */}
            <div style={{ display: 'flex', gap: '4vw' }}>
              {linksRight.map(l => (
                <Link key={l.to} to={l.to} style={linkStyle(isActive(l.to))}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = isActive(l.to) ? 'var(--text-primary)' : 'var(--text-secondary)'}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="mobile-only" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Center Logo */}
            <Link to="/" style={{ display: 'block', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-primary)' }}>
                MASHRIQ
              </span>
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}>
              <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', marginBottom: '5px' }}></div>
              <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', marginBottom: '5px' }}></div>
              <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)' }}></div>
            </button>
          </div>

          {/* Absolute positioned utilities (Theme Toggle) */}
          <div className="hide-on-mobile" style={{ position: 'absolute', right: '48px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '24px' }}>
            <button onClick={toggleTheme} style={{
              fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)',
              background: 'none', border: 'none', cursor: 'pointer'
            }} onMouseEnter={e => e.currentTarget.style.color='var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'var(--bg)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '30px'
        }}>
          {allLinks.map(l => (
            <Link key={l.to} to={l.to} style={{...linkStyle(isActive(l.to)), fontSize: '16px'}}>
              {l.label}
            </Link>
          ))}
          <button onClick={toggleTheme} style={{
            fontFamily: 'Jost, sans-serif', fontSize: '16px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)',
            background: 'none', border: 'none', cursor: 'pointer', marginTop: '20px'
          }}>
            {theme === 'light' ? 'DARK MODE' : 'LIGHT MODE'}
          </button>
          <button onClick={() => setMobileMenuOpen(false)} style={{
            position: 'absolute', top: '25px', right: '30px', background: 'none', border: 'none',
            fontSize: '30px', color: 'var(--text-primary)', cursor: 'pointer'
          }}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
