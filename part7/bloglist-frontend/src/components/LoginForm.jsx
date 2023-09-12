import Notification from './Notification';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { showNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import loginService from '../services/login';

const LoginForm = () => {
	const dispatch = useDispatch();

	const { reset: usernameReset, ...username } = useField('text', 'username');
	const { reset: passwordReset, ...password } = useField('text', 'username');

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = {
				username: username.value,
				password: password.value,
			};
			const loggedInUser = await loginService.login(user);
			dispatch(setUser(loggedInUser));
			usernameReset();
			passwordReset();
		} catch (exception) {
			console.error(exception);
			dispatch(showNotification('Error: Wrong credentials', 5, 'danger'));
		}
	};

	return (
		<div>
			<h2>Log in to application</h2>
			<Notification />
			<Form onSubmit={handleLogin}>
				<Form.Group className='mb-3'>
					<Form.Label>Username</Form.Label>
					<Form.Control {...username} />
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control {...password} />
				</Form.Group>

				<Button variant='primary' id='login-button' type='submit'>
					login
				</Button>
			</Form>
		</div>
	);
};

export default LoginForm;
