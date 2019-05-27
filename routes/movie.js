const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Models
const Movie = require('../models/Movie');

// router.get('/movie', (req, res, next) => {
//   res.json({
//     status: 1
//   });
// });

router.post('/movie', (req, res, next) => {
  const movie = new Movie(req.body);
  // const { title, imdb_rating, category, country, year } = req.body;
  // const movie = new Movie({ title: title, imdb_rating: imdb_rating, category: category, country: country, year: year });
  // movie.save((err, data) => {
  //   if (err)
  //     res.json(err);
  //   res.json({status:1});
  // });

  const promise = movie.save();
  promise.then((data) => {
    res.json({
      status: 1
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;