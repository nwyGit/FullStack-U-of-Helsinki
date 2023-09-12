import axios from 'axios';
const blogBaseUrl = 'http://localhost:3003/api/blogs';
const userBaseUrl = 'http://localhost:3003/api/users';

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.get(blogBaseUrl, config);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(blogBaseUrl, newObject, config);
	return response.data;
};

const update = async (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.put(`${blogBaseUrl}/${id}`, newObject, config);
	return request.then((response) => response.data);
};

const comment = async (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.put(`${blogBaseUrl}/${id}/comments`, newObject, config);
	return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token },
	};
	return axios.delete(`${blogBaseUrl}/${id}`, config);
};

const findUser = async () => {
	const request = axios.get(userBaseUrl);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
	comment,
	deleteBlog,
	findUser,
	setToken,
};
