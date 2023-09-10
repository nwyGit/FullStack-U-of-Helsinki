import { useEffect, useState } from 'react';
import blogServices from '../services/blogs';

const Blog = ({ blog, value, handleUpdate, deleteBlog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [showDetail, setShowDetail] = useState(false);
	const [buttonContent, setButtonContent] = useState('show');
	const [likes, setLikes] = useState(blog.likes);
	const [, setUsers] = useState([]);
	const [blogCreator, setBlogCreator] = useState('');

	useEffect(() => {
		blogServices.findUser().then((users) => {
			setUsers(users);
			const creator = users.find((u) => u.id === blog.user).username;
			setBlogCreator(creator);
		});
	}, []);

	const toggleDetail = () => {
		setShowDetail(!showDetail);
		setButtonContent(showDetail ? 'show' : 'hide');
	};

	const updateLikes = (blog) => {
		setLikes((prev) => prev + 1);
		const updatedBlog = { ...blog, likes: likes + 1 };
		handleUpdate(updatedBlog);
	};

	return (
		<div style={blogStyle} className='blog'>
			{blog.title} {blog.author}{' '}
			<button id='#toggle-show-button' onClick={() => toggleDetail()}>
				{buttonContent}
			</button>
			{showDetail && (
				<div className='togglableContent'>
					<p>Url: {blog.url}</p>
					<p>
						Likes: {likes}{' '}
						<button onClick={() => updateLikes(blog)}>like</button>
					</p>
					<p>{blogCreator}</p>
					{blogCreator === value.user.username && (
						<button onClick={() => deleteBlog(blog)}>remove</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
