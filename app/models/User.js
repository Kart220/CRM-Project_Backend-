const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'agent', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    console.log('🔄 Hashing password (fast mode)...');
   
    this.password = await bcrypt.hash(this.password, 4);
    console.log('✅ Password hashed');
    next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    console.log('SKIPPING password hashing for fast testing');

    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
   
    return candidatePassword === this.password;
};