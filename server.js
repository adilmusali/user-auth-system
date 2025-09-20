const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true 
}));

app.use(cookieParser());

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/protected', require('./routes/protected'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
