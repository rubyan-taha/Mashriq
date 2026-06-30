import React, { useState, useEffect } from 'react';

const FALLBACK_MENU = [
  { _id: '1', title: 'Chicken Cheese Handi', description: 'Slow-cooked chicken in rich cream cheese gravy.', price: 950, cuisine: 'desi', category: 'mains', imageUrl: '/images/menu-handi.jpg' },
  { _id: '2', title: 'Four Cheese Pizza', description: 'Wood-fired pizza with mozzarella, cheddar, gouda & parmesan on a sourdough crust.', price: 1200, cuisine: 'italian', category: 'mains', imageUrl: '/images/menu-pizza.jpg' },
  { _id: '3', title: 'Charcoal Chicken Tikka', description: 'Sizzling charcoal-grilled chicken tikka skewers, charred to perfection with vibrant spices.', price: 1450, cuisine: 'desi', category: 'mains', imageUrl: '/images/mashriq_tikka.png' },
  { _id: '4', title: 'Slow-Roasted Lamb Shank', description: 'Tender, fall-off-the-bone lamb slow-cooked for 12 hours with aromatic Levantine spices.', price: 2150, cuisine: 'arabic', category: 'mains', imageUrl: '/images/menu-lamb.jpg' },
  { _id: '5', title: 'Smoked Garlic Hummus', description: 'Velvety hummus infused with smoked garlic and drizzled with premium olive oil.', price: 550, cuisine: 'arabic', category: 'starters', imageUrl: '/images/mashriq_hummus.png' },
  { _id: '6', title: 'Pistachio Rose Kunafa', description: 'Crispy shredded wheat pastry layered with sweet cheese, soaked in rose water syrup.', price: 780, cuisine: 'arabic', category: 'desserts', imageUrl: '/images/menu-kunafa.jpg' },
  { _id: '7', title: 'Pomegranate Mint Smash', description: 'Refreshing, vibrant artisanal mocktail with muddled mint, fresh pomegranate juice, and sparkling water.', price: 450, cuisine: 'arabic', category: 'drinks', imageUrl: '/images/menu-mocktail.jpg' },
  { _id: '8', title: 'Classic Creme Brulee', description: 'Rich vanilla bean custard with a perfectly caramelized, brittle sugar crust.', price: 620, cuisine: 'italian', category: 'desserts', imageUrl: '/images/creme.jpg.jpg' },
];

const CUISINES = [
  { id: 'all', label: 'All' },
  { id: 'desi', label: 'Desi' },
  { id: 'italian', label: 'Italian' },
  { id: 'arabic', label: 'Arabic' },
];
const CATEGORIES = [
  { id: 'all', label: 'All Courses' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

const MenuPage = () => {
  const [items, setItems] = useState(FALLBACK_MENU);
  const [cuisine, setCuisine] = useState('all');
  const [category, setCategory] = useState('all');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [ratings, setRatings] = useState({}); // store mock ratings

  const handleRating = (itemId, star) => {
    setRatings(prev => ({ ...prev, [itemId]: star }));
    // Here we would typically send this to the backend
  };

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(d => {
      if (d.success && d.data.length > 0) setItems(d.data);
    }).catch(() => {});
  }, []);

  const filtered = items.filter(item => {
    const cMatch = cuisine === 'all' || item.cuisine === cuisine;
    const catMatch = category === 'all' || item.category === category;
    return cMatch && catMatch;
  });

  const tabBtn = (active, onClick, label) => (
    <button onClick={onClick} className="font-display" style={{
      fontSize: '11px',
      color: active ? 'var(--text-primary)' : 'var(--text-muted)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 0',
      transition: 'color 0.4s ease',
    }}>
      {label}
    </button>
  );

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '150px', paddingBottom: '150px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* ─── HEADER ─── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '100px' }}>
          <div>
            <h1 className="font-display" style={{ fontSize: '42px', letterSpacing: '0.3em', marginBottom: '20px' }}>
              MENU
            </h1>
            <p className="font-editorial" style={{ fontSize: '18px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Seasonal selections & signature classics
            </p>
          </div>
          
          {/* Filters Top Right */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'flex-end', marginBottom: '16px' }}>
              {CUISINES.map(c => tabBtn(cuisine === c.id, () => setCuisine(c.id), c.label))}
            </div>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'flex-end' }}>
              {CATEGORIES.map(c => tabBtn(category === c.id, () => setCategory(c.id), c.label))}
            </div>
          </div>
        </div>

        {/* ─── STAGGERED LIST (No Cards) ─── */}
        {filtered.length === 0 ? (
          <div className="font-editorial" style={{ textAlign: 'center', padding: '100px 0', fontSize: '24px', color: 'var(--text-muted)' }}>
            No items found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            {filtered.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item._id} style={{ 
                  display: 'flex', 
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '8%',
                  opacity: 0,
                  animation: 'reveal 1s ease forwards',
                  animationDelay: `${index * 0.1}s`
                }}>
                  
                  {/* Floating Image with Review Hover */}
                  <div 
                    style={{ 
                      width: '40%', 
                      aspectRatio: isEven ? '3/4' : '4/3', 
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredImage(item._id)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hoveredImage === item._id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    
                    {/* Review Overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      opacity: hoveredImage === item._id ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      color: '#fff'
                    }}>
                      <span className="font-display" style={{ fontSize: '14px', letterSpacing: '0.2em', marginBottom: '16px' }}>
                        {ratings[item._id] ? 'THANK YOU!' : 'RATE THIS DISH'}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={(e) => { e.stopPropagation(); handleRating(item._id, star); }}
                            style={{
                              background: 'none', border: 'none', cursor: 'pointer',
                              fontSize: '24px',
                              color: (ratings[item._id] >= star) ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                              transition: 'color 0.2s',
                              padding: 0
                            }}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text Block */}
                  <div style={{ width: '40%' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 className="font-editorial" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <span className="font-display" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                        Rs. {item.price}
                      </span>
                    </div>
                    
                    <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span className="font-display" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{item.cuisine}</span>
                      <span className="font-display" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{item.category}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
      <div style={{ height: '20vh' }} />

      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MenuPage;
