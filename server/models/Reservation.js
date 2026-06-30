const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please add a customer name'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  dateTime: {
    type: Date,
    required: [true, 'Please add a reservation date and time']
  },
  guestCount: {
    type: Number,
    required: [true, 'Please specify the number of guests'],
    min: [1, 'Must book for at least 1 guest']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Single index on dateTime to optimize date range queries (calendar search)
ReservationSchema.index({ dateTime: 1 });

module.exports = mongoose.model('Reservation', ReservationSchema);
