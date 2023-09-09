import React, { useState } from 'react';
import blogs from '../services/blogs';

const CreateNewBlog = ({ value, setter }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [buttonContent, setButtonContent] = useState('create new blog');

	const handleCreate = async (event) => {
		event.preventDefault();

		try {
			const blog = await blogs.create({
				title,
				author,
				url,
			});

			setter.setBlogs([...value, blog]);
			setter.setMessage(`a new blog ${title} by ${author} added`);

			setTitle('');
			setAuthor('');
			setUrl('');
		} catch (exception) {
			setter.setMessage('Error: Fail to create new blog');
			setTimeout(() => {
				setter.setMessage(null);
			}, 5000);
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
		setButtonContent(showForm ? 'create new blog' : 'cancel');
	};

	return (
		<div>
			<h2>CreateNewBlog</h2>
			{showForm && (
				<form onSubmit={handleCreate}>
					<div>
						title:
						<input
							type='text'
							value={title}
							name='Title'
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author:
						<input
							type='author'
							value={author}
							name='Author'
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						url:
						<input
							type='url'
							value={url}
							name='Url'
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
					<button type='submit'>create</button>
				</form>
			)}
			<button onClick={() => toggleForm()}>{buttonContent}</button>
		</div>
	);
};

export default CreateNewBlog;
