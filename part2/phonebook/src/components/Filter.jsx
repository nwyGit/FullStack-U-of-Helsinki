import React from 'react';

const Filter = ({ value, setter }) => {
	function handleSearchWordChange(e) {
		setter.setSearchWord(e.target.value);
	}

	return (
		<div>
			filter shown with{' '}
			<input type='text' value={value} onChange={handleSearchWordChange} />
		</div>
	);
};

export default Filter;
