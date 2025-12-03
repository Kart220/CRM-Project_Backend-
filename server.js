const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./app/config/database');

// Load env vars
dotenv.config();


// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./app/routes/auth'));
app.use('/api/customers', require('./app/routes/customers'));
app.use('/api/cases', require('./app/routes/cases'));


// Test route - SIMPLE VERSION
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'CRM Backend API is running!',
        version: '1.0.0'
    });
});

// Test database connection route
app.get('/test-db', async (req, res) => {
    try {
        const mongoose = require('mongoose');
        res.json({
            success: true,
            database: mongoose.connection.name,
            status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Test the server: http://localhost:${PORT}/`);
    console.log(`🔗 Test database: http://localhost:${PORT}/test-db`);
});
