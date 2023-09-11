import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteIncrement } from '../reducers/anecdoteReducer';
import Filter from './Filter';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) =>
		state.anecdotes.filter((a) => a.content.includes(state.filter))
	);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log('vote', id);
		dispatch(voteIncrement(id));
	};
	return (
		<>
			<Filter />
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
