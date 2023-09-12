import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const UserList = () => {
	const userList = useSelector((state) => state.userList);
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			<h2>Users</h2>
			<Table>
				<thead>
					<tr>
						<th>user</th>
						<th>blogs created</th>
					</tr>
					{userList.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>
								{blogs ? blogs.filter((b) => b.user === user.id).length : null}
							</td>
						</tr>
					))}
				</thead>
			</Table>
		</div>
	);
};

export default UserList;
