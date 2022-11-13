import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './core/Home';
import Signin from './auth/Signin';
import Signup from './user/Signup';
import Users from './user/Users';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';

const MainRouter = () => {
	return (
		<Routes>
			<Menu />
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/users'
				element={<Users />}
			/>
			<Route
				path='/signup'
				element={<Signup />}
			/>
			<Route
				path='/signin'
				element={<Signin />}
			/>
			<Route
				path='/user/:userId'
				element={<Profile />}
			/>
			<Route
				path='/user/edit'
				element={<PrivateRoute />}>
				<Route
					path='/:userId'
					element={<EditProfile />}
				/>
			</Route>
		</Routes>
	);
};

export default MainRouter;
