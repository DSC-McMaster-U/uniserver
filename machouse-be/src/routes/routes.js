const express = require('express');
const router = express.Router();

const secondary = require('./secondary.js');

// secondary example route
router.use('/secondary', secondary);

module.exports = router;
