import { useState } from 'react';

const Button = ({ setter, result, name }) => {
	return <button onClick={() => setter(result + 1)}>{name}</button>;
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}:</td>
			<td>{value}</td>
		</tr>
	);
};

const Feedback = ({ setter, results }) => {
	return (
		<div>
			<h1>Give feedback</h1>
			<Button setter={setter.setGood} result={results.good} name={'Good'} />
			<Button
				setter={setter.setNeutral}
				result={results.neutral}
				name={'Neutral'}
			/>
			<Button setter={setter.setBad} result={results.bad} name={'Bad'} />
		</div>
	);
};

const Statistics = ({ results }) => {
	const totalVotes = results.good + results.neutral + results.bad;
	const average = (results.good - results.bad) / totalVotes;
	const positive = (results.good / totalVotes) * 100;

	return (
		<div>
			<h2>Statistics</h2>
			{totalVotes > 0 ? (
				<table>
					<tbody>
						<StatisticLine text={'Good'} value={results.good} />
						<StatisticLine text={'Neutral'} value={results.neutral} />
						<StatisticLine text={'Bad'} value={results.bad} />
						<StatisticLine
							text={'Average'}
							value={average ? Math.floor(average * 10) / 10 : ''}
						/>
						<StatisticLine
							text={'Positive'}
							value={positive ? Math.floor(positive * 10) / 10 + ' %' : ''}
						/>
					</tbody>
				</table>
			) : (
				<p>No feedback given</p>
			)}
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
