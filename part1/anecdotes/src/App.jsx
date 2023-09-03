import { useState } from 'react';

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState({
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
	});
	const [mostVoted, setMostVoted] = useState(0);

	function randomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		var index = Math.floor(Math.random() * (max - min)) + min;
		setSelected(index);
	}

	function addVote(index) {
		points[index] += 1;
		const updatedPoints = { ...points };
		setPoints(updatedPoints);
		checkMostVotes();
	}

	function checkMostVotes() {
		let vote = 0;
		let index = 0;
		for (var i = 0; i < anecdotes.length; i++) {
			if (points[i.toString()] > vote) {
				vote = points[i];
				index = i;
			}
		}
		setMostVoted(index);
	}

	return (
		<div>
			<div>
				<h1>Anecdote of the day</h1>
				<p>{anecdotes[selected]}</p>
				<p>
					has {points[selected]} vote{points[selected] > 1 ? 's' : ''}
				</p>
				<button onClick={() => addVote(selected)}>vote</button>
				<button onClick={() => randomNumber(0, anecdotes.length)}>
					next anecdote
				</button>
			</div>
			<div>
				<h1>Anecdote with most votes</h1>
				<p>{anecdotes[mostVoted]}</p>
			</div>
		</div>
	);
};

export default App;
