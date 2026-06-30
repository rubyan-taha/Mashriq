const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const { protect } = require('../middleware/authMiddleware');

// Fallback in-memory menu items in case MongoDB is offline
let inMemoryMenu = [
  {
    _id: "mock-menu-1",
    cuisine: "desi",
    category: "starters",
    title: "Chicken Tikka",
    price: 1499,
    description: "Smoked, fire-grilled tender chicken marinated in red tandoori spices and served with fresh mint chutney.",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    _id: "mock-menu-2",
    cuisine: "desi",
    category: "mains",
    title: "Chicken Cheese Handi",
    price: 2499,
    description: "Rich, creamy chicken gravy cooked in a clay pot, layered with melt-in-mouth cheese, ginger, and green chilies.",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    _id: "mock-menu-3",
    cuisine: "italian",
    category: "mains",
    title: "Four Cheese Pizza",
    price: 1899,
    description: "Neapolitan wood-fired crust layered with fresh mozzarella, gorgonzola, parmesan, and creamy ricotta.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    _id: "mock-menu-4",
    cuisine: "italian",
    category: "desserts",
    title: "Classic Tiramisu",
    price: 899,
    description: "Layers of espresso-soaked ladyfingers and velvety sweet mascarpone cream, dusted with dark cocoa powder.",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    _id: "mock-menu-5",
    cuisine: "arabic",
    category: "starters",
    title: "Hummus & Warm Pita",
    price: 799,
    description: "Velvety blend of chickpeas, rich tahini, fresh lemon juice, drizzled with premium olive oil and served with hot pita bread.",
    imageUrl: "/images/mashriq_hummus.png",
    isAvailable: true
  },
  {
    _id: "mock-menu-6",
    cuisine: "arabic",
    category: "mains",
    title: "Chicken Mandi",
    price: 2299,
    description: "Slow-cooked traditional spiced chicken served on a bed of aromatic long-grain basmati rice, accompanied by spicy shatta sauce.",
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  }
];

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, count: inMemoryMenu.length, data: inMemoryMenu });
    }
    const menuItems = await Menu.find({ isAvailable: true }).sort({ cuisine: 1, category: 1 });
    res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
  } catch (error) {
    res.status(200).json({ success: true, count: inMemoryMenu.length, data: inMemoryMenu });
  }
});

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private (Admin Only)
router.post('/', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newItem = {
        _id: 'mock-menu-' + Math.random().toString(36).substring(2, 9),
        ...req.body,
        isAvailable: true
      };
      inMemoryMenu.push(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }
    const menuItem = await Menu.create(req.body);
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private (Admin Only)
router.put('/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const index = inMemoryMenu.findIndex(item => item._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      inMemoryMenu[index] = { ...inMemoryMenu[index], ...req.body };
      return res.status(200).json({ success: true, data: inMemoryMenu[index] });
    }

    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private (Admin Only)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const index = inMemoryMenu.findIndex(item => item._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      inMemoryMenu.splice(index, 1);
      return res.status(200).json({ success: true, message: 'Menu item removed successfully' });
    }

    const menuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, message: 'Menu item removed successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
