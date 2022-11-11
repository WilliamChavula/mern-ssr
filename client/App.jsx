import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { hot } from 'react-hot-loader';

import MainRouter from './MainRouter';
import theme from './theme';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<MainRouter />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default hot(module)(App);
