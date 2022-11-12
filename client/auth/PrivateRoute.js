import { redirect } from 'react-router-dom';

import { isAuthenticated } from './auth-helper';

/**
 * @param  {Object} {children} - React Node representing children to render to the tree
 * component will simply check the current user auth state, then redirect to the Signin component if the user is not authenticated
 */
const PrivateRoute = ({ children }) => {
	return isAuthenticated() ? children : redirect('/signin');
};

export default PrivateRoute;
