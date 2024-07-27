const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// GET api/protected
// Protected route
// Private
router.get('/', auth, (req, res) => {
    res.json({ msg: 'Welcome to the protected route!' });
});

module.exports = router;
