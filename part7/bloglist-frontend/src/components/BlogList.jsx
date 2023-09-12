import { showNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import CreateNewBlog from './CreateNewBlog';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const BlogList = ({ blogs }) => {
	const dispatch = useDispatch();

	const handleCreate = async (blog) => {
		try {
			dispatch(createBlog(blog));
			dispatch(
				showNotification(
					`A new blog ${blog.title} by ${blog.author} added`,
					5,
					'success'
				)
			);
		} catch (exception) {
			console.error(exception);
			dispatch(showNotification('Error: Fail to create new blog', 5, 'danger'));
		}
	};

	if (!blogs) {
		return null;
	}

	return (
		<>
			<CreateNewBlog handleCreate={handleCreate} />
			<br />
			<ListGroup>
				{blogs
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
		</>
	);
};

export default BlogList;
