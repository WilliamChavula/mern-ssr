import axios from 'axios';
import Logger from 'js-logger';

Logger.useDefaults();

const create = async user => {
	try {
		let response = await axios.post('/api/users/', JSON.stringify(user), {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		Logger.error(error);
	}
};

const list = async signal => {
	try {
		let response = await axios.get('/api/users/', {
			signal: signal,
		});

		return response.data;
	} catch (error) {
		Logger.error(error);
	}
};

const read = async (params, credentials, signal) => {
	try {
		let response = await axios.get(`/api/users/${params.id}`, {
			signal: signal,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${credentials.t}`,
			},
		});

		return response.data;
	} catch (error) {
		Logger.error(error);
	}
};

const update = async (params, credentials, user) => {
	try {
		let response = await axios.put(
			`/api/users/${params.id}/`,
			JSON.stringify(user),
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${credentials.t}`,
				},
			}
		);
	} catch (error) {
		Logger.error(error);
	}
};

const remove = async (params, credentials) => {
	try {
		let response = await axios.delete(`/api/users/${params.id}/`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${credentials.t}`,
			},
		});

		return response.data;
	} catch (error) {
		Logger.error(error);
	}
};

export { create, list, read, update, remove };
