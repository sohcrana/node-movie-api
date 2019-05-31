const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Director = require('../models/Director');

router.get('/directors', (req, res, next) => {
  const promise = Director.aggregate([{
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }

  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/directors/:director_id', (req, res) => {
  const promise = Director.aggregate([{
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }

  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/directors/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true
  });
  promise.then((data) => {
    if (!data)
      next({
        message: 'The director was mot found',
        code: 99
      });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/directors/:director_id', (req, res, next)=>{
  const promise = Director.findById(req.params.director_id);
  promise.then((data)=>{

    if (!data)
      next({
        message: 'The movie was not found.',
        code: 99
      });

    Director.remove({
      _id: mongoose.Types.ObjectId(req.params.director_id)
    }, (err, data) => {
      console.log(err);
    });
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});







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