import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import loginServices from '../services/login';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navigation = ({ user }) => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand>Blogs</Navbar.Brand>
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Link to='/' className='me-2'>
							blogs
						</Link>
						<Link to='/users' className='me-2'>
							users
						</Link>
					</Nav>
					<Nav className='justify-content-end'>
						<Navbar.Text className='me-2'>
							Signed in as: {user.username}
						</Navbar.Text>
						<Button onClick={() => loginServices.logout()}>logout</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
