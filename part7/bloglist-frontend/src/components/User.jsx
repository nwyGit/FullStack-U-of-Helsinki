import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
	if (!user) {
		return null;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h6>Added blogs</h6>
			<ListGroup>
				{user.blogs
					.slice()
					.sort((a, b) => b.likes - a.likes)
					.map((blog) => (
						<div className='blog' key={blog.id}>
							<Link to={`/blogs/${blog.id}`}>
								<ListGroup.Item>
									{blog.title} {blog.author}
								</ListGroup.Item>
							</Link>
						</div>
					))}
			</ListGroup>
		</div>
	);
};

export default User;
