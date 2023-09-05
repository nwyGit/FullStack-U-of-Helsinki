import React from 'react';

const PersonForm = ({ value, handler, setter }) => {
	function handleNameChange(e) {
		setter.setNewName(e.target.value);
	}

	function handleNumberChange(e) {
		setter.setNewNumber(e.target.value);
	}

	return (
		<>
			<form onSubmit={handler}>
				<div>
					name: <input value={value.newName} onChange={handleNameChange} />
				</div>
				<div>
					number:{' '}
					<input value={value.newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	);
};

export default PersonForm;
