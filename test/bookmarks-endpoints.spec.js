// const { expect } = require('chai')
// const knex = require('knex')
// const app = require('../src/app')

// describe.only('Articles Endpoints', function() {
//     let db;

//     before('make knex instace ', () => {
//         db = knex({
//             client: 'pg',
//             connection: process.env.TEST_DB_URL,
//         })

//         app.set('db', db)
//     })

//     after('disconnect from the db', () => db.destroy())

//     before('clean the table', () => db('bookmarks').truncate())

//     context('Given that bookmarks has data', () => {
//         const testBookmarks = [
//            {
//             id: 1,
//             title: 'Test Title 1',
//             url: 'TestURL1.com',
//             description: 'Test Description 1',
//             rating: 1
//            },
//            {
//             id: 2,
//             title: 'Test Title 2',
//             url: 'TestURL2.com',
//             description: 'Test Description 2',
//             rating: 1
//            },
//            {
//             id: 3,
//             title: 'Test Title 3',
//             url: 'TestURL3.com',
//             description: 'Test Description 3',
//             rating: 1
//            },
//            {
//             id: 4,
//             title: 'Test Title 4',
//             url: 'TestURL4.com',
//             description: 'Test Description 4',
//             rating: 1
//            }
//         ]

//         beforeEach('insert test bookmarks', () => {
//             return db 
//                 .into('bookmarks')
//                 .insert(testBookmarks)
//         })

//         it('GET /bookmarks responds with 200 and returns all bookmarks', () => {
//             return supertest(app)
//                 .get('/bookmarks')
//                 .expect(200)
//         })
//     })
// })