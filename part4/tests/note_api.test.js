import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import helper from './tests_helper.js';
import { Blog } from '../models/Blog.js';

const api = supertest(app);

// inject some data
beforeEach(async () => {
	await Blog.deleteMany({});
	let noteObject = new Blog(helper.initialBlogs[0]);
	await noteObject.save();
	noteObject = new Blog(helper.initialBlogs[1]);
	await noteObject.save();
});

describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	}, 100000);

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs');

		const authors = response.body.map((r) => r.author);
		expect(authors).toContain('Michael Chan');
	});

	test('unique identifier is named id', async () => {
		const response = await api.get('/api/blogs');

		const ids = response.body.map((r) => r.id);
		expect(ids).toBeDefined();
	});
});

describe('addition of a new blog', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'TEST',
			author: 'Edsger W. ',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const notesAtEnd = await helper.blogsInDb();
		expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const contents = notesAtEnd.map((n) => n.title);
		expect(contents).toContain('Go To Statement Considered Harmful');
	});

	test('missing likes property will be set to 0', async () => {
		const newBlog = {
			title: 'TEST',
			author: 'Edsger W. ',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		};

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(response.body.likes).toBe(0);
	});

	test('blog without content is not added', async () => {
		const newBlog = {
			title: 'test',
		};

		await api.post('/api/blogs').send(newBlog).expect(400);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe('update of a blog', () => {
	test('succeeds with status code 200 if the blog is updated', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];
		
		const newBlog = {
			title: 'TEST',
			author: 'Edsger W. ',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 100,
		};

		const response = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200);

		expect(response.body.likes).toBe(100);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const authors = blogsAtEnd.map((r) => r.author);

		expect(authors).not.toContain(blogToDelete.author);
	});
});

// close database connection
afterAll(async () => {
	await mongoose.connection.close();
});
