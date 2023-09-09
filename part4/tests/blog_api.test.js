import mongoose from 'mongoose';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../app.js';
import helper from './tests_helper.js';
import { Blog } from '../models/Blog.js';
import { User } from '../models/User.js';

const api = supertest(app);

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', passwordHash });
		await user.save();
		const user2 = new User({ username: 'root2', passwordHash });
		await user2.save();
	});

	test('creation succeeds with a fresh username', async () => {
		const userAtStart = await helper.usersInDb();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const userAtEnd = await helper.usersInDb();
		expect(userAtEnd).toHaveLength(userAtStart.length + 1);

		const usernames = userAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('expected `username` to be unique');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toEqual(usersAtStart);
	});

	test('creation fails with invalid username or password', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUserBadUsername = {
			username: 'ro',
			name: 'Superuser',
			password: 'sal',
		};

		const newUserBadPassword = {
			username: 'root',
			name: 'Superuser',
			password: 'sa',
		};

		const resultBadName = await api
			.post('/api/users')
			.send(newUserBadUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(resultBadName.body.error).toContain('minimum allowed length (3)');

		const resultBadPass = await api
			.post('/api/users')
			.send(newUserBadPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(resultBadPass.body.error).toContain('at least 3 characters long');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toEqual(usersAtStart);
	});
});

describe('when there is initially some blogs saved', () => {
	let token = '';

	beforeEach(async () => {
		await Blog.deleteMany({});
		let noteObject = new Blog(helper.initialBlogs[0]);
		await noteObject.save();
		noteObject = new Blog(helper.initialBlogs[1]);
		await noteObject.save();

		const existingUser = {
			username: 'root',
			password: 'sekret',
		};

		const response = await api
			.post('/api/login')
			.send(existingUser)
			.expect(200);
		token = response.body.token;
	});

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	}, 100000);

	test('all blogs are returned', async () => {
		const response = await api
			.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`);

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test('a specific blog is within the returned blogs', async () => {
		const response = await api
			.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`);

		const authors = response.body.map((r) => r.author);
		expect(authors).toContain('Michael Chan');
	});

	test('unique identifier is named id', async () => {
		const response = await api
			.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`);

		const ids = response.body.map((r) => r.id);
		expect(ids).toBeDefined();
	});
});

describe('addition of a new blog', () => {
	let token = '';

	beforeEach(async () => {
		const existingUser = {
			username: 'root',
			password: 'sekret',
		};

		const response = await api
			.post('/api/login')
			.send(existingUser)
			.expect(200);
		token = response.body.token;
	});

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'TEST',
			author: 'ADDITION 1',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
		};

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
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
			author: 'ADDITION 2',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		};

		const response = await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(response.body.likes).toBe(0);
	});

	test('blog without content is not added', async () => {
		const newBlog = {
			title: 'test',
		};

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(400);

		const blogsAtEnd = await helper.blogsInDb();

		// 2 blogs added
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2);
	});

	test('blog without content is not added', async () => {
		const newBlog = {
			title: 'TEST',
			author: 'ADDITION 1',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
		};

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer FAKE_TOKEN`)
			.send(newBlog)
			.expect(401);

		const blogsAtEnd = await helper.blogsInDb();

		// 2 blogs added
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2);
	});
});

describe('update of a blog', () => {
	let token = '';

	beforeEach(async () => {
		const existingUser = {
			username: 'root',
			password: 'sekret',
		};

		const response = await api
			.post('/api/login')
			.send(existingUser)
			.expect(200);
		token = response.body.token;
	});

	test('succeeds with status code 200 if the blog is updated', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[blogsAtStart.length - 1];

		const newBlog = {
			title: 'TEST',
			author: 'ADDITION 2',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 100,
		};

		const response = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(200);

		expect(response.body.likes).toBe(100);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if username matched', async () => {
		const existingUser = {
			username: 'root',
			password: 'sekret',
		};

		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

		const response = await api
			.post('/api/login')
			.send(existingUser)
			.expect(200);
		let token = response.body.token;

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		// 2 blogs added on test 'addition'
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2 - 1);

		const authors = blogsAtEnd.map((r) => r.author);
		expect(authors).not.toContain(blogToDelete.author);
	});

	test('fails with status code 400 if user is not the creator', async () => {
		const existingUser = {
			username: 'root2',
			password: 'sekret',
		};

		console.log(await helper.usersInDb());

		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

		const response = await api
			.post('/api/login')
			.send(existingUser)
			.expect(200);
		let token = response.body.token;

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(401);

		const blogsAtEnd = await helper.blogsInDb();

		// 2 blogs added on test 'addition', but 1 blog deleted successfully
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2 - 1);
	});
});

// close database connection
afterAll(async () => {
	await mongoose.connection.close();
});
