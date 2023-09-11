import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		dispatch(createNewAnecdote(content));
		dispatch(setNotification(`Anecdote '${content}' successfully added`, 5));
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
