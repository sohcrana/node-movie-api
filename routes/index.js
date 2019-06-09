const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Heroku'
  });
});
router.post('/register', (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const user = new User({
        username,
        password: hash
      });
      const promise = user.save();
      promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      });
    });
  });
});

router.post('/authenticate', (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
      username
    }, (err, user) => {
      if (err)
        throw err;
      if (!user) {
        res.json({
          status: false,
          message: 'Authentication failed, user not found.'
        });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err)
            throw err;
          if (!result) {
            res.json({
              message: 'failed'
            })
          } else {
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn: 720
            });
            res.json({
              status: true,
              token
            });
          };
        });

      };
  });


});
module.exports = router;