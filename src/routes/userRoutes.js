const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.get('/profile', authenticate, (req, res) => {
    res.json({
        message: "Protected profile data",
        user: req.user
    });
});

router.get('/admin', authenticate, authorize('ADMIN'), (req, res) => {
    res.json({
        message: "Admin panel access granted"
    });
});

module.exports = router;