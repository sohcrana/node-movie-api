const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie_user:user1234@ds261716.mlab.com:61716/heroku_4v1wwq3h', { useNewUrlParser: true });
  mongoose.connection.on('open', ()=>{
    console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err)=>{
    console.log('MongoDB: Error', err);
  });
  mongoose.Promise = global.Promise;
};