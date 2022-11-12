import axios from 'axios';
import Logger from 'js-logger';

Logger.useDefaults();

const signin = async user => {
	try {
		const response = await axios.post('/auth/signin', JSON.stringify(user), {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});

		return response.data;
	} catch (error) {
		Logger.error(error);
	}
};

const signout = async () => {
	try {
		const response = await axios.get('/auth/signout/');

		return response.data;
	} catch (error) {
		Logger.error(error);
	}
};

export { signin, signout };
