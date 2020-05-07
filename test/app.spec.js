const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeBookmarksArray } = require('./bookmarks.fixtures')


describe('Bookmarks Endpoints', function() {
    let db;

    before('make knex instace ', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })

        app.set('db', db)
    })

    after('disconnect from the db', () => db.destroy())

    before('clean the table', () => db('bookmarks_table').truncate())

    afterEach('cleanup', () => db('bookmarks_table').truncate())


    context('Given that bookmarks has data', () => {
        
      const testBookmarks = makeBookmarksArray()

        beforeEach('insert test bookmarks', () => {
            return db 
                .into('bookmarks_table')
                .insert(testBookmarks)
        })

        it('GET /bookmarks responds with 200 and returns all bookmarks', () => {
            return supertest(app)
                .get('/bookmarks')
                .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
                .expect(200, testBookmarks)
        })
    })

    context('GET/bookmarks when there is not data', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
          .expect(200, [])
      })
    })

    
  describe(`POST /bookmarks`, () => {

  
  const requiredFields = ['title', 'url', 'rating']

  requiredFields.forEach(field => {
    const newBookmark = {
      title: 'test title',
      url: 'test url',
      rating: '5.00'
    }

    it(`responds with 400 and an error message when the ${field} is missing`, () => {
      delete newBookmark[field]

      return supertest(app)
        .post('/bookmarks')
        .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
        .send(newBookmark)
        .expect(400, {
          error: { message: `Missing '${field}' in request body`}
        })
    })
  })
})

})

