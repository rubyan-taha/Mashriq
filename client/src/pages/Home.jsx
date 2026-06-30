import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';

// Simple scroll reveal hook
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // observe children with reveal class
    const revealElements = current.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
  return ref;
};

const Home = () => {
  const containerRef = useReveal();

  return (
    <div ref={containerRef} style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      
      {/* ─── HERO: BLURTEXT 100vh ─── */}
      <section className="hero-section" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Removed Hero Background Image as requested */}

        {/* Overlay gradient so text is legible if needed */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none', zIndex: 1 }}></div>

        {/* Centered Typography */}
        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
          <BlurText
            text="MASHRIQ"
            delay={150}
            animateBy="letters"
            direction="top"
            className="font-display hero-title"
            style={{
              fontSize: 'clamp(50px, 7vw, 100px)',
              letterSpacing: '0.45em',
              color: 'var(--text-primary)',
              textAlign: 'center',
              textShadow: '0 10px 30px rgba(0,0,0,0.2)',
              marginRight: '-0.45em',
              justifyContent: 'center'
            }}
          />
        </div>
        
        {/* Scroll Indicator */}
        <div className="reveal reveal-delay-2" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <span className="font-display" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--text-primary)', opacity: 0.7 }}>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'var(--text-muted)' }}></div>
        </div>
      </section>

      {/* ─── STAGGERED MENU TEASER ─── */}
      <section className="section-pad" style={{ padding: '150px 10%', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 className="font-display reveal" style={{ fontSize: '24px', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '80px' }}>MENU</h2>
        <div className="md-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto', width: '100%', gap: '60px' }}>
          
          {/* Left Block: Portrait Image + Top aligned text */}
          <div className="reveal md-w-full md-text-center md-stack" style={{ width: '45%', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <div className="md-w-full" style={{ width: '70%', aspectRatio: '3/4' }}>
              <img src="/images/menu-pizza.jpg" alt="Menu Preview" className="img-flat" />
            </div>
            <div style={{ paddingTop: '20px' }}>
              <p className="font-body" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Seasonal a la carte</p>
              
              <div style={{ marginTop: '40px' }}>
                <Link to="/menu" style={{ textDecoration: 'none', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', fontSize: '12px', letterSpacing: '0.1em' }} className="font-display">
                  Explore Menu
                </Link>
              </div>
            </div>
          </div>

          {/* Right Block: Landscape Image shifted down + Bottom aligned text */}
          <div className="reveal reveal-delay-1 md-w-full md-mt-0 md-text-center md-stack" style={{ width: '50%', display: 'flex', gap: '30px', alignItems: 'flex-end', marginTop: '300px' }}>
            <div style={{ paddingBottom: '20px', textAlign: 'right', flex: 1 }} className="md-text-center">
              <h2 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.3em', marginBottom: '10px' }}>SIGNATURE</h2>
              <p className="font-body" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Chef's selection</p>
            </div>
            <div className="md-w-full" style={{ width: '75%', aspectRatio: '4/3' }}>
              <img src="/images/menu-kebab.jpg" alt="Signature" className="img-flat" />
            </div>
          </div>
          
        </div>
      </section>

      {/* ─── THE VENUE (With squiggly lines) ─── */}
      <section className="section-pad" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '150px 10%', position: 'relative' }}>
        <h2 className="font-display reveal" style={{ fontSize: '24px', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '80px' }}>THE VENUE</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', marginBottom: '80px' }}>
          <div className="reveal reveal-delay-1" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Intimate setting with curated ambiance. Rotating seasonal ingredients. Natural and vibrant selections.
            </p>
          </div>
        </div>

        <div className="md-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto', width: '100%', gap: '40px' }}>
           {/* Left Portrait */}
           <div className="reveal md-w-full" style={{ width: '35%', aspectRatio: '2/3', position: 'relative', zIndex: 2 }}>
             <img src="/images/lounge.jpg.jpg" alt="Venue Interior" className="img-flat" />
           </div>

           {/* Right Landscape with Topo background */}
           <div className="reveal reveal-delay-1 md-w-full md-mt-0" style={{ width: '45%', position: 'relative', padding: '40px', marginTop: '-150px' }}>
              {/* Squiggly line background */}
              <div className="bg-topo" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}></div>
              
              <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
                <h3 className="font-display" style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '20px' }}>MASHRIQ</h3>
                <div style={{ width: '100%', aspectRatio: '4/3' }}>
                  <img src="/images/theme.jpg.jpeg" alt="Venue Details" className="img-flat" />
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── FOOTER TEASER ─── */}
      <section className="reveal" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '150px 10% 80px', textAlign: 'center' }}>
         <h2 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.4em', marginBottom: '40px' }}>READY TO BOOK?</h2>
         <Link to="/reserve" className="btn-primary" style={{ display: 'inline-block' }}>
           Make a Reservation
         </Link>
      </section>

      <style>{`
        .hero-section:hover .hero-bg {
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;
