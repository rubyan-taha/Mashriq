const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const { protect } = require('../middleware/authMiddleware');

// Resilient in-memory fallback store for offline dev/demo modes
let inMemoryReservations = [
  {
    _id: "mock-res-1",
    customerName: "Hamza Malik",
    phoneNumber: "03008456789",
    dateTime: new Date(new Date().setHours(19, 0, 0, 0)), // Today at 7 PM
    guestCount: 4,
    status: "pending"
  },
  {
    _id: "mock-res-2",
    customerName: "Ayesha Siddiqui",
    phoneNumber: "03214567890",
    dateTime: new Date(new Date().setHours(20, 30, 0, 0)), // Today at 8:30 PM
    guestCount: 2,
    status: "confirmed"
  }
];

// Rate limiting middleware: Max 100 requests per 15 minutes
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many booking attempts. Please try again after 15 minutes.'
  }
});

// @desc    Submit a table reservation
// @route   POST /api/reservations
// @access  Public (Rate limited)
router.post('/', bookingLimiter, async (req, res) => {
  try {
    const { customerName, phoneNumber, dateTime, guestCount } = req.body;

    if (!customerName || !phoneNumber || !dateTime || !guestCount) {
      return res.status(400).json({ success: false, message: 'All booking fields are required' });
    }

    const bookingTime = new Date(dateTime);

    // Database Offline Fallback Mode
    if (mongoose.connection.readyState !== 1) {
      // Check for double booking in-memory
      const windowStart = new Date(bookingTime.getTime() - 30 * 60 * 1000);
      const windowEnd = new Date(bookingTime.getTime() + 30 * 60 * 1000);

      const existingBooking = inMemoryReservations.find(r => 
        r.phoneNumber === phoneNumber &&
        new Date(r.dateTime) >= windowStart &&
        new Date(r.dateTime) <= windowEnd &&
        r.status !== 'cancelled'
      );

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: 'You already have an active booking close to this time. Please contact the host for adjustments.'
        });
      }

      const reservation = {
        _id: 'mock-res-' + Math.random().toString(36).substring(2, 9),
        customerName,
        phoneNumber,
        dateTime: bookingTime,
        guestCount: Number(guestCount),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      inMemoryReservations.push(reservation);

      // Socket live alert
      if (req.io) {
        req.io.emit('newReservation', reservation);
      }

      return res.status(201).json({
        success: true,
        message: 'Booking request submitted successfully (In-Memory)',
        data: reservation
      });
    }

    // Standard database execution
    const windowStart = new Date(bookingTime.getTime() - 30 * 60 * 1000);
    const windowEnd = new Date(bookingTime.getTime() + 30 * 60 * 1000);

    const existingBooking = await Reservation.findOne({
      phoneNumber,
      dateTime: { $gte: windowStart, $lte: windowEnd },
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active booking close to this time. Please contact the host for adjustments.'
      });
    }

    const reservation = await Reservation.create({
      customerName,
      phoneNumber,
      dateTime,
      guestCount
    });

    if (req.io) {
      req.io.emit('newReservation', reservation);
    }

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully',
      data: reservation
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Get all reservations (sorted by date, with optional calendar filter)
// @route   GET /api/reservations
// @access  Private (Admin Only)
router.get('/', protect, async (req, res) => {
  try {
    const { date } = req.query; // Format: YYYY-MM-DD

    // Database Offline Fallback Mode
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...inMemoryReservations];

      if (date) {
        const searchDateStr = new Date(date).toDateString();
        filtered = inMemoryReservations.filter(r => 
          new Date(r.dateTime).toDateString() === searchDateStr
        );
      }

      // Sort chronologically by date
      filtered.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    // Standard database execution
    let query = {};
    if (date) {
      const searchDate = new Date(date);
      const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
      
      query.dateTime = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    const reservations = await Reservation.find(query).sort({ dateTime: 1 });
    res.status(200).json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching reservations' });
  }
});

// @desc    Update reservation status (Confirm / Cancel)
// @route   PUT /api/reservations/:id
// @access  Private (Admin Only)
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status type' });
    }

    // Database Offline Fallback Mode
    if (mongoose.connection.readyState !== 1) {
      const index = inMemoryReservations.findIndex(r => r._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }

      inMemoryReservations[index].status = status;
      inMemoryReservations[index].updatedAt = new Date();

      if (req.io) {
        req.io.emit('reservationStatusUpdated', inMemoryReservations[index]);
      }

      return res.status(200).json({
        success: true,
        message: `Reservation status updated to ${status} (In-Memory)`,
        data: inMemoryReservations[index]
      });
    }

    // Standard database execution
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    if (req.io) {
      req.io.emit('reservationStatusUpdated', reservation);
    }

    res.status(200).json({
      success: true,
      message: `Reservation status updated to ${status}`,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
