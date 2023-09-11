import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filter from './Filter';
import { updateVotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) =>
		state.anecdotes.filter((a) => a.content.includes(state.filter))
	);
	const dispatch = useDispatch();

	const vote = (obj) => {
		console.log('vote', obj.id);
		dispatch(updateVotes(obj));
		dispatch(setNotification(`you voted '${obj.content}'`, 5));
	};

	return (
		<>
			<Filter />
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote)}>vote</button>
						</div>
					</div>
				))}
		</>
	);
};

export default AnecdoteList;
