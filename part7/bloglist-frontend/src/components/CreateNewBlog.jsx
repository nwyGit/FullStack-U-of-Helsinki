import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useField } from '../hooks';

const CreateNewBlog = ({ handleCreate }) => {
	const { reset: titleReset, ...title } = useField('text', 'title');
	const { reset: authorReset, ...author } = useField('text', 'author');
	const { reset: urlReset, ...url } = useField('text', 'url');
	const [showForm, setShowForm] = useState(false);

	const createBlog = (event) => {
		event.preventDefault();

		handleCreate({
			title: title.value,
			author: author.value,
			url: url.value,
		});

		titleReset();
		authorReset();
		urlReset();
	};

	return (
		<div>
			<h2>Blog APP</h2>
			{showForm && (
				<Form onSubmit={createBlog}>
					<Form.Group className='mb-3'>
						<Form.Label>Title: </Form.Label>
						<Form.Control {...title} />
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label>Author: </Form.Label>
						<Form.Control {...author} />
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label>Url: </Form.Label>
						<Form.Control {...url} />
					</Form.Group>

					<Button type='submit'>create</Button>
				</Form>
			)}
			<Button
				variant={showForm ? 'danger' : 'primary'}
				onClick={() => setShowForm(!showForm)}
			>
				{showForm ? 'cancel' : 'create new'}
			</Button>
		</div>
	);
};

export default CreateNewBlog;
