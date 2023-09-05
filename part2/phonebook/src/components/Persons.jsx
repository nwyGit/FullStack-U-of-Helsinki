import React from 'react';

const Persons = ({ persons }) => {
	return (
		<div>
			{persons.map((person) => {
				return (
					<div key={person.id}>
						<span>{person.name}</span> <span>{person.number}</span>
					</div>
				);
			})}
		</div>
	);
};

export default Persons;
