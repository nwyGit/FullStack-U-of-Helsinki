import express from 'express';
import { Blog } from '../models/Blog.js';
import { User } from '../models/User.js';

const blogsRouter = express.Router();

// Get all blogs
blogsRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find({});
		res.json(blogs);
	} catch (err) {
		next(err);
	}
});

// Get one blog
blogsRouter.get('/:id', async (req, res, next) => {
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
blogsRouter.post('/', async (req, res, next) => {
	const body = req.body;

	try {
		const user = await User.findById(req.user);

		const newBlog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: Number(body.likes) || 0,
			user: user.id,
		});

		const savedBlog = await newBlog.save();

		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		res.status(201).json(savedBlog);
	} catch (err) {
		next(err);
	}
});

// Update a blog
blogsRouter.put('/:id', async (req, res, next) => {
	const body = req.body;

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: Number(body.likes) || 0,
	};

	try {
		const { user } = await Blog.findById(req.params.id);

		if (req.user != user.toString()) {
			return res.status(401).json({ error: 'you are not the blog creator' });
		}

		const blog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
			new: true,
		});
		res.json(blog);
	} catch (err) {
		next(err);
	}
});

// Delete a blog
blogsRouter.delete('/:id', async (req, res, next) => {
	try {
		const { user } = await Blog.findById(req.params.id);

		if (req.user != user.toString()) {
			return res.status(401).json({ error: 'you are not the blog creator' });
		}

		await Blog.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export default blogsRouter;
