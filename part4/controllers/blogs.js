import express from 'express';
import { Blog } from '../models/Blog.js';

const router = express.Router();

// Get all
router.get('/', (req, res, next) => {
	Blog.find({})
		.then((blogs) => res.json(blogs))
		.catch((err) => next(err));
});

// Get one blog
// router.get('/:id', (req, res, next) => {
// 	Blog.findById(req.params.id)
// 		.then((blog) => {
// 			if (blog) {
// 				res.json(blog);
// 			} else {
// 				res.status(404).end();
// 			}
// 		})
// 		.catch((err) => next(err));
// });

// Create a blog
router.post('/', (req, res, next) => {
	const newBlog = new Blog(req.body);

	newBlog
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => next(err));
});

// Update a blog
// router.put('/:id', (req, res, next) => {
// 	const body = req.body;

// 	if (!body.name || !body.number) {
// 		res.status(400).send({ error: 'The name or number is missing' });
// 	}

// 	const newBlog = {
// 		title: body.title,
// 		author: body.author,
// 		url: body.url,
// 		likes: Number(body.likes),
// 	};

// 	Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
// 		.then((updatedNote) => {
// 			res.json(updatedNote);
// 		})
// 		.catch((err) => next(err));
// });

// Delete a blog
// router.delete('/:id', (req, res, next) => {
// 	Blog.findByIdAndRemove(req.params.id)
// 		.then(() => {
// 			res.status(204).end();
// 		})
// 		.catch((err) => next(err));
// });

export default router;
