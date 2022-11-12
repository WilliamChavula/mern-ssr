import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './core/Home';
import Users from './user/Users';

const MainRouter = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/users'
				element={<Users />}
			/>
		</Routes>
	);
};

export default MainRouter;
