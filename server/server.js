// /server/server.js

const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects');
const dbConfig = require('./config/db'); // Importing DB config

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Database Connection
dbConfig(); // Calling the function to connect to MongoDB

// API Routes
app.use('/api/projects', projectRoutes); // Mounting project routes

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
