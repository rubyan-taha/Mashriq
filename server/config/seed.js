const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('../models/Menu');

// Load env vars
dotenv.config({ path: './server/.env' });
// Also fallback load from same folder
dotenv.config();

const menuItems = [
  {
    cuisine: "desi",
    category: "starters",
    title: "Chicken Tikka",
    price: 1499,
    description: "Smoked, fire-grilled tender chicken marinated in red tandoori spices and served with fresh mint chutney.",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    cuisine: "desi",
    category: "mains",
    title: "Chicken Cheese Handi",
    price: 2499,
    description: "Rich, creamy chicken gravy cooked in a clay pot, layered with melt-in-mouth cheese, ginger, and green chilies.",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    cuisine: "italian",
    category: "mains",
    title: "Four Cheese Pizza",
    price: 1899,
    description: "Neapolitan wood-fired crust layered with fresh mozzarella, gorgonzola, parmesan, and creamy ricotta.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    cuisine: "italian",
    category: "desserts",
    title: "Classic Tiramisu",
    price: 899,
    description: "Layers of espresso-soaked ladyfingers and velvety sweet mascarpone cream, dusted with dark cocoa powder.",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    cuisine: "arabic",
    category: "starters",
    title: "Hummus & Warm Pita",
    price: 799,
    description: "Velvety blend of chickpeas, rich tahini, fresh lemon juice, drizzled with premium olive oil and served with hot pita bread.",
    imageUrl: "https://images.unsplash.com/photo-1577906096429-f73ae2c3c263?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  },
  {
    cuisine: "arabic",
    category: "mains",
    title: "Chicken Mandi",
    price: 2299,
    description: "Slow-cooked traditional spiced chicken served on a bed of aromatic long-grain basmati rice, accompanied by spicy shatta sauce.",
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    isAvailable: true
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mashriq';
    await mongoose.connect(mongoUri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB for seeding...');

    await Menu.deleteMany();
    console.log('Existing menu items deleted.');

    await Menu.insertMany(menuItems);
    console.log(`${menuItems.length} menu items successfully seeded into the database.`);

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
