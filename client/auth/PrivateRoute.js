import { Navigate, Outlet, redirect, useLocation } from 'react-router-dom';

import { isAuthenticated } from './auth-helper';

/**
 * @param  {Object} {children} - React Node representing children to render to the tree
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

export const PrivateRouteContainer = ({ children }) => {
	const hasAuthenticated = isAuthenticated();

	return hasAuthenticated ? children : redirect('/signin');
};

export default PrivateRoute;
