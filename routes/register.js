const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const User = require('../model/User');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
