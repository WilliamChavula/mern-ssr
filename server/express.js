import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

import { ThemeProvider } from '@mui/material/styles';
import { StaticRouter } from 'react-router-dom/server';
import { CacheProvider } from '@emotion/react';

/* -------3rd PARTY LIBRARIES-------*/
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

/* -------EXPRESS ROUTES-------*/
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

import template from '../template';
import MainRouter from '../client/MainRouter';
import theme from '../client/theme';

const CWD = process.cwd();
const app = express();

/* -------CONFIGURE EXPRESS-------*/
app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));

app.use('/dist', express.static(path.join(CWD, 'dist')));

/* -------EXPRESS ROUTES MIDDLEWARE-------*/
app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('*', (req, res) => {
	// 1. Generate CSS styles using Material-UI's ServerStyleSheets
	const cache = createCache({ key: 'mui-css' });
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	// 2. Use renderToString to generate markup which renders components specific to the route requested
	const html = ReactDOMServer.renderToString(
		<StaticRouter location={req.url}>
			<CacheProvider value={cache}>
				<ThemeProvider theme={theme}>
					<MainRouter />
				</ThemeProvider>
			</CacheProvider>
		</StaticRouter>
	);

	const emotionChunks = extractCriticalToChunks(html);
	const emotionCss = constructStyleTagsFromChunks(emotionChunks);
	// 3. Return template with markup and CSS styles in the response
	res.status(200).send(template(html, emotionCss));
});

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: err.name + ': ' + err.message });
	} else if (err) {
		res.status(400).json({ error: err.name + ': ' + err.message });
		console.log(err);
	}
});

export default app;
