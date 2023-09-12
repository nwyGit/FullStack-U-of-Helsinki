import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import Button from 'react-bootstrap/esm/Button';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import CommentForm from './CommentForm';

const Blog = ({ blog, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const userList = useSelector((state) => state.userList);
	const dispatch = useDispatch();

	const [likes, setLikes] = useState(blog ? blog.likes : 0);
	const [blogCreator, setBlogCreator] = useState('');

	useEffect(() => {
		const creator = userList.find((u) => u.id === blog.user)?.username;
		setBlogCreator(creator);
	}, []);

	if (!blog) {
		return null;
	}

	const updateLikes = (blog) => {
		setLikes((prev) => prev + 1);
		const updatedBlog = { ...blog, likes: likes + 1 };
		handleUpdate(updatedBlog);
		dispatch(showNotification(`You liked '${blog.title}'`, 5, 'success'));
	};

	const handleUpdate = (blog) => {
		try {
			dispatch(updateBlog(blog));
		} catch (exception) {
			console.error(exception);
			dispatch(showNotification('Error: Fail to like the blog', 5, 'danger'));
		}
	};

	const handleDelete = (blog) => {
		if (window.confirm(`Remove ${blog.title} ${blog.author}`)) {
			dispatch(deleteBlog(blog.id));
			dispatch(
				showNotification(
					`A blog ${blog.title} by ${blog.author} deleted`,
					5,
					'info'
				)
			);
		}
	};

	return (
		<div style={blogStyle} className='blog'>
			<h3>
				{blog.title} {blog.author}{' '}
			</h3>
			<div>
				<a href={blog.url}>{blog.url}</a>
				<p>
					{likes} likes
					<Button onClick={() => updateLikes(blog)}>like</Button>
				</p>
				<p>added by {blogCreator}</p>
				<br />
				<div>
					<p>Comments</p>
					<CommentForm blog={blog} />
					<ul>
						{blog.comments?.length > 0
							? blog.comments.map((comment, idx) => {
									return <li key={idx}>{comment}</li>;
							  })
							: null}
					</ul>
				</div>
				{blogCreator === user.username ? (
					<Button variant='danger' onClick={() => handleDelete(blog)}>
						remove
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default Blog;
