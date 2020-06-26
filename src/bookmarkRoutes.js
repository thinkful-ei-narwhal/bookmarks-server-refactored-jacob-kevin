const express = require('express');
const { v4: uuid } = require('uuid');
let bookList = require('./store');
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

    data.push(newBm);
    logger.info(`Successful post : Bookmark ${title} was added with id: ${id}`);
    res.status(201).json(newBm);
  });

bookmarkRouter
	.route('/:id')
	.get((req, res) => {
		const id = req.params.id;

		const book = bookList.find((book) => {
			return id === book.id;
		});

		if (!book) {
			logger.error('Book not found');
			return res.status(404).send('Could not found the book');
		}

		res.status(201).json(book);
	})
	.delete((req, res) => {
		const id = req.params.id;

		const book = bookList.find((book) => {
			return id === book.id;
		});

		if (!book) {
			logger.error('Book not found');
			return res.status(404).send('Could not found the book');
		}

		if (book) {
			bookList = bookList.filter((item) => {
				item.id !== book.id;
			});
			return res.status(200).send('deleted');
		}
	});

module.exports = bookmarkRouter;