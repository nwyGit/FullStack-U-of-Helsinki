import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateNewBlog = ({ handler }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [buttonContent, setButtonContent] = useState('create new blog');

	const createBlog = (event) => {
		event.preventDefault();

		handler({
			title,
			author,
			url,
		});

		setTitle('');
		setAuthor('');
		setUrl('');
	};

	const toggleForm = () => {
		setShowForm(!showForm);
		setButtonContent(showForm ? 'create new blog' : 'cancel');
	};

	return (
		<div>
			<h2>CreateNewBlog</h2>
			{showForm && (
				<form onSubmit={createBlog}>
					<div>
						title:
						<input
							id='title'
							type='text'
							value={title}
							name='Title'
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						author:
						<input
							id='author'
							type='author'
							value={author}
							name='Author'
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</div>
					<div>
						url:
						<input
							id='url'
							type='url'
							value={url}
							name='Url'
							onChange={(e) => setUrl(e.target.value)}
						/>
					</div>
					<button type='submit'>create</button>
				</form>
			)}
			<button onClick={() => toggleForm()}>{buttonContent}</button>
		</div>
	);
};

CreateNewBlog.propTypes = {
	handler: PropTypes.func.isRequired,
};

export default CreateNewBlog;
