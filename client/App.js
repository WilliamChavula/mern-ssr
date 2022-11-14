import React from 'react';
import createCache from '@emotion/cache';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { hot } from 'react-hot-loader';

const cache = createCache({ key: 'mui-css' });

import MainRouter from './MainRouter';
import theme from './theme';

function App() {
	return (
		<BrowserRouter>
			<CacheProvider value={cache}>
				<ThemeProvider theme={theme}>
					<MainRouter />
				</ThemeProvider>
			</CacheProvider>
		</BrowserRouter>
	);
}

export default hot(module)(App);
