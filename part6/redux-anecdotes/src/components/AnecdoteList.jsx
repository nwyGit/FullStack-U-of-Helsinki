import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filter from './Filter';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) =>
		state.anecdotes.filter((a) => a.content.includes(state.filter))
	);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log('vote', id);
		dispatch({ type: 'anecdotes/voteIncrement', payload: id });
	};

	const displayMsg = (content) => {
		dispatch({ type: 'notification/displayMessage', payload: content });
		setTimeout(() => {
			dispatch({ type: 'notification/displayMessage', payload: '' });
		}, 5000);
	};
	return (
		<>
			<Filter />
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => {
								vote(anecdote.id);
								displayMsg(anecdote.content);
							}}
						>
							vote
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
