import path from 'path';

/* -------3rd PARTY LIBRARIES-------*/
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import template from '../template';

/* -------EXPRESS ROUTES-------*/
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

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

app.get('/', (req, res) => {
	res.status(200).send(template());
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
