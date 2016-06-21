var supertest = require ('supertest');
var app = require('../app');
var agent = supertest.agent(app);

describe('http requests', function () {

  describe('GET /wiki', function () {
    it('gets 200 on index', function (done) {
      agent
      .get('/wiki')
      .expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done) {
      agent
      .get('/wiki/add')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', function(done) {
      agent
      .get('/wiki/notarealpage')
      .expect(404, done);
    });
    it('responds with 200 on page that does exist', function(done) {
      agent
      .get('/wiki/Whats_up')
      .expect(200, done);
    });
  });

  describe('GET /wiki/search', function () {
    it('responds with 200', function(done) {
      agent
      .get('/wiki/search')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist', function(done) {
      agent
      .get('/wiki/something/similar')
      .expect(404, done);
    });
    it('responds with 200 for similar page', function (done) {
      agent
      .get('/wiki/foo/similar')
      .expect(200, done);
    });
  });

  describe('POST /wiki', function () {
    it('responds with 302', function(done) {
       agent
      .post('/wiki')
      .send({name: 'Donald', email: 'winners4Trump@trump.com', title: 'Why The Donald is the best', content: 'because he says so'})
      .expect(302, done);
    });
    it('creates a page in the database');
  });

});
