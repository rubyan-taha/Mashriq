import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaPhone, FaUsers, FaClock, FaSpinner } from 'react-icons/fa';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    date: '',
    time: '19:00', // Default to dinner time
    guestCount: 2
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Get current date string in YYYY-MM-DD format to disable past dates
  const todayStr = new Date().toISOString().split('T')[0];

  // Pakistani phone validation: e.g. 03XXXXXXXXX or +923XXXXXXXXX
  const validatePhone = (phone) => {
    const regex = /^((\+92)|(0092)|(92))?3\d{9}$|^0\d{10}$/;
    return regex.test(phone.replace(/[\s-]/g, ''));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { customerName, phoneNumber, date, time, guestCount } = formData;

    // Client-side validations
    if (!customerName.trim()) {
      return setError('Please enter your name.');
    }
    if (!phoneNumber) {
      return setError('Please enter your phone number.');
    }
    if (!validatePhone(phoneNumber)) {
      return setError('Please enter a valid Pakistani phone number (e.g., 03001234567).');
    }
    if (!date) {
      return setError('Please select a booking date.');
    }
    if (new Date(date + 'T' + time) < new Date()) {
      return setError('You cannot book a table in the past. Please select a future time.');
    }
    if (guestCount < 1) {
      return setError('Must book for at least 1 guest.');
    }

    setLoading(true);

    try {
      const dateTime = new Date(`${date}T${time}`);
      const API_URL = import.meta.env.VITE_API_URL || '';

      const response = await fetch(`${API_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName,
          phoneNumber,
          dateTime,
          guestCount
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong. Please try again.');
      }

      // Format date for success message
      const formattedDate = new Date(dateTime).toLocaleDateString('en-PK', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      setSuccess({
        name: customerName,
        date: formattedDate
      });

      // Reset form
      setFormData({
        customerName: '',
        phoneNumber: '',
        date: '',
        time: '19:00',
        guestCount: 2
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#F5F0EA] rounded-2xl shadow-xl p-8 border border-[#D4AF37]/15">
      <div className="text-center mb-8">
        <h3 className="font-serif text-3xl font-bold tracking-wide text-[#151211] mb-2">
          Secure Your Table
        </h3>
        <p className="font-sans text-sm text-[#151211]/60 tracking-wider">
          zero-commission booking • instant confirmations
        </p>
      </div>

      {success ? (
        <div className="text-center py-8 px-4 bg-emerald-50 border border-emerald-200 rounded-xl fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="font-serif text-2xl font-bold text-emerald-800 mb-2">
            Table Secured!
          </h4>
          <p className="font-sans text-sm text-emerald-700 leading-relaxed mb-1">
            Thank you, <strong className="font-semibold">{success.name}</strong>.
          </p>
          <p className="font-sans text-sm text-emerald-700 leading-relaxed">
            Your reservation for {success.date} is successfully requested.
          </p>
          <p className="font-sans text-xs text-emerald-600 mt-4 italic">
            A confirmation receipt will be sent shortly.
          </p>
          <button
            onClick={() => setSuccess(null)}
            className="mt-6 bg-[#151211] text-[#FDFBF9] hover:bg-[#C85A32] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Make Another Booking
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[#151211]/80 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#151211]/45">
                <FaUser size={14} />
              </span>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="e.g., Hamza Khan"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#FDFBF9] rounded-xl border border-[#D4AF37]/20 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] outline-none text-[#151211] text-sm font-sans transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[#151211]/80 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#151211]/45">
                <FaPhone size={14} />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., 03001234567"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#FDFBF9] rounded-xl border border-[#D4AF37]/20 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] outline-none text-[#151211] text-sm font-sans transition-all"
              />
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#151211]/80 mb-2">
                Booking Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#151211]/45">
                  <FaCalendarAlt size={14} />
                </span>
                <input
                  type="date"
                  name="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#FDFBF9] rounded-xl border border-[#D4AF37]/20 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] outline-none text-[#151211] text-sm font-sans transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#151211]/80 mb-2">
                Preferred Time
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#151211]/45">
                  <FaClock size={14} />
                </span>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#FDFBF9] rounded-xl border border-[#D4AF37]/20 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] outline-none text-[#151211] text-sm font-sans transition-all"
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="18:00">06:00 PM (Dinner)</option>
                  <option value="19:00">07:00 PM</option>
                  <option value="20:00">08:00 PM</option>
                  <option value="21:00">09:00 PM</option>
                  <option value="22:00">10:00 PM</option>
                  <option value="23:00">11:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[#151211]/80 mb-2">
              Number of Guests
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#151211]/45">
                <FaUsers size={14} />
              </span>
              <input
                type="number"
                name="guestCount"
                min="1"
                max="25"
                value={formData.guestCount}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#FDFBF9] rounded-xl border border-[#D4AF37]/20 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] outline-none text-[#151211] text-sm font-sans transition-all"
              />
            </div>
          </div>

          {/* Errors and warnings */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium rounded-xl leading-relaxed">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#151211] hover:bg-[#C85A32] text-[#FDFBF9] text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Securing Table...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
