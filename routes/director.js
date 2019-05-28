const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Director = require('../models/Director');

/* GET home page. */
router.post('/directors', (req, res, next) => {
  const director = new Director(req.body);

  const promise = director.save();
  promise.then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;