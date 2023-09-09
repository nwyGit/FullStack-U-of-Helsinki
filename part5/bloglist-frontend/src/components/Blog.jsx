import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [showDetail, setShowDetail] = useState(false);
	const [buttonContent, setButtonContent] = useState('hide');
	const [likes, setLikes] = useState(blog.likes);

	const toggleDetail = () => {
		setShowDetail(!showDetail);
		setButtonContent(showDetail ? 'hide' : 'show');
	};

	const updateLikes = () => {
		blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
		setLikes((prev) => prev + 1);
	};

	const deleteBlog = (id) => {
		if (window.confirm(`Remove ${blog.title} ${blog.author}`)) {
			blogService.deleteBlog(id);
		}
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}{' '}
			<button onClick={() => toggleDetail()}>{buttonContent}</button>
			{showDetail && (
				<>
					<p>{blog.url}</p>
					<p>
						{likes} <button onClick={() => updateLikes()}>like</button>
					</p>
					<p>{user.name}</p>
					<button onClick={() => deleteBlog(blog.id)}>remove</button>
				</>
			)}
		</div>
	);
};

export default Blog;
