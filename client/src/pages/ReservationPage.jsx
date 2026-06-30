import React, { useState } from 'react';

const zones = [
  { id: 'hall', label: 'Main Dining Hall', desc: 'Cozy & lively' },
  { id: 'patio', label: 'Royal Courtyard', desc: 'Open-air romantic' },
  { id: 'lounge', label: 'Executive Lounge', desc: 'Quiet & premium' },
];

const tables = [
  { id: 't1', zone: 'hall', label: 'Table 1', seats: 2, desc: 'Window Seat', position: { top: '20%', left: '10%' } },
  { id: 't2', zone: 'hall', label: 'Table 2', seats: 4, desc: 'Central Booth', position: { top: '20%', left: '40%' } },
  { id: 't3', zone: 'hall', label: 'Table 3', seats: 6, desc: 'Grand Family Table', position: { top: '20%', left: '70%' } },
  { id: 't4', zone: 'hall', label: 'Table 4', seats: 4, desc: 'Corner Alcove', position: { top: '60%', left: '25%' } },
  { id: 't5', zone: 'hall', label: 'Table 5', seats: 8, desc: 'Long Party Table', position: { top: '60%', left: '60%' } },
  { id: 't6', zone: 'patio', label: 'Table 6', seats: 2, desc: 'By the Fountain', position: { top: '20%', left: '15%' } },
  { id: 't7', zone: 'patio', label: 'Table 7', seats: 4, desc: 'Under the Canopy', position: { top: '20%', left: '50%' } },
  { id: 't8', zone: 'patio', label: 'Table 8', seats: 4, desc: 'Courtyard Centre', position: { top: '60%', left: '35%' } },
  { id: 't9', zone: 'lounge', label: 'Table 9', seats: 2, desc: 'Sofa Seating', position: { top: '20%', left: '15%' } },
  { id: 't10', zone: 'lounge', label: 'Table 10', seats: 4, desc: 'Quiet Corner', position: { top: '20%', left: '55%' } },
  { id: 't11', zone: 'lounge', label: 'Table 11', seats: 8, desc: 'VIP Chamber', position: { top: '60%', left: '35%' } },
];

const timeSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

