const express = require('express');
const router = express.Router();

// Assuming middleware functions are exported from 'authMiddleware.js'
const { verifyToken, verifyAdmin } = require('./auth_middleware');

// Protected route accessible only to users with a valid JWT and 'admin' role
router.get('/protected', verifyToken, (req, res) => {
    // If the middleware does not block the request, the user is authenticated and authorized
    res.send('Welcome to the protected area, Admin!');
});

router.get('/admin', verifyAdmin, (req, res) => {
    // If the middleware does not block the request, the user is authenticated and authorized as admin
    res.send('Welcome to the protected area, Admin!');
});

module.exports = router;