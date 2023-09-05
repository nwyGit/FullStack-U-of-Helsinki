import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchWord, setSearchWord] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (persons.filter((person) => person.name === newName).length > 0) {
			alert(`${newName} is already added to phonebook`);
		} else if (
			persons.filter((person) => person.number === newNumber).length > 0
		) {
			alert(`${newNumber} is already added to phonebook`);
		} else {
			const newPersons = [
				...persons,
				{
					id: persons[persons.length - 1].id + 1,
					name: newName,
					number: newNumber,
				},
			];
			setPersons(newPersons);
		}
	}

	function handleNameChange(e) {
		setNewName(e.target.value);
	}

	function handleNumberChange(e) {
		setNewNumber(e.target.value);
	}

	function handleSearchWordChange(e) {
		setSearchWord(e.target.value);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={searchWord} handler={handleSearchWordChange} />
			<h2>Add a new</h2>
			<PersonForm
				value={(newName, newNumber)}
				handler={{ handleSubmit, handleNameChange, handleNumberChange }}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons.filter((person) =>
					person.name.toLowerCase().includes(searchWord)
				)}
			/>
		</div>
	);
};

export default App;
