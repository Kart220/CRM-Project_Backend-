const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const models = {};

// Load all model files automatically
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => {
        const modelPath = path.join(__dirname, file);
        const modelName = path.basename(file, '.js');
        
        // Check if model already exists
        if (!mongoose.models[modelName]) {
            const model = require(modelPath);
            models[modelName] = model;
        } else {
            models[modelName] = mongoose.models[modelName];
        }
    });

module.exports = models;