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
  .post(bodyParser, (req, res) => {
    const knexInstance= req.app.post('db');
    const {  title, url, description, rating } = req.body;
    if (!title) {
      logger.error('Title is required');
      return res
        .status(400)
        .send('Title is required');
    }
    if (!url) {
      logger.error('Description is required');
      return res
        .status(400)
        .send('Description is required');
    }
    if (!rating) {
      logger.error('Rating is required');
      return res
        .status(400)
        .send('Rating is required');
    }

    const newBookmark = {
      title: title,
      url: url,
      description: description,
      rating: rating,
    };

    BookmarksService.insertBookmark(knexInstance, newBookmark)
      .then(bookmarks => {
        res.status(201).json(bookmarks);
      });
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