import express from 'express';
import { Blog } from '../models/Blog.js';

const router = express.Router();

// Get all
router.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find({});
		res.json(blogs);
	} catch (err) {
		next(err);
	}
});

// Get one blog
router.get('/:id', async (req, res, next) => {
	try {
		const blog = Blog.findById(req.params.id);
		if (blog) {
			res.json(blog);
		} else {
			res.status(404).end();
		}
	} catch (err) {
		next(err);
	}
});

// Create a blog
router.post('/', async (req, res, next) => {
	const body = req.body;
	const newBlog = new Blog({ ...body, likes: Number(body.likes) || 0 });

	try {
		const savedBlog = await newBlog.save();
		res.status(201).json(savedBlog);
	} catch (err) {
		next(err);
	}
});

// Update a blog
router.put('/:id', async (req, res, next) => {
	const body = req.body;

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: Number(body.likes) || 0,
	};

	try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
			new: true,
		});
		res.json(blog);
	} catch (err) {
		next(err);
	}
});

// Delete a blog
router.delete('/:id', async (req, res, next) => {
	try {
		await Blog.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export default router;
