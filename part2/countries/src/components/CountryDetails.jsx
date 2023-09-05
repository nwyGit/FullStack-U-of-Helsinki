import { useState, useEffect } from 'react';
import services from '../services';

const CountryDetails = ({ text, data }) => {
	const [matchCountries, setMatchCountries] = useState([]);
	const [countryDetail, setCountryDetail] = useState(null);
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		const results = data.filter((country) =>
			country.toLowerCase().includes(text.toLowerCase())
		);
		setMatchCountries(results);
	}, [text]);

	useEffect(() => {
		if (matchCountries.length === 1) {
			services
				.getOne(matchCountries[0])
				.then((data) => {
					setCountryDetail(data);
					services
						.getWeather(data.latlng[0], data.latlng[1])
						.then((data) => setWeatherData(data))
						.catch((err) => console.log(err));
				})
				.then()
				.catch((err) => console.log(err));
		}
	}, [matchCountries]);

	if (matchCountries.length === 0) {
		return <p>No matching countries found.</p>;
	} else if (matchCountries.length === 1 && countryDetail && weatherData) {
		console.log(weatherData);
		return (
			<>
				<div>
					<h1>{countryDetail.name.common}</h1>
					<p>Capital: {countryDetail.capital}</p>
					<p>Area: {countryDetail.area}</p>
					<br />
					<div>
						<strong>Languages:</strong>{' '}
						<ul>
							{Object.values(countryDetail.languages).map((lang) => {
								return <li key={lang}>{lang}</li>;
							})}
						</ul>
					</div>
					<img src={countryDetail.flags.png} alt={countryDetail.flags.alt} />
				</div>
				<div>
					<h2>Weather in {countryDetail.name.common}</h2>
          <p>temperature {weatherData.current.temp} Celcius</p>
          <p>wind {weatherData.current.wind_speed} m/s</p>
				</div>
			</>
		);
	} else if (matchCountries.length <= 10) {
		return matchCountries.map((res) => {
			return (
				<div key={res}>
					<span>{res}</span>
					<button onClick={() => setMatchCountries([res])}>Show</button>
				</div>
			);
		});
	} else {
		return <p>Too many matches, specify another filter</p>;
	}
};

export default CountryDetails;
