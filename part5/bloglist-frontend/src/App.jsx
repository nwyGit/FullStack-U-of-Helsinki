import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginServices from './services/login';
import LoginForm from './components/LoginForm';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	if (user === null) return <LoginForm setter={{ setUser }} />;

	const handleCreate = async (blog) => {
		try {
			const newBlog = await blogService.create(blog);

			setBlogs([...blogs, newBlog]);

			setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			setMessage('Error: Fail to create new blog');
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleUpdate = async (blog) => {
		try {
			const newBlog = await blogService.update(blog.id, blog);

			setMessage(`blog ${newBlog.title} by ${newBlog.author} updated`);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			setMessage('Error: Fail to update blog');
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const deleteBlog = (blog) => {
		if (window.confirm(`Remove ${blog.title} ${blog.author}`)) {
			blogService.deleteBlog(blog.id);
			const newBlogs = blogs.filter((b) => b.id != blog.id);
			setBlogs(newBlogs);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			<p>{user.username} logged in</p>
			<button onClick={() => loginServices.logout()}>logout</button>
			<br />
			<CreateNewBlog handler={handleCreate} />
			<br />
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						value={{ user }}
						handleUpdate={handleUpdate}
						deleteBlog={deleteBlog}
					/>
				))}
		</div>
	);
};

export default App;
