import path from 'path';

import { MongoClient } from 'mongodb';

import app from './express';
import compile from './devBundle';
import config from '../config';
import template from '../template';

const url =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

(async () => {
	const client = new MongoClient(url);
	await client.connect();
})();

// MongoClient.connect(url, (err, db) => {
// 	console.log('connected to Mongo Server');
// 	db.close();
// });

app.listen(config.port, err => {
	if (err) {
		console.error(err);
	}

	console.info(`Server started on port ${config.port}`);
});

compile(app);
