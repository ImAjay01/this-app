const express = require('express');
const app = express();
require('dotenv').config(); // For reading .env file
const searchRoutes = require('./routes/searchRoutes');

// Middleware to serve static files (like index.html)
app.use(express.static('public'));

// Routes for search functionality
app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
