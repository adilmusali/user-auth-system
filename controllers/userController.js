const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../config/mailer');

dotenv.config();

const generateTokens = (user) => {
    const payload = {
        user: {
            id: user.id,
            name: user.name,
        },
    };

    // Access Token (expires in 15 minutes)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Refresh Token (expires in 7 days)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Log the user object before saving
        console.log('Creating new user with email:', email);

        user = new User({
            name,
            email,
            password,  // Temporary, will be hashed below
        });

        const token = crypto.randomBytes(32).toString('hex');
        user.verificationToken = token;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        await sendVerificationEmail(user.email, token);

        res.status(201).json({ msg: 'Registration successful! Please check your email to verify your account.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ msg: 'Please verify your email address before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.refreshToken = async (req, res) => {
    // Get the refresh token from the cookie
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Find the user
        const user = await User.findOne({ refreshToken: token });
        if (!user) {
            return res.status(403).json({ msg: 'Invalid refresh token' });
        }

        // Verify the refresh token
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err || user.id !== decoded.user.id) {
                return res.status(403).json({ msg: 'Token verification failed' });
            }

            // If valid, generate a new access token
            const payload = { user: { id: user.id, name: user.name } };
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

            res.json({ accessToken });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.logoutUser = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.sendStatus(204);
    }
    
    const user = await User.findOne({ refreshToken: token });
    if (user) {
        user.refreshToken = null;
        await user.save();
    }
    
    res.clearCookie('refreshToken');
    res.status(200).json({ msg: 'Logged out successfully' });
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.verifyUser = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).send('<h1>Invalid or expired verification link.</h1>');
        }

        user.isVerified = true;
        user.verificationToken = null; // Token has been used, so clear it
        await user.save();

        res.send('<h1>Email successfully verified!</h1><p>You can now close this tab and log in.</p>');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('<h1>Server error during verification.</h1>');
    }
};