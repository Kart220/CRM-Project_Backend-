const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        
        console.log('Database URI: FOUND');
        console.log('Connecting to MongoDB...');
        
        if (!uri) {
            throw new Error('No MongoDB connection string found in environment variables');
        }
        
    
        const conn = await mongoose.connect(uri);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`✅ Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;