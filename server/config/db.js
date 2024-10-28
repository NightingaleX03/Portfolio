// /server/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://smthayil03:d6Hj2YffC51BJ1UB@portfolio-website.6ou58.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-website', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
