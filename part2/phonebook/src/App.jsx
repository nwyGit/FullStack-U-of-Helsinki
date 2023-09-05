import { useState, useEffect } from 'react';
import services from './services/crud';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchWord, setSearchWord] = useState('');
	const [updateName, setUpdateName] = useState('');
	const [notificationMsg, setNotificationMsg] = useState('');

	useEffect(() => {
		services
			.getAll()
			.then((data) => setPersons(data))
			.catch((err) => {
				console.log(err);
				setNotificationMsg(`Error message: ${err}`);
				setTimeout(() => {
					setNotificationMsg('');
				}, 5000);
			});
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		const result_sameName = persons.find((person) => person.name === newName);
		const result_sameNumber = persons.find(
			(person) => person.number === newNumber
		);

		if (result_sameName) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				services
					.update(result_sameName.id, newPerson)
					.then(() =>
						services.getAll().then((data) => {
							setPersons(data);
							setNotificationMsg(
								`The number with name "${result_sameName.name}" is changed to "${newNumber}"`
							);
							setTimeout(() => {
								setNotificationMsg('');
							}, 5000);
						})
					)
					.catch((err) => {
						console.log(err);
						setNotificationMsg(`Error message: ${err}`);
						setTimeout(() => {
							setNotificationMsg('');
						}, 5000);
					});
			}
		} else if (result_sameNumber) {
			if (
				window.confirm(
					`${newNumber} is already added to phonebook, replace the old name with a new one?`
				)
			) {
				services
					.update(result_sameNumber.id, newPerson)
					.then(() => {
						services.getAll().then((data) => {
							setPersons(data);
							setNotificationMsg(
								`The name with number "${result_sameNumber.number}" is changed to "${newName}"`
							);
							setTimeout(() => {
								setNotificationMsg('');
							}, 5000);
						});
					})
					.catch((err) => {
						console.log(err);
						setNotificationMsg(`Error message: ${err}`);
						setTimeout(() => {
							setNotificationMsg('');
						}, 5000);
					});
			}
		} else {
			services
				.create(newPerson)
				.then((data) => {
					setPersons([...persons, data]);
					setNotificationMsg(`Added ${newName}`);
					setTimeout(() => {
						setNotificationMsg('');
					}, 5000);
				})
				.catch((err) => {
					console.log(err);
					setNotificationMsg(`Error message: ${err}`);
					setTimeout(() => {
						setNotificationMsg('');
					}, 5000);
				});
		}
	}

	function handleDelete(id) {
		if (window.confirm(`Do you want to delete Person with ID:${id}?`)) {
			services.deletePerson(id);
			services
				.getAll()
				.then((data) => {
					setPersons(data);
					setNotificationMsg(`Person deleted`);
					setTimeout(() => {
						setNotificationMsg('');
					}, 5000);
				})
				.catch((err) => {
					console.log(err);
					setNotificationMsg(`Error message: ${err}`);
					setTimeout(() => {
						setNotificationMsg('');
					}, 5000);
				});
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notificationMsg} />
			<Filter value={searchWord} setter={{ setSearchWord }} />
			<h2>Add a new</h2>
			<PersonForm
				value={(newName, newNumber)}
				handler={handleSubmit}
				setter={{ setNewName, setNewNumber }}
			/>
			<h2>Numbers</h2>
			<Persons
				value={{ searchWord, updateName }}
				persons={persons}
				handler={{ handleDelete }}
				setter={{ setUpdateName }}
			/>
		</div>
	);
};

export default App;
