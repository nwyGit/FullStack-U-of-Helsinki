import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
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

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			<p>{user.username} logged in</p>
			<button onClick={() => window.localStorage.clear()}>logout</button>
			<br />
			<CreateNewBlog value={blogs} setter={{ setBlogs, setMessage }} />
			<br />
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
