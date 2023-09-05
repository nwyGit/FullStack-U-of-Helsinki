import { useState, useEffect } from 'react';
import services from './services';
import CountryDetails from './components/CountryDetails';

const App = () => {
	const [searchBox, setSearchBox] = useState('');
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		services
			.getAll()
			.then((data) => {
				setCountries(data.map((country) => country.name.common));
			})
			.catch((err) => console.log(err));
	}, []);

	function handleCountryChange(e) {
		setSearchBox(e.target.value);
	}

	return (
		<div>
			<span>
				find countries:{' '}
				<input type='text' value={searchBox} onChange={handleCountryChange} />
				{searchBox.length > 0 && (
					<CountryDetails text={searchBox} data={countries} />
				)}
			</span>
		</div>
	);
};

export default App;
