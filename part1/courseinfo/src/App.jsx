const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ exercises }) => {
	return (
		<div>
			<Part part={exercises.part1} exercise={exercises.exercises1} />
			<Part part={exercises.part2} exercise={exercises.exercises2} />
			<Part part={exercises.part3} exercise={exercises.exercises3} />
		</div>
	);
};

const Total = ({ total }) => {
	return <p>Number of exercises {total}</p>;
};

const Part = ({ part, exercise }) => {
	return (
		<p>
			{part} {exercise}
		</p>
	);
};

const App = () => {
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;

	return (
		<div>
			<Header course={course} />
			<Content
				exercises={{ part1, exercises1, part2, exercises2, part3, exercises3 }}
			/>
			<Total total={exercises1 + exercises2 + exercises3} />
		</div>
	);
};

export default App;
