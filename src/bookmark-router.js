const express = require('express');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const bookmarks = require('./store');
const logger = require('./logger');
const BookmarksService = require('./bookmarks-service');

bookmarkRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance= req.app.get('db');
    BookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {

    const {  title, url, description, rating } = req.body;
    const newBookmark = { title, url, rating }

    for(const [key, value] of Object.entries(newBookmark)) {
      if(value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body`}
        })
      }
    }

    BookmarksService.insertBookmark(
      req.app.get('db'),
      newBookmark
    )
    .then(bookmark => {
      res 
        .status(201)
        .location(`/bookmarks/${bookmarks.id}`)
        .json(bookmark)
    })
    .catch(next)
  });

bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    let newID = req.params.id;
    let foundIndex = bookmarks.findIndex(bookmark => {
      return bookmark.id === newID;
    });
    res.json(bookmarks[foundIndex]);
  })
  .delete((req, res) => {
    let newId  = req.params.id;
    let deletedBookmark = bookmarks.findIndex(bookmark => {
      return bookmark.id === newId;
    });
    bookmarks.splice(deletedBookmark, 1);
    res.status(204).send('Bookmark deleted successfully.');
  });


module.exports = bookmarkRouter;


///const actualDate = new Date(res.body.date_published).toLocaleString()
//const expectedDate = new Date().toLocaleString
//expect(actualDate).to.eql(expectedDate) 