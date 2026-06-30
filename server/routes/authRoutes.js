const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple hardcoded credentials for Ahmad
  const OWNER_USERNAME = 'ahmad';
  const OWNER_PASSWORD = 'mashriq123'; // Admin password for demo

  if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
    // Generate JWT
    const token = jwt.sign(
      { username: OWNER_USERNAME, role: 'owner' },
      process.env.JWT_SECRET || 'super_secret_mashriq_key_by_ahmad_12345',
      { expiresIn: '7d' }
    );

    // Set cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    return res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({ success: true, message: 'Logged in successfully', user: { username: OWNER_USERNAME } });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

// @desc    Admin Logout
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// @desc    Check auth session
// @route   GET /api/auth/me
// @access  Private/Public
router.get('/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ success: false, isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_mashriq_key_by_ahmad_12345');
    return res.status(200).json({ success: true, isAuthenticated: true, user: { username: decoded.username } });
  } catch (err) {
    return res.status(200).json({ success: false, isAuthenticated: false });
  }
});

module.exports = router;
