const express = require('express');
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// POST api/auth/register
// Register user

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        registerUser(req, res);
    }
);

// POST api/auth/login
// Authenticate user & get token

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        loginUser(req, res);
    }
);

module.exports = router;
