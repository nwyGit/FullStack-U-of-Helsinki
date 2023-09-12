import { useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUserList } from './reducers/userListReducer';
import { Routes, Route, useMatch } from 'react-router-dom';
import BlogList from './components/BlogList';
import Navigation from './components/Navigation';
import UserList from './components/UserList';
import Blog from './components/Blog';
import { setUser } from './reducers/userReducer';
import User from './components/User';

const App = () => {
	const blogs = useSelector((state) => state.blogs);
	const userList = useSelector((state) => state.userList);
	const loggedUser = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			dispatch(setUser(user));
		}
	}, []);

	useEffect(() => {
		if (loggedUser) {
			dispatch(initializeBlogs());
			dispatch(setUserList());
		}
	}, [loggedUser]);

	const blogMatch = useMatch('/blogs/:id');

	const blog = blogMatch
		? blogs.find((blog) => blog.id === blogMatch.params.id)
		: null;

	const userMatch = useMatch('/users/:id');
	const user =
		userMatch && userList
			? userList.find((user) => user.id === userMatch.params.id)
			: null;

	if (loggedUser === null) return <LoginForm />;

	return (
		<div>
			<Notification />
			<Navigation user={loggedUser} />
			<br />
			<Routes>
				<Route
					path='/'
					element={<BlogList blogs={blogs} user={loggedUser} />}
				></Route>
				<Route path='/users' element={<UserList />}></Route>
				<Route path='/users/:id' element={<User user={user} />}></Route>
				<Route
					path='/blogs/:id'
					element={<Blog blog={blog} user={loggedUser} />}
				></Route>
			</Routes>
		</div>
	);
};

export default App;
