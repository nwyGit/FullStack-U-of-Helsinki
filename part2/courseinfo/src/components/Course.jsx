import React from 'react';

const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => {
				return <Part part={part} key={part.id} />;
			})}
		</div>
	);
};

const Total = ({ parts }) => {
	return (
		<div>
			<p>
				<strong>
					Total of{' '}
					{parts.reduce((total, part) => {
						return total + part.exercises;
					}, 0)}{' '}
					exercises
				</strong>
			</p>
		</div>
	);
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
