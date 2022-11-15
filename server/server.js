import mongoose from 'mongoose';

import app from './express';
import config from '../config';

mongoose.connect(config.mongoUri);
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, err => {
	if (err) {
		console.error(err);
	}

	console.info(`Server started on port ${config.port}`);
});
