const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let token, movieId;
describe('/api/movies tests', () => {
  before((done) => {
    chai.request(server)
      .post('/authenticate')
      .send({
        username: 'fasfa',
        password: '123456'
      })
      .end((err, res) => {
        token = res.body.token;
        console.log(token);
        done();
      });
  });
  describe('/GET /api/movies test', () => {
    it('should get all movies', (done) => {
      chai.request(server)
        .get('/api/movies/movies?token='+token)
        //.set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });

  });
  describe('/POST /api/movies tests', ()=>{
    it('should post new movie', (done)=>{
      const movie = {
        title: 'test movie 499',
        category: 'test',
        country: 'Neverland',
        year: 2020,
        imdb_rating: 10
        };
      chai.request(server)
      .post('/api/movies/movies')
      .send(movie)
      .set('x-access-token', token)
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('title');
        res.body.should.have.property('category');
        res.body.should.have.property('country');
        res.body.should.have.property('year');
        res.body.should.have.property('imdb_rating');
        movieId = res.body._id;
        done();
      });
    });
  });
  describe('/GET /api/movies/:movie_id tests', ()=>{
    it('should get movie by given id', (done)=>{
      chai.request(server)
      .get('/api/movies/movies/'+movieId)
      .set('x-access-token', token)
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('title');
        res.body.should.have.property('category');
        res.body.should.have.property('country');
        res.body.should.have.property('year');
        res.body.should.have.property('imdb_rating');
        res.body.should.have.property('_id').eql(movieId);
        done();
      })
    });
  });
  describe('/PUT /api/movies tests', ()=>{
    it('should update movies', (done)=>{
      const movie = {
        title: 'test movie 500',
        category: 'test5',
        country: 'Neverlandz',
        year: 2040,
        imdb_rating: 9
        };
      chai.request(server)
      .put('/api/movies/movies/'+movieId)
      .send(movie)
      .set('x-access-token', token)
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('title').eql(movie.title);
        res.body.should.have.property('category').eql(movie.category);
        res.body.should.have.property('country').eql(movie.country);
        res.body.should.have.property('year').eql(movie.year);
        res.body.should.have.property('imdb_rating').eql(movie.imdb_rating);
        done();
      })
    });
  });
  describe('/DELETE /api/movies/:movie_id tests', ()=>{
    it('should delete movie by id', (done)=>{
      chai.request(server)
      .delete('/api/movies/movies/'+movieId)
      .set('x-access-token', token)
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.should.have.property('status').eql(1);
        done();
      });
    });
  });
});