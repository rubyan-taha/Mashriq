const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.io with CORS configured for React dev port
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Real-time notification handler on connection
io.on('connection', (socket) => {
  console.log(`New WebSocket client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Middleware to inject Socket.io instance into req objects
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Security & Parsing Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Sanitization to prevent NoSQL query injections
app.use(mongoSanitize());

// Custom simple XSS escape filter middleware (removes/escapes <script> and tags)
app.use((req, res, next) => {
  const sanitizeValue = (val) => {
    if (typeof val === 'string') {
      return val.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    if (typeof val === 'object' && val !== null) {
      for (let key in val) {
        val[key] = sanitizeValue(val[key]);
      }
    }
    return val;
  };
  
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.query) req.query = sanitizeValue(req.query);
  next();
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

// Basic status check route
app.get('/status', (req, res) => {
  res.status(200).json({ success: true, message: 'Mashriq API Server running smoothly' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error Triggered:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Port Binding
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Express API Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
