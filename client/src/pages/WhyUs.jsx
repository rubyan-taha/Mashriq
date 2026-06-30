import React from 'react';
import { Link } from 'react-router-dom';

const pillars = [
  { num: '01', title: 'The Heat', text: 'Our charcoal is sourced from organic hardwood, giving every skewer a distinct, smoky signature that cannot be replicated by modern gas grills.', image: '/images/whyus-heat.jpg' },
  { num: '02', title: 'The Flour', text: 'Our pizza dough is fermented for 48 hours using a sourdough starter inherited from Rome, resulting in a light, airy crust that chars perfectly.', image: '/images/whyus-flour.jpg' },
  { num: '03', title: 'The Spice', text: 'We import raw spices directly from the Levantine coast and hand-grind them daily in our kitchen to preserve their volatile aromatic oils.', image: '/images/whyus-spice.jpg' },
  { num: '04', title: 'The Clay', text: 'Our Desi handis are cooked in unglazed terracotta pots, which naturally balance the acidity of tomatoes and tenderize the meat slowly over low heat.', image: '/images/whyus-clay.jpg' },
];

const WhyUs = () => {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '150px', paddingBottom: '150px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        
        {/* ── HEADER ── */}
        <div className="md-stack md-text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '150px' }}>
          <div>
            <h1 className="font-display" style={{ fontSize: '42px', letterSpacing: '0.3em', marginBottom: '20px' }}>
              METHODOLOGY
            </h1>
            <p className="font-editorial" style={{ fontSize: '18px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              We do things the hard way, because it tastes better.
            </p>
          </div>
        </div>

        {/* ── ASYMMETRIC PILLARS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '150px', position: 'relative' }}>
          {/* Vertical subtle line connecting them */}
          <div className="hide-on-mobile" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'var(--border)' }} />

          {pillars.map((p, index) => {
             const isEven = index % 2 === 0;
             return (
               <div key={p.num} className="md-stack" style={{ 
                 display: 'flex', 
                 flexDirection: isEven ? 'row' : 'row-reverse', 
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 position: 'relative',
                 zIndex: 2,
                 gap: '40px'
               }}>
                 {/* Text block */}
                 <div className="md-w-full md-text-center" style={{ width: '40%', textAlign: isEven ? 'right' : 'left', padding: isEven ? '0 60px 0 0' : '0 0 0 60px' }}>
                   <span className="font-display" style={{ fontSize: '12px', color: 'var(--accent)', display: 'block', marginBottom: '16px' }}>
                     NO. {p.num}
                   </span>
                   <h3 className="font-editorial" style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '24px' }}>
                     {p.title}
                   </h3>
                   <p className="font-body" style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                     {p.text}
                   </p>
                 </div>

                 {/* Center Dot */}
                 <div className="hide-on-mobile" style={{ 
                   width: '12px', height: '12px', 
                   background: 'var(--bg)', border: '1px solid var(--accent)', 
                   borderRadius: '50%',
                   position: 'absolute', left: '50%', transform: 'translateX(-50%)'
                 }} />

                 {/* Image Block */}
                 <div className="md-w-full" style={{ width: '40%', padding: isEven ? '0 0 0 60px' : '0 60px 0 0' }}>
                   <div style={{ 
                     width: '100%', 
                     aspectRatio: '4/3', 
                     overflow: 'hidden', 
                     borderRadius: '4px',
                     boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                   }}>
                     <img 
                       src={p.image} 
                       alt={p.title} 
                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                   </div>
                 </div>
               </div>
             );
          })}
        </div>

        {/* ── FOOTER CTA ── */}
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
           <h2 className="font-editorial" style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '40px', fontStyle: 'italic' }}>
             Experience the difference.
           </h2>
           <Link to="/reserve" className="btn-primary">
             Reserve a Table
           </Link>
        </div>

      </div>
    </div>
  );
};

export default WhyUs;
