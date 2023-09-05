import React from 'react';

const PersonForm = ({ value, handler }) => {
	return (
		<form onSubmit={handler.handleSubmit}>
			<div>
				name:{' '}
				<input value={value.newName} onChange={handler.handleNameChange} />
			</div>
			<div>
				number:{' '}
				<input value={value.newNumber} onChange={handler.handleNumberChange} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
