import React from 'react';
import { useDispatch } from 'react-redux';
import anecdotesServices from '../services/anecdotes';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		const newAnecdote = await anecdotesServices.createNew(content);
		dispatch({ type: 'anecdotes/createAnecdote', payload: newAnecdote });
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
