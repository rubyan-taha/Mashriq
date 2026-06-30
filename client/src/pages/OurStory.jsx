import React, { useEffect, useRef } from 'react';

const OurStory = () => {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '150px' }}>
      
      {/* ── NARRATIVE SPLIT ── */}
      <section className="section-pad md-stack" style={{ display: 'flex', minHeight: '100vh', width: '100%', alignItems: 'center', gap: '40px' }}>
        
        {/* Left Side: Typography */}
        <div className="md-w-full md-text-center" style={{ flex: 1, padding: '0 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="font-display" style={{ fontSize: '36px', letterSpacing: '0.3em', marginBottom: '40px' }}>
            THE HERITAGE
          </h1>
          <p className="font-editorial" style={{ 
            fontSize: '22px', 
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '400px'
          }}>
            After studying gourmet pastry and pasta crafting in Rome, Chef Ahmad spent three years in Beirut mastering the art of wood-fire charcoal grilling.
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)', marginBottom: '40px' }} />
          <p className="font-body" style={{ 
            fontSize: '14px', 
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '380px'
          }}>
            Returning to Pakistan, he combined this with the slow-cooked heritage of Lahore to create a restaurant that merges three culinary worlds into one.
          </p>
        </div>

        {/* Right Side: Floating Asymmetric Image */}
        <div className="md-w-full" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
           <div className="md-w-full" style={{ width: '60%', aspectRatio: '3/4', position: 'relative', zIndex: 2 }}>
             <img 
               src="/images/story-chef.jpg" 
               alt="Chef"
               className="img-flat"
             />
           </div>
           {/* Decorative squiggly line art behind image */}
           <div className="bg-topo" style={{ position: 'absolute', top: '10%', right: '10%', width: '70%', height: '70%', zIndex: 1 }} />
        </div>

      </section>

      {/* ── STAGGERED GALLERY / TIMELINE ── */}
      <section className="section-pad" style={{ padding: '150px 10%', position: 'relative', minHeight: '100vh' }}>
        
        <div className="md-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto', marginBottom: '150px', gap: '60px' }}>
           {/* Top Left Text */}
           <div className="md-w-full md-text-center md-mt-0" style={{ width: '30%', paddingTop: '100px' }}>
             <h2 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.3em', marginBottom: '20px' }}>ROME TO LAHORE</h2>
             <p className="font-editorial" style={{ fontSize: '16px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
               "We do not cut corners. From our handmade cheese blends to our charcoal-smoked kababs — every ingredient represents raw, organic discipline."
             </p>
             <span className="font-display" style={{ display: 'block', marginTop: '20px', fontSize: '9px', color: 'var(--accent)' }}>— Ahmad Al-Ghazali</span>
           </div>

           {/* Top Right Image */}
           <div className="md-w-full" style={{ width: '50%', aspectRatio: '4/3' }}>
             <img src="/images/entrance.jpg.png" alt="Entrance" className="img-flat" />
           </div>
        </div>

        <div className="md-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '1200px', margin: '0 auto', gap: '60px' }}>
           {/* Bottom Left Image */}
           <div className="md-w-full" style={{ width: '40%', aspectRatio: '3/4' }}>
             <img src="/images/lounge.jpg.jpg" alt="Lounge Interior" className="img-flat" />
           </div>

           {/* Bottom Right Text */}
           <div className="md-w-full md-text-center" style={{ width: '40%', paddingBottom: '100px', textAlign: 'right' }}>
             <h2 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.3em', marginBottom: '20px' }}>THE LOUNGE</h2>
             <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
               Located in Jalalpur Jattan, the space reflects the fusion of our menu. Earthy clay tones meet sharp, modernist lines.
             </p>
           </div>
        </div>

        <div className="md-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '1200px', margin: '150px auto 0', gap: '60px' }}>
           {/* Third Row Left Text */}
           <div className="md-w-full md-text-center md-mt-0" style={{ width: '30%', paddingTop: '100px' }}>
             <h2 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.3em', marginBottom: '20px' }}>THE BAR</h2>
             <p className="font-editorial" style={{ fontSize: '16px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
               An ambient space dedicated to artisanal mocktails, fresh pressings, and the signature Mashriq aesthetic.
             </p>
           </div>

           {/* Third Row Right Image */}
           <div className="md-w-full" style={{ width: '50%', aspectRatio: '4/3' }}>
             <img src="/images/theme.jpg.jpeg" alt="Bar Theme" className="img-flat" />
           </div>
        </div>

      </section>
      
    </div>
  );
};

export default OurStory;
