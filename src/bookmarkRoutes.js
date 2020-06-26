const express = require('express');
const { v4: uuid } = require('uuid');
let data = require('./store');
const logger = require('./logger');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route("/")
  .get((req, res) => {
    res.status(200).json(data);
  })
  .post(bodyParser, (req, res) => {
    const { title, rating, url, description } = req.body;
    const id = uuid();
	console.log('getting bookmark')

    if (!title || !url) {
      logger.error("Failed post : User didn't supply title or URL");
      res.status(400).json({ error: "Title and URL are required" });
    }

    const newBookmark = {
      id,
      title,
      rating,
      url,
      description,
    };

    data.push(newBookmark);
    logger.info(`Successful post : Bookmark ${title} was added with id: ${id}`);
    res.status(201).json(newBookmark);
  });

bookmarkRouter
	.route('/:id')
	.get((req, res) => {
		const { id } = req.params;
		let bookmark = data.find((bm) => bm.id === id);
	
		if (typeof bookmark === "undefined") {
		  logger.error(`Failed get book with id: ${id}`);
		  return res.status(404).send(`Bookmark with ${id} was not found`);
		}
	
		logger.info(
		  `Successful get : Bookmark ${bookmark.title} was retrieved with id: ${bookmark.id}`
		);
		res.status(201).json(bookmark);
	  })
	.delete((req, res) => {
		const { id } = req.params;
		let delBookmark = data.findIndex((bm) => bm.id === id);
	
		if (delBookmark === -1) {
		  logger.error(`Failed to delete : Bookmark ${delBookmark.title} `);
		  return res.status(404).send(`Bookmark with id ${id} was not found`);
		}
	
		data.splice(delBookmark, 1);
		logger.info(
		  `Successful delete : Bookmark ${delBookmark.title} was deleted with id: ${delBookmark.id}`
		);
		res.status(201).send(`Bookmark with id ${id} was deleted`);
	});

module.exports = bookmarkRouter;