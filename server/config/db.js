const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mashriq', {
      maxPoolSize: 5, // Limit connections on free tier to prevent container overhead
      serverSelectionTimeoutMS: 3000 // Fast fail for responsive fallback
    });
    console.log(`MongoDB Atlas Connection Established Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`\n======================================================================`);
    console.warn(`[WARNING] MongoDB Connection Failed: ${error.message}`);
    console.warn(`[RESILIENCE] Server is running in mock in-memory fallback mode.`);
    console.warn(`[ACTION] Start your local MongoDB service or update server/.env with`);
    console.warn(`         your MongoDB Atlas MONGO_URI to establish a live connection.`);
    console.warn(`======================================================================\n`);
    return false;
  }
};

module.exports = connectDB;
