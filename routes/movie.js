const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Models
const Movie = require('../models/Movie');

router.get('/movies', (req, res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// top10 endpoint'i
router.get('/top10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort({
    imdb_rating: 1
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// between endpoint'i

router.get('/between/:start_year/:end_year', (req, res) => {
  const promise = Movie.find({
    year: {
      '$gte': parseInt(req.params.start_year),
      '$lte': parseInt(req.params.end_year)
    }
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// ID bazlı movie endpoint'i
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    !movie ? next({
      message: 'The movie was not found.',
      code: 99
    }) : res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// router.get('/movie', (req, res, next) => {
//   res.json({
//     status: 1
//   });
// });

// ID bazlı update
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  });
  promise.then((movie) => {
    !movie ? next({
      message: 'The movie was not found.',
      code: 99
    }) : res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// ID bazlı silme
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    if (!movie)
      next({
        message: 'The movie was not found.',
        code: 99
      });

    Movie.remove({
      _id: mongoose.Types.ObjectId(req.params.movie_id)
    }, (err, data) => {
      console.log(err);
    });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/movies', (req, res, next) => {
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