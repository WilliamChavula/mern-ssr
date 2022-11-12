import { signout } from './api-auth';

/**
 * method to save the JWT credentials that are received from the server on successful sign-in.
 * @param {string} jwt - JWT credentials.
 * @param {Function} callback - callback will allow the component to define actions that should take place after successfully signing in and storing credentials
 */
const authenticate = (jwt, callback) => {
	if (typeof window !== undefined) {
		sessionStorage.setItem('jwt', JSON.stringify(jwt));

		callback();
	}
};

/**
 * retrieves credentials from sessionStorage.
 * @returns {boolean} the stored credentials or false, depending on whether credentials were found in sessionStorage
 */
const isAuthenticated = () => {
	if (typeof window === undefined) {
		return false;
	}

	if (sessionStorage.getItem('jwt')) {
		return JSON.parse(sessionStorage.getItem('jwt'));
	} else return false;
};

/**
 *
 * @param {Function} callback - allows the component initiating signout functionality to dictate what should happen after a successful sign-out.
 * invokes signout method from api-auth.js to call the signout API.
 */
const clearJWT = async callback => {
	if (typeof window !== undefined) {
		sessionStorage.removeItem('jwt');

		callback();

		await signout();
		document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	}
};

export { authenticate, isAuthenticated, clearJWT };
