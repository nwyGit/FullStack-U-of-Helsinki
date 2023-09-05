import { useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { useEffect } from 'react';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchWord, setSearchWord] = useState('');

	useEffect(fetchData, []);

	function fetchData() {
		axios
			.get('http://localhost:3001/persons')
			.then((res) => setPersons(res.data));
	}

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
