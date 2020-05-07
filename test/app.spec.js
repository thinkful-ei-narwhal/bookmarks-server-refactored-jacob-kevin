'use strict';

const app = require('../src/app');

describe('App', () => {
  // it('GET / responds with 200 containing "Hello, world!"', () => {
  //   return supertest(app)
  //     .get('/')
  //     .expect(200, 'Hello, world!');
  // });]

  it('GET /bookmarks responds with 200 containing an array of bookmarks', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).to.be.an('array');
      });
  });
  it('POST /bookmarks responds with 200, confirming bookmark is a bookmark', () => {
    return supertest(app)
      .post('/bookmarks')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .send({
        title: "someTitle",
        description: "someDescription",
        rating: 5
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.keys(["title", "description", "rating", "id"]);
      });
  });
  it('DELETE /bookmarks responds with 204, should NOT have an object with matching Id', () => {
    return supertest(app)
      .delete('/bookmarks/05995f6e-39dd-442b-8953-9b57c65faeb6')
      .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
      .expect(204)
      });
  });

//test every endpoint, make sure that the endpoint is returning what's expected