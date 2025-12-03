require('dotenv').config();
const mongoose = require('mongoose');

// Connect to database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(' Database connection error:', error.message);
        process.exit(1);
    }
};


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createUser() {
    try {
        console.log(' Connecting to database...');
        await connectDB();
        
        console.log(' Creating pre-made user...');
        
       
        const user = await User.create({
            username: 'Test',
            password: 'Test@1213', 
            role: 'admin'
        });
        
        console.log('User created successfully!');
        console.log('User details:');
        console.log('   - Username:', user.username);
        console.log('   - Role:', user.role);
        console.log('   - ID:', user._id);
        
        console.log('\n You can now login with:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error(' Error creating user:', error.message);
        process.exit(1);
    }
}

createUser();