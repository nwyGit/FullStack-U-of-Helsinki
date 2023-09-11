import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import anecdotesServices from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		anecdotesServices
			.getAll()
			.then((res) => res.forEach((a) => dispatch(setAnecdotes(res))));
	}, []);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