const CustomCalendar = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // To prevent picking past months if we are in the current month
  const today = new Date();
  today.setHours(0,0,0,0);
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', marginBottom: '24px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button type="button" onClick={prevMonth} disabled={isCurrentMonth} style={{ background: 'none', border: 'none', color: isCurrentMonth ? 'var(--text-muted)' : 'var(--text-primary)', cursor: isCurrentMonth ? 'not-allowed' : 'pointer', fontSize: '20px' }}>&larr;</button>
        <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {monthNames[month]} {year}
        </span>
        <button type="button" onClick={nextMonth} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '20px' }}>&rarr;</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px' }}>
        {dayNames.map(d => (
          <span key={d} style={{ fontFamily: 'Jost', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>{d}</span>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {days.map((day, idx) => {
          if (!day) return <div key={idx} />;
          
          const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const isSelected = selectedDate === dateStr;
          
          const cellDate = new Date(year, month, day);
          const isPast = cellDate < today;

          return (
            <button
              key={idx}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(dateStr)}
              style={{
                background: isSelected ? 'var(--accent)' : 'transparent',
                color: isSelected ? 'var(--btn-text)' : (isPast ? 'var(--text-muted)' : 'var(--text-primary)'),
                border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: '6px',
                padding: '12px 0',
                cursor: isPast ? 'not-allowed' : 'pointer',
                fontFamily: 'Jost',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                opacity: isPast ? 0.3 : 1,
                boxShadow: isSelected ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ReservationPage = () => {
  const [selectedZone, setSelectedZone] = useState('hall');
  const [selectedTable, setSelectedTable] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '19:00' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const zoneTables = tables.filter(t => t.zone === selectedZone);
  const today = new Date().toISOString().split('T')[0];

  const handleChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTable) { setError('Please select a table on the floor map above.'); return; }
    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    const phoneReg = /^(\+92|0)?3\d{9}$/;
    if (!phoneReg.test(form.phone.replace(/\s/g, ''))) { setError('Please enter a valid Pakistani mobile number.'); return; }
    if (!form.date) { setError('Please select a date.'); return; }

    setLoading(true);
    setError(null);

    const payload = {
      customerName: form.name,
      phoneNumber: form.phone,
      dateTime: `${form.date}T${form.time}`,
      guestCount: selectedTable.seats,
      tableId: selectedTable.id,
      tableLabel: selectedTable.label,
      zone: selectedZone,
      notes: `${selectedTable.desc} — ${zones.find(z => z.id === selectedZone)?.label}`,
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('mashriq_booking_phone', form.phone);
        setSuccess({
          name: form.name,
          table: selectedTable.label,
          zone: zones.find(z => z.id === selectedZone)?.label,
          date: form.date,
          time: form.time,
          seats: selectedTable.seats,
        });
        setForm({ name: '', phone: '', date: '', time: '19:00' });
        setSelectedTable(null);
      } else {
        setError(data.message || 'Booking failed. Please try again.');
      }
    } catch {
      setError('Unable to connect to the server. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <div style={{ flex: 1, padding: '0 10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 className="font-display" style={{ fontSize: '32px', letterSpacing: '0.3em', marginBottom: '40px' }}>
            CONFIRMED
          </h1>
          <p className="font-editorial" style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            We look forward to hosting you, <br/>
            <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>{success.name}</span>.
          </p>
          <div style={{ marginBottom: '40px' }}>
             <p className="font-body" style={{ fontSize: '14px', marginBottom: '10px' }}>{success.date} at {success.time}</p>
             <p className="font-body" style={{ fontSize: '14px', marginBottom: '10px' }}>{success.table} ({success.seats} Guests)</p>
             <p className="font-body" style={{ fontSize: '14px' }}>{success.zone}</p>
          </div>
          <button onClick={() => setSuccess(null)} className="font-display" style={{ 
            background: 'none', border: 'none', borderBottom: '1px solid var(--text-primary)', 
            padding: '4px 0', fontSize: '10px', cursor: 'pointer', color: 'var(--text-primary)'
          }}>
            New Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
      
      {/* ── Form Section ── */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px', padding: '150px 5% 100px' }}>
        
        <h1 className="font-display" style={{ fontSize: '32px', letterSpacing: '0.3em', marginBottom: '60px', textAlign: 'center' }}>
          BOOKING
        </h1>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px', flexWrap: 'wrap' }}>
          {zones.map(z => (
             <button key={z.id} onClick={() => { setSelectedZone(z.id); setSelectedTable(null); }} className="font-display" style={{
               fontSize: '11px',
               color: selectedZone === z.id ? 'var(--text-primary)' : 'var(--text-muted)',
               background: 'none', border: 'none', borderBottom: selectedZone === z.id ? '1px solid var(--text-primary)' : '1px solid transparent',
               padding: '4px 0', cursor: 'pointer', transition: 'all 0.4s'
             }}>
               {z.label}
             </button>
          ))}
        </div>

        <div style={{ 
          position: 'relative', height: '350px', 
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)',
          border: '1px solid var(--border)', 
          borderRadius: '16px',
          marginBottom: '40px',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05)'
        }}>
           {/* Blueprint Grid */}
           <div style={{
             position: 'absolute', inset: 0,
             backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
             backgroundSize: '30px 30px',
             opacity: 0.15,
             zIndex: 0
           }}></div>

           {/* Tables */}
           <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
             {zoneTables.map(t => {
                const isSelected = selectedTable?.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTable(t)}
                    title={`${t.label} (${t.seats} seats)`}
                    style={{
                      position: 'absolute', ...t.position,
                      width: t.seats > 4 ? '70px' : '50px',
                      height: '50px',
                      background: isSelected ? 'var(--text-primary)' : 'var(--surface)',
                      border: isSelected ? `2px solid var(--text-primary)` : `1px solid var(--border)`,
                      color: isSelected ? 'var(--bg)' : 'var(--text-primary)',
                      borderRadius: '8px',
                      cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Jost', fontSize: '11px', fontWeight: isSelected ? 600 : 400,
                      boxShadow: isSelected ? '0 0 20px rgba(255,255,255,0.1)' : '0 4px 10px rgba(0,0,0,0.1)',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {t.seats}
                  </button>
                );
              })}
           </div>
        </div>

        {selectedTable && (
          <div style={{ marginBottom: '60px', padding: '20px', borderLeft: '1px solid var(--text-primary)' }}>
            <span className="font-editorial" style={{ fontSize: '20px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              {selectedTable.label}
            </span>
            <span className="font-body" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {selectedTable.desc}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '30px' }}>
             <input name="name" value={form.name} onChange={handleChange} placeholder="NAME" className="form-input font-display" style={{ fontSize: '12px', borderBottom: '1px solid var(--border)' }} />
          </div>
          <div style={{ marginBottom: '30px' }}>
             <input name="phone" value={form.phone} onChange={handleChange} placeholder="PHONE (WHATSAPP)" className="form-input font-display" style={{ fontSize: '12px', borderBottom: '1px solid var(--border)' }} />
          </div>
          <div style={{ marginBottom: '40px' }}>
            <span className="font-display" style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '16px', letterSpacing: '0.1em' }}>SELECT DATE</span>
            <CustomCalendar selectedDate={form.date} onSelectDate={(d) => setForm(p => ({ ...p, date: d }))} />
          </div>

          <div style={{ display: 'flex', gap: '30px', marginBottom: '60px' }}>
             <div style={{ flex: 1 }}>
                <span className="font-display" style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px', letterSpacing: '0.1em' }}>SELECT TIME</span>
                <select name="time" value={form.time} onChange={handleChange} className="form-input font-display" style={{ fontSize: '14px', borderBottom: '1px solid var(--border)', padding: '10px 0', width: '100%', background: 'transparent', color: 'var(--text-primary)' }}>
                  {timeSlots.map(t => <option key={t} value={t} style={{ background: 'var(--bg)' }}>{t}</option>)}
                </select>
             </div>
          </div>

          {error && <div className="font-body" style={{ color: 'var(--accent)', fontSize: '13px', marginBottom: '20px' }}>{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', opacity: loading ? 0.5 : 1, marginTop: '20px' }}>
            {loading ? 'SUBMITTING...' : 'CONFIRM'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationPage;
