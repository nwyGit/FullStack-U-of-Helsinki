import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
	const dispatch = useNotificationDispatch();
	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		if (content.length >= 5) {
			console.log('new anecdote');
			newAnecdoteMutation.mutate({ content, votes: 0 });
			dispatch({
				type: 'NEW_NOTIFICATION',
				payload: `Anecdote '${content}' successfully added`,
			});
			setTimeout(() => {
				dispatch({
					type: 'NO_NOTIFICATION',
				});
			}, 5000);
		} else {
			dispatch({
				type: 'NEW_NOTIFICATION',
				payload: 'too short anecdote, must have length 5 or more',
			});
			setTimeout(() => {
				dispatch({
					type: 'NO_NOTIFICATION',
				});
			}, 5000);
		}
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
