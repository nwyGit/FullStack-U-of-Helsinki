import { useState, useEffect } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification';

const LoginForm = ({ setter }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setter.setUser(user);

			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Error: Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h2>log in to application</h2>
			<Notification message={errorMessage} />
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id='login-button' type='submit'>
					login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
