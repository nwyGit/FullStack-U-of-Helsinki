import React from 'react';

const Persons = ({ value, persons, handler }) => {
	console.log(persons);
	return (
		<div>
			{persons
				.filter((person) =>
					person.name.toLowerCase().includes(value.searchWord)
				)
				.map((person) => {
					return (
						<div key={person.id}>
							<div>
								<p>Name: {person.name}</p>
								<p>Number: {person.number}</p>
								<button onClick={() => handler.handleDelete(person.id)}>
									Delete
								</button>
							</div>
							<br />
						</div>
					);
				})}
		</div>
	);
};

export default Persons;
