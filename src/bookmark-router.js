const express = require('express');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const logger = require('./logger');
const BookmarksService = require('./bookmarks-service');


bookmarkRouter.get('/bookmarks/:id', (req, res, next) => {
  BookmarksService.getBookmarkById(req.app.get('db'), req.params.id)
    .then(bookmark => {
      if(bookmark) {
        res.json(bookmark)
      }
      else {
        res.status(404).json({
          message: 'Message not found'
        })
      }
    })
})




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
    const newBookmark = { title, url, rating };

    for(const [key, value] of Object.entries(newBookmark)) {
      if(value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body`}
        });
      }
    }

    BookmarksService.insertBookmark(
      req.app.get('db'),
      newBookmark
    )
      .then(bookmark => {
        res 
          .status(201)
          .json(bookmark);
      })
      .catch(next);
  });

bookmarkRouter
  .route('/bookmarks/:id')

  .patch(bodyParser, (req, res, next) => {
    const { title, url, description, rating } = req.body
    const bookmarkToUpdate = { title, url, description, rating }

    BookmarksService.updateBookmarkById(
      req.app.get('db'),
      req.params.id,
      bookmarkToUpdate
    )
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
  })


  .delete((req, res, next) => {
    BookmarksService.deleteBookmarkById(
      req.app.get('db'),
      req.params.id
    )
      .then(() => {
       return res.status(204).end();
      })
      .catch(next);
  });






module.exports = bookmarkRouter;


