// simple express server for tracking visit counts
// can deploy to railway, render, heroku, vercel, etc

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup - update the origin in production
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

// storing count in memory for now - should use a db in production
let visitCount = 0;

// initialize the count (can set a starting number here)
const initializeCount = () => {
  visitCount = 0;
};

initializeCount();

// get the current visit count
app.get('/api/visits', (req, res) => {
  res.json({
    success: true,
    count: visitCount
  });
});

// increment the visit count
app.post('/api/visits/increment', (req, res) => {
  visitCount += 1;
  res.json({
    success: true,
    count: visitCount
  });
});

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Visit counter API server running on port ${PORT}`);
  console.log(`Current visit count: ${visitCount}`);
});
