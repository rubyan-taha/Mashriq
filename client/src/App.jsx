import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import OurStory from './pages/OurStory';
import WhyUs from './pages/WhyUs';
import ReservationPage from './pages/ReservationPage';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let socket = null;
    const connectSocket = async () => {
      try {
        const { io } = await import('socket.io-client');
        const serverUrl = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;
        socket = io(serverUrl, { transports: ['polling'], reconnectionAttempts: 2, timeout: 3000 });
        socket.on('reservationStatusUpdated', (res) => {
          const storedPhone = localStorage.getItem('mashriq_booking_phone');
          if (res.phoneNumber === storedPhone && res.status === 'confirmed') {
            setNotification({ name: res.customerName, guests: res.guestCount });
            setTimeout(() => setNotification(null), 12000);
          }
        });
        socket.on('connect_error', () => {});
      } catch {}
    };
    connectSocket();
    return () => { if (socket) socket.disconnect(); };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', transition: 'background 0.45s ease, color 0.45s ease', position: 'relative' }}>
          {/* Global Background Removed per user request */}
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Navbar />

          {/* Real-time confirmation toast */}
          {notification && (
            <div style={{
              position: 'fixed', bottom: '28px', right: '28px', zIndex: 200,
              background: 'var(--surface)', border: '1px solid var(--accent)',
              padding: '20px 24px', maxWidth: '340px',
              boxShadow: '0 8px 32px var(--shadow)',
              animation: 'fadeUp 0.5s ease forwards',
            }}>
              <div style={{ color: 'var(--accent)', fontFamily: 'Jost', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
                ✓ Booking Confirmed
              </div>
              <p style={{ fontFamily: 'DM Sans', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                Dear <strong>{notification.name}</strong>, your reservation for {notification.guests} guests at MASHRIQ has been confirmed.
              </p>
              <button onClick={() => setNotification(null)} style={{
                marginTop: '12px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Jost', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--accent)',
              }}>
                Dismiss
              </button>
            </div>
          )}

          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/what-makes-us-diff" element={<WhyUs />} />
              <Route path="/reserve" element={<ReservationPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
          <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
