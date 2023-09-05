import axios from 'axios';

const base_url = 'https://studies.cs.helsinki.fi/restcountries/api';
const weather_url = 'https://api.openweathermap.org/data/3.0/onecall';
const key = import.meta.env.VITE_weather_key;

const getAll = async () => {
	return axios.get(base_url + '/all').then((res) => res.data);
};

const getOne = async (name) => {
	return axios.get(base_url + `/name/${name}`).then((res) => res.data);
};

const getWeather = async (lat, lon) => {
	return axios
		.get(weather_url + `?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
		.then((res) => res.data);
};

export default { getAll, getOne, getWeather };
