const express = require('express');
const { searchContent } = require('../controllers/searchController');
const router = express.Router();

// Route that handles search requests
router.get('/', searchContent);

module.exports = router;
