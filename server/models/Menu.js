const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  cuisine: {
    type: String,
    enum: ['desi', 'italian', 'arabic'],
    required: [true, 'Please specify the cuisine type (desi, italian, arabic)']
  },
  category: {
    type: String,
    enum: ['mains', 'starters', 'sides', 'appetizers', 'beverages', 'desserts'],
    required: [true, 'Please specify the category']
  },
  title: {
    type: String,
    required: [true, 'Please add a menu item title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price in PKR']
  },
  imageUrl: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add indices to optimize category switching queries
MenuSchema.index({ cuisine: 1, category: 1 });

module.exports = mongoose.model('Menu', MenuSchema);
