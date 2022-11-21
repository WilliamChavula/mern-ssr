import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isAuthenticated } from './auth-helper';

/**
 * component will simply check the current user auth state, then redirect to the Signin component if the user is not authenticated
 */
const PrivateRoute = () => {
	const location = useLocation();
	const hasAuthenticated = isAuthenticated();

	if (!hasAuthenticated)
		return (
			<Navigate
				to='/signin'
				state={{ from: location }}
			/>
		);

	return <Outlet />;
};

/**
 * @param  {Object} children - React Node representing children to render to the tree
 * component will simply check the current user auth state, then redirect to the Signin component if the user is not authenticated
 */
export const PrivateRouteContainer = ({ children }) => {
	const location = useLocation();
	const hasAuthenticated = isAuthenticated();

	return hasAuthenticated ? children : <Navigate
		to='/signin'
		state={{ from: location }}
	/>;
};

export default PrivateRoute;
