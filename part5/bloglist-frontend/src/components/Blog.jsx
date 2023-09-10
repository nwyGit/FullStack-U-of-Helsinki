import { useState } from 'react';

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
		<li style={blogStyle} className='blog'>
			{blog.title} {blog.author}{' '}
			<button onClick={() => toggleDetail()}>{buttonContent}</button>
			{showDetail && (
				<div className='togglableContent'>
					<p>{blog.url}</p>
					<p>
						{likes} <button onClick={() => updateLikes(blog)}>like</button>
					</p>
					<p>{value.user.name}</p>
					<button onClick={() => deleteBlog(blog)}>remove</button>
				</div>
			)}
		</li>
	);
};

export default Blog;
