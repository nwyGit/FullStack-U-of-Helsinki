import { useState } from 'react';

const Feedback = ({ setter, results }) => {
	return (
		<div>
			<h1>Give feedback</h1>
			<button onClick={() => setter.setGood(results.good + 1)}>Good</button>
			<button onClick={() => setter.setNeutral(results.neutral + 1)}>
				Neutral
			</button>
			<button onClick={() => setter.setBad(results.bad + 1)}>Bad</button>
		</div>
	);
};

const Statistics = ({ results }) => {
	return (
		<div>
			<h2>Statistics</h2>
			<p>Good: {results.good}</p>
			<p>Neutral: {results.neutral}</p>
			<p>Bad: {results.bad}</p>
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<Feedback
				setter={{ setGood, setNeutral, setBad }}
				results={{ good, neutral, bad }}
			/>
			<Statistics results={{ good, neutral, bad }} />
		</div>
	);
};

export default App;