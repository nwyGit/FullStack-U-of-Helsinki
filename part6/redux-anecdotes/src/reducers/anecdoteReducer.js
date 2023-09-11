import { createSlice } from '@reduxjs/toolkit';
import anecdotesServices from '../services/anecdotes';

// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0,
// 	};
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		voteIncrement(state, action) {
			const changedAnecdote = action.payload;
			return state.map((a) =>
				a.id !== changedAnecdote.id ? a : changedAnecdote
			);
		},
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteIncrement, createAnecdote, setAnecdotes } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		// fetching
		const anecdotes = await anecdotesServices.getAll();
		// update the state with returned value
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createNewAnecdote = (content) => {
	return async (dispatch) => {
		// posting new object to server
		const newAnecdote = await anecdotesServices.createNew(content);
		// add the new object to the state
		dispatch(createAnecdote(newAnecdote));
	};
};

export const updateVotes = (obj) => {
	return async (dispatch) => {
		// posting updated object to server
		const updatedAnecdote = await anecdotesServices.updateVotes(obj);
		// update the updated object to the state
		dispatch(voteIncrement(updatedAnecdote));
	};
};

export default anecdoteSlice.reducer;
