const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
	return (
		<div>
			<Part part={parts.part1} />
			<Part part={parts.part2} />
			<Part part={parts.part3} />
		</div>
	);
};

const Total = ({ total }) => {
	return <p>Number of exercises {total}</p>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const App = () => {
	const course = 'Half Stack application development';
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10,
	};
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7,
	};
	const part3 = {
		name: 'State of a component',
		exercises: 14,
	};

	return (
		<div>
			<Header course={course} />
			<Content parts={{ part1, part2, part3 }} />
			<Total total={part1.exercises + part2.exercises + part3.exercises} />
		</div>
	);
};

export default App;
