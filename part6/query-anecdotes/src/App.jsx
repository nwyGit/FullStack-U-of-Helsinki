import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
	const dispatch = useNotificationDispatch();
	const queryClient = useQueryClient();

	// updating data, has to be before fetching due to the hooks calling order
	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
		},
	});

	const handleVote = (anecdote) => {
		console.log('vote');
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
		dispatch({
			type: 'NEW_NOTIFICATION',
			payload: `anecdote '${anecdote.content}' voted`,
		});
		setTimeout(() => {
			dispatch({
				type: 'NO_NOTIFICATION',
			});
		}, 5000);
	};

	// fetching data
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: false,
	});
	console.log(JSON.parse(JSON.stringify(result)));

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>
			<Notification />
			<AnecdoteForm />
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
