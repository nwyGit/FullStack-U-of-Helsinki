import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { showNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';
import { commentBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const CommentForm = ({ blog }) => {
	const dispatch = useDispatch();
	const { reset: commentReset, ...comment } = useField('text', 'comment');

	const handleComment = async (event) => {
		event.preventDefault();
		try {
			const commentedBlog = {
				...blog,
				comments: blog.comments.concat(comment.value),
			};
			dispatch(commentBlog(commentedBlog));
			commentReset();
		} catch (exception) {
			console.error(exception);
			dispatch(showNotification('Error: Fail to comment', 5, 'danger'));
		}
	};

	return (
		<Form onSubmit={handleComment}>
			<Form.Group className='mb-3'>
				<Form.Control {...comment} />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Add comment
			</Button>
		</Form>
	);
};

export default CommentForm;
